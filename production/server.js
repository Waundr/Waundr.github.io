const express = require('express');
const cors = require('cors')
const app = express();
const uuidv4 = require('uuid/v4');

const redis = require('redis');
const client = redis.createClient();
const usersRoutes = require("./routes/users")
const markerRoutes = require("./routes/markers")

const SocketServer = require('ws').Server;

const PORT = 3001;
const ExpTime = 7200000;

let events = [];

client.on('connect', function() {
    console.log('redis connected');
});

client.keys('*', (err, keys) => {
  if (err) return console.log(err);

  for (let i = 0; i < keys.length; i++) {
    client.hgetall(keys[i], (err, obj) => {
      events.push(obj)
    })
  }
})

// client.flushdb( function (err, succeeded) {
//     console.log("flushing redis.."+ succeeded); // will be true if successfull
// });

app.use(cors());

app.get('/', function(req, res) {
    console.log('home')
    res.send('hellow')
})

app.get('/events.json', (req, res) => {
  res.json(events)
})

server = app.use(express.static('public'))
   .use("/users", usersRoutes()) //routes for handling user logins
   .use("/markers", markerRoutes(client)) //markers needs redis client
   .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = (message) => {
  console.log("broadcasting to all users")
  wss.clients.forEach((c) => {
    c.send(JSON.stringify(message));
  });
}

setInterval( () => {
  for (let i = 0; i < events.length; i++) {
    if (parseInt(events[i].time) + ExpTime < Date.now()) {

      wss.broadcast({type: 'expire', data: events[i].id})
      client.del(events[i].id)
      events.splice(i, 1);

    }
  }
  // wss.broadcast({type: 'notification', data: 'timer test'})
}, 30000)

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  const broadcastElse = (message) => {
    console.log("broadcasting to all users except client")
    wss.clients.forEach((c) => {
      if (c != ws) {
        c.send(JSON.stringify(message));
      }
    });
  }

  ws.on('message', function incoming(message) {
    let newMarker = JSON.parse(message);
    newMarker.lat = newMarker.loc.lat;
    newMarker.lng = newMarker.loc.lng;
    delete newMarker.loc;
    newMarker.id = uuidv4();
    newMarker.time = Date.now();
    events.push(newMarker);

    client.hmset(newMarker.id, newMarker)

    let info = {};
    info.type = 'update markers';
    wss.broadcast(info)
    info.type = 'notification';
    info.data = newMarker.type;
    broadcastElse(info);
    client.hgetall(newMarker.id, (err, obj) => {
      console.log(obj)
    })

  })

 // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});




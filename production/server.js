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

let events = [];

client.on('connect', function() {
    console.log('redis connected');
});

client.flushdb( function (err, succeeded) {
    console.log("flushing redis.."+ succeeded); // will be true if successfull
});

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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  const broadcast = (message) => {
    console.log("broadcasting to all users")
    wss.clients.forEach((c) => {
      c.send(JSON.stringify(message));
    });
  }

  const broadcastElse = (message) => {
    console.log("broadcasting to all users")
    wss.clients.forEach((c) => {
      if (c != ws) {
        c.send(JSON.stringify(message));
      }
    });
  }

  // events.forEach((event) => {
  //   ws.send(JSON.stringify(message));
  // })


  ws.on('message', function incoming(message) {
    let newMarker = JSON.parse(message);
    newMarker.lat = newMarker.loc.lat;
    newMarker.lng = newMarker.loc.lng;
    delete newMarker.loc;
    newMarker.id = uuidv4();
    events.push(newMarker);

    client.hmset(`event${events.length - 1}`, newMarker)

    let info = {};
    info.type = 'update markers';
    broadcast(info)
    info.type = 'notification';
    info.data = newMarker.type;
    broadcastElse(info);
    client.hgetall(`event${events.length - 1}`, (err, obj) => {
      console.log(obj)
    })

  })

 // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});




const express = require('express');
const cors = require('cors')
const app = express();
const uuidv4 = require('uuid/v4');

const morgan = require('morgan')
require("dotenv").config()

const redis = require('redis');
const client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});
const usersRoutes = require("./routes/users")
const markerRoutes = require("./routes/markers")
const bodyParser = require('body-parser')

const SocketServer = require('ws').Server;
// const craigslist = require('node-craigslist');
const Meetups = require('./meetups')


const ExpTime = 7200000;

let events = [];

//keeps track of ws clients id to user id
let clientToUserId = {};

app.use(morgan('dev'));
const PORT = process.env.PORT|| 3001;
// //MVP hardcode city
// let craigClient = new craigslist.Client({
//   baseHost: 'craigslist.ca',
//   city: 'Toronto'
// }),
//   options = {
//     category: 'gms'
//   };

// craigClient
//   .list(options)
//   .then((listings) => {
//     console.log(listings)
//   })
// //gms category





client.on('connect', function() {
    console.log('redis connected');
});

//scrape meetups event 30mins

 scrapeMeetup = () => {
  Meetups((mu) => {
    // client.flushdb( function (err, succeeded) {
    //   console.log("flushing redis.."+ succeeded); // will be true if successfull
    mu['confirms'] = []
    mu['rejects'] = []
    mu['creator'] = 'meetup'
    client.hmset(mu.id, mu)
    //dont want duplicate meetups
    if (events.indexOf(mu) === -1) {
      events.push(mu)
      let info = {};
      info.type = 'update markers';
      wss.broadcast(info)
    }

  })
}

scrapeMeetup();
setInterval(scrapeMeetup, 1800000)

client.keys('*', (err, keys) => {
  if (err) return console.log(err);

  for (let i = 0; i < keys.length; i++) {
    client.hgetall(keys[i], (err, obj) => {
      obj.lat = parseFloat(obj.lat)
      obj.lng = parseFloat(obj.lng)
      obj.time = parseInt(obj.time, 10)
      obj.confirms = obj.confirms ? obj.confirms.split(',') : []
      obj.rejects = obj.rejects ? obj.rejects.split(',') : []
      obj.priv = (obj.priv == 'true')
      events.push(obj)
    })
  }
})

// client.flushdb( function (err, succeeded) {
//     console.log("flushing redis.."+ succeeded); // will be true if successfull
// });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


server = app.use(express.static('public'))
   .use("/users", usersRoutes()) //routes for handling user logins
   .use("/markers", markerRoutes(client)) //markers needs redis client
   .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

server.get

const wss = new SocketServer({ server });

wss.broadcast = (message) => {
  console.log("broadcasting to all users")
  wss.clients.forEach((c) => {
    c.send(JSON.stringify(message));
  });
}

setInterval( () => {
  for (let i = 0; i < events.length; i++) {
    if (events[i].time + ExpTime < Date.now()) {

      wss.broadcast({type: 'expire', data: events[i].id})
      client.del(events[i].id)
      events.splice(i, 1);

    }
  }
  // wss.broadcast({type: 'notification', data: 'timer test'})
}, 30000)



app.get('/events.json', (req, res) => {
  res.json(events)
})

app.get('/mobile/events.json', (req, res) => {
  let mobileRes = {
    events: events
  }
  res.json(mobileRes)
})

app.post('/events', (req, res) => {
  let id = req.body.id;
  let user = req.body.user;
  let confirm = req.body.confirm;
  let response = '';

  for (let i = 0; i < events.length; i++) {
    if (events[i].id === id) {
      if (confirm === 'confirm') {
        if (events[i].confirms.includes(user)) {
          events[i].confirms.splice(events[i].confirms.indexOf(user), 1)
          response = 'minus';
        } else {
          events[i].time = Date.now();
          events[i].confirms.push(user)
          response = 'plus'
        }
      } else {
        if (events[i].rejects.includes(user)) {
          events[i].rejects.splice(events[i].rejects.indexOf(user), 1)
        } else {
          events[i].rejects.push(user)
        }
      }
      if (events[i].rejects.length > 1 || events[i].rejects.includes(events[i].creator.toString())) {
        wss.broadcast({type: 'expire', data: events[i].id})
        client.del(events[i].id)
        events.splice(i, 1);
      } else {
        client.hmset(id, events[i])
      }
      wss.broadcast({type: 'update specific', data: id})
    }
  }

  console.log(response)
  res.send(response);
})


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
    let parsedMsg = JSON.parse(message)
    //make switch statement to find userid
    //make default to marker stuff if type not userid
    switch (parsedMsg.type) {
      case 'userid':
        clientToUserId[parsedMsg.userid] = ws
        break;
      case 'sendRequest':
        //if the befriended user is currently logged in, relay friend request information
        if(clientToUserId[parsedMsg.befriendedid] && clientToUserId[parsedMsg.befriendedid].readyState === WebSocket.OPEN)
          clientToUserId[parsedMsg.befriendedid].send(message)
        break;
      case 'acceptRequest':
        if(clientToUserId[parsedMsg.frienderid] && clientToUserId[parsedMsg.befriendedid].readyState === WebSocket.OPEN)
          clientToUserId[parsedMsg.frienderid].send(message)
        break;
      default:
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
    }
  })

 // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    // console.log('client to user id', clientToUserId)
    // const getKey = (obj,val) => {
    //   console.log('obj',obj)
    //   console.log('val', val)
    //   Object.keys(obj).find(key => obj[key] == val)
    // };
    // console.log('key', getKey(clientToUserId, ws))
    // console.log(key)
    // delete clientToUserId[key];
    // let index = clientToUserId.indexOf(ws);
    // clientToUserId.splice(index, 1);
    console.log('Client disconnected')
  });
});

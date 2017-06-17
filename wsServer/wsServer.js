// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  const broadcast = (message) => {
    console.log("broadcast is called")


  wss.clients.forEach((c) => {
    if(c != ws) {
      c.send(JSON.stringify(message));
    }
  });
}


  ws.on('message', function incoming(message) {
    console.log(JSON.parse(message))
    let newMarker = JSON.parse(message)
    console.log(newMarker)
    broadcast(message)

  })

 // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

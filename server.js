var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var redis = require('redis');
var client = redis.createClient();

const express = require('express');
const SocketServer = require('ws').Server;

let events = [];

client.on('connect', function() {
    console.log('connected');
});

server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });



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

  events.forEach((event) => {
    ws.send(JSON.stringify(message));
  })


  ws.on('message', function incoming(message) {
    let newMarker = JSON.parse(message);
    console.log(newMarker);
    events.push(newMarker);
    client.hmset(`event${events.length - 1}`, newMarker)
    broadcast(message)
    client.hgetall(`event${events.length - 1}`, (err, obj) => {
      console.log(obj)
    })

  })

 // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});


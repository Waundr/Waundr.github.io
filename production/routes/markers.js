const express = require("express");
const router  = express.Router();


module.exports = (client) => {

  router.get("/info/:marker", (req, res) => {
    // get info from redis client
    res.send("HELLO")
    console.log("TEST")
  }),

  router.post("/marker"), (req, res) => {
    console.log(JSON.parse(req.body))
    // console.log("NEW MARKER ROUTE")
    // let newMarker = JSON.parse(req.body);
    // newMarker.lat = newMarker.loc.lat;
    // newMarker.lng = newMarker.loc.lng;
    // delete newMarker.loc;
    // console.log(newMarker);
    // events.push(newMarker);
    // client.hmset(`event${events.length - 1}`, newMarker)
    // broadcast('update markers')
    // client.hgetall(`event${events.length - 1}`, (err, obj) => {
    //   console.log(obj)
    // })

  }

  return router;
}

const express = require("express");
const router  = express.Router();


module.exports = (client) => {

  router.get("/info/:marker", (req, res) => {
    // get info from redis client
  })

  return router;
}

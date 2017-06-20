const express = require("express");
const router  = express.Router();
const bcrypt = require("bcrypt");


module.exports = (client) => {

  router.get("/info/:marker", (req, res) => {
    // get info from redis client
  }

  return router;
}

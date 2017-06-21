const express = require("express");
const router  = express.Router();
const usersController = require('../controllers').users;

//sequealize will be passed in
module.exports = () => {

  router.get("/", (req, res) => {
    // get info from redis client
    console.log('going')
    res.send('ok')
  }),

  router.post('/', usersController.create)

  return router;
}

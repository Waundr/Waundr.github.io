const express = require("express");
const router  = express.Router();
// const usersController = require('../controllers').users;
  // app.post('//users', usersController.create);
//sequealize will be passed in
module.exports = () => {

  router.get("/", (req, res) => {
    // get info from redis client
    console.log('going')
    res.send('ok')
  })

  return router;
}

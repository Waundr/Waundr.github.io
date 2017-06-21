const Users = require('../models').Users;

module.exports = {
  create(req, res) {
    console.log(req.body)
    return Users
      .create({
        name: req.body.name,
      })
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error));
  },
};
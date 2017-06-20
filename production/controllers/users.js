const Users = require('../models').Users;

module.exports = {
  create(req, res) {
    return Users
      .create({
        title: req.body.title,
      })
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error));
  },
};
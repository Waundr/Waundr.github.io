const Users = require('../models').Users;

module.exports = {
  findOrCreate(req, res) {
    console.log("REQ", req)
    return Users
      .findOrCreate({
        where: {passportId: req.passportId},
        defaults: {
        firstName: req.firstName,
        lastName: req.lastName,
        passportId: req.passportId,
        image: req.image}
      });
  },
};
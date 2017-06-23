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
  findUsersNearby(req, res) {
    return Users
      .findAll({
        attributes: ['firstName', 'lastName', 'points', 'image', 'currentLat', 'currentLng'],
        where: {
          currentLat: {
            $between: [req.latMin, req.latMax]
          },
          $and: {
            currentLng: {
              $between: [req.lngMin, req.lngMax]
            },
            passportId: {
              $ne: req.id
            }
          }
        }
      })
  }
};
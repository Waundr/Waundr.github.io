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
    //Use quick/dirty estimate that 1m in y is ~0.00001 degre (of latitude) and 1m in x is 0.00001 in x
    //find friends within 100m
    return Users
      .findAll({
        where: {
          currentLat: {
            $between: [(req.lat-0.001, (req.lat+0.001)]
          },
          $and: {
            [currentLng: {
              $between: [(req.lng-0.001, (req.lng+0.001)]
            },
            passportId: {
              $ne: req.id
            }]
          }
        }
      })
  }
};
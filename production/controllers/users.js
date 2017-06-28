const users = require('../models').users;
const friends = require('../models').friends;
const db = require('../models/index');

module.exports = {
  findOrCreate(req, res) {
    return users
      .findOrCreate({
        where: {passportId: req.passportId},
        defaults: {
        firstName: req.firstName,
        lastName: req.lastName,
        passportId: req.passportId,
        image: req.image}
      });
  },
  findAlreadyAddedNearby (req, res) {
    console.log(req.id)
    return friends
      .findAll({
        attributes: ['befriendedid'],
        where: {
          frienderid: {
            $eq: req.id
          }
        }
      })
  },
  findUsersNearby(req, res) {
    return users
      .findAll({
        attributes: ['id', 'firstName', 'lastName', 'points', 'image', 'currentLat', 'currentLng'],
        where: {
          currentLat: {
            $between: [req.latMin, req.latMax]
          },
          $and: {
            currentLng: {
              $between: [req.lngMin, req.lngMax]
            },
            id: {
              $notIn: [req.id, req.befriendedid ? req.befriendedid.befriendedid : -1]
            }
          }
        }
      })
  },
  findFriendRequests(req, res) {
    // Users.sync()
    // Friends.sync()
    // return Users
    //   .findAll({
    //     where: {
    //       id: 1
    //     },
    //     include: [{
    //       model: Friends,
    //     }]
    //   })

    //ASSOOCIATIONS IN SEQUELIZE NOT WORKING :(
    //GO MANUAL

    //FIRST FIND
    return db.sequelize.query(`SELECT * FROM friends RIGHT OUTER JOIN users ON friends.frienderid=users.id WHERE friends.status=0 AND friends.befriendedid=${req.id}` )

  },
  sendFriendRequest(req, res) {
    //sequelize autocapitalizing on find, use manual raw query
    // return friends
    //   .findOrCreate({
    //     where: {
    //       frienderid: req.frienderid,
    //       befriendedid: req.befriendedid
    //     }
    //   })
    return db.sequelize.query(`INSERT INTO friends (frienderid, befriendedid) VALUES (${req.frienderid}, ${req.befriendedid})`)
  },

  denyFriendRequest(req, res) {

    return db.sequelize.query(`UPDATE friends set status = 2 WHERE frienderid=${req.frienderid} AND befriendedid=${req.befriendedid}`)
  },

  acceptFriendRequest(req, res) {

    return db.sequelize.query(`UPDATE friends set status = 1 WHERE frienderid=${req.frienderid} AND befriendedid=${req.befriendedid}`)
  }

};
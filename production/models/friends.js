'use strict';
// const Users = require('./users');
// const db = require('./index');

module.exports = function(sequelize, DataTypes) {
  var friends = sequelize.define('friends', {
    frienderId: DataTypes.INTEGER,
    befriendedId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // db.Friends.belongstToMany(db.models.Users)
        // Friends.belongsTo(models.Users)
        // Friends.belongsTo(models.Users)
        // Friends.belongsTo(models.Users, {as: 'Friender', constraints: false})
        // Friends.belongsTo(models.Users, {as: 'Befriended', constraints: false})
        // associations can be defined here
      }
    }
  });
  return friends;
}
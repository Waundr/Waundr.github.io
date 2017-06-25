'use strict';
// const db = require('./index');
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    points: DataTypes.INTEGER,
    image: DataTypes.STRING,
    passportId: DataTypes.FLOAT,
    currentLat: DataTypes.INTEGER,
    currentLng: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // db.Users.hasMany(db.models.Friends)

        // Users.hasMany(Friends, {foreignKey: 'users_id'})
        // Users.hasMany(models.Friends)
        // Users.hasMany(models.Friends, {as: 'friender', foreignKey: 'frienderId'})
        // Users.hasMany(models.Friends, {as: 'befriender', foreignKey: 'befrienderId'})
        // associations can be defined here
        //Users.hasMany(Friends)
        //User.hasOne(project) in sequelize user is source and project is the target
      }
    }
  });
  return users;
};
'use strict';
// const Friends = require('./friends');
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
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
        Users.hasMany(models.Friends, {foreignKey: 'id'})
        // Users.hasMany(models.Friends, {as: 'friender', foreignKey: 'frienderId'})
        // Users.hasMany(models.Friends, {as: 'befriender', foreignKey: 'befrienderId'})
        // associations can be defined here
        //Users.hasMany(Friends)
        //User.hasOne(project) in sequelize user is source and project is the target
      }
    }
  });
  return Users;
};
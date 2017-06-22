'use strict';
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
        // associations can be defined here
      }
    }
  });
  return Users;
};
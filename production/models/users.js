'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    allowNull: false
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //         User.hasMany(models.freinds?, {
        //   foreignKey: 'todoId',
        //   as: 'todoItems',
        // });
      }
    }
  });
  return Users;
};
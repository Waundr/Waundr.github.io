'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users').then(function() {

    queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      points: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      passportId: {
        type: Sequelize.FLOAT
      },
      currentLat: {
        type: Sequelize.INTEGER
      },
      currentLng: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
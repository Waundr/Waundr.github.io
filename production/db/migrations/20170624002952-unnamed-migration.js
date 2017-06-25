'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Friends')
    .then(() => {queryInterface.createTable('friends', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      frienderid: {
        type: Sequelize.INTEGER,
        field: 'frienderid'
      },
      befriendedid: {
        type: Sequelize.INTEGER,
        field: 'befriendedid'
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('friends');
  }
};
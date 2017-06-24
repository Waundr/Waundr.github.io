'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Friends')
    .then(() => {queryInterface.createTable('Friends', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      frienderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        }
      },
      befriendedId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        }
      },
      status: {
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
    })});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Friends');
  }
};
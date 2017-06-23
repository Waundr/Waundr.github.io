'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Users',
      'currentLat',
      {
        type: Sequelize.FLOAT
      }
    ).then(function() {
        return queryInterface.changeColumn(
        'Users',
        'currentLng',
        {
          type: Sequelize.FLOAT
        }
      ).then(function() {
          return queryInterface.changeColumn(
          'Users',
          'points',
          {
            type: Sequelize.INTEGER,
            defaultValue: 0
          }
        )
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};

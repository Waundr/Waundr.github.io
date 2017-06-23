'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Friends', [{
          frienderId: 0,
          befriendedId: 1,
          status: 1,
          createdAt: new Date(),
         updatedAt: new Date()
        },{
          frienderId: 1,
          befriendedId: 3,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }])

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('friends', [{
          frienderid: 2,
          befriendedid: 1,
          status: 0
        },{
          frienderid: 1,
          befriendedid: 3,
          status: 1
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
    return queryInterface.bulkDelete('Friends', null, {});

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

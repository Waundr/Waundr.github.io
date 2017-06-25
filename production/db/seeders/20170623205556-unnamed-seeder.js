'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('users', [{
        firstName: 'Arjun',
        lastName: 'Lall',
        points: 10000,
        image: 'https://cache-graphicslib.viator.com/graphicslib/thumbs360x240/3594/SITours/toronto-inner-harbour-evening-cruise-in-toronto-113654.jpg',
        passportId: 4,
        currentLat: 43.644625,
        currentLng: -79.395197,
        createdAt: new Date(),
        updatedAt: new Date()
      }]) /*
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

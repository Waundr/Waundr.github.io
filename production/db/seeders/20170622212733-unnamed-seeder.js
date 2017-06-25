'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('users', [{
        firstName: 'Milind',
        lastName: 'DontRemb',
        points: 0,
        image: 'https://res.cloudinary.com/crunchbase-production/image/upload/v1397183729/fc7e549e6282b620b4566ffd40fb9387.jpg',
        passportId: 1,
        currentLat: 43.644625,
        currentLng: -79.395197,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Raymond',
        lastName: 'fargus',
        points: 0,
        image: 'https://res.cloudinary.com/crunchbase-production/image/upload/v1397183729/fc7e549e6282b620b4566ffd40fb9387.jpg',
        passportId: 2,
        currentLat: 43.644635,
        currentLng: -79.395197,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Users', null, {});
  }
};

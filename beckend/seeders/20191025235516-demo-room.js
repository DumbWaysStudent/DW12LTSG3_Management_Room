'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('rooms', [{
        name: "A1",
        is_booked: false
      },
      {
        name: "A2",
        is_booked: false
      },
      {
        name: "A13",
        is_booked: false
      },
      {
        name: "A11",
        is_booked: false
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('rooms', null, {});
  }
};

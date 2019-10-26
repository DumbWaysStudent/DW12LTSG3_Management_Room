'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('customers', [{
      name: "Kawn lama",
      id_card: "3021221223",
      phone_number: "089535761232",
      image: null
    },
    {
      name: "Kawn lama kali",
      id_card: "3021221223",
      phone_number: "08953574542",
      image: null
    },
    {
      name: "Kawn lama amat",
      id_card: "3021221223",
      phone_number: "089532321232",
      image: null
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers', null, {});
  }
};

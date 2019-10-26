'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
        {
        name: 'John Doe',
        email: 'Jonh@gmail.com',
        password: '12345',
        image: 'http://getdrawings.com/free-icon-bw/avatar-icon-23.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John Doe Again',
        email: 'JonhAgain@gmail.com',
        password: '12345',
        image: 'http://getdrawings.com/free-icon-bw/avatar-icon-23.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};

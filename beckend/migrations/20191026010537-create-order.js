'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'rooms',
          key: 'id'
      }
      },
      customer_id: {
        type: Sequelize.INTEGER,
      },
      is_done: {
        type: Sequelize.BOOLEAN
      },
      duration: {
        type: Sequelize.INTEGER
      },
      order_end_time: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};
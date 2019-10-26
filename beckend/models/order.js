'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    room_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    is_done: DataTypes.BOOLEAN,
    is_booked: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
    order_end_time: DataTypes.DATE
  }, {});
  order.associate = function (models) {
    order.hasMany(models.room, {
      foreignKey: 'room_id',
      as: 'room'
    })
  }
  models.room.belongsTo(order,{
    foreignKey: 'id'
  })
  order.hasMany(models.customer, {
    foreignKey: 'customer_id',
    as: 'customer'
  })
  models.customer.belongsTo(order,{
    foreignKey: 'id'
  })
  return order;
};
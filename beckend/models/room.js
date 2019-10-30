'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    name: DataTypes.STRING,
    is_booked: DataTypes.BOOLEAN
  }, {});

  room.associate = function (models) {
    // associations can be defined here
    room.hasMany(models.order,
      { foreignKey: 'room_id' }
    )
  };
  return room;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    name: DataTypes.STRING
  }, {});

  room.associate = function (models) {
    // associations can be defined here
    room.hasMany(models.order,
      { foreignKey: 'room_id' }
    )
    room.hasMany(models.customer,
      { foreignKey: 'id' }
    )
  };
  return room;
};
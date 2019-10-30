"use strict";
const withDateNoTz = require("sequelize-date-no-tz-postgres");
module.exports = (sequelize, SequelizeDataTypes) => {
  const DataTypes = withDateNoTz(SequelizeDataTypes);

  var TripOrder = sequelize.define(
    "TripOrder",
    {
      trip_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      cost: DataTypes.FLOAT
    },
    {
      tableName: "trip_order"
    }
  );

  TripOrder.associate = function(models) {
    models.TripOrder.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id"
    });

    models.TripOrder.belongsTo(models.Tour, {
      foreignKey: "trip_id",
      targetKey: "id"
    });
  };

  return TripOrder;
};

"use strict";
const withDateNoTz = require("sequelize-date-no-tz-postgres");
module.exports = (sequelize, SequelizeDataTypes) => {
  const DataTypes = withDateNoTz(SequelizeDataTypes);

  var TripOffers = sequelize.define(
    "TripOffers",
    {
      trip_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      estimation_cost: DataTypes.FLOAT
    },
    {
      tableName: "trip_offers"
    }
  );

  TripOffers.associate = function(models) {
    models.TripOffers.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id"
    });

    models.TripOffers.belongsTo(models.Tour, {
      foreignKey: "trip_id",
      targetKey: "id"
    });
  };

  return TripOffers;
};

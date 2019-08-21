"use strict";
const withDateNoTz = require("sequelize-date-no-tz-postgres");
module.exports = (sequelize, SequelizeDataTypes) => {
  const DataTypes = withDateNoTz(SequelizeDataTypes);

  var TourAttraction = sequelize.define(
    "TourAttraction",
    {
      tour_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      attraction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      date_from: {
        type: DataTypes.DATE,
        primaryKey: true
      },
      date_to: {
        type: DataTypes.DATE,
        primaryKey: true
      }
    },
    {
      tableName: "tours_attraction"
    }
  );

  TourAttraction.associate = function(models) {
    models.TourAttraction.belongsTo(models.Tour, {
      foreignKey: "tour_id",
      targetKey: "id"
    });
  };

  return Tour;
};

"use strict";
const withDateNoTz = require("sequelize-date-no-tz-postgres");
module.exports = (sequelize, SequelizeDataTypes) => {
  const DataTypes = withDateNoTz(SequelizeDataTypes);

  var Location = sequelize.define(
    "Location",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_city: {
        type: DataTypes.INTEGER
      },
      street: {
        type: DataTypes.STRING
      },
      house_number: DataTypes.STRING,
      lat: DataTypes.DOUBLE,
      lng: DataTypes.DOUBLE
    },
    {
      tableName: "location"
    }
  );

  Location.associate = function(models) {};

  return Location;
};

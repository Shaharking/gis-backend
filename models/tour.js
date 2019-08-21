"use strict";
const withDateNoTz = require("sequelize-date-no-tz-postgres");
module.exports = (sequelize, SequelizeDataTypes) => {
  const DataTypes = withDateNoTz(SequelizeDataTypes);

  var Tour = sequelize.define(
    "Tour",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      date_from: DataTypes.DATEONLY,
      date_to: DataTypes.DATEONLY,
      creator_id: DataTypes.INTEGER
    },
    {
      tableName: "tours"
    }
  );

  Tour.associate = function(models) {
    models.Tour.belongsTo(models.User, {
      foreignKey: "creator_id",
      targetKey: "id"
    });
    models.Tour.hasMany(models.TourAttraction, {});
  };

  return Tour;
};

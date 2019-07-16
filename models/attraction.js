"use strict";
const withDateNoTz = require("sequelize-date-no-tz-postgres");
module.exports = (sequelize, SequelizeDataTypes) => {
  const DataTypes = withDateNoTz(SequelizeDataTypes);

  var Attraction = sequelize.define(
    "Attraction",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_category: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      main_pic: DataTypes.STRING,
      parking: DataTypes.BOOLEAN,
      opening_hours: DataTypes.DATE_NO_TZ,
      closing_hours: DataTypes.DATE_NO_TZ,
      icon: DataTypes.STRING,
      id_location: DataTypes.INTEGER
    },
    {
      tableName: "attraction"
    }
  );

  Attraction.associate = function(models) {
    console.log(models.Attraction.hasOne);
    models.Attraction.hasOne(models.Category, {
      foreignKey: "id",
      targetKey: "id_category"
    });

    models.Attraction.hasOne(models.Location, {
      foreignKey: "id",
      targetKey: "id_location"
    });
  };

  return Attraction;
};

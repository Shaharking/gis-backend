"use strict";
const withDateNoTz = require("sequelize-date-no-tz-postgres");
module.exports = (sequelize, SequelizeDataTypes) => {
  const DataTypes = withDateNoTz(SequelizeDataTypes);

  var User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING
      },
      phone_number: {
        type: DataTypes.STRING
      },
      user_type: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: "users"
    }
  );

  User.associate = function(models) {};

  return User;
};

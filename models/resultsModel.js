const sequelize = require("../configs/db");
const { DataTypes } = require("sequelize");
const User = require("./userModel");

const Result = sequelize.define("define", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  date: { type: DataTypes.STRING, allowNull: false },
  results: { type: DataTypes.STRING, allowNull: false },
  testLevel: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Result, { as: "user" });
Result.belongsTo(User, { as: "user" });

module.exports = Result;

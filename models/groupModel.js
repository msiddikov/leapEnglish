const sequelize = require("../configs/db");
const { DataTypes } = require("sequelize");
const User = require("./userModel");

const Group = sequelize.define("groups", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  testLevel: { type: DataTypes.STRING },
  link: { type: DataTypes.STRING },
});

Group.hasMany(User, { as: "group" });
User.belongsTo(Group, { as: "group" });

const queryInterface = sequelize.getQueryInterface();

queryInterface.changeColumn("groups", "link", { type: DataTypes.TEXT });

module.exports = Group;

const sequelize = require("../configs/db");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
  full_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;
});
module.exports = User;

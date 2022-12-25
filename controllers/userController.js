const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.findAll({ limit: 20 });
    res.status(200).json({
      isOk: true,
      data: users,
      message: "success",
    });
  } catch (error) {
    res.status(404).json({
      isOk: false,
      data: "",
      message: error.message,
    });
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const { full_name, email, password, role } = req.body;
    const user = await User.create({ full_name, email, password, role });
    res.status(200).json({
      isOk: true,
      data: user,
      message: "success",
    });
  } catch (error) {
    res.status(404).json({
      isOk: false,
      data: "",
      message: error.message,
    });
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.status(200).json({
      isOk: true,
      data: user,
      message: "success",
    });
  } catch (error) {
    res.status(404).json({
      isOk: false,
      data: "",
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      email,
      role,
      link,
      groupId,
      addition,
      testLevel,
      test,
      level,
    } = req.body;

    const user = await User.findByPk(id);
    user.full_name = full_name || user.full_name;
    user.email = email || user.email;
    user.link = link || user.link;
    user.groupId = groupId || user.groupId;
    user.testLevel = testLevel || user.testLevel;
    user.addition = addition || user.addition;
    user.test = test || user.test;
    test.level = level || user.level;

    if (role === "admin") {
      user.role = "admin";
      user.access = true;
    }

    await user.save();
    res
      .status(200)
      .json({ isOk: true, data: { user }, message: "user success updated" });
  } catch (error) {
    res.status(404).json({
      isOk: false,
      data: "",
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.status(200).json({
      isOk: true,
      data: {},
      message: "user success deleted",
    });
  } catch (error) {
    res.status(404).json({
      isOk: false,
      data: "",
      message: error.message,
    });
  }
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

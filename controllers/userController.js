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
    const user = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).json({
      isOk: true,
      data: { user: user[1] ? user[1][0] : {} },
      message: "user success updated",
    });
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

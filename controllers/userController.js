const User = require("../models/userModel");

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

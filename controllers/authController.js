const User = require("../models/userModel");

exports.signup = async (req, res, next) => {
  try {
    const { full_name, email, password } = req.body;
  } catch (error) {
    res.status(404).json({
      isOk: false,
      message: error.message,
      data: "",
    });
  }
};

exports.signin = async (req, res, next) => {
  try {
  } catch (error) {}
};

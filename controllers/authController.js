const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createJwt = (id) => {
  return jwt.sign({ id }, "leapengish_good", {
    expiresIn: "30d",
  });
};

exports.signup = async (req, res, next) => {
  try {
    const { full_name, email, password } = req.body;
    const user = await User.create({ full_name, email, password });
    const accessToken = createJwt(user.id);
    res.status(200).json({
      isOk: true,
      data: { user, accessToken },
      message: "Successfull signup",
    });
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
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Siz email va password kiritmadingiz");

    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Wrong Email or password");
    const check = bcrypt.compare(password, user.password);
    if (!check) throw new Error("Wrong Email or password");

    res.status(200).json({
      isOk: true,
      data: { user, accessToken },
      message: "Successfull login",
    });
  } catch (error) {
    res.status(404).json({
      isOk: false,
      message: error.message,
      data: "",
    });
  }
};

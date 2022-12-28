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
      data: {
        user: {
          full_name: user.full_name,
          email: user.email,
          createdAt: user.createdAt,
        },
        accessToken,
      },
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
    const check = await bcrypt.compare(password, user.password);
    if (!check) throw new Error("Wrong Email or password");
    if (!user.access) throw new Error("You are not accepted by admin");
    const accessToken = createJwt(user.id);
    res.status(200).json({
      isOk: true,
      data: {
        user: {
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          groupId: user.groupId,
          createdAt: user.createdAt,
        },
        accessToken,
      },
      message: "Successfull login",
    });
  } catch (error) {
    res.status(404).json({ isOk: false, message: error.message, data: "" });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.slice(7);
    } else {
      throw new Error("you are not authorizated");
    }

    if (!token) throw new Error("You not authorized");

    const tekshir = jwt.verify(token, "leapengish_good");
    if (!tekshir) throw new Error("Your token expired");

    const user = await User.findByPk(tekshir.id);
    if (!user) throw new Error("This user not exist");
    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({ isOk: false, data: "", message: error.message });
  }
};

exports.role = (roles) => {
  return async (req, res, next) => {
    try {
      // 1) User ni roleni olamiz databasedan, tekshiramiz
      if (!roles.includes(req.user.role)) {
        throw new Error("You don't access this process");
      }
      next();
    } catch (error) {
      res.status(404).json({ isOk: false, data: "", message: error.message });
    }
  };
};

exports.accessCheck = async (req, res, next) => {
  try {
    if (!req.user.access) throw new Error("You don't access this process");
    next();
  } catch (error) {
    res.status(404).json({ isOk: false, data: "", message: error.message });
  }
};

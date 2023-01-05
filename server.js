require("dotenv").config({});
const app = require("./middlewares/app");
const PORT = process.env.PORT || 8000;
const sequelize = require("./configs/db");
const User = require("./models/userModel");

sequelize.sync();

const createAdmin = async () => {
  try {
    await User.create({
      password: "Admin123.",
      role: "admin",
      email: "admin@admin.com",
      full_name: "Admin",
      access: true,
    });
  } catch (error) {
    return null;
  }
};

createAdmin();

app.listen(PORT, () => console.log(`Listening port: ${PORT}`));

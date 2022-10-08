require("dotenv").config({});
const app = require("./middlewares/app");
const PORT = process.env.PORT || 8000;
const sequelize = require("./configs/db");

sequelize.sync();

app.listen(PORT, () => console.log(`Listening port: ${PORT}`));

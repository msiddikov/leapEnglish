const express = require("express");
const app = express();
const userRouter = require("../routes/userRouter");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("This in englishleap api");
});
app.use("/api/v1/users", userRouter);

module.exports = app;

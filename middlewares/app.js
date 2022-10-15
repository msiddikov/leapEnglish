const express = require("express");
const app = express();
const userRouter = require("../routes/userRouter");
const groupRouter = require("../routes/groupRoutes");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("This in englishleap api");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/groups", groupRouter);

module.exports = app;

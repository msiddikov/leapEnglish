const express = require("express");
const app = express();
const userRouter = require("../routes/userRouter");
const groupRouter = require("../routes/groupRoutes");
const resultRouter = require("../routes/resultsRouter");
const videoRouter = require("../routes/videoRoutes");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("This in englishleap api");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/results", resultRouter);
app.use("/api/v1/video", videoRouter);
module.exports = app;

const router = require("express").Router();
const controller = require("../controllers/resultsController");
const auth = require("../controllers/authController");

router
  .route("/")
  .post(auth.protect, auth.role(["admin"]), controller.addResult)
  .get(auth.protect, controller.getResults);

module.exports = router;

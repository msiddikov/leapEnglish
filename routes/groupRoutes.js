const router = require("express").Router();
const controller = require("../controllers/groupController");
const auth = require("../controllers/authController");
router
  .route("/")
  .get(auth.protect, auth.role(["admin"]), controller.getAllGroup)
  .post(auth.protect, auth.role(["admin"]), controller.addGroup);

router
  .route("/:id")
  .get(auth.protect, auth.role(["admin"]), controller.getOneGroup)
  .patch(auth.protect, auth.role(["admin"]), controller.updateGroup)
  .delete(auth.protect, auth.role(["admin"]), controller.deleteGroup);

module.exports = router;

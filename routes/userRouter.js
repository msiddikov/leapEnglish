const controller = require("../controllers/userController");
const router = require("express").Router();
const authController = require("../controllers/authController");

router.route("/signin").post(authController.signin);
router.route("/signup").post(authController.signup);

router
  .route("/")
  .get(
    authController.protect,
    authController.role(["admin"]),
    controller.getAllUser
  )
  .post(
    authController.protect,
    authController.role(["admin"]),
    controller.addUser
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.role(["admin"]),
    controller.getOneUser
  )
  .patch(
    authController.protect,
    authController.role(["admin"]),
    controller.updateUser
  )
  .delete(
    authController.protect,
    authController.role(["admin"]),
    controller.deleteUser
  );

module.exports = router;

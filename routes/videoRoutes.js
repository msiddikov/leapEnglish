const controller = require("../controllers/videoController");

const router = require("express").Router();

router.route("/:videoId").post(controller.getVideo);

module.exports = router;

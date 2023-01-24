const controller = require("../controllers/videoController");
const router = require("express").Router();

router.route("/:videoId").get(controller.getVideo);

module.exports = router;

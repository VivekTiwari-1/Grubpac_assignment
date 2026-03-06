const router = require("express").Router();
const roomController = require("../controllers/room.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", roomController.getAllRooms);
router.get("/:id", roomController.getRoomById);
router.get("/:id/availability", protect, roomController.checkAvailability);

module.exports = router;

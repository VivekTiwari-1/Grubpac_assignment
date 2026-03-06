const router = require("express").Router();
const roomController = require("../controllers/room.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", roomController.getAllRooms); // public
router.get("/:id", roomController.getRoomById); // public
router.get("/:id/availability", protect, roomController.checkAvailability); // protected

module.exports = router;

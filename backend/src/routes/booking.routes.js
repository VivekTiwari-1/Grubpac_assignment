const router = require("express").Router();
const bookingController = require("../controllers/booking.controller");
const { protect } = require("../middleware/auth.middleware");

// All booking routes are protected
router.use(protect);

router.post("/", bookingController.createBooking);
router.get("/my", bookingController.getUserBookings);
router.get("/:id", bookingController.getBookingById);

module.exports = router;

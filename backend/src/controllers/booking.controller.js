const bookingService = require("../services/booking.service");

const createBooking = async (req, res, next) => {
  try {
    const { roomId, startDate, endDate } = req.body;
    const userId = req.user.id; // from auth middleware

    // Input validation
    if (!roomId || !startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "roomId, startDate and endDate are required" });
    }
    if (new Date(startDate) >= new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "endDate must be after startDate" });
    }
    if (new Date(startDate) < new Date().setHours(0, 0, 0, 0)) {
      return res
        .status(400)
        .json({ message: "startDate cannot be in the past" });
    }

    const booking = await bookingService.createBooking({
      userId,
      roomId,
      startDate,
      endDate,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (err) {
    next(err);
  }
};

const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getUserBookings(req.user.id);
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingById(
      req.params.id,
      req.user.id,
    );
    res.json({ booking });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, getUserBookings, getBookingById };

const roomService = require("../services/room.service");

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json({ rooms });
  } catch (err) {
    next(err);
  }
};

const getRoomById = async (req, res, next) => {
  try {
    const room = await roomService.getRoomById(req.params.id);
    res.json({ room });
  } catch (err) {
    next(err);
  }
};

const checkAvailability = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const { id: roomId } = req.params;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "startDate and endDate are required" });
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

    const isAvailable = await roomService.checkAvailability(
      roomId,
      startDate,
      endDate,
    );
    res.json({ available: isAvailable, roomId, startDate, endDate });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllRooms, getRoomById, checkAvailability };

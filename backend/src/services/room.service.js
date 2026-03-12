const pool = require("../config/db");

const getAllRooms = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM rooms ORDER BY created_at DESC",
  );
  return rows;
};

const getRoomById = async (roomId) => {
  const [rows] = await pool.query("SELECT * FROM rooms WHERE id = ?", [roomId]);

  if (!rows[0]) {
    const error = new Error("Room not found");
    error.statusCode = 404;
    throw error;
  }

  return rows[0];
};

const checkAvailability = async (roomId, startDate, endDate) => {
  const [rows] = await pool.query(
    `SELECT id FROM bookings
     WHERE room_id = ?
       AND start_date < ?
       AND end_date > ?`,
    [roomId, endDate, startDate],
  );

  return rows.length === 0; // true = available, false = booked
};

module.exports = { getAllRooms, getRoomById, checkAvailability };

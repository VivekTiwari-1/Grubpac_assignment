const pool = require("../config/db");
const { checkAvailability } = require("../services/room.service");

const createBooking = async ({ userId, roomId, startDate, endDate }) => {
  // dedicated connection from pool for the transaction
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Lock the room row so no concurrent booking can access
    const [rooms] = await connection.query(
      "SELECT * FROM rooms WHERE id = ? FOR UPDATE",
      [roomId],
    );

    if (!rooms[0]) {
      const error = new Error("Room not found");
      error.statusCode = 404;
      throw error;
    }

    // 2. Re-check availability inside the transaction
    if (!checkAvailability()) {
      const error = new Error("Room is not available for the selected dates");
      error.statusCode = 409;
      throw error;
    }

    // 3. Calculate total price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = (nights * parseFloat(rooms[0].price_per_night)).toFixed(
      2,
    );

    // 4. Insert booking
    const [result] = await connection.query(
      `INSERT INTO bookings (user_id, room_id, start_date, end_date, total_price)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, roomId, startDate, endDate, totalPrice],
    );

    await connection.commit();

    return {
      id: result.insertId,
      userId,
      roomId,
      startDate,
      endDate,
      totalPrice,
      nights,
      roomName: rooms[0].name,
    };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

const getUserBookings = async (userId) => {
  const [rows] = await pool.query(
    `SELECT 
       b.id,
       b.start_date,
       b.end_date,
       b.total_price,
       b.created_at,
       r.id AS room_id,
       r.name AS room_name,
       r.price_per_night,
       r.image_url
     FROM bookings b
     JOIN rooms r ON b.room_id = r.id
     WHERE b.user_id = ?
     ORDER BY b.created_at DESC`,
    [userId],
  );
  return rows;
};

const getBookingById = async (bookingId, userId) => {
  const [rows] = await pool.query(
    `SELECT 
       b.*,
       r.name AS room_name,
       r.price_per_night,
       r.image_url
     FROM bookings b
     JOIN rooms r ON b.room_id = r.id
     WHERE b.id = ? AND b.user_id = ?`,
    [bookingId, userId],
  );

  if (!rows[0]) {
    const error = new Error("Booking not found");
    error.statusCode = 404;
    throw error;
  }

  return rows[0];
};

module.exports = { createBooking, getUserBookings, getBookingById };

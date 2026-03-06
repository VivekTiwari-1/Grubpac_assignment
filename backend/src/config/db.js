// backend/src/config/db.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // max simultaneous connections from pool
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false, // required for Railway's remote connection
  },
});

// Test connection on startup
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL connected successfully");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
    process.exit(1); // crash loudly if DB is unreachable
  }
};

testConnection();

module.exports = pool;

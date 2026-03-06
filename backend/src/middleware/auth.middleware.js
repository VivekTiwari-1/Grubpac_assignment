const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No access token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [rows] = await pool.query(
      "SELECT id, name, email FROM users WHERE id = ?",
      [decoded.userId],
    );

    if (!rows[0]) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = rows[0]; // attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid access token" });
  }
};

module.exports = { protect };

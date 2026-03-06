const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error.middleware");
const authRoutes = require("./routes/auth.routes");
const roomRoutes = require("./routes/room.routes");
const bookingRoutes = require("./routes/booking.routes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorMiddleware);

module.exports = app;

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  if (process.env.NODE_ENV === "development") {
    console.error(`[${req.method}] ${req.path} → ${statusCode}: ${message}`);
  }

  res.status(statusCode).json({ message });
};

module.exports = errorMiddleware;

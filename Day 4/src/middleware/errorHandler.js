/**
 * 404 Not Found Middleware for unhandled routes
 */
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: "Route Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
};

/**
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err.stack || err.message || err);

  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.name || "Internal Server Error",
    message: err.message || "An unexpected error occurred on the server."
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};

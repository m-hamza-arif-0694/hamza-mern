/**
 * 404 Not Found Middleware for unknown routes
 */
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Route Not Found',
    message: `The requested endpoint '${req.originalUrl}' does not exist on this server.`
  });
};

/**
 * Global 500 Error Handling Middleware
 * Handles Mongoose CastError, ValidationError, and unexpected internal errors cleanly
 */
const errorHandler = (err, req, res, next) => {
  console.error(`💥 Error: ${err.message}`, err.stack);

  // Mongoose Bad ObjectId CastError
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID',
      message: `Invalid format for resource ID: '${err.value}'.`
    });
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: messages
    });
  }

  // Mongoose Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate Key Error',
      message: 'A resource with this key already exists.'
    });
  }

  // Default Internal Server Error (500)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message || 'An unexpected internal error occurred on the server.'
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Route Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}. Route does not exist.`
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(`💥 Error: ${err.message}`);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let errorType = err.name || 'ServerError';

  if (err.code === 11000) {
    statusCode = 400;
    errorType = 'Duplicate Error';
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `An account with this ${field} already exists.`;
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorType = 'Validation Error';
    message = Object.values(err.errors).map((val) => val.message).join(', ');
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    errorType = 'Unauthorized';
    message = 'Invalid authentication token signature.';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    errorType = 'Unauthorized';
    message = 'Authentication token has expired. Please log in again.';
  }

  res.status(statusCode).json({
    success: false,
    error: errorType,
    message: message
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authentication Middleware: Protects endpoints by verifying JWT Bearer tokens
 */
const protect = async (req, res, next) => {
  let token;

  // Check for Authorization header formatted as 'Bearer <TOKEN>'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Access denied. Authorization Bearer token is missing.'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'hisabdo_jwt_secret_key_day6_2026_secure'
    );

    // Fetch user profile associated with token payload
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'The user belonging to this token no longer exists.'
      });
    }

    // Attach authenticated user profile to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or expired JWT token. Please log in again.'
    });
  }
};

/**
 * Role Authorization Middleware: Restricts access to specific user roles (e.g. admin)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: `User role '${req.user ? req.user.role : 'none'}' is not authorized to access this route.`
      });
    }
    next();
  };
};

module.exports = {
  protect,
  authorize
};

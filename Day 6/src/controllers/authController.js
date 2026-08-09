const User = require('../models/User');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if email already exists in database
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate Error',
        message: 'An account with this email address already exists.'
      });
    }

    // Create new user (password is automatically hashed in User schema pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      role: role && ['user', 'admin'].includes(role) ? role : 'user'
    });

    // Generate JWT token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user & return JWT token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Fetch user profile and explicitly include password field for verification
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid credentials. User email not found.'
      });
    }

    // Verify candidate password against hashed password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid credentials. Password incorrect.'
      });
    }

    // Generate JWT token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      message: 'User login successful.',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/auth/me
 * @access  Private (Protected by JWT)
 */
const getMe = async (req, res, next) => {
  try {
    // req.user is set by the auth protection middleware
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};

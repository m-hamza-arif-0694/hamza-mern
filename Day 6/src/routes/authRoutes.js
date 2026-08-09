const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const {
  validateRegisterInput,
  validateLoginInput
} = require('../middleware/validation');

// Public Authentication Routes
router.post('/register', validateRegisterInput, registerUser);
router.post('/login', validateLoginInput, loginUser);

// Protected Authentication Route
router.get('/me', protect, getMe);

module.exports = router;

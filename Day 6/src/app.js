const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Base Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Authentication System REST API — HisabDo MERN Internship (Day 6)',
    security: 'JWT + bcryptjs Password Hashing',
    endpoints: {
      registerUser: 'POST /api/auth/register',
      loginUser: 'POST /api/auth/login',
      getProfile: 'GET /api/auth/me (Protected)'
    }
  });
});

// Authentication API Routes (Mounted at both /api/auth and /auth for convenience)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

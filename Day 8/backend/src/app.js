const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to HisabDo Capstone REST API Backend — HisabDo MERN / Next.js Track (Day 8)',
    status: 'Active',
    endpoints: {
      authRegister: 'POST /api/auth/register',
      authLogin: 'POST /api/auth/login',
      authMe: 'GET /api/auth/me (Protected)'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

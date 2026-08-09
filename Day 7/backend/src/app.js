const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Full-Stack Student Management REST API — HisabDo MERN Internship (Day 7)',
    security: 'JWT Authentication & Protected Student Routes',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        getMe: 'GET /api/auth/me (Protected)'
      },
      students: {
        getAllStudents: 'GET /api/students (Protected)',
        getStudentById: 'GET /api/students/:id (Protected)',
        createStudent: 'POST /api/students (Protected)',
        updateStudent: 'PUT /api/students/:id (Protected)',
        deleteStudent: 'DELETE /api/students/:id (Protected)'
      }
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Fallback aliases for direct /auth and /students routes
app.use('/auth', authRoutes);
app.use('/students', studentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

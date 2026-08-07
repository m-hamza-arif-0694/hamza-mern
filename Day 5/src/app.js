const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Base Route / Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Student Management REST API — HisabDo MERN Internship (Day 5)',
    database: 'MongoDB + Mongoose',
    endpoints: {
      getAllStudents: 'GET /students',
      getStudentById: 'GET /students/:id',
      createStudent: 'POST /students',
      updateStudent: 'PUT /students/:id',
      deleteStudent: 'DELETE /students/:id'
    }
  });
});

// API Routes
app.use('/students', studentRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middleware configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome / Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to HisabDo Student Management REST API - Day 4",
    endpoints: {
      getAllStudents: "GET /students",
      getStudentById: "GET /students/:id",
      createStudent: "POST /students",
      updateStudent: "PUT /students/:id",
      deleteStudent: "DELETE /students/:id"
    }
  });
});

// Mount student routes (both /students and /api/students for convenience)
app.use("/students", studentRoutes);
app.use("/api/students", studentRoutes);

// Fallback & Error middleware
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

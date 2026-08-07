const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');
const {
  validateObjectId,
  validateStudentInput
} = require('../middleware/validation');

// Route: /students
router
  .route('/')
  .get(getAllStudents)
  .post(validateStudentInput, createStudent);

// Route: /students/:id
router
  .route('/:id')
  .get(validateObjectId, getStudentById)
  .put(validateObjectId, validateStudentInput, updateStudent)
  .delete(validateObjectId, deleteStudent);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');
const { protect } = require('../middleware/auth');
const { validateObjectId, validateStudentInput } = require('../middleware/validation');

// Protect all student management routes with JWT Auth
router.use(protect);

router.route('/')
  .get(getAllStudents)
  .post(validateStudentInput, createStudent);

router.route('/:id')
  .get(validateObjectId, getStudentById)
  .put(validateObjectId, updateStudent)
  .delete(validateObjectId, deleteStudent);

module.exports = router;

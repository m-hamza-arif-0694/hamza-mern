const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
} = require("../data/studentsData");

const {
  validateIdParam,
  validateCreateStudent,
  validateUpdateStudent
} = require("../middleware/validation");

/**
 * @route   GET /students
 * @desc    Get all students
 * @access  Public
 */
router.get("/", (req, res) => {
  const students = getAllStudents();
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

/**
 * @route   GET /students/:id
 * @desc    Get single student by ID
 * @access  Public
 */
router.get("/:id", validateIdParam, (req, res) => {
  const id = req.parsedId;
  const student = getStudentById(id);

  if (!student) {
    return res.status(404).json({
      success: false,
      error: "Not Found",
      message: `Student with ID ${id} was not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

/**
 * @route   POST /students
 * @desc    Create a new student
 * @access  Public
 */
router.post("/", validateCreateStudent, (req, res) => {
  const newStudent = addStudent(req.body);
  res.status(201).json({
    success: true,
    message: "Student record created successfully.",
    data: newStudent
  });
});

/**
 * @route   PUT /students/:id
 * @desc    Update student by ID
 * @access  Public
 */
router.put("/:id", validateIdParam, validateUpdateStudent, (req, res) => {
  const id = req.parsedId;
  const updatedStudent = updateStudent(id, req.body);

  if (!updatedStudent) {
    return res.status(404).json({
      success: false,
      error: "Not Found",
      message: `Student with ID ${id} was not found.`
    });
  }

  res.status(200).json({
    success: true,
    message: "Student record updated successfully.",
    data: updatedStudent
  });
});

/**
 * @route   DELETE /students/:id
 * @desc    Delete student by ID
 * @access  Public
 */
router.delete("/:id", validateIdParam, (req, res) => {
  const id = req.parsedId;
  const deletedStudent = deleteStudent(id);

  if (!deletedStudent) {
    return res.status(404).json({
      success: false,
      error: "Not Found",
      message: `Student with ID ${id} was not found.`
    });
  }

  res.status(200).json({
    success: true,
    message: `Student with ID ${id} deleted successfully.`,
    data: deletedStudent
  });
});

module.exports = router;

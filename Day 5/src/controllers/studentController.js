const Student = require('../models/Student');

/**
 * @desc    Get all students
 * @route   GET /students
 * @access  Public
 */
const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single student by ID
 * @route   GET /students/:id
 * @access  Public
 */
const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Student with ID '${req.params.id}' was not found.`
      });
    }
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new student
 * @route   POST /students
 * @access  Public
 */
const createStudent = async (req, res, next) => {
  try {
    const { name, email, course, marks } = req.body;
    const student = await Student.create({
      name,
      email,
      course,
      marks
    });

    res.status(201).json({
      success: true,
      message: 'Student record created successfully.',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing student by ID
 * @route   PUT /students/:id
 * @access  Public
 */
const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Cannot update. Student with ID '${req.params.id}' was not found.`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student record updated successfully.',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete student record by ID
 * @route   DELETE /students/:id
 * @access  Public
 */
const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Cannot delete. Student with ID '${req.params.id}' was not found.`
      });
    }

    res.status(200).json({
      success: true,
      message: `Student with ID '${req.params.id}' deleted successfully.`,
      data: student
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};

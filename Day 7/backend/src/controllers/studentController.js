const Student = require('../models/Student');

const getAllStudents = async (req, res, next) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query = {
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { course: searchRegex }
        ]
      };
    }

    const students = await Student.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    next(error);
  }
};

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

const createStudent = async (req, res, next) => {
  try {
    const { name, email, course, marks } = req.body;
    const student = await Student.create({
      name,
      email,
      course,
      marks: Number(marks)
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

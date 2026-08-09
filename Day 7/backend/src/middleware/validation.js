const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID',
      message: `Invalid MongoDB ObjectId format: '${id}'. Must be a 24-character hex string.`
    });
  }
  next();
};

const validateStudentInput = (req, res, next) => {
  const { name, email, course, marks } = req.body || {};
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Student name is required' });
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Student email is required' });
  } else if (!emailRegex.test(email.trim())) {
    errors.push({ field: 'email', message: 'Valid email address is required' });
  }

  if (!course || typeof course !== 'string' || course.trim().length === 0) {
    errors.push({ field: 'course', message: 'Course is required' });
  }

  if (marks === undefined || marks === null || isNaN(Number(marks))) {
    errors.push({ field: 'marks', message: 'Numeric marks are required' });
  } else {
    const numMarks = Number(marks);
    if (numMarks < 0 || numMarks > 100) {
      errors.push({ field: 'marks', message: 'Marks must be between 0 and 100' });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Invalid student input data provided.',
      details: errors
    });
  }

  next();
};

const validateRegisterInput = (req, res, next) => {
  const { name, email, password } = req.body || {};
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!emailRegex.test(email.trim())) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Invalid registration input.',
      details: errors
    });
  }

  next();
};

const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body || {};
  const errors = [];

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Email is required' });
  }
  if (!password || typeof password !== 'string' || password.length === 0) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Please provide email and password.',
      details: errors
    });
  }

  next();
};

module.exports = {
  validateObjectId,
  validateStudentInput,
  validateRegisterInput,
  validateLoginInput
};

const mongoose = require('mongoose');

/**
 * Middleware to validate MongoDB ObjectId URL parameter
 */
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

/**
 * Middleware to validate Student request body for POST / PUT operations
 */
const validateStudentInput = (req, res, next) => {
  const isPost = req.method === 'POST';
  const { name, email, course, marks } = req.body;
  const errors = [];

  // For POST, fields are strictly required
  if (isPost) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      errors.push('Name is required and must be a non-empty string.');
    }
    if (!email || typeof email !== 'string' || email.trim() === '') {
      errors.push('Email is required and must be a valid email string.');
    }
    if (!course || typeof course !== 'string' || course.trim() === '') {
      errors.push('Course is required and must be a non-empty string.');
    }
    if (marks === undefined || marks === null || typeof marks !== 'number') {
      errors.push('Marks are required and must be a valid number.');
    }
  } else {
    // For PUT, if fields are provided, validate their format
    if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
      errors.push('Name must be a non-empty string.');
    }
    if (email !== undefined && (typeof email !== 'string' || email.trim() === '')) {
      errors.push('Email must be a non-empty string.');
    }
    if (course !== undefined && (typeof course !== 'string' || course.trim() === '')) {
      errors.push('Course must be a non-empty string.');
    }
    if (marks !== undefined && (typeof marks !== 'number' || isNaN(marks))) {
      errors.push('Marks must be a valid number.');
    }
  }

  // Common email format check if email is provided
  if (email && typeof email === 'string') {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('A valid email address is required (e.g., student@example.com).');
    }
  }

  // Common marks range check if marks is provided
  if (marks !== undefined && typeof marks === 'number' && !isNaN(marks)) {
    if (marks < 0 || marks > 100) {
      errors.push('Marks must be a number between 0 and 100.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: errors
    });
  }

  next();
};

module.exports = {
  validateObjectId,
  validateStudentInput
};

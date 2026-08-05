/**
 * Middleware to validate student ID parameter
 */
const validateIdParam = (req, res, next) => {
  const { id } = req.params;
  const parsedId = Number(id);

  if (isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid Student ID",
      message: "Student ID must be a positive integer."
    });
  }

  req.parsedId = parsedId;
  next();
};

/**
 * Basic email format regex validator
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === "string" && emailRegex.test(email.trim());
};

/**
 * Middleware to validate POST request body for creating a student
 */
const validateCreateStudent = (req, res, next) => {
  const { name, email, course, marks } = req.body || {};
  const errors = [];

  // Validate Name
  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("Name is required and must be a non-empty string.");
  }

  // Validate Email
  if (!email || !isValidEmail(email)) {
    errors.push("A valid email address is required.");
  }

  // Validate Course
  if (!course || typeof course !== "string" || course.trim() === "") {
    errors.push("Course is required and must be a non-empty string.");
  }

  // Validate Marks
  if (marks === undefined || marks === null || isNaN(Number(marks))) {
    errors.push("Marks are required and must be a valid number.");
  } else {
    const numericMarks = Number(marks);
    if (numericMarks < 0 || numericMarks > 100) {
      errors.push("Marks must be between 0 and 100.");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      details: errors
    });
  }

  next();
};

/**
 * Middleware to validate PUT request body for updating a student
 */
const validateUpdateStudent = (req, res, next) => {
  const { name, email, course, marks } = req.body || {};
  const errors = [];

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      message: "Request body cannot be empty. Please provide fields to update."
    });
  }

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      errors.push("Name must be a non-empty string.");
    }
  }

  if (email !== undefined) {
    if (!isValidEmail(email)) {
      errors.push("Email must be a valid email address.");
    }
  }

  if (course !== undefined) {
    if (typeof course !== "string" || course.trim() === "") {
      errors.push("Course must be a non-empty string.");
    }
  }

  if (marks !== undefined) {
    if (isNaN(Number(marks))) {
      errors.push("Marks must be a valid number.");
    } else {
      const numericMarks = Number(marks);
      if (numericMarks < 0 || numericMarks > 100) {
        errors.push("Marks must be between 0 and 100.");
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      details: errors
    });
  }

  next();
};

module.exports = {
  validateIdParam,
  validateCreateStudent,
  validateUpdateStudent
};

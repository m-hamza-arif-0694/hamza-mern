// Initial in-memory student database
let students = [
  {
    id: 1,
    name: "Muhammad Ali",
    email: "ali@example.com",
    course: "Computer Science",
    marks: 88
  },
  {
    id: 2,
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    course: "Software Engineering",
    marks: 94
  },
  {
    id: 3,
    name: "Hamza Arif",
    email: "hamza@example.com",
    course: "Information Technology",
    marks: 91
  },
  {
    id: 4,
    name: "Sara Ahmed",
    email: "sara@example.com",
    course: "Computer Science",
    marks: 76
  },
  {
    id: 5,
    name: "Bilal Hassan",
    email: "bilal@example.com",
    course: "Data Science",
    marks: 83
  }
];

let nextId = 6;

/**
 * Get all students
 * @returns {Array} Array of all student objects
 */
const getAllStudents = () => {
  return [...students];
};

/**
 * Get student by ID
 * @param {number} id 
 * @returns {Object|null} Student object or null if not found
 */
const getStudentById = (id) => {
  const student = students.find((s) => s.id === id);
  return student ? { ...student } : null;
};

/**
 * Add a new student
 * @param {Object} data - { name, email, course, marks }
 * @returns {Object} Newly created student object
 */
const addStudent = (data) => {
  const newStudent = {
    id: nextId++,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    course: data.course.trim(),
    marks: Number(data.marks)
  };
  students.push(newStudent);
  return { ...newStudent };
};

/**
 * Update an existing student by ID
 * @param {number} id 
 * @param {Object} updates - Updated properties
 * @returns {Object|null} Updated student object or null if student not found
 */
const updateStudent = (id, updates) => {
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return null;

  const existing = students[index];
  const updatedStudent = {
    ...existing,
    ...(updates.name !== undefined && { name: updates.name.trim() }),
    ...(updates.email !== undefined && { email: updates.email.trim().toLowerCase() }),
    ...(updates.course !== undefined && { course: updates.course.trim() }),
    ...(updates.marks !== undefined && { marks: Number(updates.marks) })
  };

  students[index] = updatedStudent;
  return { ...updatedStudent };
};

/**
 * Delete a student by ID
 * @param {number} id 
 * @returns {Object|null} Deleted student object or null if not found
 */
const deleteStudent = (id) => {
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return null;

  const [deleted] = students.splice(index, 1);
  return deleted;
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
};

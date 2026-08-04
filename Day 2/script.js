/**
 * HisabDo Internship Bootcamp – Day 2 Task
 * Student Management System using Pure Vanilla JavaScript
 */

// Initial Student Data Array of Objects
let students = [
  { id: "STU-101", name: "Muhammad Hamza", email: "hamza.arif@example.com", course: "Software Engineering", marks: 95 },
  { id: "STU-102", name: "Ayesha Khan", email: "ayesha.k@example.com", course: "Computer Science", marks: 88 },
  { id: "STU-103", name: "Ali Raza", email: "ali.raza@example.com", course: "Artificial Intelligence", marks: 76 },
  { id: "STU-104", name: "Sara Ahmed", email: "sara.a@example.com", course: "Web Development", marks: 42 },
  { id: "STU-105", name: "Zain Malik", email: "zain.m@example.com", course: "Data Science", marks: 84 }
];

// Next student ID tracker
let nextIdNumber = 106;

// DOM Elements
const studentGrid = document.getElementById('studentGrid');
const emptyState = document.getElementById('emptyState');
const addStudentForm = document.getElementById('addStudentForm');
const searchInput = document.getElementById('searchInput');
const filterMarksSelect = document.getElementById('filterMarks');

// Stats DOM Elements
const totalStudentsCountEl = document.getElementById('totalStudentsCount');
const avgMarksValueEl = document.getElementById('avgMarksValue');
const topScoreValueEl = document.getElementById('topScoreValue');

/**
 * 1. Render Student Cards in the DOM
 * @param {Array} listToRender - Array of student objects to render
 */
function renderStudents(listToRender) {
  // Clear existing cards
  studentGrid.innerHTML = '';

  if (listToRender.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  // Loop through students and create HTML cards using DOM manipulation
  listToRender.forEach(student => {
    // Determine status class and label based on marks
    let statusClass = 'status-pass';
    let statusLabel = 'Pass';
    if (student.marks >= 80) {
      statusClass = 'status-distinction';
      statusLabel = 'Distinction';
    } else if (student.marks < 50) {
      statusClass = 'status-fail';
      statusLabel = 'At Risk';
    }

    const card = document.createElement('div');
    card.className = `student-card ${statusClass}`;
    card.innerHTML = `
      <div>
        <div class="card-top">
          <span class="student-id">${student.id}</span>
          <button class="delete-btn" onclick="deleteStudent('${student.id}')" title="Delete Student">✕</button>
        </div>
        <h4 class="student-name">${escapeHTML(student.name)}</h4>
        <p class="student-email">📧 ${escapeHTML(student.email)}</p>
        <span class="course-badge">${escapeHTML(student.course)}</span>
      </div>

      <div class="marks-container">
        <div class="marks-header">
          <span class="status-pill">${statusLabel}</span>
          <span class="marks-score">${student.marks} / 100</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${Math.min(student.marks, 100)}%;"></div>
        </div>
      </div>
    `;

    studentGrid.appendChild(card);
  });

  // Update top stats summary
  updateStats();
}

/**
 * 2. Add New Student Function
 * @param {Event} event - Form submit event
 */
function addStudent(event) {
  event.preventDefault();

  const nameInput = document.getElementById('studentName');
  const emailInput = document.getElementById('studentEmail');
  const courseInput = document.getElementById('studentCourse');
  const marksInput = document.getElementById('studentMarks');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const course = courseInput.value;
  const marks = parseInt(marksInput.value, 10);

  // Simple Form Validation
  let isValid = true;

  if (!name) {
    showError(nameInput, 'nameError');
    isValid = false;
  } else {
    clearError(nameInput, 'nameError');
  }

  if (!email || !validateEmail(email)) {
    showError(emailInput, 'emailError');
    isValid = false;
  } else {
    clearError(emailInput, 'emailError');
  }

  if (!course) {
    showError(courseInput, 'courseError');
    isValid = false;
  } else {
    clearError(courseInput, 'courseError');
  }

  if (isNaN(marks) || marks < 0 || marks > 100) {
    showError(marksInput, 'marksError');
    isValid = false;
  } else {
    clearError(marksInput, 'marksError');
  }

  if (!isValid) return;

  // Create new Student Object
  const newStudent = {
    id: `STU-${nextIdNumber++}`,
    name: name,
    email: email,
    course: course,
    marks: marks
  };

  // Add to main array
  students.push(newStudent);

  // Reset form
  addStudentForm.reset();

  // Re-apply filter and search view
  applyFilterAndSearch();
}

/**
 * 3. Delete Student by ID
 * @param {string} id - Student ID to remove
 */
function deleteStudent(id) {
  students = students.filter(student => student.id !== id);
  applyFilterAndSearch();
}

/**
 * 4. Apply Combined Search and Filter
 */
function applyFilterAndSearch() {
  const searchQuery = searchInput.value.trim().toLowerCase();
  const filterValue = filterMarksSelect.value;

  let filteredList = students.filter(student => {
    // Search matching name or email
    const matchesSearch = student.name.toLowerCase().includes(searchQuery) ||
                          student.email.toLowerCase().includes(searchQuery);

    // Filter matching marks criteria
    let matchesMarks = true;
    if (filterValue === '80') {
      matchesMarks = student.marks >= 80;
    } else if (filterValue === '50') {
      matchesMarks = student.marks >= 50;
    } else if (filterValue === 'below50') {
      matchesMarks = student.marks < 50;
    }

    return matchesSearch && matchesMarks;
  });

  renderStudents(filteredList);
}

/**
 * 5. Update Statistics Summary (Total, Avg Marks, Top Score)
 */
function updateStats() {
  totalStudentsCountEl.textContent = students.length;

  if (students.length === 0) {
    avgMarksValueEl.textContent = '0';
    topScoreValueEl.textContent = '0';
    return;
  }

  // Calculate Average Marks using reduce()
  const totalMarks = students.reduce((sum, student) => sum + student.marks, 0);
  const avg = (totalMarks / students.length).toFixed(1);
  avgMarksValueEl.textContent = avg;

  // Calculate Highest Score using Math.max & map()
  const highestScore = Math.max(...students.map(s => s.marks));
  topScoreValueEl.textContent = highestScore;
}

// Utility: Input Error Display Helpers
function showError(inputEl, errorId) {
  const group = inputEl.closest('.form-group');
  if (group) group.classList.add('has-error');
}

function clearError(inputEl, errorId) {
  const group = inputEl.closest('.form-group');
  if (group) group.classList.remove('has-error');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Event Listeners Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initial Render
  renderStudents(students);

  // Form Submit Listener
  addStudentForm.addEventListener('submit', addStudent);

  // Search Input Listener (Real-time filtering)
  searchInput.addEventListener('input', applyFilterAndSearch);

  // Filter Dropdown Listener
  filterMarksSelect.addEventListener('change', applyFilterAndSearch);
});

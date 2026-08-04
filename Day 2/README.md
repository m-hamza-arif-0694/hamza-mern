# 🎯 HisabDo Internship Bootcamp – Day 2: Student Management Web Page

Welcome to the **Day 2 Submission** for the HisabDo Internship Bootcamp (MERN Track). This folder contains a complete **Student Management System** built with pure Vanilla HTML5, CSS3, and JavaScript ES6+ without external frameworks or backend dependencies.

---

## 📚 Theoretical Learning Summary (Day 2 Fundamentals)

### 1. JavaScript Variables (`let` & `const`)
- **`const`**: Declares block-scoped variables that cannot be reassigned. Used for constants, function definitions, and array references.
- **`let`**: Declares block-scoped variables that can be reassigned. Used for dynamic variables like iteration counters and array filters.
- **`var`** *(Legacy)*: Function-scoped variable declaration. Avoided in modern JavaScript due to hoisting pitfalls.

---

### 2. Data Types & Structures
- **Primitives**: `String` ("Muhammad Hamza"), `Number` (95), `Boolean` (`true`/`false`), `Null`, `Undefined`.
- **Objects**: Key-value pair collection representing entities:
  ```javascript
  const student = {
    id: "STU-101",
    name: "Muhammad Hamza",
    email: "hamza@example.com",
    course: "Software Engineering",
    marks: 95
  };
  ```
- **Arrays**: Ordered list of elements used to store collections of objects:
  ```javascript
  let students = [student1, student2, student3];
  ```

---

### 3. Functions & Event Listeners
- **Standard Functions**: `function renderStudents(list) { ... }`
- **Arrow Functions**: `(student) => student.marks >= 50`
- **Event Handling**: Listening to user actions:
  ```javascript
  addStudentForm.addEventListener('submit', addStudent);
  searchInput.addEventListener('input', applyFilterAndSearch);
  ```

---

### 4. High-Order Array Methods
- **`Array.prototype.filter()`**: Returns a new array containing all elements that pass a test condition (used for searching & filtering by marks):
  ```javascript
  const passingStudents = students.filter(student => student.marks >= 50);
  ```
- **`Array.prototype.reduce()`**: Accumulates array values into a single summary value (used for calculating total/average marks):
  ```javascript
  const totalMarks = students.reduce((sum, s) => sum + s.marks, 0);
  const average = totalMarks / students.length;
  ```
- **`Array.prototype.map()`**: Transforms array elements into a new structure (used for calculating highest score via `Math.max(...students.map(s => s.marks))`).
- **`Array.prototype.forEach()`**: Iterates through elements to manipulate and render DOM elements.

---

### 5. Document Object Model (DOM) Manipulation
- **Selecting Elements**: `document.getElementById()`, `element.closest()`
- **Creating Elements**: `document.createElement('div')`
- **Updating Content & Attributes**: `element.innerHTML`, `element.className`, `element.appendChild()`

---

## 🛠️ Project Features

1. **Display All Students**: Dynamically renders student profile cards showing ID, Name, Email, Course, Marks, and Pass/Fail status pills.
2. **Add New Student**: Form validation for Name, Email, Course selection, and Marks (0–100) with auto-generated unique IDs (`STU-106+`).
3. **Real-time Name Search**: Live filter input that filters students by name or email as you type.
4. **Marks Filter**: Filter options for **Distinction (80+)**, **Passing (50+)**, and **At Risk (<50)**.
5. **Dynamic Statistics Bar**: Displays live **Total Students**, **Average Marks**, and **Highest Score** counters.
6. **Delete Student Record**: Action button to dynamically remove student records from the array and DOM.

---

## 💻 How to Run the Project

Since this project uses pure Vanilla HTML/CSS/JS, no Node.js or `npm` installation is required for Day 2!

1. Navigate to the `Day 2` directory:
   ```bash
   cd "Day 2"
   ```
2. Double-click or open `index.html` in any web browser (Chrome, Edge, Firefox, Safari), or launch with VS Code Live Server.

---

## 📤 Day 2 Submission Checklist

- [x] Create a new folder named `Day 2`
- [x] HTML structure built (`index.html`)
- [x] Vanilla CSS styling applied (`style.css`)
- [x] JavaScript functionality implemented (`script.js`)
- [x] Store data using JavaScript arrays and objects
- [x] Display all students dynamically
- [x] Add new student form with input validation
- [x] Search students by name in real-time
- [x] Filter students based on marks
- [x] Display total number of students and statistics
- [x] Code organized without frameworks (React, Node, Express, MongoDB)
- [x] Push repository to GitHub
- [x] Send repository link and code files to **`hisabdo.app@gmail.com`**

---

*Submitted for Day 2 – HisabDo Internship Bootcamp (MERN Track)* 🚀

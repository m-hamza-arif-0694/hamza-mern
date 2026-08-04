# 🎯 HisabDo Internship Bootcamp – Day 3: Student Management React App

Welcome to the **Day 3 Submission** for the HisabDo Internship Bootcamp (MERN Track). This directory contains a full-featured **Student Management Application** built using **React** and modern component-driven architecture.

---

## 📚 Theoretical Learning Summary (Day 3 React Core)

### 1. React Components & JSX
- **Components**: Reusable, self-contained building blocks of a React UI (e.g., `Header`, `AddStudentForm`, `StudentCard`).
- **JSX (JavaScript XML)**: Syntax extension allowing HTML-like markup inside JavaScript files.

---

### 2. Props (Properties)
- **Data Flow**: Uni-directional passing of data and event handler functions down from parent components to child components:
  ```jsx
  <StudentCard key={student.id} student={student} onDelete={handleDeleteStudent} />
  ```

---

### 3. State Management (`useState`)
- **Reactive State**: Preserves component data across renders and triggers automatic UI updates upon state mutation:
  ```jsx
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  ```

---

### 4. Controlled Form Inputs
- Synchronizes form `<input>` values directly with React state using `onChange` handlers:
  ```jsx
  <input type="text" value={formData.name} onChange={handleChange} />
  ```

---

### 5. Array `.map()` & Dynamic Rendering
- Iterates over arrays to render dynamic lists of JSX elements. Requires unique `key` props (`key={student.id}`) for efficient DOM reconciliation.

---

### 6. Conditional Rendering
- Dynamically renders UI elements based on state conditions (e.g., rendering `EmptyState` when filtered list is empty, or rendering status badges based on marks).

---

## 🚀 Application Features

1. **Display All Students**: Renders responsive student cards displaying ID, Name, Email, Course, Marks, and Pass/Fail status pills.
2. **Add New Student**: Form with validation for Name, Email, Course selection, and Marks (0–100) with auto-generated unique IDs (`STU-106+`).
3. **Real-time Name Search**: Controlled search input filtering student cards by name or email dynamically.
4. **Filter Students by Course**: Dropdown filter for filtering by specific courses (*Computer Science, Software Engineering, Web Development, AI, Data Science*).
5. **Delete Student**: Interactive delete button removing records from React state.
6. **Total Student Count & Stats**: Dynamically calculated header stats (Total Students, Average Marks, Highest Score).

---

## 💻 Setup & Execution Instructions

1. Navigate to the `Day 3` directory:
   ```bash
   cd "Day 3"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch local Vite development server:
   ```bash
   npm run dev
   ```
   > App runs at `http://localhost:3000`

4. Build production bundle:
   ```bash
   npm run build
   ```

---

## 📤 Day 3 Submission Checklist

- [x] Create a new folder named `Day 3`
- [x] Initialized React app with Vite
- [x] Built modular component structure (`Header`, `StatsSummary`, `AddStudentForm`, `FilterControls`, `StudentGrid`, `StudentCard`)
- [x] Implemented React `useState` for state management
- [x] Display all student records
- [x] Add new student with controlled form inputs & validation
- [x] Real-time name search functionality
- [x] Course filter dropdown functionality
- [x] Delete student handler
- [x] Display total student count & statistics
- [x] Array `.map()` with unique keys
- [x] Conditional rendering for empty state and status pills
- [x] Styled with glassmorphism CSS
- [x] Push repository to GitHub
- [x] Send repository link and code files to **`hisabdo.app@gmail.com`**

---

*Submitted for Day 3 – HisabDo Internship Bootcamp (MERN Track)* 🚀

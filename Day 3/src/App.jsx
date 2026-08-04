import React, { useState } from 'react';
import Header from './components/Header.jsx';
import StatsSummary from './components/StatsSummary.jsx';
import AddStudentForm from './components/AddStudentForm.jsx';
import FilterControls from './components/FilterControls.jsx';
import StudentGrid from './components/StudentGrid.jsx';

const INITIAL_STUDENTS = [
  { id: "STU-101", name: "Muhammad Hamza", email: "hamza.arif@example.com", course: "Software Engineering", marks: 95 },
  { id: "STU-102", name: "Ayesha Khan", email: "ayesha.k@example.com", course: "Computer Science", marks: 88 },
  { id: "STU-103", name: "Ali Raza", email: "ali.raza@example.com", course: "Artificial Intelligence", marks: 76 },
  { id: "STU-104", name: "Sara Ahmed", email: "sara.a@example.com", course: "Web Development", marks: 42 },
  { id: "STU-105", name: "Zain Malik", email: "zain.m@example.com", course: "Data Science", marks: 84 }
];

export default function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [nextId, setNextId] = useState(106);

  // 1. Add Student Handler
  const handleAddStudent = (newStudentData) => {
    const newStudent = {
      ...newStudentData,
      id: `STU-${nextId}`
    };
    setStudents(prev => [newStudent, ...prev]);
    setNextId(prev => prev + 1);
  };

  // 2. Delete Student Handler
  const handleDeleteStudent = (idToDelete) => {
    setStudents(prev => prev.filter(student => student.id !== idToDelete));
  };

  // 3. Filter Students by Name and Course
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  // 4. Calculate Stats
  const totalStudents = students.length;
  const avgMarks = totalStudents > 0 
    ? (students.reduce((acc, curr) => acc + curr.marks, 0) / totalStudents).toFixed(1)
    : '0';
  const topScore = totalStudents > 0 
    ? Math.max(...students.map(s => s.marks))
    : '0';

  return (
    <div className="app-container">
      {/* Background Glow Effects */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      {/* Header & Stats Overview */}
      <Header />
      <StatsSummary
        totalStudents={totalStudents}
        avgMarks={avgMarks}
        topScore={topScore}
      />

      {/* Main Grid Layout */}
      <main className="main-content">
        {/* Left Column: Controlled Registration Form */}
        <AddStudentForm onAddStudent={handleAddStudent} />

        {/* Right Column: Search/Course Filters & Card Grid */}
        <section className="roster-section">
          <FilterControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCourse={selectedCourse}
            onCourseChange={setSelectedCourse}
          />
          <StudentGrid
            students={filteredStudents}
            onDeleteStudent={handleDeleteStudent}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Built with ❤️ for <strong>HisabDo Internship Bootcamp (Day 3)</strong> • React, Props & State</p>
      </footer>
    </div>
  );
}

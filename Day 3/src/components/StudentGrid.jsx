import React from 'react';
import StudentCard from './StudentCard.jsx';

export default function StudentGrid({ students, onDeleteStudent }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📂</div>
        <h4>No Students Found</h4>
        <p>Try adjusting your search query or course filter selection.</p>
      </div>
    );
  }

  return (
    <div className="student-grid">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onDelete={onDeleteStudent}
        />
      ))}
    </div>
  );
}

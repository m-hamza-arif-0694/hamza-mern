import React from 'react';

export default function StudentCard({ student, onDelete }) {
  let statusClass = 'status-pass';
  let statusLabel = 'Pass';

  if (student.marks >= 80) {
    statusClass = 'status-distinction';
    statusLabel = 'Distinction';
  } else if (student.marks < 50) {
    statusClass = 'status-fail';
    statusLabel = 'At Risk';
  }

  return (
    <div className={`student-card ${statusClass}`}>
      <div>
        <div className="card-top">
          <span className="student-id">{student.id}</span>
          <button
            className="delete-btn"
            onClick={() => onDelete(student.id)}
            title="Delete Student"
          >
            ✕
          </button>
        </div>
        <h4 className="student-name">{student.name}</h4>
        <p className="student-email">📧 {student.email}</p>
        <span className="course-badge">{student.course}</span>
      </div>

      <div className="marks-container">
        <div className="marks-header">
          <span className="status-pill">{statusLabel}</span>
          <span className="marks-score">{student.marks} / 100</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(student.marks, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

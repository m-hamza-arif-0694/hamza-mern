import React from 'react';
import { Mail, BookOpen, Award, Edit3, Trash2 } from 'lucide-react';

export const StudentCard = ({ student, onEdit, onDelete }) => {
  const getGradeBadge = (marks) => {
    const num = Number(marks);
    if (num >= 90) return { label: 'Grade A+', color: 'badge-success' };
    if (num >= 80) return { label: 'Grade A', color: 'badge-info' };
    if (num >= 70) return { label: 'Grade B', color: 'badge-primary' };
    if (num >= 60) return { label: 'Grade C', color: 'badge-warning' };
    return { label: 'Grade D', color: 'badge-danger' };
  };

  const grade = getGradeBadge(student.marks);

  return (
    <div className="student-card">
      <div className="card-header">
        <div className="student-avatar">
          {student.name.charAt(0).toUpperCase()}
        </div>
        <div className="student-meta">
          <h3 className="student-name">{student.name}</h3>
          <span className={`grade-badge ${grade.color}`}>{grade.label}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="info-row">
          <Mail size={16} className="info-icon" />
          <span className="info-text">{student.email}</span>
        </div>

        <div className="info-row">
          <BookOpen size={16} className="info-icon" />
          <span className="info-text">{student.course}</span>
        </div>

        <div className="info-row">
          <Award size={16} className="info-icon" />
          <span className="info-text font-semibold">Marks: {student.marks} / 100</span>
        </div>
      </div>

      <div className="card-footer">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => onEdit(student)}
          title="Edit Student"
        >
          <Edit3 size={15} />
          <span>Edit</span>
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => onDelete(student.id || student._id)}
          title="Delete Student"
        >
          <Trash2 size={15} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

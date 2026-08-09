import React from 'react';
import { Users, Award, TrendingUp, BookOpen } from 'lucide-react';

export const StatsHeader = ({ students = [] }) => {
  const totalStudents = students.length;
  const avgMarks = totalStudents > 0
    ? (students.reduce((acc, s) => acc + Number(s.marks || 0), 0) / totalStudents).toFixed(1)
    : 0;

  const topStudent = totalStudents > 0
    ? [...students].sort((a, b) => Number(b.marks) - Number(a.marks))[0]
    : null;

  const coursesCount = new Set(students.map((s) => s.course)).size;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon icon-blue">
          <Users size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Total Students</span>
          <h3 className="stat-value">{totalStudents}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-green">
          <TrendingUp size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Average Marks</span>
          <h3 className="stat-value">{avgMarks}%</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-gold">
          <Award size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Top Performer</span>
          <h3 className="stat-value">{topStudent ? `${topStudent.marks}%` : 'N/A'}</h3>
          {topStudent && <span className="stat-subtext">{topStudent.name}</span>}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-purple">
          <BookOpen size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Active Courses</span>
          <h3 className="stat-value">{coursesCount}</h3>
        </div>
      </div>
    </div>
  );
};

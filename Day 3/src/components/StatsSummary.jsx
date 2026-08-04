import React from 'react';

export default function StatsSummary({ totalStudents, avgMarks, topScore }) {
  return (
    <div className="stats-bar">
      <div className="stat-card">
        <div className="stat-icon">🎓</div>
        <div className="stat-info">
          <span className="stat-value">{totalStudents}</span>
          <span className="stat-label">Total Students</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-info">
          <span className="stat-value">{avgMarks}</span>
          <span className="stat-label">Average Marks</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">🏆</div>
        <div className="stat-info">
          <span className="stat-value">{topScore}</span>
          <span className="stat-label">Highest Score</span>
        </div>
      </div>
    </div>
  );
}

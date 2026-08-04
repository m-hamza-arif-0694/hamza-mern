import React from 'react';

export default function FilterControls({ searchQuery, onSearchChange, selectedCourse, onCourseChange }) {
  return (
    <div className="controls-card">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search students by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-box">
        <label htmlFor="courseFilter">Filter by Course:</label>
        <select
          id="courseFilter"
          value={selectedCourse}
          onChange={(e) => onCourseChange(e.target.value)}
        >
          <option value="all">All Courses</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Web Development">Web Development</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Data Science">Data Science</option>
        </select>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function AddStudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    marks: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error on change
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.course) newErrors.course = 'Please select a course';
    const marksNum = parseInt(formData.marks, 10);
    if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
      newErrors.marks = 'Enter valid marks (0 - 100)';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddStudent({
      name: formData.name.trim(),
      email: formData.email.trim(),
      course: formData.course,
      marks: parseInt(formData.marks, 10)
    });

    // Reset Form State
    setFormData({ name: '', email: '', course: '', marks: '' });
    setErrors({});
  };

  return (
    <section className="form-section">
      <div className="card form-card">
        <div className="card-header">
          <h3>➕ Add New Student</h3>
          <p>Enter details below to register a new student</p>
        </div>
        <form onSubmit={handleSubmit} className="student-form" noValidate>
          <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="e.g. Muhammad Hamza"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="e.g. hamza@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className={`form-group ${errors.course ? 'has-error' : ''}`}>
            <label htmlFor="course">Course</label>
            <select id="course" value={formData.course} onChange={handleChange}>
              <option value="" disabled>Select a Course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Web Development">Web Development</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Data Science">Data Science</option>
            </select>
            {errors.course && <span className="error-msg">{errors.course}</span>}
          </div>

          <div className={`form-group ${errors.marks ? 'has-error' : ''}`}>
            <label htmlFor="marks">Marks (0 - 100)</label>
            <input
              type="number"
              id="marks"
              min="0"
              max="100"
              placeholder="e.g. 88"
              value={formData.marks}
              onChange={handleChange}
            />
            {errors.marks && <span className="error-msg">{errors.marks}</span>}
          </div>

          <button type="submit" className="primary-btn submit-btn">
            <span>Register Student</span>
            <span className="btn-icon">➜</span>
          </button>
        </form>
      </div>
    </section>
  );
}

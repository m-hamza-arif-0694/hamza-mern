import React, { useState, useEffect } from 'react';
import { X, User, Mail, BookOpen, Award, Loader2, Save } from 'lucide-react';

export const StudentFormModal = ({ isOpen, onClose, onSubmit, initialData = null, isSaving = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    marks: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        course: initialData.course || '',
        marks: initialData.marks !== undefined ? String(initialData.marks) : ''
      });
    } else {
      setFormData({ name: '', email: '', course: '', marks: '' });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.course || formData.course.trim().length === 0) {
      newErrors.course = 'Course name is required';
    }

    if (formData.marks === '' || isNaN(Number(formData.marks))) {
      newErrors.marks = 'Numeric marks are required';
    } else {
      const num = Number(formData.marks);
      if (num < 0 || num > 100) {
        newErrors.marks = 'Marks must be between 0 and 100';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      course: formData.course.trim(),
      marks: Number(formData.marks)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{initialData ? '✏️ Edit Student Record' : '➕ Add New Student'}</h3>
          <button className="btn-icon" onClick={onClose} disabled={isSaving}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="student-name">Student Full Name</label>
            <div className="input-icon-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                id="student-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Muhammad Ali"
                className={errors.name ? 'input-error' : ''}
              />
            </div>
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="student-email">Email Address</label>
            <div className="input-icon-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                id="student-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. ali@example.com"
                className={errors.email ? 'input-error' : ''}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="student-course">Enrolled Course</label>
            <div className="input-icon-wrapper">
              <BookOpen size={18} className="input-icon" />
              <input
                type="text"
                id="student-course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
                className={errors.course ? 'input-error' : ''}
              />
            </div>
            {errors.course && <span className="error-text">{errors.course}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="student-marks">Marks (0 - 100)</label>
            <div className="input-icon-wrapper">
              <Award size={18} className="input-icon" />
              <input
                type="number"
                id="student-marks"
                name="marks"
                min="0"
                max="100"
                value={formData.marks}
                onChange={handleChange}
                placeholder="e.g. 95"
                className={errors.marks ? 'input-error' : ''}
              />
            </div>
            {errors.marks && <span className="error-text">{errors.marks}</span>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={isSaving}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 size={18} className="spin-icon" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>{initialData ? 'Update Record' : 'Create Record'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

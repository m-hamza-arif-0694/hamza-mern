import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { StatsHeader } from './StatsHeader';
import { StudentCard } from './StudentCard';
import { StudentFormModal } from './StudentFormModal';
import { Search, Plus, Loader2, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

export const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch Students from REST API
  const fetchStudents = useCallback(async (search = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.getStudents(search);
      if (res && res.success) {
        setStudents(res.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch students:', err);
      setError(err.message || 'Failed to load students from server.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchStudents]);

  const showNotification = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleOpenAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleSaveStudent = async (formData) => {
    setIsSaving(true);
    setError(null);
    try {
      if (editingStudent) {
        const id = editingStudent.id || editingStudent._id;
        const res = await api.updateStudent(id, formData);
        showNotification(`Student "${formData.name}" updated successfully!`);
      } else {
        const res = await api.createStudent(formData);
        showNotification(`Student "${formData.name}" added successfully!`);
      }
      setIsModalOpen(false);
      fetchStudents(searchQuery);
    } catch (err) {
      setError(err.message || 'Failed to save student record.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student record?')) return;

    setError(null);
    try {
      await api.deleteStudent(id);
      showNotification('Student record deleted successfully.');
      fetchStudents(searchQuery);
    } catch (err) {
      setError(err.message || 'Failed to delete student record.');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Overview Statistics Header */}
      <StatsHeader students={students} />

      {/* Action Bar & Search Filter */}
      <div className="action-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search students by name, email, or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>
              ×
            </button>
          )}
        </div>

        <div className="action-buttons">
          <button className="btn btn-outline" onClick={() => fetchStudents(searchQuery)} title="Refresh data">
            <RefreshCw size={16} className={isLoading ? 'spin-icon' : ''} />
            <span>Refresh</span>
          </button>
          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            <Plus size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Student List Content / Loading / Empty State */}
      {isLoading ? (
        <div className="loading-container">
          <Loader2 size={36} className="spin-icon text-primary" />
          <p>Fetching student records from API...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="empty-container">
          <div className="empty-icon">🎓</div>
          <h3>No Student Records Found</h3>
          <p>
            {searchQuery
              ? `No student matching "${searchQuery}" was found.`
              : 'Click "Add Student" to create your first student record in MongoDB.'}
          </p>
          {!searchQuery && (
            <button className="btn btn-primary" onClick={handleOpenAddModal}>
              <Plus size={18} />
              <span>Add First Student</span>
            </button>
          )}
        </div>
      ) : (
        <div className="student-grid">
          {students.map((student) => (
            <StudentCard
              key={student.id || student._id}
              student={student}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteStudent}
            />
          ))}
        </div>
      )}

      {/* Create / Edit Student Modal */}
      <StudentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveStudent}
        initialData={editingStudent}
        isSaving={isSaving}
      />
    </div>
  );
};

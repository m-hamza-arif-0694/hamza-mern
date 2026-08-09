import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, GraduationCap, User, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="brand-title">HisabDo</h1>
            <span className="brand-subtitle">Student Management System</span>
          </div>
        </div>

        {user && (
          <div className="navbar-user">
            <div className="user-badge">
              <User size={16} />
              <span className="user-name">{user.name}</span>
              <span className="role-tag">
                <ShieldCheck size={12} /> {user.role}
              </span>
            </div>
            <button className="btn btn-outline btn-sm logout-btn" onClick={logout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

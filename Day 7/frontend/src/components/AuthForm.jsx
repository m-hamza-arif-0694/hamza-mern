import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Lock, Mail, User, AlertCircle, Loader2, KeyRound } from 'lucide-react';

export const AuthForm = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const { login, register, isLoading, authError, setAuthError } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!isLoginView && (!formData.name || formData.name.trim().length < 2)) {
      errors.name = 'Name must be at least 2 characters';
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Valid email address is required';
    }
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isLoginView) {
        await login({ email: formData.email.trim(), password: formData.password });
      } else {
        await register({ name: formData.name.trim(), email: formData.email.trim(), password: formData.password });
      }
    } catch (err) {
      // Error handled in AuthContext
    }
  };

  const toggleView = () => {
    setIsLoginView((prev) => !prev);
    setFormData({ name: '', email: '', password: '' });
    setFieldErrors({});
    setAuthError(null);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-badge">
            <KeyRound size={28} />
          </div>
          <h2>{isLoginView ? 'Welcome Back!' : 'Create an Account'}</h2>
          <p className="auth-subtitle">
            {isLoginView
              ? 'Enter your credentials to access the Student Portal'
              : 'Register to manage student records securely with JWT Authentication'}
          </p>
        </div>

        {authError && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {!isLoginView && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-icon-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Hamza Arif"
                  className={fieldErrors.name ? 'input-error' : ''}
                />
              </div>
              {fieldErrors.name && <span className="error-text">{fieldErrors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-icon-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. user@example.com"
                className={fieldErrors.email ? 'input-error' : ''}
              />
            </div>
            {fieldErrors.email && <span className="error-text">{fieldErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={fieldErrors.password ? 'input-error' : ''}
              />
            </div>
            {fieldErrors.password && <span className="error-text">{fieldErrors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={18} className="spin-icon" />
                <span>Processing...</span>
              </>
            ) : isLoginView ? (
              <>
                <LogIn size={18} />
                <span>Sign In to Dashboard</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLoginView ? "Don't have an account yet?" : 'Already registered?'}
            <button type="button" onClick={toggleView} className="btn-link">
              {isLoginView ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

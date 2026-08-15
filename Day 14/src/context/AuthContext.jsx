'use client';

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Muhammad Hamza Arif',
    email: 'hamza.merchant@hisabdo.com',
    shopName: 'Hamza Electronics Group',
    role: 'Merchant Admin'
  });

  const [token, setToken] = useState('demo-jwt-token-hisabdo-day13');

  const [activeBranch, setActiveBranch] = useState({
    id: 1,
    name: 'Hamza Electronics — Main Hall',
    location: 'Hafeez Centre, Lahore',
    type: 'Electronics & Mobiles',
    cashBalance: 42500
  });

  const [resetRequestedEmail, setResetRequestedEmail] = useState(null);

  const login = (email, password) => {
    setUser({
      name: email.split('@')[0].toUpperCase(),
      email: email,
      shopName: 'Hamza Retail Traders',
      role: 'Merchant Owner'
    });
    setToken('jwt-session-' + Date.now());
  };

  const register = (data) => {
    setUser({
      name: data.name,
      email: data.email,
      shopName: data.shopName,
      role: 'Owner'
    });
    setToken('jwt-session-' + Date.now());
  };

  const requestPasswordReset = (email) => {
    setResetRequestedEmail(email);
    return true;
  };

  const resetPasswordWithOTP = (otp, newPassword) => {
    setResetRequestedEmail(null);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!token,
      activeBranch,
      setActiveBranch,
      resetRequestedEmail,
      login,
      register,
      requestPasswordReset,
      resetPasswordWithOTP,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

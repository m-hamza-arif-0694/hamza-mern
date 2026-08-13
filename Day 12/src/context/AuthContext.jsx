'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Muhammad Hamza Arif',
    email: 'hamza.merchant@hisabdo.com',
    shopName: 'Hamza Electronics Group',
    role: 'Owner & Super Admin'
  });

  const [token, setToken] = useState('demo-jwt-token-hisabdo-day12');

  const [activeBranch, setActiveBranch] = useState({
    id: 1,
    name: 'Hamza Electronics — Main Hall',
    location: 'Hafeez Centre, Lahore',
    type: 'Electronics & Mobiles',
    cashBalance: 42500
  });

  const login = (email, password) => {
    setUser({
      name: email.split('@')[0].toUpperCase(),
      email: email,
      shopName: 'Hamza Retail Traders',
      role: 'Merchant Admin'
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
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

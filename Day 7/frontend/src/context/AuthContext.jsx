import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('hisabdo_jwt_token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Restore authenticated session on initial render
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('hisabdo_jwt_token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.getMe();
        if (res && res.success) {
          setUser(res.data);
          setToken(storedToken);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Session restoration failed:', err.message);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const handleAuthSuccess = (tokenData, userData) => {
    localStorage.setItem('hisabdo_jwt_token', tokenData);
    setToken(tokenData);
    setUser(userData);
    setAuthError(null);
  };

  const login = async (credentials) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await api.login(credentials);
      handleAuthSuccess(res.token, res.user);
      return res;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await api.register(userData);
      handleAuthSuccess(res.token, res.user);
      return res;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('hisabdo_jwt_token');
    setToken(null);
    setUser(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        authError,
        login,
        register,
        logout,
        setAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

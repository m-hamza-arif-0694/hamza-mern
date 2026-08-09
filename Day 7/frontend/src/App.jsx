import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { AuthForm } from './components/AuthForm';
import { StudentList } from './components/StudentList';
import { Loader2 } from 'lucide-react';

const MainContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="full-screen-loader">
        <Loader2 size={42} className="spin-icon text-primary" />
        <p>Loading application session...</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        {isAuthenticated ? <StudentList /> : <AuthForm />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

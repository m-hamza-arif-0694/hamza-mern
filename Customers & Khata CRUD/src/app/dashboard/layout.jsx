'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { LoadingState } from '../../components/ui/StateAlert';

export default function DashboardLayout({ children }) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '4rem 1.5rem', maxWidth: '500px', margin: '0 auto' }}>
        <LoadingState message="Checking merchant session credentials..." />
      </div>
    );
  }

  return (
    <div className="dashboard-layout-wrapper">
      <Sidebar />
      <div className="dashboard-main-content">
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

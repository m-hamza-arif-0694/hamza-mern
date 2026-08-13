import React from 'react';
import Sidebar from '../../components/Sidebar';

export const metadata = {
  title: 'Dashboard — HisabDo Web Application (Day 11)',
  description: 'Manage digital cashbook transactions and customer udhar ledgers with full CRUD.'
};

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)', background: '#090d16' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem 1.5rem', overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  );
}

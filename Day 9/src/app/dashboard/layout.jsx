import React from 'react';
import Sidebar from '../../components/Sidebar';

export const metadata = {
  title: 'Dashboard — HisabDo Web Application',
  description: 'Manage digital cashbook transactions, customer udhar ledgers, and financial reports.'
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

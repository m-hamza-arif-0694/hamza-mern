import React from 'react';
import Sidebar from '../../components/Sidebar';

export const metadata = {
  title: 'Dashboard — HisabDo Web Application (Day 11)',
  description: 'Manage digital cashbook transactions and customer udhar ledgers with full CRUD.'
};

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout-wrapper">
      <Sidebar />
      <main className="dashboard-main-content">
        {children}
      </main>
    </div>
  );
}


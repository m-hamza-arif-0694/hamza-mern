'use client';

import React from 'react';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { Lock, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function DashboardLayout({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '5rem 1.5rem', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Lock size={30} />
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>
          Protected Merchant Dashboard
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2rem' }}>
          You must be signed in with a valid merchant session token to access HisabDo business ledgers and branch modules.
        </p>
        <Link href="/login" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="lg" icon={ArrowRight}>
            Sign In to Merchant Portal
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="dashboard-layout-wrapper">
      <Sidebar />
      <main className="dashboard-main-content">
        {children}
      </main>
    </div>
  );
}

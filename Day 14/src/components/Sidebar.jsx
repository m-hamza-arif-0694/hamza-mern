'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, BookOpen, Users, Building2, Sparkles, 
  Settings, LogOut, KeyRound 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, activeBranch, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: '1. Digital Cashbook (CRUD)', path: '/dashboard/cashbook', icon: BookOpen },
    { name: '2. Customer Ledgers (CRUD)', path: '/dashboard/customers', icon: Users },
    { name: '3. Multi-Business (CRUD)', path: '/dashboard/businesses', icon: Building2 },
    { name: 'User Profile & Settings', path: '/dashboard/settings', icon: Settings }
  ];

  const isActive = (path) => pathname === path;

  return (
    <aside className="sidebar-aside" style={{
      width: '270px',
      background: 'rgba(15, 23, 42, 0.95)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 'calc(100vh - 72px)',
      flexShrink: 0
    }}>
      <div>
        <div style={{
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          padding: '0.85rem',
          borderRadius: '12px',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontSize: '0.65rem', color: '#60a5fa', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            Active Branch Context
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>{activeBranch ? activeBranch.name : 'Main Shop'}</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{activeBranch ? activeBranch.location : 'Lahore'}</div>
            </div>
            <Link href="/dashboard/businesses" style={{ color: '#60a5fa', fontSize: '0.75rem', textDecoration: 'none', fontWeight: 600 }}>
              Switch
            </Link>
          </div>
        </div>

        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
          3 Protected Modules
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: active ? '#60a5fa' : '#94a3b8',
                  background: active ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                  border: '1px solid',
                  borderColor: active ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={18} color={active ? '#60a5fa' : '#94a3b8'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
            Account Security
          </div>
          <Link
            href="/forgot-password"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 0.9rem',
              borderRadius: '10px',
              textDecoration: 'none',
              color: '#94a3b8',
              fontSize: '0.9rem'
            }}
          >
            <KeyRound size={18} color="#fbbf24" /> Reset Password UI
          </Link>
        </div>
      </div>

      <div style={{
        paddingTop: '1rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>{user ? user.name : 'Merchant'}</div>
          <div style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>● Session Token Active</div>
        </div>
        <button
          onClick={logout}
          title="Sign Out"
          style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}

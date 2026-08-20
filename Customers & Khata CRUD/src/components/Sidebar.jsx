'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, BookOpen, Users, Building2, 
  Settings, LogOut, KeyRound, Database, CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, activeBranch, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Customer / Khata (Full CRUD)', path: '/dashboard/customers', icon: Users, highlight: true },
    { name: 'Digital Cashbook (CRUD)', path: '/dashboard/cashbook', icon: BookOpen },
    { name: 'Multi-Business (CRUD)', path: '/dashboard/businesses', icon: Building2 },
    { name: 'User Profile & Settings', path: '/dashboard/settings', icon: Settings }
  ];

  const isActive = (path) => pathname === path;

  return (
    <aside className="sidebar-aside" style={{
      width: '280px',
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
        {/* Active Branch Widget */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          padding: '0.85rem',
          borderRadius: '12px',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontSize: '0.65rem', color: '#60a5fa', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Active Branch Context</span>
            <span style={{ color: '#34d399', fontSize: '0.65rem' }}>● Online</span>
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

        {/* Specialist Tag */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.15))',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          padding: '0.65rem 0.85rem',
          borderRadius: '10px',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Database size={16} color="#60a5fa" />
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'white' }}>CRUD Specialist Active</div>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Zod Validation & Live DB</div>
          </div>
        </div>

        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
          Management Modules
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
                  color: active ? '#60a5fa' : item.highlight ? '#e2e8f0' : '#94a3b8',
                  background: active ? 'rgba(59, 130, 246, 0.15)' : item.highlight ? 'rgba(255,255,255,0.03)' : 'transparent',
                  border: '1px solid',
                  borderColor: active ? 'rgba(59, 130, 246, 0.4)' : item.highlight ? 'rgba(255,255,255,0.08)' : 'transparent',
                  fontWeight: active ? 700 : item.highlight ? 600 : 500,
                  fontSize: '0.88rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={18} color={active ? '#60a5fa' : item.highlight ? '#34d399' : '#94a3b8'} />
                <span style={{ flex: 1 }}>{item.name}</span>
                {item.highlight && !active && (
                  <span style={{ background: '#10b981', color: '#090d16', fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                    SPECIALTY
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>
            Security
          </div>
          <Link
            href="/forgot-password"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 0.9rem',
              borderRadius: '10px',
              textDecoration: 'none',
              color: '#94a3b8',
              fontSize: '0.85rem'
            }}
          >
            <KeyRound size={16} color="#fbbf24" /> Reset Password UI
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
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>{user ? user.name : 'Merchant Admin'}</div>
          <div style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>● Connected to DB</div>
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

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, BookOpen, Users, FileBarChart, Building2, 
  Settings, ChevronDown, LogOut, Sparkles 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [selectedBusiness, setSelectedBusiness] = useState('Hamza Electronics');

  const menuItems = [
    { name: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Digital Cashbook (CRUD)', path: '/dashboard/cashbook', icon: BookOpen },
    { name: 'Customer Ledgers (CRUD)', path: '/dashboard/customers', icon: Users },
    { name: 'Financial Reports', path: '/dashboard/reports', icon: FileBarChart }
  ];

  const isActive = (path) => pathname === path;

  return (
    <aside style={{
      width: '260px',
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
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.85rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              padding: '0.4rem',
              borderRadius: '8px',
              background: 'rgba(59, 130, 246, 0.2)',
              color: '#60a5fa'
            }}>
              <Building2 size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>{selectedBusiness}</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Main Branch • Admin</div>
            </div>
          </div>
          <ChevronDown size={16} color="#94a3b8" />
        </div>

        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
          Functional CRUD Modules
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
            Site Links
          </div>
          <Link
            href="/features"
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
            <Sparkles size={18} color="#34d399" /> Features Overview
          </Link>
          <Link
            href="/pricing"
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
            <Settings size={18} color="#c084fc" /> Pricing Tiers
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
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>Hamza Arif</div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Merchant Owner</div>
        </div>
        <Link href="/" title="Back to Homepage" style={{ color: '#ef4444', textDecoration: 'none' }}>
          <LogOut size={18} />
        </Link>
      </div>
    </aside>
  );
}

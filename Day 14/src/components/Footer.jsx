'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(9, 13, 22, 0.95)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingTop: '4rem',
      paddingBottom: '2.5rem',
      marginTop: '5rem',
      color: '#94a3b8'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={20} color="white" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>
                Hisab<span style={{ color: '#3b82f6' }}>Do</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem', color: '#94a3b8' }}>
              Pakistan's leading digital cashbook & Udhar ledger web application evaluated by 5 real retail merchants.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.85rem', fontWeight: 600 }}>
              <ShieldCheck size={18} /> 100% Encrypted & Bank-Grade Security
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.05rem' }}>Authentication Pages</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link href="/login" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>Merchant Sign In →</Link></li>
              <li><Link href="/register" style={{ color: '#94a3b8', textDecoration: 'none' }}>Register New Shop</Link></li>
              <li><Link href="/forgot-password" style={{ color: '#94a3b8', textDecoration: 'none' }}>Reset Account Password (UI)</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.05rem' }}>3 Core Modules</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link href="/dashboard/cashbook" style={{ color: '#94a3b8', textDecoration: 'none' }}>📖 Digital Cashbook (CRUD)</Link></li>
              <li><Link href="/dashboard/customers" style={{ color: '#94a3b8', textDecoration: 'none' }}>🤝 Udhar Customer Ledgers (CRUD)</Link></li>
              <li><Link href="/dashboard/businesses" style={{ color: '#94a3b8', textDecoration: 'none' }}>🏢 Multi-Business Branches (CRUD)</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.05rem' }}>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="#60a5fa" />
                <span>hisabdo.app@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="#34d399" />
                <span>+92 (300) 123-4567</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={16} color="#c084fc" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem'
        }}>
          <div>© {new Date().getFullYear()} HisabDo Day 13 Capstone Project. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1' }}>
            Built with <Heart size={14} color="#ef4444" fill="#ef4444" /> using Next.js 14 & MERN Stack
          </div>
        </div>
      </div>
    </footer>
  );
}

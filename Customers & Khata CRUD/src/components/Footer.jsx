'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Mail, Phone, MapPin, Heart, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(9, 13, 22, 0.95)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingTop: '3.5rem',
      paddingBottom: '2rem',
      marginTop: '5rem',
      color: '#94a3b8'
    }}>
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
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
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem', color: '#94a3b8' }}>
              Complete Customer Directory & Khata Udhar Management Module with Next.js REST API routes, MongoDB Mongoose integration, and Zod backend schema validation.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.85rem', fontWeight: 600 }}>
              <ShieldCheck size={18} /> Zod Validated & Bank-Grade Security
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>Customer & Khata Features</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li><Link href="/dashboard/customers" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>🤝 Customer Udhar Book (Full CRUD) →</Link></li>
              <li><Link href="/dashboard/customers" style={{ color: '#94a3b8', textDecoration: 'none' }}>💰 Credit & Payment Ledger Entries</Link></li>
              <li><Link href="/dashboard/customers" style={{ color: '#94a3b8', textDecoration: 'none' }}>📱 Pakistani Phone & Zod Engine</Link></li>
              <li><Link href="/dashboard/customers" style={{ color: '#94a3b8', textDecoration: 'none' }}>💬 WhatsApp Dues Reminder Generator</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>Core Modules</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li><Link href="/dashboard/cashbook" style={{ color: '#94a3b8', textDecoration: 'none' }}>📖 Digital Cashbook (In/Out)</Link></li>
              <li><Link href="/dashboard/businesses" style={{ color: '#94a3b8', textDecoration: 'none' }}>🏢 Multi-Business Branches</Link></li>
              <li><Link href="/dashboard/settings" style={{ color: '#94a3b8', textDecoration: 'none' }}>⚙️ Shop & Merchant Settings</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>Support & Submissions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
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
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem'
        }}>
          <div>© {new Date().getFullYear()} HisabDo Day 15-19: Customers & Khata CRUD Specialist Module.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1' }}>
            Built with <Heart size={14} color="#ef4444" fill="#ef4444" /> using Next.js 14, Mongoose & Zod
          </div>
        </div>
      </div>
    </footer>
  );
}

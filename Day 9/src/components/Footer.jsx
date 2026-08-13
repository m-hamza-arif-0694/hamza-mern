'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Smartphone, ShieldCheck, Mail, Phone, MapPin, Heart } from 'lucide-react';

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
          {/* Column 1: Company Overview */}
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
              Pakistan's leading digital cashbook & Udhar management web app empowering small business owners, merchants, and retailers to record transactions with confidence.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.85rem', fontWeight: 600 }}>
              <ShieldCheck size={18} /> 100% Encrypted & Bank-Grade Security
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.05rem' }}>Platform Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>Home Landing Page</Link></li>
              <li><Link href="/features" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>Features & Capabilities</Link></li>
              <li><Link href="/pricing" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>Pricing Tiers & Plans</Link></li>
              <li><Link href="/download" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>Mobile App & PWA Download</Link></li>
              <li><Link href="/dashboard" style={{ color: '#60a5fa', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Web Application Portal →</Link></li>
            </ul>
          </div>

          {/* Column 3: Features Highlight */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.05rem' }}>Core Modules</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>📖 Digital Cashbook (Cash In/Out)</li>
              <li>🤝 Customer Udhar Book (Gave/Got)</li>
              <li>💬 WhatsApp Dues Reminder Link</li>
              <li>📊 Export PDF & Excel Statements</li>
              <li>🏢 Multi-Business Branch Management</li>
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.05rem' }}>Get in Touch</h4>
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

        {/* Bottom Bar */}
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
          <div>
            © {new Date().getFullYear()} HisabDo Capstone Project. Built for HisabDo Internship (Day 9).
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1' }}>
            Crafted with <Heart size={14} color="#ef4444" fill="#ef4444" /> using Next.js 14 & MERN Stack
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Users, Send, FileBarChart, CheckCircle2, ArrowRight, 
  Shield, Zap, Smartphone, ArrowDownLeft, ArrowUpRight, Search, Download
} from 'lucide-react';

export default function FeaturesPage() {
  const [activeFeatureTab, setActiveFeatureTab] = useState('cashbook');

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div className="badge-purple" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Zap size={14} /> Full Feature Specification Showcase
        </div>
        <h1 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
          fontWeight: 800,
          color: 'white',
          marginBottom: '1rem'
        }}>
          Everything You Need to Manage Shop Finances
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          HisabDo replaces manual ledger books with high-speed digital tools designed for accuracy, security, and effortless debt recovery.
        </p>
      </div>

      {/* Interactive Feature Navigation Tabs */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        marginBottom: '3rem',
        flexWrap: 'wrap',
        background: 'rgba(15, 23, 42, 0.7)',
        padding: '0.6rem',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <button
          onClick={() => setActiveFeatureTab('cashbook')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            border: 'none',
            background: activeFeatureTab === 'cashbook' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
            color: activeFeatureTab === 'cashbook' ? '#60a5fa' : '#94a3b8',
            border: '1px solid',
            borderColor: activeFeatureTab === 'cashbook' ? 'rgba(59, 130, 246, 0.4)' : 'transparent',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <BookOpen size={18} /> 1. Digital Cashbook
        </button>

        <button
          onClick={() => setActiveFeatureTab('udhar')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            border: 'none',
            background: activeFeatureTab === 'udhar' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            color: activeFeatureTab === 'udhar' ? '#34d399' : '#94a3b8',
            border: '1px solid',
            borderColor: activeFeatureTab === 'udhar' ? 'rgba(16, 185, 129, 0.4)' : 'transparent',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Users size={18} /> 2. Customer Udhar Book
        </button>

        <button
          onClick={() => setActiveFeatureTab('whatsapp')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            border: 'none',
            background: activeFeatureTab === 'whatsapp' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
            color: activeFeatureTab === 'whatsapp' ? '#c084fc' : '#94a3b8',
            border: '1px solid',
            borderColor: activeFeatureTab === 'whatsapp' ? 'rgba(139, 92, 246, 0.4)' : 'transparent',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Send size={18} /> 3. WhatsApp Reminders
        </button>

        <button
          onClick={() => setActiveFeatureTab('reports')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            border: 'none',
            background: activeFeatureTab === 'reports' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
            color: activeFeatureTab === 'reports' ? '#22d3ee' : '#94a3b8',
            border: '1px solid',
            borderColor: activeFeatureTab === 'reports' ? 'rgba(6, 182, 212, 0.4)' : 'transparent',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FileBarChart size={18} /> 4. PDF & Excel Reports
        </button>
      </nav>

      {/* FEATURE TAB CONTENT CARDS */}

      {/* TAB 1: DIGITAL CASHBOOK */}
      {activeFeatureTab === 'cashbook' && (
        <div className="glass-card animate-fade-in" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div className="badge-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>Pillar 01</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                Real-Time Daily Cashbook
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Never question where your shop's cash went. Record Cash In (+) for sales and Cash Out (-) for expenses with category tagging.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} color="#3b82f6" /> Instant running cash balance calculation
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} color="#3b82f6" /> Tag entries by Sales, Utilities, Salary, or Stock Inventory
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} color="#3b82f6" /> Daily, Weekly, and Monthly breakdown filters
                </li>
              </ul>
              <Link href="/dashboard/cashbook" className="btn-primary">
                Try Cashbook Module in Dashboard →
              </Link>
            </div>
            <div style={{ background: 'rgba(9, 13, 22, 0.8)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#60a5fa', marginBottom: '1rem' }}>Sample Daily Cash Summary</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '10px' }}>
                  <span style={{ color: '#34d399', fontWeight: 600 }}>Total Cash In (+)</span>
                  <span style={{ color: '#34d399', fontWeight: 800 }}>Rs. 45,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem', background: 'rgba(239, 68, 68, 0.15)', borderRadius: '10px' }}>
                  <span style={{ color: '#f87171', fontWeight: 600 }}>Total Cash Out (-)</span>
                  <span style={{ color: '#f87171', fontWeight: 800 }}>Rs. 12,400</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '10px' }}>
                  <span style={{ color: '#60a5fa', fontWeight: 600 }}>Net Running Cash</span>
                  <span style={{ color: '#60a5fa', fontWeight: 800 }}>Rs. 32,600</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UDHAR BOOK */}
      {activeFeatureTab === 'udhar' && (
        <div className="glass-card animate-fade-in" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div className="badge-green" style={{ marginBottom: '1rem', display: 'inline-block' }}>Pillar 02</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                Customer & Supplier Udhar Ledgers
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Keep exact customer credit records. Know precisely who owes you money (*You Will Get*) and who you owe (*You Will Give*).
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} color="#10b981" /> Per-customer running net balance tracking
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} color="#10b981" /> Phone directory integration with instant search
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} color="#10b981" /> voice notes and receipt attachments support
                </li>
              </ul>
              <Link href="/dashboard/customers" className="btn-success">
                Try Udhar Module in Dashboard →
              </Link>
            </div>
            <div style={{ background: 'rgba(9, 13, 22, 0.8)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399', marginBottom: '1rem' }}>Customer Dues Preview</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '10px' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'white' }}>Ali Traders</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>+923001234567</div>
                  </div>
                  <div style={{ color: '#34d399', fontWeight: 800 }}>Rs. 12,500 (Get)</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '10px' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'white' }}>Usman Retailer</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>+923219876543</div>
                  </div>
                  <div style={{ color: '#f87171', fontWeight: 800 }}>Rs. 4,500 (Give)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WHATSAPP REMINDERS */}
      {activeFeatureTab === 'whatsapp' && (
        <div className="glass-card animate-fade-in" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div className="badge-purple" style={{ marginBottom: '1rem', display: 'inline-block' }}>Pillar 03</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                Automated WhatsApp Reminders
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Recover your hard-earned pending dues 3x faster without awkward phone calls. Send pre-filled polite WhatsApp payment reminder messages.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} color="#8b5cf6" /> Pre-formatted dues template with total balance
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} color="#8b5cf6" /> One-click WhatsApp Web & WhatsApp Mobile trigger
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} color="#8b5cf6" /> Custom message text and payment link inclusion
                </li>
              </ul>
              <button className="btn-primary" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>
                Preview Reminder Generator →
              </button>
            </div>
            <div style={{ background: 'rgba(9, 13, 22, 0.8)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#c084fc', marginBottom: '1rem' }}>WhatsApp Template Output</div>
              <div style={{ background: '#0f172a', padding: '1.25rem', borderRadius: '12px', color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                "Respected Ali Traders, your total due payment on HisabDo is Rs. 12,500. Please clear it at your earliest convenience via JazzCash / EasyPaisa."
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PDF REPORTS */}
      {activeFeatureTab === 'reports' && (
        <div className="glass-card animate-fade-in" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div className="badge-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>Pillar 04</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                Branded PDF & Excel Export
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Generate official financial reports for audit, tax filing, or customer receipts in PDF and Excel format.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} color="#06b6d4" /> Downloadable PDF Customer Statements
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} color="#06b6d4" /> Excel CSV export for accountant review
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} color="#06b6d4" /> Custom date range filtering (Daily, Weekly, Monthly)
                </li>
              </ul>
              <Link href="/dashboard/reports" className="btn-primary">
                Generate Reports in Dashboard →
              </Link>
            </div>
            <div style={{ background: 'rgba(9, 13, 22, 0.8)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
              <Download size={48} color="#22d3ee" style={{ marginBottom: '1rem' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>PDF / Excel Statement Export</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>High-resolution printable document generator</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

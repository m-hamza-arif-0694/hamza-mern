'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span className="badge-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>Transparent Pricing</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          Simple Plans for Every Shop Size
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Start 100% free. Upgrade anytime as your business expands across multiple branches.
        </p>

        {/* Annual / Monthly Toggle */}
        <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(15, 23, 42, 0.8)', padding: '0.4rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button
            onClick={() => setIsAnnual(false)}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              background: !isAnnual ? '#3b82f6' : 'transparent',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              background: isAnnual ? '#3b82f6' : 'transparent',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            Annual Billing <span style={{ fontSize: '0.7rem', background: '#10b981', color: 'white', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>Save 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {/* Card 1: Starter */}
        <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Starter Free</div>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Ideal for single shopkeepers starting out.</div>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
              Rs. 0 <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 400 }}>/ forever</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#34d399" /> Unlimited Digital Cashbook entries</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#34d399" /> Up to 50 Udhar Customers</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#34d399" /> Standard WhatsApp Reminders</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#34d399" /> Single Business Account</li>
            </ul>
          </div>
          <Link href="/dashboard" className="btn-secondary" style={{ width: '100%' }}>
            Get Started Free
          </Link>
        </div>

        {/* Card 2: Business Pro (Featured) */}
        <div className="glass-card" style={{ padding: '2.5rem', border: '2px solid #3b82f6', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(30, 58, 138, 0.2)' }}>
          <div style={{ position: 'absolute', top: '-14px', right: '2rem', background: '#3b82f6', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            MOST POPULAR
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#60a5fa', marginBottom: '0.5rem' }}>Business Pro</div>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem' }}>For growing retail stores and wholesalers.</div>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
              Rs. {isAnnual ? '799' : '999'} <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 400 }}>/ month</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Everything in Starter Free</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Unlimited Udhar Customers</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> PDF & Excel Report Exports</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Up to 3 Multi-Business Branches</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Priority 24/7 Support</li>
            </ul>
          </div>
          <Link href="/dashboard" className="btn-primary" style={{ width: '100%' }}>
            Start Pro Trial →
          </Link>
        </div>

        {/* Card 3: Enterprise */}
        <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Enterprise</div>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Multi-store chains and large distributors.</div>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
              Custom
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#c084fc" /> Unlimited Multi-Business Branches</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#c084fc" /> Custom Staff Roles & RBAC</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#c084fc" /> Dedicated Account Manager</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#c084fc" /> Custom API & POS Integration</li>
            </ul>
          </div>
          <Link href="/contact" className="btn-secondary" style={{ width: '100%' }}>
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
}

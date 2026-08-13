'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <Badge variant="blue" style={{ marginBottom: '1rem' }}>Transparent Pricing</Badge>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          Pricing Plans for Every Shop Size
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Start 100% free. Upgrade anytime as your business expands across multiple branches.
        </p>

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
            Monthly
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
              cursor: 'pointer'
            }}
          >
            Annual (Save 20%)
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Starter Free</div>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>Rs. 0</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#34d399" /> Unlimited Digital Cashbook entries</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#34d399" /> Up to 50 Udhar Customers</li>
            </ul>
          </div>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" style={{ width: '100%' }}>Get Started Free</Button>
          </Link>
        </Card>

        <Card style={{ border: '2px solid #3b82f6', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#60a5fa', marginBottom: '0.5rem' }}>Business Pro</div>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>Rs. {isAnnual ? '799' : '999'}</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Unlimited Udhar Customers</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> WhatsApp Payment Reminders</li>
            </ul>
          </div>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <Button variant="primary" style={{ width: '100%' }}>Start Pro Trial →</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}

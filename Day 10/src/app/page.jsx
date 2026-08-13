'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Users, Send, FileText, ArrowRight, CheckCircle2, 
  Plus, ArrowDownLeft, ArrowUpRight, Zap
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { validateAmount } from '../lib/validation';

export default function HomePage() {
  const [demoCash, setDemoCash] = useState([
    { id: 1, type: 'in', amount: 16000, note: 'Morning Counter Sale' },
    { id: 2, type: 'out', amount: 3200, note: 'K-Electric Bill' }
  ]);
  const [demoAmount, setDemoAmount] = useState('');
  const [demoType, setDemoType] = useState('in');
  const [demoError, setDemoError] = useState(null);

  const handleAddDemoCash = (e) => {
    e.preventDefault();
    const err = validateAmount(demoAmount);
    if (err) {
      setDemoError(err);
      return;
    }
    setDemoError(null);
    const newEntry = {
      id: Date.now(),
      type: demoType,
      amount: parseFloat(demoAmount),
      note: demoType === 'in' ? 'Quick Cash In' : 'Quick Cash Out'
    };
    setDemoCash([newEntry, ...demoCash]);
    setDemoAmount('');
  };

  const totalIn = demoCash.filter(t => t.type === 'in').reduce((acc, t) => acc + t.amount, 0);
  const totalOut = demoCash.filter(t => t.type === 'out').reduce((acc, t) => acc + t.amount, 0);
  const netBalance = totalIn - totalOut;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* HERO SECTION */}
      <section style={{ textAlign: 'center', padding: '4rem 0 3rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Badge variant="blue" style={{ padding: '0.4rem 1.25rem', fontSize: '0.85rem' }}>
            <Zap size={15} style={{ display: 'inline', marginRight: '0.4rem' }} /> Day 10 Core Application & Reusable UI System
          </Badge>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
          fontWeight: 800,
          letterSpacing: '-1px',
          lineHeight: 1.15,
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #3b82f6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Digital Cashbook & Udhar Book <br />
          Built for Pakistan's Merchants
        </h1>

        <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '750px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Experience reusable components, real-time form validation, running cash balance calculations, and automated WhatsApp payment reminders with **HisabDo**.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg" icon={ArrowRight}>Open Web App Dashboard</Button>
          </Link>
          <Link href="/features" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" size="lg">Explore Functional Modules</Button>
          </Link>
        </div>
      </section>

      {/* DEMO WIDGET */}
      <section style={{ margin: '4rem 0' }}>
        <Card style={{ border: '1px solid rgba(59, 130, 246, 0.4)' }}>
          <CardHeader
            title="Interactive Digital Cashbook Demo"
            subtitle="Try the live component with real-time form validation"
            action={
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Badge variant="green" style={{ fontSize: '0.9rem' }}>In: Rs. {totalIn.toLocaleString()}</Badge>
                <Badge variant="red" style={{ fontSize: '0.9rem' }}>Out: Rs. {totalOut.toLocaleString()}</Badge>
                <Badge variant="blue" style={{ fontSize: '0.9rem' }}>Net: Rs. {netBalance.toLocaleString()}</Badge>
              </div>
            }
          />
          <CardBody>
            <form onSubmit={handleAddDemoCash} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setDemoType('in')}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: demoType === 'in' ? '#10b981' : 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cash In (+)
                </button>
                <button
                  type="button"
                  onClick={() => setDemoType('out')}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: demoType === 'out' ? '#ef4444' : 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cash Out (-)
                </button>
              </div>

              <Input
                placeholder="Enter amount (PKR)"
                type="number"
                value={demoAmount}
                onChange={(e) => {
                  setDemoAmount(e.target.value);
                  if (demoError) setDemoError(null);
                }}
                error={demoError}
              />

              <Button type="submit" variant={demoType === 'in' ? 'success' : 'danger'} icon={Plus}>
                Save
              </Button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {demoCash.map(t => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px' }}>
                  <span style={{ color: 'white', fontWeight: 600 }}>{t.note}</span>
                  <span style={{ fontWeight: 800, color: t.type === 'in' ? '#34d399' : '#f87171' }}>
                    {t.type === 'in' ? '+' : '-'} Rs. {t.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

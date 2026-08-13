'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Smartphone, ShieldCheck, Zap, ArrowRight, CheckCircle2, 
  Plus, ArrowDownLeft, ArrowUpRight, Trash2, Send, FileText, Layers, 
  TrendingUp, Users, Award, Star
} from 'lucide-react';

export default function HomePage() {
  // Live Demo Widget State
  const [demoCash, setDemoCash] = useState([
    { id: 1, type: 'in', amount: 12000, category: 'Sales', note: 'Counter Sales', time: '10:15 AM' },
    { id: 2, type: 'out', amount: 2500, category: 'Utilities', note: 'Electricity Bill', time: '01:30 PM' }
  ]);
  const [demoAmount, setDemoAmount] = useState('');
  const [demoType, setDemoType] = useState('in');
  const [demoNote, setDemoNote] = useState('');

  const handleAddDemoCash = (e) => {
    e.preventDefault();
    if (!demoAmount || isNaN(demoAmount) || Number(demoAmount) <= 0) return;
    const newEntry = {
      id: Date.now(),
      type: demoType,
      amount: parseFloat(demoAmount),
      category: demoType === 'in' ? 'Sales' : 'Expenses',
      note: demoNote || (demoType === 'in' ? 'Quick Cash In' : 'Quick Cash Out'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setDemoCash([newEntry, ...demoCash]);
    setDemoAmount('');
    setDemoNote('');
  };

  const totalIn = demoCash.filter(t => t.type === 'in').reduce((acc, t) => acc + t.amount, 0);
  const totalOut = demoCash.filter(t => t.type === 'out').reduce((acc, t) => acc + t.amount, 0);
  const netBalance = totalIn - totalOut;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      
      {/* HERO SECTION */}
      <section style={{ textAlign: 'center', padding: '4rem 0 3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(59, 130, 246, 0.15)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          padding: '0.4rem 1.25rem',
          borderRadius: '9999px',
          color: '#60a5fa',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          <Zap size={16} /> Day 9 Next.js 14 Capstone Implementation
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
          Modern Digital Bookkeeping <br />
          Built for Pakistan's Merchants
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: '#94a3b8',
          maxWidth: '750px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.6
        }}>
          Replace messy paper diaries with **HisabDo**. Manage daily Cash In & Cash Out, track customer Udhar (Gave/Got) dues, and send instant WhatsApp reminders effortlessly.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/dashboard" className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
            Open Web App Dashboard <ArrowRight size={20} />
          </Link>
          <Link href="/features" className="btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
            Explore Full Features
          </Link>
        </div>

        {/* Quick Security Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap', color: '#94a3b8', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} color="#34d399" /> 100% Free Starter Plan
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} color="#34d399" /> WhatsApp Reminder Integration
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} color="#34d399" /> Automatic Cloud Backup
          </div>
        </div>
      </section>

      {/* INTERACTIVE LIVE CASHBOOK WIDGET DEMO */}
      <section style={{ margin: '4rem 0' }}>
        <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge-blue" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Live Product Experience</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>Try the HisabDo Digital Cashbook Live</h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Add entries below to see instant running balance calculations in action.</p>
            </div>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Cash In</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>Rs. {totalIn.toLocaleString()}</div>
              </div>
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Cash Out</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f87171' }}>Rs. {totalOut.toLocaleString()}</div>
              </div>
              <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Net Daily</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#60a5fa' }}>Rs. {netBalance.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem', flexWrap: 'wrap' }}>
            {/* Input Form */}
            <form onSubmit={handleAddDemoCash} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setDemoType('in')}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: demoType === 'in' ? '#10b981' : 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <ArrowDownLeft size={16} /> Cash In (+)
                </button>
                <button
                  type="button"
                  onClick={() => setDemoType('out')}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: demoType === 'out' ? '#ef4444' : 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <ArrowUpRight size={16} /> Cash Out (-)
                </button>
              </div>

              <input
                type="number"
                placeholder="Amount (e.g. 5000)"
                value={demoAmount}
                onChange={(e) => setDemoAmount(e.target.value)}
                className="input-field"
                style={{ marginBottom: '0.75rem' }}
                required
              />

              <input
                type="text"
                placeholder="Note / Description (Optional)"
                value={demoNote}
                onChange={(e) => setDemoNote(e.target.value)}
                className="input-field"
                style={{ marginBottom: '1rem' }}
              />

              <button type="submit" className={demoType === 'in' ? 'btn-success' : 'btn-danger'} style={{ width: '100%' }}>
                Save {demoType === 'in' ? 'Cash In (+)' : 'Cash Out (-)'}
              </button>
            </form>

            {/* List */}
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: '#cbd5e1' }}>Recorded Transactions ({demoCash.length})</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '210px', overflowY: 'auto' }}>
                {demoCash.map(t => (
                  <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(30, 41, 59, 0.7)', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'white' }}>{t.note}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.time}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: t.type === 'in' ? '#34d399' : '#f87171', fontSize: '1rem' }}>
                      {t.type === 'in' ? '+' : '-'} Rs. {t.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE 4 PILLARS FEATURE GRID */}
      <section style={{ margin: '5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem', color: 'white' }}>
            Built Specifically for Small & Medium Businesses
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Everything you need to eliminate financial errors and accelerate cash recovery.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.75rem' }}>
          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ padding: '0.85rem', background: 'rgba(59, 130, 246, 0.15)', width: 'fit-content', borderRadius: '12px', marginBottom: '1.25rem', color: '#60a5fa' }}>
              <BookOpen size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: 'white' }}>Digital Cashbook</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Log daily sales and store expenses instantly. Keep an automated running balance without manual arithmetic.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ padding: '0.85rem', background: 'rgba(16, 185, 129, 0.15)', width: 'fit-content', borderRadius: '12px', marginBottom: '1.25rem', color: '#34d399' }}>
              <Users size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: 'white' }}>Udhar Book (Gave/Got)</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Track credit given (*Aap ne Diye*) and payments received (*Aap ko Mile*). Never lose track of pending customer balance.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ padding: '0.85rem', background: 'rgba(139, 92, 246, 0.15)', width: 'fit-content', borderRadius: '12px', marginBottom: '1.25rem', color: '#c084fc' }}>
              <Send size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: 'white' }}>WhatsApp Reminders</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Send professional automated WhatsApp payment reminders with one click to collect dues 3x faster.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ padding: '0.85rem', background: 'rgba(6, 182, 212, 0.15)', width: 'fit-content', borderRadius: '12px', marginBottom: '1.25rem', color: '#22d3ee' }}>
              <FileText size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: 'white' }}>PDF & Excel Reports</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Generate official PDF customer ledgers and daily Cashbook statements for easy printing or sharing.
            </p>
          </div>
        </div>
      </section>

      {/* STATS IMPACT BANNER */}
      <section style={{ margin: '5rem 0' }}>
        <div className="glass-card" style={{ padding: '3rem 2rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 58, 138, 0.4) 100%)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#60a5fa', marginBottom: '0.25rem' }}>50,000+</div>
              <div style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Active Retailers & Merchants</div>
            </div>
            <div>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#34d399', marginBottom: '0.25rem' }}>Rs. 10B+</div>
              <div style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Transactions Logged</div>
            </div>
            <div>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#c084fc', marginBottom: '0.25rem' }}>99.9%</div>
              <div style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Cloud Data Uptime</div>
            </div>
            <div>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#f43f5e', marginBottom: '0.25rem' }}>4.9 ★</div>
              <div style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Merchant Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FOOTER BANNER */}
      <section style={{ margin: '5rem 0 2rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '4rem 2rem', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>
            Ready to Digitize Your Store's Hisab?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Start managing your business cash flow and customer dues seamlessly on desktop and mobile.
          </p>
          <Link href="/dashboard" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Launch Web App Now <ArrowRight size={22} />
          </Link>
        </div>
      </section>
    </div>
  );
}

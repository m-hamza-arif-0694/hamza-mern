import React from 'react';
import { BookOpen, ShieldCheck, Smartphone, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main style={{ padding: '3rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.15)', padding: '0.4rem 1rem', borderRadius: '9999px', color: '#60a5fa', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
          <Zap size={16} /> HisabDo Main Capstone Project Architecture (Day 8)
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem', background: 'linear-gradient(to right, #ffffff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFill-color: 'transparent' }}>
          HisabDo Web Experience & Ecosystem
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Modern Next.js 14 Web Portal, Digital Cashbook, Gave/Got Ledgers, PDF Reports, and MERN Backend API Architecture.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1.5rem' }}>
          <BookOpen size={32} color="#60a5fa" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Digital Cashbook</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Real-time Cash In (+) & Cash Out (-) daily balance tracking with category tagging.</p>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1.5rem' }}>
          <Smartphone size={32} color="#34d399" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Gave / Got Customer Dues</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Udhar ledger book tracking credit given and debit received from customers and vendors.</p>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1.5rem' }}>
          <ShieldCheck size={32} color="#c084fc" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>JWT Security & Reports</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Password hashing, JWT Bearer Token protected APIs, and downloadable PDF/Excel statements.</p>
        </div>
      </div>
    </main>
  );
}

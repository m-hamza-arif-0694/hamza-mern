'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, BookOpen, Building2, ShieldCheck, ArrowRight, 
  CheckCircle2, Sparkles, MessageSquare, Database, Check 
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* HERO BANNER */}
      <section style={{ padding: '4.5rem 1.5rem 3rem', maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Badge variant="purple" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
            ✨ Day 15-19 Specialized Role Module
          </Badge>
          <Badge variant="green" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
            Live DB & Zod Validated
          </Badge>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 900, lineHeight: 1.15, color: 'white', maxWidth: '950px', margin: '0 auto 1.25rem', letterSpacing: '-1px' }}>
          Enterprise Customers & <span style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Khata Udhar Management</span> Module
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '780px', margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
          Designed specifically for Pakistani merchants and retail store owners. Complete full-stack CRUD API routes, Pakistani mobile format enforcement (<code style={{ color: '#34d399' }}>+923xxxxxxxxx</code>), backend Zod schema validation, and WhatsApp payment reminder generator.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/dashboard/customers">
            <Button variant="primary" size="lg" icon={Users}>
              Launch Customer & Khata CRUD →
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary" size="lg" icon={Database}>
              Open Merchant Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* 3 CORE PILLARS SECTION */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>
            Key CRUD Features & Specialist Capabilities
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Built for high-volume transactions with data consistency and security.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Pillar 1 */}
          <Card style={{ padding: '2rem', borderTop: '4px solid #3b82f6' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Users size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
              1. Customer Records CRUD
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Register, edit, search, and delete merchant customer profiles with credit limits, categories (Retail/Wholesale/VIP), opening balances, and live balance badges.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#34d399" /> Add / Edit Customer Profile Modals</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#34d399" /> Cascade Ledger Deletion Protection</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#34d399" /> Dynamic Search & Category Filters</li>
            </ul>
          </Card>

          {/* Pillar 2 */}
          <Card style={{ padding: '2rem', borderTop: '4px solid #10b981' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <BookOpen size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
              2. Khata Ledger & Transactions
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Record Credit (You Gave Udhar) and Payment Received (You Got Wasooli) entries with automatic running net balance recalculation and invoice references.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#34d399" /> Real-time Running Balance Recalculation</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#34d399" /> EasyPaisa / JazzCash / Bank Method Tags</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#34d399" /> Printable Statements & CSV Export</li>
            </ul>
          </Card>

          {/* Pillar 3 */}
          <Card style={{ padding: '2rem', borderTop: '4px solid #8b5cf6' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
              3. Zod Backend Validation Engine
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Comprehensive schema validation rejecting invalid Pakistani mobile formats, negative amounts, or malformed queries before database execution.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#34d399" /> Strict Pakistani Phone Validation</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#34d399" /> Structured JSON 400 Bad Request Errors</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#34d399" /> Safe Mongoose & Memory Store Layer</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}

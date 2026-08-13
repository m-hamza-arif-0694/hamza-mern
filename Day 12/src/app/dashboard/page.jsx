'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, Users, Building2, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';

export default function DashboardOverviewPage() {
  const { user, activeBranch } = useAuth();

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge variant="green" style={{ marginBottom: '0.4rem' }}>
            <ShieldCheck size={14} style={{ display: 'inline', marginRight: '0.3rem' }} /> Authenticated Merchant Session
          </Badge>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>
            Welcome, {user ? user.name : 'Merchant'} 👋
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Active Branch Context: <strong style={{ color: '#60a5fa' }}>{activeBranch ? activeBranch.name : 'Main Shop'}</strong> ({activeBranch ? activeBranch.location : 'Lahore'}).
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link href="/dashboard/cashbook" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="sm">Module 1: Cashbook →</Button>
          </Link>
          <Link href="/dashboard/customers" style={{ textDecoration: 'none' }}>
            <Button variant="success" size="sm">Module 2: Udhar →</Button>
          </Link>
          <Link href="/dashboard/businesses" style={{ textDecoration: 'none' }}>
            <Button variant="purple" size="sm">Module 3: Branches →</Button>
          </Link>
        </div>
      </div>

      {/* METRIC CARDS FOR 3 CORE MODULES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <Card borderLeftColor="#3b82f6">
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>1. Digital Cashbook Balance</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#60a5fa' }}>
            Rs. {activeBranch ? activeBranch.cashBalance.toLocaleString() : '42,500'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '0.4rem' }}>● Module 1 Active (Full CRUD)</div>
        </Card>

        <Card borderLeftColor="#10b981">
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>2. Customer Net Dues (Lena Hai)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>Rs. 43,500</div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '0.4rem' }}>● Module 2 Active (Full CRUD)</div>
        </Card>

        <Card borderLeftColor="#8b5cf6">
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>3. Registered Business Branches</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc' }}>3 Outlets</div>
          <div style={{ fontSize: '0.75rem', color: '#c084fc', marginTop: '0.4rem' }}>● Module 3 Active (Full CRUD)</div>
        </Card>
      </div>

      {/* 3 CORE MODULES NAVIGATOR */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <Card>
          <CardHeader title="Module 1: Digital Cashbook" icon={BookOpen} subtitle="Sales, Expenses & Daily Balances" />
          <CardBody>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Log daily sales and cash outs with real-time validation and Edit Modals.
            </p>
            <Link href="/dashboard/cashbook" style={{ textDecoration: 'none' }}>
              <Button variant="primary" style={{ width: '100%' }}>Launch Cashbook Module →</Button>
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Module 2: Customer Udhar Book" icon={Users} subtitle="Credit/Debit & WhatsApp Reminders" />
          <CardBody>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Track customer accounts with Pakistani phone validation and automated WhatsApp payment reminders.
            </p>
            <Link href="/dashboard/customers" style={{ textDecoration: 'none' }}>
              <Button variant="success" style={{ width: '100%' }}>Launch Udhar Module →</Button>
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Module 3: Multi-Business Branches" icon={Building2} subtitle="Register & Switch Outlets" />
          <CardBody>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Manage multiple shop branches across Lahore, Karachi, and Islamabad with 1-click context switching.
            </p>
            <Link href="/dashboard/businesses" style={{ textDecoration: 'none' }}>
              <Button variant="purple" style={{ width: '100%' }}>Launch Branches Module →</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

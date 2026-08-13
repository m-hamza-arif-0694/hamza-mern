'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Users, Building2, Lock, ArrowRight, ShieldCheck, Zap 
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <section style={{ textAlign: 'center', padding: '4rem 0 3rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Badge variant="blue" style={{ padding: '0.4rem 1.25rem', fontSize: '0.85rem' }}>
            <Zap size={15} style={{ display: 'inline', marginRight: '0.4rem' }} /> Day 12 • 3 Core Modules & Auth Protected Portal
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
          Multi-Branch Digital Bookkeeping <br />
          Built for Retailers & Merchants
        </h1>

        <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '750px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Manage your retail business with 3 core functional modules: **Digital Cashbook**, **Customer Udhar Ledgers**, and **Multi-Business Branch Management** with authenticated session protection.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href={isAuthenticated ? "/dashboard" : "/login"} style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg" icon={ArrowRight}>
              {isAuthenticated ? "Launch Web App Dashboard" : "Sign In to Merchant Portal"}
            </Button>
          </Link>
          <Link href="/register" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" size="lg">Register New Shop</Button>
          </Link>
        </div>
      </section>

      {/* 3 CORE MODULES SHOWCASE */}
      <section style={{ margin: '4rem 0' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '2.5rem' }}>
          3 Core Functional Modules
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          <Card borderLeftColor="#3b82f6">
            <CardHeader title="Module 1: Digital Cashbook" icon={BookOpen} subtitle="Full CRUD Cash Log" />
            <CardBody>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Log cash in and cash out with real-time validation, category filters, Edit Modals, and instant running balances.
              </p>
              <Link href="/dashboard/cashbook" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="sm">Open Module 1 →</Button>
              </Link>
            </CardBody>
          </Card>

          <Card borderLeftColor="#10b981">
            <CardHeader title="Module 2: Udhar Customer Book" icon={Users} subtitle="Full CRUD Customer Dues" />
            <CardBody>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Track customer credit with Pakistani phone validation (`+923xxxxxxxxx`) and automated WhatsApp payment reminder modals.
              </p>
              <Link href="/dashboard/customers" style={{ textDecoration: 'none' }}>
                <Button variant="success" size="sm">Open Module 2 →</Button>
              </Link>
            </CardBody>
          </Card>

          <Card borderLeftColor="#8b5cf6">
            <CardHeader title="Module 3: Multi-Business Branches" icon={Building2} subtitle="Full CRUD Branch Management" />
            <CardBody>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Register multiple shop locations (Lahore, Karachi, Islamabad) with Edit Modals and 1-click active branch context switching.
              </p>
              <Link href="/dashboard/businesses" style={{ textDecoration: 'none' }}>
                <Button variant="purple" size="sm">Open Module 3 →</Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
}

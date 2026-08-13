'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Users, Building2, Lock, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function FeaturesPage() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <Badge variant="purple" style={{ marginBottom: '1rem' }}>Day 12 • 3 Core Functional Modules</Badge>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          Functional Web Application Architecture
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
          Explore our 3 core CRUD modules and authentication-protected user portal.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <Card borderLeftColor="#3b82f6">
          <CardHeader title="1. Digital Cashbook CRUD" icon={BookOpen} />
          <CardBody>
            <p style={{ color: '#94a3b8', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Log daily sales and expenses with real-time form validation. Edit entries via pop-up modal dialog and recalculate balances instantly.
            </p>
            <Link href="/dashboard/cashbook" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="sm">Open Module 1 →</Button>
            </Link>
          </CardBody>
        </Card>

        <Card borderLeftColor="#10b981">
          <CardHeader title="2. Customer Udhar Book CRUD" icon={Users} />
          <CardBody>
            <p style={{ color: '#94a3b8', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Manage customer credit/debit records with Pakistani phone validation (`+923xxxxxxxxx`) and generate WhatsApp payment reminder modals.
            </p>
            <Link href="/dashboard/customers" style={{ textDecoration: 'none' }}>
              <Button variant="success" size="sm">Open Module 2 →</Button>
            </Link>
          </CardBody>
        </Card>

        <Card borderLeftColor="#8b5cf6">
          <CardHeader title="3. Multi-Business Branches CRUD" icon={Building2} />
          <CardBody>
            <p style={{ color: '#94a3b8', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Register new shop locations, edit branch details via modal dialog, and switch active branch context seamlessly across the entire Web App.
            </p>
            <Link href="/dashboard/businesses" style={{ textDecoration: 'none' }}>
              <Button variant="purple" size="sm">Open Module 3 →</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

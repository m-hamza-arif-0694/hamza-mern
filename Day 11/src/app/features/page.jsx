'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Users, Send, FileBarChart, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState('cashbook');

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <Badge variant="purple" style={{ marginBottom: '1rem' }}>Full CRUD Capabilities</Badge>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          Functional Web Application Modules
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
          Explore complete CRUD operations (Create, Read, Edit Modal, Delete) and state handling across all core pillars.
        </p>
      </div>

      <nav style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <Button variant={activeTab === 'cashbook' ? 'primary' : 'secondary'} onClick={() => setActiveTab('cashbook')} icon={BookOpen}>
          1. Cashbook CRUD Module
        </Button>
        <Button variant={activeTab === 'udhar' ? 'success' : 'secondary'} onClick={() => setActiveTab('udhar')} icon={Users}>
          2. Udhar Ledger CRUD Module
        </Button>
        <Button variant={activeTab === 'reports' ? 'purple' : 'secondary'} onClick={() => setActiveTab('reports')} icon={FileBarChart}>
          3. Reports & Analytics
        </Button>
      </nav>

      {activeTab === 'cashbook' && (
        <Card className="animate-fade-in" style={{ padding: '2.5rem' }}>
          <CardHeader title="Digital Cashbook CRUD Module" subtitle="Create, Read, Edit Modal & Delete" icon={BookOpen} />
          <CardBody>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Log daily sales and expenses with real-time form validation. Edit transactions via pop-up modal and view instant running cash calculations.
            </p>
            <Link href="/dashboard/cashbook" style={{ textDecoration: 'none' }}>
              <Button variant="primary" icon={ArrowRight}>Open Cashbook Module →</Button>
            </Link>
          </CardBody>
        </Card>
      )}

      {activeTab === 'udhar' && (
        <Card className="animate-fade-in" style={{ padding: '2.5rem' }}>
          <CardHeader title="Customer Udhar Book CRUD Module" subtitle="Full Customer Account CRUD & WhatsApp Reminders" icon={Users} />
          <CardBody>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Manage customer credit/debit records with Pakistani phone validation (`+923xxxxxxxxx`). Edit customer profiles via modal dialog and trigger WhatsApp payment reminder templates.
            </p>
            <Link href="/dashboard/customers" style={{ textDecoration: 'none' }}>
              <Button variant="success" icon={ArrowRight}>Open Udhar Module →</Button>
            </Link>
          </CardBody>
        </Card>
      )}

      {activeTab === 'reports' && (
        <Card className="animate-fade-in" style={{ padding: '2.5rem' }}>
          <CardHeader title="Financial Reports & Analytics" subtitle="PDF & Excel Export Statements" icon={FileBarChart} />
          <CardBody>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Filter financial reports by custom date ranges and export official PDF customer statements or Excel CSV ledgers.
            </p>
            <Link href="/dashboard/reports" style={{ textDecoration: 'none' }}>
              <Button variant="primary" icon={ArrowRight}>Open Reports Module →</Button>
            </Link>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Users, Send, FileBarChart, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState('cashbook');

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <Badge variant="purple" style={{ marginBottom: '1rem' }}>Functional Feature Specification</Badge>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          HisabDo Core Features & Modules
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
          Explore our production-ready functional modules designed for accuracy, speed, and effortless debt recovery.
        </p>
      </div>

      <nav style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <Button variant={activeTab === 'cashbook' ? 'primary' : 'secondary'} onClick={() => setActiveTab('cashbook')} icon={BookOpen}>
          1. Digital Cashbook
        </Button>
        <Button variant={activeTab === 'udhar' ? 'success' : 'secondary'} onClick={() => setActiveTab('udhar')} icon={Users}>
          2. Customer Udhar Book
        </Button>
        <Button variant={activeTab === 'whatsapp' ? 'purple' : 'secondary'} onClick={() => setActiveTab('whatsapp')} icon={Send}>
          3. WhatsApp Reminders
        </Button>
      </nav>

      {activeTab === 'cashbook' && (
        <Card className="animate-fade-in" style={{ padding: '2.5rem' }}>
          <CardHeader title="Real-Time Digital Cashbook" subtitle="Functional Module 01" icon={BookOpen} />
          <CardBody>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Log daily sales and store expenses instantly. Features real-time form validation and automatic running cash calculations.
            </p>
            <Link href="/dashboard/cashbook" style={{ textDecoration: 'none' }}>
              <Button variant="primary" icon={ArrowRight}>Open Cashbook Module →</Button>
            </Link>
          </CardBody>
        </Card>
      )}

      {activeTab === 'udhar' && (
        <Card className="animate-fade-in" style={{ padding: '2.5rem' }}>
          <CardHeader title="Customer Udhar Ledgers" subtitle="Functional Module 02" icon={Users} />
          <CardBody>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Track credit given (*Aap ne Diye*) and debit received (*Aap ko Mile*). Features Pakistani phone validation and balance tracking.
            </p>
            <Link href="/dashboard/customers" style={{ textDecoration: 'none' }}>
              <Button variant="success" icon={ArrowRight}>Open Udhar Module →</Button>
            </Link>
          </CardBody>
        </Card>
      )}

      {activeTab === 'whatsapp' && (
        <Card className="animate-fade-in" style={{ padding: '2.5rem' }}>
          <CardHeader title="WhatsApp Payment Reminders" subtitle="Automated Customer Dues Recovery" icon={Send} />
          <CardBody>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Generate pre-filled polite payment reminder templates and trigger WhatsApp Web / Mobile directly from customer rows.
            </p>
            <Link href="/dashboard/customers" style={{ textDecoration: 'none' }}>
              <Button variant="primary" icon={ArrowRight}>Test Reminder Modal →</Button>
            </Link>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

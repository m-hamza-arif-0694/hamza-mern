'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, Monitor, QrCode } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function DownloadPage() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <Badge variant="blue" style={{ marginBottom: '1rem' }}>Multi-Platform Availability</Badge>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          Download HisabDo App
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Available on Android, iPhone, desktop browsers, and as a Progressive Web App (PWA).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <Card style={{ textAlign: 'center' }}>
          <Smartphone size={40} color="#34d399" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Android App</h2>
          <div style={{ background: 'white', padding: '1rem', width: 'fit-content', margin: '1rem auto', borderRadius: '12px' }}>
            <QrCode size={110} color="#090d16" />
          </div>
          <Button variant="success" style={{ width: '100%' }}>Download APK / Play Store</Button>
        </Card>

        <Card style={{ textAlign: 'center' }}>
          <Monitor size={40} color="#60a5fa" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Desktop Web App</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Run directly in your browser with zero installation.</p>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <Button variant="primary" style={{ width: '100%' }}>Launch Web App →</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}

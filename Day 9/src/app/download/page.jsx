'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, Monitor, QrCode, ArrowRight, ShieldCheck, Download } from 'lucide-react';

export default function DownloadPage() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span className="badge-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>Cross-Platform Access</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          Get HisabDo on Any Device
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
          Use HisabDo on your Android smartphone, iPhone, desktop Web App, or install as a Progressive Web App (PWA).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Android Card */}
        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.15)', width: 'fit-content', borderRadius: '16px', margin: '0 auto 1.5rem', color: '#34d399' }}>
            <Smartphone size={36} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Google Play Store</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Download for Android smartphones & tablets.</p>
          <div style={{ background: 'white', padding: '1rem', width: 'fit-content', margin: '0 auto 1.5rem', borderRadius: '12px' }}>
            <QrCode size={120} color="#090d16" />
          </div>
          <button className="btn-success" style={{ width: '100%' }}>
            <Download size={18} /> Download APK / Play Store
          </button>
        </div>

        {/* Web App Desktop Card */}
        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.15)', width: 'fit-content', borderRadius: '16px', margin: '0 auto 1.5rem', color: '#60a5fa' }}>
            <Monitor size={36} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Desktop Web App</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>No installation required. Open instantly in browser.</p>
          <div style={{ height: '144px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <span style={{ color: '#60a5fa', fontWeight: 700, fontSize: '1.1rem' }}>Next.js Web Portal Active</span>
          </div>
          <Link href="/dashboard" className="btn-primary" style={{ width: '100%' }}>
            Launch Web App <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

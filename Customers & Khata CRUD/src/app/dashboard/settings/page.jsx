'use client';

import React, { useState } from 'react';
import { Settings, User, Lock, Store, Shield, CheckCircle2, KeyRound } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';
import { useAuth } from '../../../context/AuthContext';
import { SuccessBanner } from '../../../components/ui/StateAlert';

export default function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Muhammad Hamza Arif');
  const [shopName, setShopName] = useState(user?.shopName || 'Hamza Electronics Group');
  const [phone, setPhone] = useState('+923001234567');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSuccessMsg('Merchant profile settings updated successfully.');
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge variant="blue" style={{ marginBottom: '0.4rem' }}>Merchant Profile & System</Badge>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'white' }}>Settings & Profile</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>Manage your merchant profile, default currency, and security credentials.</p>
        </div>
      </div>

      <SuccessBanner message={successMsg} onDismiss={() => setSuccessMsg('')} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <Card>
          <CardHeader title="Merchant Store Profile" subtitle="Your business details appearing on statements" icon={Store} />
          <CardBody>
            <form onSubmit={handleSave}>
              <Input label="Merchant Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Primary Shop / Business Name" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
              <Input label="Primary WhatsApp / Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '0.5rem' }}>Save Profile</Button>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Security & Authentication" subtitle="Zod validation and session token active" icon={Shield} />
          <CardBody>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Active Role</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#60a5fa', marginTop: '0.2rem' }}>Customers & Khata CRUD Specialist</div>
              <div style={{ fontSize: '0.8rem', color: '#34d399', marginTop: '0.2rem' }}>● Validated JSON Schemas Enabled</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Button variant="secondary" icon={KeyRound} onClick={() => alert('Password reset link generated.')}>
                Change Account Password
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

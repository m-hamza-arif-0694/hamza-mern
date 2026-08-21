'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useAuth } from '../../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('hamza.merchant@hisabdo.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      router.push('/dashboard/customers');
    }, 500);
  };

  return (
    <div style={{ maxWidth: '440px', margin: '3rem auto', padding: '1rem' }} className="animate-fade-in">
      <Card style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
          }}>
            <BookOpen size={24} color="white" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>Merchant Sign In</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.25rem' }}>Access your Customer Udhar & Khata Dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
            <Link href="/forgot-password" style={{ color: '#60a5fa', fontSize: '0.82rem', textDecoration: 'none' }}>
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" variant="primary" size="lg" style={{ width: '100%' }} loading={loading} icon={ArrowRight}>
            Sign In to Portal
          </Button>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
            Don't have an account?{' '}
            <Link href="/register" style={{ color: '#60a5fa', fontWeight: 600, textDecoration: 'none' }}>
              Register Shop
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

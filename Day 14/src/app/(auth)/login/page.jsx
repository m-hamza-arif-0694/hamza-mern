'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, KeyRound } from 'lucide-react';
import { Card, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';
import { useAuth } from '../../../context/AuthContext';
import { validateEmail, validatePassword } from '../../../lib/validation';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('hamza.merchant@hisabdo.com');
  const [password, setPassword] = useState('hisabdo123');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      login(email, password);
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div style={{ maxWidth: '440px', margin: '4rem auto', padding: '0 1.5rem' }} className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Badge variant="blue" style={{ marginBottom: '0.5rem' }}>Day 13 Auth Foundation</Badge>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>Merchant Sign In</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Access your 3 core modules and business branch ledgers.</p>
      </div>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              placeholder="merchant@hisabdo.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              error={errors.email}
              icon={Mail}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              error={errors.password}
              icon={Lock}
              required
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
              <Link href="/forgot-password" style={{ color: '#60a5fa', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <KeyRound size={14} /> Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              style={{ width: '100%' }}
              icon={ArrowRight}
            >
              Sign In to Web App
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.85rem', color: '#94a3b8' }}>
            New shopkeeper?{' '}
            <Link href="/register" style={{ color: '#60a5fa', fontWeight: 700, textDecoration: 'none' }}>
              Create Merchant Account →
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

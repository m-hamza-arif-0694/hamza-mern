'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Building2, ArrowRight } from 'lucide-react';
import { Card, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';
import { useAuth } from '../../../context/AuthContext';
import { validateEmail, validatePassword, validatePasswordMatch, validateRequired } from '../../../lib/validation';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameErr = validateRequired(name, 'Full Name');
    const shopErr = validateRequired(shopName, 'Shop Name');
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const matchErr = validatePasswordMatch(password, confirmPassword);

    if (nameErr || shopErr || emailErr || passErr || matchErr) {
      setErrors({ name: nameErr, shopName: shopErr, email: emailErr, password: passErr, confirmPassword: matchErr });
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      register({ name, shopName, email, password });
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div style={{ maxWidth: '480px', margin: '3.5rem auto', padding: '0 1.5rem' }} className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Badge variant="purple" style={{ marginBottom: '0.5rem' }}>Merchant Onboarding</Badge>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>Register Your Shop</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Join HisabDo and manage multi-branch cashbooks & Udhar ledgers.</p>
      </div>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Input
              label="Merchant Full Name"
              placeholder="e.g. Muhammad Hamza Arif"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: null });
              }}
              error={errors.name}
              icon={User}
              required
            />

            <Input
              label="Business / Shop Name"
              placeholder="e.g. Hamza Electronics & Mobiles"
              value={shopName}
              onChange={(e) => {
                setShopName(e.target.value);
                if (errors.shopName) setErrors({ ...errors, shopName: null });
              }}
              error={errors.shopName}
              icon={Building2}
              required
            />

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
              label="Create Password"
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

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
              }}
              error={errors.confirmPassword}
              icon={Lock}
              required
            />

            <Button
              type="submit"
              variant="success"
              loading={loading}
              style={{ width: '100%', marginTop: '0.5rem' }}
              icon={ArrowRight}
            >
              Create Merchant Account
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.85rem', color: '#94a3b8' }}>
            Already registered?{' '}
            <Link href="/login" style={{ color: '#60a5fa', fontWeight: 700, textDecoration: 'none' }}>
              Sign In Here →
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

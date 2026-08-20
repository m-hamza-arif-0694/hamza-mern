'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Store, Mail, Lock, User, Phone, ArrowRight, BookOpen } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useAuth } from '../../../context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: 'Hamza Arif',
    shopName: 'Hamza Retail Traders',
    email: 'hamza.merchant@hisabdo.com',
    phone: '+923001234567',
    password: 'password123'
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      register(formData);
      router.push('/dashboard/customers');
    }, 500);
  };

  return (
    <div style={{ maxWidth: '480px', margin: '2.5rem auto', padding: '1rem' }} className="animate-fade-in">
      <Card style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>Register Merchant Account</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.25rem' }}>Start managing your customer khata ledgers online</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input label="Your Full Name" name="name" value={formData.name} onChange={handleChange} icon={User} required />
          <Input label="Shop / Business Name" name="shopName" value={formData.shopName} onChange={handleChange} icon={Store} required />
          <Input label="Pakistani Phone Number" name="phone" value={formData.phone} onChange={handleChange} icon={Phone} required />
          <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} icon={Mail} required />
          <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} icon={Lock} required />

          <Button type="submit" variant="success" size="lg" style={{ width: '100%', marginTop: '0.5rem' }} loading={loading} icon={ArrowRight}>
            Create Merchant Account
          </Button>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#60a5fa', fontWeight: 600, textDecoration: 'none' }}>
              Sign In
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

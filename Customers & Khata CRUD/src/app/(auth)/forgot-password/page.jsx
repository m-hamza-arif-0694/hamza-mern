'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KeyRound, Mail, Lock, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!email) return;
    setStep(2);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div style={{ maxWidth: '440px', margin: '3rem auto', padding: '1rem' }} className="animate-fade-in">
      <Card style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.15)',
            color: '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <KeyRound size={24} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>Reset Password</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.25rem' }}>
            {step === 1 ? 'Enter your registered email to receive OTP' : 'Enter 6-digit OTP and new password'}
          </p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <CheckCircle2 size={48} color="#34d399" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '0.5rem' }}>Password Reset Successful!</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1.5rem' }}>You can now sign in with your new credentials.</p>
            <Link href="/login">
              <Button variant="primary" style={{ width: '100%' }}>Return to Sign In</Button>
            </Link>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleSendOTP}>
            <Input label="Email Address" type="email" placeholder="merchant@hisabdo.com" value={email} onChange={(e) => setEmail(e.target.value)} icon={Mail} required />
            <Button type="submit" variant="primary" size="lg" style={{ width: '100%', marginTop: '0.5rem' }} icon={ArrowRight}>
              Send Verification OTP
            </Button>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link href="/login" style={{ color: '#94a3b8', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <Input label="6-Digit SMS / Email OTP" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <Input label="New Password" type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} icon={Lock} required />
            <Button type="submit" variant="success" size="lg" style={{ width: '100%', marginTop: '0.5rem' }}>
              Update Password
            </Button>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.85rem', cursor: 'pointer' }}>
                ← Change Email Address
              </button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}

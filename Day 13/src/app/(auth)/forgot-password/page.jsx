'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, KeyRound, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';
import { SuccessBanner, ErrorState } from '../../../components/ui/StateAlert';
import { useAuth } from '../../../context/AuthContext';
import { validateEmail, validatePassword, validatePasswordMatch, validateOTP } from '../../../lib/validation';

export default function ForgotPasswordPage() {
  const { requestPasswordReset, resetPasswordWithOTP } = useAuth();

  const [step, setStep] = useState(1); // Step 1: Request Email, Step 2: Enter OTP & New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // STEP 1: Request Reset Code
  const handleRequestReset = (e) => {
    e.preventDefault();
    const emailErr = validateEmail(email);

    if (emailErr) {
      setErrors({ email: emailErr });
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      requestPasswordReset(email);
      setLoading(false);
      setStep(2);
    }, 600);
  };

  // STEP 2: Verify OTP & Save New Password
  const handleResetPassword = (e) => {
    e.preventDefault();
    const otpErr = validateOTP(otp);
    const passErr = validatePassword(newPassword);
    const matchErr = validatePasswordMatch(newPassword, confirmPassword);

    if (otpErr || passErr || matchErr) {
      setErrors({ otp: otpErr, newPassword: passErr, confirmPassword: matchErr });
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      resetPasswordWithOTP(otp, newPassword);
      setLoading(false);
      setSuccessMessage('Your password has been successfully reset! You can now sign in with your new credentials.');
      setStep(3); // Success Screen
    }, 600);
  };

  return (
    <div style={{ maxWidth: '450px', margin: '4rem auto', padding: '0 1.5rem' }} className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Badge variant="yellow" style={{ marginBottom: '0.5rem' }}>
          <KeyRound size={13} style={{ display: 'inline', marginRight: '0.3rem' }} /> Password Recovery Workflow
        </Badge>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>Reset Account Password</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          {step === 1 ? 'Step 1 of 2: Enter your merchant email' : step === 2 ? 'Step 2 of 2: Verification code & new password' : 'Password Reset Complete'}
        </p>
      </div>

      <Card>
        <CardBody>
          {step === 1 && (
            <form onSubmit={handleRequestReset}>
              <Input
                label="Registered Merchant Email"
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
                helperText="We will send a 4-digit verification code to this email."
              />

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                style={{ width: '100%', marginTop: '0.5rem' }}
                icon={ArrowRight}
              >
                Send 4-Digit Code →
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword}>
              <div style={{ background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '0.85rem', borderRadius: '10px', marginBottom: '1.25rem', fontSize: '0.85rem', color: '#93c5fd' }}>
                🔑 Verification code sent to <strong>{email}</strong>. (Demo Code: <strong>1234</strong>)
              </div>

              <Input
                label="4-Digit Verification Code (OTP)"
                type="text"
                placeholder="e.g. 1234"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  if (errors.otp) setErrors({ ...errors, otp: null });
                }}
                error={errors.otp}
                icon={KeyRound}
                required
              />

              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errors.newPassword) setErrors({ ...errors, newPassword: null });
                }}
                error={errors.newPassword}
                icon={Lock}
                required
              />

              <Input
                label="Confirm New Password"
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
                icon={CheckCircle2}
              >
                Save New Password & Continue
              </Button>
            </form>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <SuccessBanner message={successMessage} />
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button variant="primary" style={{ width: '100%', marginTop: '1rem' }} icon={ArrowRight}>
                  Return to Sign In Page →
                </Button>
              </Link>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.85rem', color: '#94a3b8' }}>
            Remembered your password?{' '}
            <Link href="/login" style={{ color: '#60a5fa', fontWeight: 700, textDecoration: 'none' }}>
              Back to Sign In →
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

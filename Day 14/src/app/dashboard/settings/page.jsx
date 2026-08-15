'use client';

import React, { useState } from 'react';
import { 
  User, ShieldCheck, Lock, Building2, Bell, Save, CheckCircle2, KeyRound 
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Badge from '../../../components/ui/Badge';
import { useAuth } from '../../../context/AuthContext';
import { validateRequired, validateEmail } from '../../../lib/validation';

export default function UserProfileSettingsPage() {
  const { user, activeBranch } = useAuth();

  const [name, setName] = useState(user ? user.name : 'Muhammad Hamza Arif');
  const [email, setEmail] = useState(user ? user.email : 'hamza.merchant@hisabdo.app');
  const [shopName, setShopName] = useState(activeBranch ? activeBranch.name : 'Hamza Electronics & Supply');
  const [phone, setPhone] = useState('+923001234567');
  const [currency, setCurrency] = useState('PKR');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [savedSuccessMessage, setSavedSuccessMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const nameErr = validateRequired(name, 'Full Name');
    const emailErr = validateEmail(email);

    if (nameErr || emailErr) {
      setErrors({ name: nameErr, email: emailErr });
      return;
    }
    setErrors({});
    setSavedSuccessMessage('Profile and business preferences updated successfully!');
    setTimeout(() => setSavedSuccessMessage(null), 3000);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const oldErr = validateRequired(oldPassword, 'Current Password');
    const newErr = validateRequired(newPassword, 'New Password');
    
    if (oldErr || newErr) {
      setPasswordErrors({ old: oldErr, new: newErr });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordErrors({ confirm: 'New passwords do not match' });
      return;
    }

    setPasswordErrors({});
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSavedSuccessMessage('Security password changed successfully!');
    setTimeout(() => setSavedSuccessMessage(null), 3000);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge variant="blue" style={{ marginBottom: '0.4rem' }}>Merchant Profile & Preferences</Badge>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>User Profile & Settings</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Manage merchant account details, security credentials, and business preferences.</p>
        </div>
      </div>

      {savedSuccessMessage && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <CheckCircle2 size={20} />
          <div style={{ fontWeight: 700 }}>{savedSuccessMessage}</div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* TOP: USER PROFILE & BUSINESS DETAILS FORM */}
        <Card>
          <CardHeader title="Merchant Account Information" subtitle="Update owner profile & shop contact details" icon={User} />
          <CardBody>
            <form onSubmit={handleSaveProfile}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <Input
                  label="Merchant Full Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: null });
                  }}
                  error={errors.name}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  error={errors.email}
                  required
                />
                <Input
                  label="Primary Shop / Business Name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  icon={Building2}
                  required
                />
                <Input
                  label="Official Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <Select
                label="Primary Business Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                options={[
                  { label: 'PKR — Pakistani Rupee (Rs.)', value: 'PKR' },
                  { label: 'USD — US Dollar ($)', value: 'USD' },
                  { label: 'AED — UAE Dirham (AED)', value: 'AED' }
                ]}
              />

              <Button type="submit" variant="primary" icon={Save} style={{ marginTop: '1rem' }}>
                Save Profile Changes
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* BOTTOM: SECURITY & PASSWORD UPDATE */}
        <Card>
          <CardHeader title="Security & Credentials" subtitle="Change login password and authentication security" icon={ShieldCheck} />
          <CardBody>
            <form onSubmit={handleUpdatePassword}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <Input
                  label="Current Password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  error={passwordErrors.old}
                  icon={Lock}
                  required
                />
                <Input
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={passwordErrors.new}
                  icon={KeyRound}
                  required
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={passwordErrors.confirm}
                  icon={KeyRound}
                  required
                />
              </div>

              <Button type="submit" variant="secondary" icon={Lock}>
                Update Security Password
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

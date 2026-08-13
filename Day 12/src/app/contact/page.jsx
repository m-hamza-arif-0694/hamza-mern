'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { validateEmail, validateRequired } from '../../lib/validation';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameErr = validateRequired(name, 'Full Name');
    const emailErr = validateEmail(email);
    const msgErr = validateRequired(message, 'Message');

    if (nameErr || emailErr || msgErr) {
      setErrors({ name: nameErr, email: emailErr, message: msgErr });
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <Badge variant="purple" style={{ marginBottom: '1rem' }}>Support & Helpdesk</Badge>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          Contact HisabDo Support
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Need custom multi-branch onboarding or technical assistance? Send us an inquiry.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', flexWrap: 'wrap' }}>
        <Card>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>Direct Support Channels</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Mail size={22} color="#60a5fa" />
              <div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Support Email</div>
                <div style={{ fontWeight: 700, color: 'white' }}>hisabdo.app@gmail.com</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Phone size={22} color="#34d399" />
              <div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>WhatsApp Support</div>
                <div style={{ fontWeight: 700, color: 'white' }}>+92 (300) 123-4567</div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <CheckCircle2 size={48} color="#34d399" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Inquiry Submitted!</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Thank you. Our team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>Validated Support Form</h2>
              
              <Input
                label="Full Name"
                placeholder="e.g. Hamza Arif"
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
                placeholder="merchant@hisabdo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                error={errors.email}
                required
              />

              <Input
                label="Message"
                placeholder="Describe your question..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors({ ...errors, message: null });
                }}
                error={errors.message}
                required
              />

              <Button type="submit" variant="primary" style={{ width: '100%' }} icon={Send}>
                Submit Support Form
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}

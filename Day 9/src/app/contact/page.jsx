'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span className="badge-purple" style={{ marginBottom: '1rem', display: 'inline-block' }}>24/7 Merchant Support</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          We're Here to Help Your Business
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Have questions about HisabDo setup or need assistance? Reach out to our support team.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', flexWrap: 'wrap' }}>
        {/* Contact Info */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>Get in Touch</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '10px', color: '#60a5fa' }}>
                <Mail size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Email Support</div>
                <div style={{ fontWeight: 700, color: 'white' }}>hisabdo.app@gmail.com</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '10px', color: '#34d399' }}>
                <Phone size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Phone / WhatsApp</div>
                <div style={{ fontWeight: 700, color: 'white' }}>+92 (300) 123-4567</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '10px', color: '#c084fc' }}>
                <MapPin size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Headquarters</div>
                <div style={{ fontWeight: 700, color: 'white' }}>Lahore, Punjab, Pakistan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <CheckCircle2 size={48} color="#34d399" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Message Sent Successfully!</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Our team will respond to your email within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>Send Us a Message</h2>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Your Full Name</label>
                <input type="text" placeholder="e.g. Hamza Arif" className="input-field" required />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Shop / Business Name</label>
                <input type="text" placeholder="e.g. Hamza Electronics" className="input-field" required />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Email Address</label>
                <input type="email" placeholder="merchant@hisabdo.com" className="input-field" required />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Your Message</label>
                <textarea placeholder="Describe your question or requirement..." className="input-field" style={{ minHeight: '110px', resize: 'vertical' }} required></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                <Send size={18} /> Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

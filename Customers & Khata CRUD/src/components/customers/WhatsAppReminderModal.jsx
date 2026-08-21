'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Copy, Check, ExternalLink } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function WhatsAppReminderModal({ isOpen, onClose, customer }) {
  const [templateType, setTemplateType] = useState('polite');
  const [copied, setCopied] = useState(false);

  if (!customer) return null;

  const dueAmount = customer.netBalance > 0 ? customer.netBalance : 0;
  const formattedPhone = customer.phone.replace(/[^0-9]/g, '');
  const cleanPkPhone = formattedPhone.startsWith('92') 
    ? formattedPhone 
    : formattedPhone.startsWith('03') 
      ? '92' + formattedPhone.substring(1) 
      : '92' + formattedPhone;

  const templates = {
    polite: `Assalam-o-Alaikum ${customer.name} Sahab,\n\nThis is a friendly reminder from Hamza Electronics & Retail Group regarding your pending HisabDo ledger balance of Rs. ${dueAmount.toLocaleString()}.\n\nKindly arrange the payment at your earliest convenience. Shukriya!\n\nRegards,\nHisabDo Digital Ledger Portal`,
    
    urgent: `Muhtaram ${customer.name} Sahab,\n\nYour account shows an overdue pending balance of Rs. ${dueAmount.toLocaleString()} in our digital ledger.\n\nPlease clear the outstanding dues promptly to ensure continuous credit and smooth deliveries.\n\nBank Account Details:\nBank: Meezan Bank Ltd\nAccount: 0102-0103445588\nTitle: Hamza Retail Traders\n\nJazakAllah!`,
    
    statement: `HisabDo Official Ledger Statement\nCustomer: ${customer.name}\nPhone: ${customer.phone}\nCity: ${customer.city || 'Lahore'}\nStatus: Active\n\nTotal Net Due (Receivable): Rs. ${dueAmount.toLocaleString()}\nCredit Limit: Rs. ${(customer.creditLimit || 0).toLocaleString()}\nStatement Date: ${new Date().toLocaleDateString('en-PK', { dateStyle: 'long' })}\n\nThank you for doing business with us!`
  };

  const currentMessage = templates[templateType];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(currentMessage);
    const url = `https://wa.me/${cleanPkPhone}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="💬 WhatsApp Dues Reminder & Statements" maxWidth="580px">
      <div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setTemplateType('polite')}
            style={{
              flex: 1,
              padding: '0.6rem 0.8rem',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: templateType === 'polite' ? '#10b981' : 'rgba(255,255,255,0.1)',
              background: templateType === 'polite' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15, 23, 42, 0.6)',
              color: templateType === 'polite' ? '#6ee7b7' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            🤝 Friendly Reminder
          </button>

          <button
            type="button"
            onClick={() => setTemplateType('urgent')}
            style={{
              flex: 1,
              padding: '0.6rem 0.8rem',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: templateType === 'urgent' ? '#f59e0b' : 'rgba(255,255,255,0.1)',
              background: templateType === 'urgent' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(15, 23, 42, 0.6)',
              color: templateType === 'urgent' ? '#fde68a' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            ⚠️ Overdue Notice + Bank
          </button>

          <button
            type="button"
            onClick={() => setTemplateType('statement')}
            style={{
              flex: 1,
              padding: '0.6rem 0.8rem',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: templateType === 'statement' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
              background: templateType === 'statement' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(15, 23, 42, 0.6)',
              color: templateType === 'statement' ? '#93c5fd' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            📄 Formal Statement
          </button>
        </div>

        {/* Message Preview Box */}
        <div style={{
          background: '#090d16',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '12px',
          padding: '1.25rem',
          color: '#e2e8f0',
          fontSize: '0.88rem',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          marginBottom: '1.25rem',
          position: 'relative'
        }}>
          <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            📱 WhatsApp Message Preview to {customer.phone}
          </div>
          {currentMessage}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Button variant="secondary" size="sm" icon={copied ? Check : Copy} onClick={handleCopy}>
            {copied ? 'Copied to Clipboard!' : 'Copy Text'}
          </Button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button variant="success" size="sm" icon={Send} onClick={handleOpenWhatsApp}>
              Send via WhatsApp Web →
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

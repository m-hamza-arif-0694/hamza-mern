'use client';

import React, { useState, useEffect } from 'react';
import { MinusCircle, PlusCircle, DollarSign, Calendar, FileText, Save } from 'lucide-react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

export default function EditKhataEntryModal({ isOpen, onClose, customer, entry, onEntryUpdated }) {
  const [type, setType] = useState('GAVE_CREDIT');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [billNumber, setBillNumber] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (entry) {
      setType(entry.type === 'GAVE_CREDIT' || entry.type === 'gave' ? 'GAVE_CREDIT' : 'GOT_PAYMENT');
      setAmount(String(entry.amount || ''));
      setPaymentMethod(entry.paymentMethod || 'Cash');
      setBillNumber(entry.billNumber || '');
      setDescription(entry.description || '');
      setDate(entry.date ? new Date(entry.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
      setErrors({});
      setServerError('');
    }
  }, [entry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer || !entry) return;

    setErrors({});
    setServerError('');
    setLoading(true);

    try {
      const payload = {
        type,
        amount: Number(amount),
        paymentMethod,
        billNumber: billNumber || '',
        description: description || '',
        date: new Date(date).toISOString()
      };

      const res = await fetch(`/api/customers/${customer._id || customer.id}/khata/${entry._id || entry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.message || 'Failed to update transaction');
        }
        setLoading(false);
        return;
      }

      onEntryUpdated(data.data, data.customer);
      onClose();
    } catch (err) {
      setServerError(err.message || 'Network error updating transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="✏️ Edit Khata Transaction Entry" maxWidth="540px">
      <form onSubmit={handleSubmit}>
        {serverError && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            ⚠️ {serverError}
          </div>
        )}

        {/* Transaction Type Segmented Toggle */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600 }}>
            Transaction Type
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setType('GAVE_CREDIT')}
              style={{
                padding: '0.75rem',
                borderRadius: '10px',
                border: '2px solid',
                borderColor: type === 'GAVE_CREDIT' ? '#ef4444' : 'rgba(255,255,255,0.08)',
                background: type === 'GAVE_CREDIT' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                color: type === 'GAVE_CREDIT' ? '#fca5a5' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <MinusCircle size={16} color="#ef4444" />
              You Gave (Credit)
            </button>

            <button
              type="button"
              onClick={() => setType('GOT_PAYMENT')}
              style={{
                padding: '0.75rem',
                borderRadius: '10px',
                border: '2px solid',
                borderColor: type === 'GOT_PAYMENT' ? '#10b981' : 'rgba(255,255,255,0.08)',
                background: type === 'GOT_PAYMENT' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                color: type === 'GOT_PAYMENT' ? '#6ee7b7' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <PlusCircle size={16} color="#10b981" />
              You Got (Payment)
            </button>
          </div>
        </div>

        <Input
          label="Transaction Amount (PKR)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          icon={DollarSign}
          error={errors.amount}
          required
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <Select
            label="Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            options={[
              { value: 'Cash', label: '💵 Cash' },
              { value: 'Bank Transfer', label: '🏦 Bank Transfer' },
              { value: 'EasyPaisa', label: '📱 EasyPaisa' },
              { value: 'JazzCash', label: '⚡ JazzCash' },
              { value: 'Cheque', label: '📜 Cheque' },
              { value: 'Credit Card', label: '💳 Card' }
            ]}
          />

          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            icon={Calendar}
            required
          />
        </div>

        <Input
          label="Bill / Invoice Number"
          value={billNumber}
          onChange={(e) => setBillNumber(e.target.value)}
          icon={FileText}
          error={errors.billNumber}
        />

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
            Remarks
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" icon={Save} loading={loading}>
            Update Entry
          </Button>
        </div>
      </form>
    </Modal>
  );
}

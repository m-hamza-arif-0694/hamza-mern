'use client';

import React, { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function DeleteCustomerModal({ isOpen, onClose, customer, onCustomerDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!customer) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/customers/${customer._id || customer.id}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to delete customer');
        setLoading(false);
        return;
      }

      onCustomerDeleted(customer._id || customer.id);
      onClose();
    } catch (err) {
      setError(err.message || 'Network error deleting customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="⚠️ Confirm Customer Account Deletion" maxWidth="480px">
      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}>
          <AlertTriangle size={28} color="#ef4444" />
        </div>

        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
          Delete "{customer?.name}"?
        </h4>

        <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          This will permanently delete this customer's profile and all associated Khata ledger history transactions from the database. This action cannot be undone.
        </p>

        {customer?.netBalance !== 0 && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#fbbf24',
            padding: '0.65rem 0.85rem',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '1.25rem'
          }}>
            Notice: Current pending balance is Rs. {Math.abs(customer?.netBalance || 0).toLocaleString()} ({customer?.netBalance > 0 ? 'You Will Get' : 'You Will Give'}).
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', padding: '0.6rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1rem' }}>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" icon={Trash2} onClick={handleDelete} loading={loading}>
            Permanently Delete Record
          </Button>
        </div>
      </div>
    </Modal>
  );
}

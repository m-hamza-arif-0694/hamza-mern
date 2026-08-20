'use client';

import React, { useState } from 'react';
import { UserPlus, Phone, Mail, MapPin, Building, DollarSign, FileText } from 'lucide-react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

export default function AddCustomerModal({ isOpen, onClose, onCustomerCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Lahore',
    address: '',
    category: 'Retail',
    creditLimit: '',
    initialBalance: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError('');
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        city: formData.city || 'Lahore',
        address: formData.address || undefined,
        category: formData.category,
        creditLimit: formData.creditLimit ? Number(formData.creditLimit) : 0,
        initialBalance: formData.initialBalance ? Number(formData.initialBalance) : 0,
        notes: formData.notes || undefined
      };

      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.message || 'Failed to create customer');
        }
        setLoading(false);
        return;
      }

      // Reset form and notify parent
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: 'Lahore',
        address: '',
        category: 'Retail',
        creditLimit: '',
        initialBalance: '',
        notes: ''
      });
      onCustomerCreated(data.data);
      onClose();
    } catch (err) {
      setServerError(err.message || 'Network error while creating customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="👤 Register New Customer Profile" maxWidth="620px">
      <form onSubmit={handleSubmit}>
        {serverError && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            ⚠️ {serverError}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
          <Input
            label="Customer / Business Name"
            name="name"
            placeholder="e.g. Ali Traders & Store"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            label="Pakistani Mobile Number"
            name="phone"
            placeholder="+923001234567 or 03001234567"
            value={formData.phone}
            onChange={handleChange}
            icon={Phone}
            error={errors.phone}
            helperText="Validated Pakistani format: +923xxxxxxxxx"
            required
          />

          <Input
            label="Email Address (Optional)"
            name="email"
            type="email"
            placeholder="merchant@example.com"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            error={errors.email}
          />

          <Select
            label="Customer Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={[
              { value: 'Retail', label: 'Retailer (Small Store)' },
              { value: 'Wholesale', label: 'Wholesale Buyer' },
              { value: 'Distributor', label: 'Regional Distributor' },
              { value: 'VIP', label: 'VIP Priority Client' },
              { value: 'General', label: 'General Customer' }
            ]}
          />

          <Input
            label="City"
            name="city"
            placeholder="e.g. Lahore, Karachi, Rawalpindi"
            value={formData.city}
            onChange={handleChange}
            icon={MapPin}
            error={errors.city}
          />

          <Input
            label="Credit Limit (PKR)"
            name="creditLimit"
            type="number"
            placeholder="e.g. 50000 (0 for no limit)"
            value={formData.creditLimit}
            onChange={handleChange}
            icon={DollarSign}
            error={errors.creditLimit}
          />

          <Input
            label="Opening Net Balance (PKR)"
            name="initialBalance"
            type="number"
            placeholder="+ve for You Will Get, -ve for You Give"
            value={formData.initialBalance}
            onChange={handleChange}
            error={errors.initialBalance}
            helperText="e.g. 5000 if they already owe you"
          />

          <div style={{ gridColumn: '1 / -1' }}>
            <Input
              label="Shop / Street Address"
              name="address"
              placeholder="e.g. Shop #14, Main Anarkali, Lahore"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />
          </div>

          <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
              Business Notes & Payment Terms
            </label>
            <textarea
              name="notes"
              rows={2}
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. Clears credit balance every 15 days, contact person Mr. Tariq"
              className="input-field"
              style={{ resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="success" icon={UserPlus} loading={loading}>
            Save Customer Record
          </Button>
        </div>
      </form>
    </Modal>
  );
}

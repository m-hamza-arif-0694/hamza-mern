'use client';

import React, { useState, useEffect } from 'react';
import { Edit3, Phone, Mail, MapPin, DollarSign, Save } from 'lucide-react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

export default function EditCustomerModal({ isOpen, onClose, customer, onCustomerUpdated }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Lahore',
    address: '',
    category: 'Retail',
    creditLimit: '',
    status: 'active',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        phone: customer.phone || '',
        email: customer.email || '',
        city: customer.city || 'Lahore',
        address: customer.address || '',
        category: customer.category || 'Retail',
        creditLimit: customer.creditLimit !== undefined ? String(customer.creditLimit) : '0',
        status: customer.status || 'active',
        notes: customer.notes || ''
      });
      setErrors({});
      setServerError('');
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer) return;

    setErrors({});
    setServerError('');
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        address: formData.address,
        category: formData.category,
        creditLimit: Number(formData.creditLimit) || 0,
        status: formData.status,
        notes: formData.notes
      };

      const res = await fetch(`/api/customers/${customer._id || customer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.message || 'Failed to update customer');
        }
        setLoading(false);
        return;
      }

      onCustomerUpdated(data.data);
      onClose();
    } catch (err) {
      setServerError(err.message || 'Network error updating customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`✏️ Edit Profile: ${customer?.name || ''}`} maxWidth="620px">
      <form onSubmit={handleSubmit}>
        {serverError && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            ⚠️ {serverError}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
          <Input
            label="Customer Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            icon={Phone}
            error={errors.phone}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            error={errors.email}
          />

          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={[
              { value: 'Retail', label: 'Retailer' },
              { value: 'Wholesale', label: 'Wholesale Buyer' },
              { value: 'Distributor', label: 'Distributor' },
              { value: 'VIP', label: 'VIP Client' },
              { value: 'General', label: 'General' }
            ]}
          />

          <Input
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            icon={MapPin}
            error={errors.city}
          />

          <Input
            label="Credit Limit (PKR)"
            name="creditLimit"
            type="number"
            value={formData.creditLimit}
            onChange={handleChange}
            icon={DollarSign}
            error={errors.creditLimit}
          />

          <Select
            label="Account Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              { value: 'active', label: 'Active (Permit Udhar)' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'blocked', label: 'Blocked / Defaulter' }
            ]}
          />

          <div style={{ gridColumn: '1 / -1' }}>
            <Input
              label="Shop / Street Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />
          </div>

          <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
              Notes & Terms
            </label>
            <textarea
              name="notes"
              rows={2}
              value={formData.notes}
              onChange={handleChange}
              className="input-field"
              style={{ resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" icon={Save} loading={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}

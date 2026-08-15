'use client';

import React, { useState } from 'react';
import { 
  Users, UserPlus, Phone, Send, Edit, Trash2, MessageSquare 
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Table from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import { validateAmount, validatePhone, validateRequired } from '../../../lib/validation';

export default function CustomersCRUDPage() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ali Traders', phone: '+923001234567', netBalance: 14500, status: 'you_will_get' },
    { id: 2, name: 'Usman Retailer', phone: '+923219876543', netBalance: -5200, status: 'you_will_give' }
  ]);

  const [selectedCustId, setSelectedCustId] = useState(1);
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custErrors, setCustErrors] = useState({});

  const [ledgerType, setLedgerType] = useState('gave');
  const [ledgerAmount, setLedgerAmount] = useState('');

  const [editCustModal, setEditCustModal] = useState(null);
  const [editCustName, setEditCustName] = useState('');
  const [editCustPhone, setEditCustPhone] = useState('');

  const [whatsappModalText, setWhatsappModalText] = useState(null);

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const nameErr = validateRequired(custName, 'Customer Name');
    const phoneErr = validatePhone(custPhone);

    if (nameErr || phoneErr) {
      setCustErrors({ name: nameErr, phone: phoneErr });
      return;
    }
    setCustErrors({});

    const newCust = {
      id: Date.now(),
      name: custName.trim(),
      phone: custPhone.trim(),
      netBalance: 0,
      status: 'settled'
    };

    setCustomers([...customers, newCust]);
    setSelectedCustId(newCust.id);
    setCustName('');
    setCustPhone('');
  };

  const handleOpenEditCustModal = (cust) => {
    setEditCustModal(cust);
    setEditCustName(cust.name);
    setEditCustPhone(cust.phone);
  };

  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    setCustomers(customers.map(c => {
      if (c.id === editCustModal.id) {
        return { ...c, name: editCustName.trim(), phone: editCustPhone.trim() };
      }
      return c;
    }));
    setEditCustModal(null);
  };

  const handleDeleteCustomer = (id) => {
    const remaining = customers.filter(c => c.id !== id);
    setCustomers(remaining);
    if (remaining.length > 0) setSelectedCustId(remaining[0].id);
  };

  const handleAddLedgerEntry = (e) => {
    e.preventDefault();
    const amt = parseFloat(ledgerAmount);
    if (!amt || amt <= 0) return;

    setCustomers(customers.map(c => {
      if (c.id === selectedCustId) {
        const change = ledgerType === 'gave' ? amt : -amt;
        const newBal = c.netBalance + change;
        return { ...c, netBalance: newBal };
      }
      return c;
    }));
    setLedgerAmount('');
  };

  const selectedCustomer = customers.find(c => c.id === selectedCustId) || customers[0];

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge variant="purple" style={{ marginBottom: '0.4rem' }}>Module 2 (Core CRUD Module)</Badge>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>Customer Udhar Ledgers</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Pakistani phone validation and WhatsApp reminder templates.</p>
        </div>
      </div>

      {/* VERTICAL STACK: REGISTER CUSTOMER FORM (TOP) -> CUSTOMER DIRECTORY & LEDGER (BELOW) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* TOP: CREATE CUSTOMER FORM */}
        <Card>
          <CardHeader title="Register New Customer" subtitle="Pakistani phone validation active (+923xxxxxxxxx)" icon={UserPlus} />
          <CardBody>
            <form onSubmit={handleAddCustomer} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', alignItems: 'end' }}>
              <Input
                label="Customer Name"
                placeholder="Customer Name"
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
                error={custErrors.name}
                required
              />
              <Input
                label="Phone Number"
                placeholder="Phone (e.g. +923001234567)"
                value={custPhone}
                onChange={(e) => setCustPhone(e.target.value)}
                error={custErrors.phone}
                icon={Phone}
                required
              />
              <div style={{ marginBottom: '0.25rem' }}>
                <Button type="submit" variant="success" style={{ width: '100%' }} icon={UserPlus}>
                  Save Customer
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        {/* BOTTOM 1: CUSTOMER DIRECTORY & LEDGER */}
        <Card>
          <CardHeader title="Customer Directory & Net Dues Ledger" icon={Users} subtitle="Click a customer to record entry or send WhatsApp reminder" />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {customers.map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCustId(c.id)}
                  style={{
                    padding: '0.85rem 1.25rem',
                    borderRadius: '10px',
                    background: selectedCustId === c.id ? 'rgba(59, 130, 246, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid',
                    borderColor: selectedCustId === c.id ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255,255,255,0.06)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>{c.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{c.phone}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: c.netBalance >= 0 ? '#34d399' : '#f87171' }}>
                      {c.netBalance >= 0 ? 'You Will Get: ' : 'You Will Give: '} Rs. {Math.abs(c.netBalance).toLocaleString()}
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); handleOpenEditCustModal(c); }} title="Edit Customer" style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', padding: '0.4rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}>
                      <Edit size={14} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteCustomer(c.id); }} title="Delete Customer" style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '0.4rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* BOTTOM 2: SELECTED CUSTOMER LEDGER ENTRY & WHATSAPP REMINDER */}
        {selectedCustomer && (
          <Card>
            <CardHeader title={`Record Ledger Entry for ${selectedCustomer.name}`} subtitle={selectedCustomer.phone} icon={MessageSquare} />
            <CardBody>
              <form onSubmit={handleAddLedgerEntry} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button type="button" onClick={() => setLedgerType('gave')} style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', border: 'none', background: ledgerType === 'gave' ? '#ef4444' : 'rgba(255,255,255,0.08)', color: 'white', fontWeight: 700, cursor: 'pointer' }}>You Gave (Credit)</button>
                  <button type="button" onClick={() => setLedgerType('got')} style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', border: 'none', background: ledgerType === 'got' ? '#10b981' : 'rgba(255,255,255,0.08)', color: 'white', fontWeight: 700, cursor: 'pointer' }}>You Got (Debit)</button>
                </div>
                <Input label="Transaction Amount (PKR)" placeholder="Enter amount..." type="number" value={ledgerAmount} onChange={(e) => setLedgerAmount(e.target.value)} required />
                <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '0.5rem' }}>Save Ledger Entry</Button>
              </form>
              <Button variant="success" size="sm" icon={Send} onClick={() => setWhatsappModalText(`Respected ${selectedCustomer.name}, your total due payment on HisabDo is Rs. ${selectedCustomer.netBalance.toLocaleString()}.`)}>
                Preview WhatsApp Dues Reminder
              </Button>
            </CardBody>
          </Card>
        )}
      </div>

      <Modal isOpen={!!editCustModal} onClose={() => setEditCustModal(null)} title="✏️ Edit Customer Profile">
        <form onSubmit={handleUpdateCustomer}>
          <Input label="Customer Name" value={editCustName} onChange={(e) => setEditCustName(e.target.value)} required />
          <Input label="Phone Number" value={editCustPhone} onChange={(e) => setEditCustPhone(e.target.value)} required />
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setEditCustModal(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Update Customer</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!whatsappModalText} onClose={() => setWhatsappModalText(null)} title="💬 WhatsApp Dues Template">
        <div style={{ background: '#090d16', padding: '1rem', borderRadius: '10px', color: '#34d399', fontStyle: 'italic', marginBottom: '1rem' }}>
          "{whatsappModalText}"
        </div>
        <Button variant="success" size="sm" onClick={() => setWhatsappModalText(null)}>Close</Button>
      </Modal>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { 
  Users, UserPlus, Phone, Send, Plus, ArrowDownLeft, 
  ArrowUpRight, CheckCircle2, AlertCircle, MessageSquare
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Table from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import { validateAmount, validatePhone, validateRequired } from '../../../lib/validation';

export default function CustomersModulePage() {
  // Customer Directory State
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ali Traders', phone: '+923001234567', netBalance: 12500, status: 'you_will_get' },
    { id: 2, name: 'Usman Retailer', phone: '+923219876543', netBalance: -4500, status: 'you_will_give' },
    { id: 3, name: 'Zubair Supermarket', phone: '+923334567890', netBalance: 28000, status: 'you_will_get' }
  ]);

  const [selectedCustId, setSelectedCustId] = useState(1);

  // Form State: New Customer
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custErrors, setCustErrors] = useState({});

  // Form State: Record Entry
  const [ledgerType, setLedgerType] = useState('gave');
  const [ledgerAmount, setLedgerAmount] = useState('');
  const [ledgerErrors, setLedgerErrors] = useState({});

  // Modal State for WhatsApp Preview
  const [whatsappModalText, setWhatsappModalText] = useState(null);

  // Handlers: Add Customer with Validation
  const handleAddCustomer = (e) => {
    e.preventDefault();

    const nameError = validateRequired(custName, 'Customer Name');
    const phoneError = validatePhone(custPhone);

    if (nameError || phoneError) {
      setCustErrors({
        name: nameError,
        phone: phoneError
      });
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

  // Handlers: Record Gave/Got Entry with Validation
  const handleAddLedgerEntry = (e) => {
    e.preventDefault();

    const amtError = validateAmount(ledgerAmount);
    if (amtError) {
      setLedgerErrors({ amount: amtError });
      return;
    }

    setLedgerErrors({});
    const amt = parseFloat(ledgerAmount);

    setCustomers(customers.map(c => {
      if (c.id === selectedCustId) {
        const change = ledgerType === 'gave' ? amt : -amt;
        const newBal = c.netBalance + change;
        let newStatus = 'settled';
        if (newBal > 0) newStatus = 'you_will_get';
        if (newBal < 0) newStatus = 'you_will_give';
        return { ...c, netBalance: newBal, status: newStatus };
      }
      return c;
    }));

    setLedgerAmount('');
  };

  const selectedCustomer = customers.find(c => c.id === selectedCustId) || customers[0];

  const totalDuesToGet = customers.filter(c => c.netBalance > 0).reduce((acc, c) => acc + c.netBalance, 0);
  const totalDuesToGive = customers.filter(c => c.netBalance < 0).reduce((acc, c) => acc + Math.abs(c.netBalance), 0);

  return (
    <div className="animate-fade-in">
      {/* Module Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge-purple" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>Functional Core Module 02</span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>Customer Udhar Ledgers (Gave / Got)</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Manage credit given (*Aap ne Diye*) and debit received (*Aap ko Mile*) with WhatsApp reminders.</p>
        </div>
      </div>

      {/* METRIC SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <Card borderLeftColor="#10b981">
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>You Will Get (Paisa Lena Hai)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>Rs. {totalDuesToGet.toLocaleString()}</div>
        </Card>
        <Card borderLeftColor="#ef4444">
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>You Will Give (Paisa Dena Hai)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f87171' }}>Rs. {totalDuesToGive.toLocaleString()}</div>
        </Card>
        <Card borderLeftColor="#8b5cf6">
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Total Active Customers</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc' }}>{customers.length} Accounts</div>
        </Card>
      </div>

      {/* TWO COLUMN WORKSPACE */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* LEFT COLUMN: ADD CUSTOMER & DIRECTORY */}
        <Card>
          <CardHeader title="Customer Directory" icon={Users} subtitle="Add customer with phone validation" />
          <CardBody>
            {/* Add Customer Form */}
            <form onSubmit={handleAddCustomer} style={{ marginBottom: '1.5rem', background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>+ Add New Customer</div>
              <Input
                placeholder="Customer / Vendor Name"
                value={custName}
                onChange={(e) => {
                  setCustName(e.target.value);
                  if (custErrors.name) setCustErrors({ ...custErrors, name: null });
                }}
                error={custErrors.name}
                required
              />
              <Input
                placeholder="Phone (e.g. +923001234567 or 03001234567)"
                value={custPhone}
                onChange={(e) => {
                  setCustPhone(e.target.value);
                  if (custErrors.phone) setCustErrors({ ...custErrors, phone: null });
                }}
                error={custErrors.phone}
                icon={Phone}
                required
              />
              <Button type="submit" variant="success" style={{ width: '100%' }} icon={UserPlus}>
                Save Customer
              </Button>
            </form>

            {/* Customer Directory List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {customers.map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCustId(c.id)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    background: selectedCustId === c.id ? 'rgba(59, 130, 246, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid',
                    borderColor: selectedCustId === c.id ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{c.phone}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      color: c.netBalance > 0 ? '#34d399' : c.netBalance < 0 ? '#f87171' : '#94a3b8'
                    }}>
                      Rs. {Math.abs(c.netBalance).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                      {c.netBalance > 0 ? 'You Will Get' : c.netBalance < 0 ? 'You Will Give' : 'Settled'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* RIGHT COLUMN: SELECTED CUSTOMER LEDGER & ENTRY LOGGING */}
        <Card>
          <CardHeader
            title={selectedCustomer.name}
            subtitle={selectedCustomer.phone}
            action={
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Net Customer Balance</div>
                <div style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: selectedCustomer.netBalance > 0 ? '#34d399' : selectedCustomer.netBalance < 0 ? '#f87171' : '#94a3b8'
                }}>
                  Rs. {Math.abs(selectedCustomer.netBalance).toLocaleString()}
                </div>
              </div>
            }
          />
          <CardBody>
            {/* Entry Form */}
            <form onSubmit={handleAddLedgerEntry} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>Record Entry for {selectedCustomer.name}</div>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setLedgerType('gave')}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: ledgerType === 'gave' ? '#ef4444' : 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  You Gave (Aap ne Diye)
                </button>
                <button
                  type="button"
                  onClick={() => setLedgerType('got')}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: ledgerType === 'got' ? '#10b981' : 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  You Got (Aap ko Mile)
                </button>
              </div>

              <Input
                placeholder="Enter amount (PKR)"
                type="number"
                value={ledgerAmount}
                onChange={(e) => {
                  setLedgerAmount(e.target.value);
                  if (ledgerErrors.amount) setLedgerErrors({});
                }}
                error={ledgerErrors.amount}
                required
              />

              <Button type="submit" variant="primary" style={{ width: '100%' }}>
                Save Ledger Entry
              </Button>
            </form>

            {/* WHATSAPP PAYMENT REMINDER ACTION */}
            {selectedCustomer.netBalance > 0 && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '1.25rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#34d399', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MessageSquare size={16} /> Send WhatsApp Payment Reminder
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    Generate pre-filled reminder template with Rs. {selectedCustomer.netBalance.toLocaleString()} dues.
                  </div>
                </div>
                <Button
                  onClick={() => setWhatsappModalText(`Respected ${selectedCustomer.name}, your total due payment on HisabDo is Rs. ${selectedCustomer.netBalance.toLocaleString()}. Please clear it via JazzCash / EasyPaisa at your earliest convenience.`)}
                  variant="success"
                  size="sm"
                  icon={Send}
                >
                  Generate Preview
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* REUSABLE MODAL FOR WHATSAPP REMINDER PREVIEW */}
      <Modal
        isOpen={!!whatsappModalText}
        onClose={() => setWhatsappModalText(null)}
        title="💬 WhatsApp Payment Reminder Template"
      >
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Generated Message Text:</div>
          <div style={{ background: '#090d16', padding: '1rem', borderRadius: '10px', color: '#34d399', fontSize: '0.9rem', lineHeight: 1.6, fontStyle: 'italic', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            "{whatsappModalText}"
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary" size="sm" onClick={() => setWhatsappModalText(null)}>
            Close
          </Button>
          <Button variant="success" size="sm" icon={Send} onClick={() => alert('WhatsApp Web trigger activated!')}>
            Send via WhatsApp Web
          </Button>
        </div>
      </Modal>
    </div>
  );
}

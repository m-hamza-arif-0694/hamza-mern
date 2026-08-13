'use client';

import React, { useState } from 'react';
import { 
  Users, UserPlus, Phone, Send, Edit, Trash2, CheckCircle2, 
  MessageSquare, RefreshCw
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Table from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import { LoadingState, ErrorState } from '../../../components/ui/StateAlert';
import { validateAmount, validatePhone, validateRequired } from '../../../lib/validation';

export default function CustomersCRUDPage() {
  // Customer Directory State
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ali Traders', phone: '+923001234567', netBalance: 14500, status: 'you_will_get' },
    { id: 2, name: 'Usman Retailer', phone: '+923219876543', netBalance: -5200, status: 'you_will_give' },
    { id: 3, name: 'Zubair Supermarket', phone: '+923334567890', netBalance: 29000, status: 'you_will_get' }
  ]);

  const [selectedCustId, setSelectedCustId] = useState(1);

  // Form State: Add Customer
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custErrors, setCustErrors] = useState({});

  // Form State: Record Entry
  const [ledgerType, setLedgerType] = useState('gave');
  const [ledgerAmount, setLedgerAmount] = useState('');
  const [ledgerErrors, setLedgerErrors] = useState({});

  // Modal State: Edit Customer Modal
  const [editCustModal, setEditCustModal] = useState(null);
  const [editCustName, setEditCustName] = useState('');
  const [editCustPhone, setEditCustPhone] = useState('');
  const [editCustErrors, setEditCustErrors] = useState({});

  // Modal State: WhatsApp Reminder
  const [whatsappModalText, setWhatsappModalText] = useState(null);

  // UI State Simulator Toggles
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // --- CRUD 1: CREATE CUSTOMER ---
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

  // --- CRUD 2: EDIT CUSTOMER (PREPARE MODAL) ---
  const handleOpenEditCustModal = (cust) => {
    setEditCustModal(cust);
    setEditCustName(cust.name);
    setEditCustPhone(cust.phone);
    setEditCustErrors({});
  };

  // --- CRUD 3: UPDATE CUSTOMER (SUBMIT MODAL) ---
  const handleUpdateCustomer = (e) => {
    e.preventDefault();

    const nameErr = validateRequired(editCustName, 'Customer Name');
    const phoneErr = validatePhone(editCustPhone);

    if (nameErr || phoneErr) {
      setEditCustErrors({ name: nameErr, phone: phoneErr });
      return;
    }

    setEditCustErrors({});

    setCustomers(customers.map(c => {
      if (c.id === editCustModal.id) {
        return {
          ...c,
          name: editCustName.trim(),
          phone: editCustPhone.trim()
        };
      }
      return c;
    }));

    setEditCustModal(null);
  };

  // --- CRUD 4: DELETE CUSTOMER ---
  const handleDeleteCustomer = (id) => {
    const remaining = customers.filter(c => c.id !== id);
    setCustomers(remaining);
    if (remaining.length > 0) setSelectedCustId(remaining[0].id);
  };

  // Record Gave/Got Ledger Entry
  const handleAddLedgerEntry = (e) => {
    e.preventDefault();

    const amtErr = validateAmount(ledgerAmount);
    if (amtErr) {
      setLedgerErrors({ amount: amtErr });
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge variant="purple" style={{ marginBottom: '0.4rem' }}>Day 11 Full CRUD Module</Badge>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>Customer Udhar Ledgers (Full CRUD)</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Full customer profile CRUD, net balance calculation, and WhatsApp payment reminder modal.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="secondary" size="sm" onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 800);
          }}>
            <RefreshCw size={14} /> Simulate Loading
          </Button>
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
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Active Customer Ledgers</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc' }}>{customers.length} Accounts</div>
        </Card>
      </div>

      {/* TWO COLUMN WORKSPACE */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* LEFT COLUMN: CREATE CUSTOMER & DIRECTORY */}
        <Card>
          <CardHeader title="Customer Directory" icon={Users} subtitle="Add customer with phone validation" />
          <CardBody>
            <form onSubmit={handleAddCustomer} style={{ marginBottom: '1.5rem', background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>+ Create Customer Account</div>
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
                Save Customer Account
              </Button>
            </form>

            {isLoading ? (
              <LoadingState message="Fetching customer accounts..." />
            ) : (
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
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
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditCustModal(c);
                          }}
                          style={{ background: 'rgba(59, 130, 246, 0.15)', border: 'none', color: '#60a5fa', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer' }}
                          title="Edit Customer"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCustomer(c.id);
                          }}
                          style={{ background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#f87171', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer' }}
                          title="Delete Customer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* RIGHT COLUMN: SELECTED CUSTOMER LEDGER */}
        {selectedCustomer ? (
          <Card>
            <CardHeader
              title={selectedCustomer.name}
              subtitle={selectedCustomer.phone}
              action={
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Net Customer Dues</div>
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
                      Generate pre-filled reminder message for Rs. {selectedCustomer.netBalance.toLocaleString()}.
                    </div>
                  </div>
                  <Button
                    onClick={() => setWhatsappModalText(`Respected ${selectedCustomer.name}, your total due payment on HisabDo is Rs. ${selectedCustomer.netBalance.toLocaleString()}. Please clear it via EasyPaisa / JazzCash at your earliest convenience.`)}
                    variant="success"
                    size="sm"
                    icon={Send}
                  >
                    Preview Link
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        ) : null}
      </div>

      {/* EDIT CUSTOMER MODAL */}
      <Modal
        isOpen={!!editCustModal}
        onClose={() => setEditCustModal(null)}
        title="✏️ Edit Customer Account Details"
      >
        <form onSubmit={handleUpdateCustomer}>
          <Input
            label="Customer / Business Name"
            value={editCustName}
            onChange={(e) => {
              setEditCustName(e.target.value);
              if (editCustErrors.name) setEditCustErrors({ ...editCustErrors, name: null });
            }}
            error={editCustErrors.name}
            required
          />

          <Input
            label="Phone Number"
            value={editCustPhone}
            onChange={(e) => {
              setEditCustPhone(e.target.value);
              if (editCustErrors.phone) setEditCustErrors({ ...editCustErrors, phone: null });
            }}
            error={editCustErrors.phone}
            icon={Phone}
            required
          />

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setEditCustModal(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Update Customer Info
            </Button>
          </div>
        </form>
      </Modal>

      {/* WHATSAPP REMINDER MODAL */}
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

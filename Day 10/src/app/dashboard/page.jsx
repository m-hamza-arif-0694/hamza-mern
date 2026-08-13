'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Users, ArrowDownLeft, ArrowUpRight, Plus, Trash2, 
  Send, ShieldCheck, Zap
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { validateAmount } from '../../lib/validation';

export default function DashboardOverviewPage() {
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'in', amount: 24000, category: 'Sales', note: 'Bulk Counter Sale', time: '09:30 AM' },
    { id: 2, type: 'out', amount: 5500, category: 'Utilities', note: 'K-Electric Bill Payment', time: '11:15 AM' },
    { id: 3, type: 'in', amount: 14500, category: 'Sales', note: 'Accessories Wholesale', time: '01:45 PM' }
  ]);

  const [type, setType] = useState('in');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [amountError, setAmountError] = useState(null);

  const [reminderModalText, setReminderModalText] = useState(null);

  const handleAddTx = (e) => {
    e.preventDefault();
    const err = validateAmount(amount);
    if (err) {
      setAmountError(err);
      return;
    }
    setAmountError(null);

    const newTx = {
      id: Date.now(),
      type: type,
      amount: parseFloat(amount),
      category: 'Sales',
      note: note.trim() || (type === 'in' ? 'Quick Cash In' : 'Quick Cash Out'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTransactions([newTx, ...transactions]);
    setAmount('');
    setNote('');
  };

  const totalIn = transactions.filter(t => t.type === 'in').reduce((acc, t) => acc + t.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'out').reduce((acc, t) => acc + t.amount, 0);
  const netCash = totalIn - totalOut;

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '0.25rem' }}>
            Merchant Dashboard Overview 👋
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Real-time status for **Hamza Electronics** powered by reusable Day 10 components.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/dashboard/cashbook" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="sm">Open Cashbook Module →</Button>
          </Link>
          <Link href="/dashboard/customers" style={{ textDecoration: 'none' }}>
            <Button variant="success" size="sm">Open Udhar Module →</Button>
          </Link>
        </div>
      </div>

      {/* METRIC SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <Card borderLeftColor="#10b981">
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Total Cash In (+)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>Rs. {totalIn.toLocaleString()}</div>
        </Card>

        <Card borderLeftColor="#ef4444">
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Total Cash Out (-)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f87171' }}>Rs. {totalOut.toLocaleString()}</div>
        </Card>

        <Card borderLeftColor="#3b82f6">
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Net Cash Balance</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: netCash >= 0 ? '#60a5fa' : '#f87171' }}>
            Rs. {netCash.toLocaleString()}
          </div>
        </Card>

        <Card borderLeftColor="#8b5cf6">
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Pending Udhar Dues</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc' }}>Rs. 40,500</div>
        </Card>
      </div>

      {/* WORKSPACE GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        <Card>
          <CardHeader title="Quick Cash Logger" subtitle="Form validation enabled" icon={Plus} />
          <CardBody>
            <form onSubmit={handleAddTx}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setType('in')}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: type === 'in' ? '#10b981' : 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cash In (+)
                </button>
                <button
                  type="button"
                  onClick={() => setType('out')}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: type === 'out' ? '#ef4444' : 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cash Out (-)
                </button>
              </div>

              <Input
                label="Amount (PKR)"
                type="number"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (amountError) setAmountError(null);
                }}
                error={amountError}
                required
              />

              <Input
                label="Description"
                type="text"
                placeholder="Description..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <Button type="submit" variant={type === 'in' ? 'success' : 'danger'} style={{ width: '100%' }}>
                Save {type === 'in' ? 'Cash In' : 'Cash Out'}
              </Button>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Recent Activity Feed" subtitle="Today's live transaction records" icon={BookOpen} />
          <CardBody>
            <Table
              columns={[
                { header: 'Type' },
                { header: 'Description' },
                { header: 'Time' },
                { header: 'Amount', align: 'right' }
              ]}
              data={transactions}
              renderRow={(t) => (
                <>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <Badge variant={t.type === 'in' ? 'green' : 'red'}>
                      {t.type === 'in' ? 'CASH IN' : 'CASH OUT'}
                    </Badge>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'white', fontWeight: 600 }}>{t.note}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#94a3b8', fontSize: '0.8rem' }}>{t.time}</td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 800, color: t.type === 'in' ? '#34d399' : '#f87171' }}>
                    {t.type === 'in' ? '+' : '-'} Rs. {t.amount.toLocaleString()}
                  </td>
                </>
              )}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

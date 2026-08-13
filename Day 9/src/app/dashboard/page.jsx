'use client';

import React, { useState } from 'react';
import { 
  BookOpen, Users, ArrowDownLeft, ArrowUpRight, Plus, Trash2, 
  Send, FileText, Search, TrendingUp, ShieldCheck, Zap, AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  // Live Dashboard Transactions State
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'in', amount: 18500, category: 'Sales', note: 'Counter Sales - Morning Shift', time: '09:45 AM' },
    { id: 2, type: 'out', amount: 4200, category: 'Utilities', note: 'K-Electric Bill Payment', time: '11:30 AM' },
    { id: 3, type: 'in', amount: 12000, category: 'Sales', note: 'Wholesale Electronics Order', time: '02:15 PM' },
    { id: 4, type: 'out', amount: 3500, category: 'Salary', note: 'Staff Advance Payment', time: '04:00 PM' }
  ]);

  const [type, setType] = useState('in');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Sales');
  const [note, setNote] = useState('');

  // Dues Customers State
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ali Traders', phone: '+923001234567', dues: 14500 },
    { id: 2, name: 'Zubair Supermarket', phone: '+923334567890', dues: 28000 },
    { id: 3, name: 'Usman Retailer', phone: '+923219876543', dues: 6200 }
  ]);

  const [reminderModal, setReminderModal] = useState(null);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;
    const newTx = {
      id: Date.now(),
      type: type,
      amount: parseFloat(amount),
      category: category,
      note: note || (type === 'in' ? 'Cash In Entry' : 'Cash Out Entry'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTransactions([newTx, ...transactions]);
    setAmount('');
    setNote('');
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totalIn = transactions.filter(t => t.type === 'in').reduce((acc, t) => acc + t.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'out').reduce((acc, t) => acc + t.amount, 0);
  const netCash = totalIn - totalOut;
  const totalCustomerDues = customers.reduce((acc, c) => acc + c.dues, 0);

  return (
    <div className="animate-fade-in">
      {/* Top Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '0.25rem' }}>
            Welcome back, Hamza! 👋
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Here is your financial overview for **Hamza Electronics** today.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <span className="badge-green" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem' }}>
            <ShieldCheck size={16} /> Cloud Sync Active
          </span>
        </div>
      </div>

      {/* METRIC SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Total Cash In (+)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>Rs. {totalIn.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>+12% vs yesterday</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #ef4444' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Total Cash Out (-)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f87171' }}>Rs. {totalOut.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>Expenses & bills</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Net Cash Balance</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: netCash >= 0 ? '#60a5fa' : '#f87171' }}>
            Rs. {netCash.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>Running counter cash</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Pending Customer Dues</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc' }}>
            Rs. {totalCustomerDues.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>Across 3 active ledgers</div>
        </div>
      </div>

      {/* TWO COLUMN WORKSPACE: TRANSACTION ENTRY + TRANSACTIONS TABLE */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {/* Quick Entry Form */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'white', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} color="#60a5fa" /> Log Cash Entry
          </h2>
          <form onSubmit={handleAddTransaction}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button
                type="button"
                onClick={() => setType('in')}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: type === 'in' ? '#10b981' : 'rgba(255,255,255,0.08)',
                  color: 'white',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <ArrowDownLeft size={16} /> Cash In (+)
              </button>
              <button
                type="button"
                onClick={() => setType('out')}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: type === 'out' ? '#ef4444' : 'rgba(255,255,255,0.08)',
                  color: 'white',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <ArrowUpRight size={16} /> Cash Out (-)
              </button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Amount (PKR)</label>
              <input
                type="number"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field"
              >
                <option value="Sales">Sales</option>
                <option value="Expenses">Expenses</option>
                <option value="Salary">Salary</option>
                <option value="Utilities">Utilities</option>
                <option value="Inventory">Inventory</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Note / Description</label>
              <input
                type="text"
                placeholder="e.g. Counter sale or Shop rent"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="input-field"
              />
            </div>

            <button type="submit" className={type === 'in' ? 'btn-success' : 'btn-danger'} style={{ width: '100%' }}>
              Save {type === 'in' ? 'Cash In (+)' : 'Cash Out (-)'}
            </button>
          </form>
        </div>

        {/* Transactions Table */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'white' }}>Today's Cash Ledger</h2>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{transactions.length} entries</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '360px', overflowY: 'auto' }}>
            {transactions.map(t => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    background: t.type === 'in' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: t.type === 'in' ? '#34d399' : '#f87171'
                  }}>
                    {t.type === 'in' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'white' }}>{t.note}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.category} • {t.time}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', color: t.type === 'in' ? '#34d399' : '#f87171' }}>
                    {t.type === 'in' ? '+' : '-'} Rs. {t.amount.toLocaleString()}
                  </span>
                  <button onClick={() => handleDelete(t.id)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOP DEFAULTER CUSTOMERS & WHATSAPP REMINDER ACTION */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={18} color="#c084fc" /> Pending Customer Dues (Udhar Book)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {customers.map(c => (
            <div key={c.id} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'white' }}>{c.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{c.phone}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34d399', marginTop: '0.25rem' }}>
                  Rs. {c.dues.toLocaleString()} (Get)
                </div>
              </div>
              <button
                onClick={() => setReminderModal(`Respected ${c.name}, your total due payment on HisabDo is Rs. ${c.dues.toLocaleString()}. Please clear it via EasyPaisa / JazzCash.`)}
                className="btn-success"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
              >
                <Send size={14} /> WhatsApp
              </button>
            </div>
          ))}
        </div>

        {reminderModal && (
          <div style={{ marginTop: '1.5rem', background: '#090d16', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
            <div style={{ fontSize: '0.85rem', color: '#c084fc', fontWeight: 700, marginBottom: '0.5rem' }}>💬 WhatsApp Template Preview:</div>
            <div style={{ fontSize: '0.9rem', color: '#f8fafc', fontStyle: 'italic', marginBottom: '0.75rem' }}>"{reminderModal}"</div>
            <button onClick={() => setReminderModal(null)} style={{ background: '#334155', border: 'none', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
              Close Preview
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

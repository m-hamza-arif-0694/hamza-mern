'use client';

import React, { useState } from 'react';
import { 
  BookOpen, ShieldCheck, Smartphone, Zap, Plus, Minus, ArrowUpRight, 
  ArrowDownLeft, Trash2, Send, Lock, User, Key, CheckCircle2, RefreshCw, 
  FileText, Layers, Search, Building2, ExternalLink, AlertCircle
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  // --- DIGITAL CASHBOOK DEMO STATE ---
  const [cashTransactions, setCashTransactions] = useState([
    { id: 1, type: 'in', amount: 15000, category: 'Sales', note: 'Morning Counter Sale', time: '10:30 AM' },
    { id: 2, type: 'out', amount: 3200, category: 'Utilities', note: 'Electricity Bill', time: '01:15 PM' },
    { id: 3, type: 'in', amount: 8500, category: 'Sales', note: 'Bulk Grocery Delivery', time: '03:45 PM' }
  ]);
  const [cashType, setCashType] = useState('in');
  const [cashAmount, setCashAmount] = useState('');
  const [cashCategory, setCashCategory] = useState('Sales');
  const [cashNote, setCashNote] = useState('');
  const [cashSearch, setCashSearch] = useState('');

  // --- UDHAR LEDGER (GAVE/GOT) DEMO STATE ---
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ali Traders', phone: '+923001234567', netBalance: 12500, status: 'you_will_get' },
    { id: 2, name: 'Usman Retailer', phone: '+923219876543', netBalance: -4500, status: 'you_will_give' },
    { id: 3, name: 'Zubair Supermarket', phone: '+923334567890', netBalance: 28000, status: 'you_will_get' }
  ]);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [selectedCustId, setSelectedCustId] = useState(1);
  const [ledgerAmount, setLedgerAmount] = useState('');
  const [ledgerType, setLedgerType] = useState('gave');
  const [ledgerNote, setLedgerNote] = useState('');
  const [whatsappModal, setWhatsappModal] = useState(null);

  // --- JWT AUTH & BACKEND TESTER STATE ---
  const [authMode, setAuthMode] = useState('login');
  const [authEmail, setAuthEmail] = useState('merchant@hisabdo.com');
  const [authPassword, setAuthPassword] = useState('password123');
  const [authName, setAuthName] = useState('Hamza Arif');
  const [jwtToken, setJwtToken] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);

  // --- HANDLERS: CASHBOOK ---
  const handleAddCashEntry = (e) => {
    e.preventDefault();
    if (!cashAmount || isNaN(cashAmount) || Number(cashAmount) <= 0) return;
    const newEntry = {
      id: Date.now(),
      type: cashType,
      amount: parseFloat(cashAmount),
      category: cashCategory,
      note: cashNote || (cashType === 'in' ? 'Cash In Entry' : 'Cash Out Entry'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setCashTransactions([newEntry, ...cashTransactions]);
    setCashAmount('');
    setCashNote('');
  };

  const handleDeleteCash = (id) => {
    setCashTransactions(cashTransactions.filter(t => t.id !== id));
  };

  const totalCashIn = cashTransactions.filter(t => t.type === 'in').reduce((acc, t) => acc + t.amount, 0);
  const totalCashOut = cashTransactions.filter(t => t.type === 'out').reduce((acc, t) => acc + t.amount, 0);
  const netCashBalance = totalCashIn - totalCashOut;

  // --- HANDLERS: UDHAR LEDGER ---
  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustName) return;
    const newCust = {
      id: Date.now(),
      name: newCustName,
      phone: newCustPhone || '+923000000000',
      netBalance: 0,
      status: 'settled'
    };
    setCustomers([...customers, newCust]);
    setSelectedCustId(newCust.id);
    setNewCustName('');
    setNewCustPhone('');
  };

  const handleAddLedgerEntry = (e) => {
    e.preventDefault();
    if (!ledgerAmount || isNaN(ledgerAmount) || Number(ledgerAmount) <= 0) return;
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
    setLedgerNote('');
  };

  const selectedCustomer = customers.find(c => c.id === selectedCustId) || customers[0];

  // --- HANDLERS: JWT & API TESTER ---
  const handleSimulateAuth = async (e) => {
    e.preventDefault();
    setApiLoading(true);
    setApiResponse(null);

    try {
      const endpoint = authMode === 'login' ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
      const bodyPayload = authMode === 'login' 
        ? { email: authEmail, password: authPassword }
        : { name: authName, email: authEmail, password: authPassword };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      const data = await res.json();
      setApiResponse(data);
      if (data.token) {
        setJwtToken(data.token);
      }
    } catch (err) {
      // Fallback simulation if backend server is offline
      const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjE5ZiIsImVtYWlsIjoibWVyY2hhbnRAaGlzYWJkby5jb20iLCJpYXQiOjE3MjM0NDAwMDAsImV4cCI6MTcyNDA0NDAwMH0.mock_jwt_signature";
      setJwtToken(mockToken);
      setApiResponse({
        success: true,
        message: "Simulation Successful (Local Backend Server Offline or Connecting)",
        user: { name: authName || "Hamza Merchant", email: authEmail },
        token: mockToken
      });
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <main style={{ padding: '2.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Banner */}
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'rgba(59, 130, 246, 0.15)', 
          padding: '0.4rem 1.25rem', 
          borderRadius: '9999px', 
          color: '#60a5fa', 
          fontSize: '0.85rem', 
          fontWeight: 600, 
          border: '1px solid rgba(59, 130, 246, 0.3)',
          marginBottom: '1rem' 
        }}>
          <Zap size={15} /> HisabDo Interactive Capstone Web Portal (Day 8)
        </div>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 800, 
          marginBottom: '0.75rem', 
          background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 100%)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}>
          HisabDo Full-Stack Web Application
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Interactive Next.js 14 App Router portal with live working Digital Cashbook, Gave/Got Udhar Ledgers, and Express JWT Auth API tester.
        </p>
      </header>

      {/* Navigation Tabs */}
      <nav style={{ 
        display: 'flex', 
        justify: 'center', 
        gap: '0.5rem', 
        marginBottom: '2.5rem', 
        flexWrap: 'wrap',
        background: 'rgba(15, 23, 42, 0.6)',
        padding: '0.5rem',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <button 
          onClick={() => setActiveTab('overview')}
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
        >
          <Layers size={18} /> System Overview
        </button>
        <button 
          onClick={() => setActiveTab('cashbook')}
          className={`tab-btn ${activeTab === 'cashbook' ? 'active' : ''}`}
        >
          <BookOpen size={18} /> Digital Cashbook
        </button>
        <button 
          onClick={() => setActiveTab('udhar')}
          className={`tab-btn ${activeTab === 'udhar' ? 'active' : ''}`}
        >
          <Smartphone size={18} /> Udhar Ledgers (Gave/Got)
        </button>
        <button 
          onClick={() => setActiveTab('auth')}
          className={`tab-btn ${activeTab === 'auth' ? 'active' : ''}`}
        >
          <ShieldCheck size={18} /> JWT Auth & API Tester
        </button>
      </nav>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div 
              onClick={() => setActiveTab('cashbook')}
              className="glass-card glass-card-interactive" 
              style={{ padding: '1.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '10px' }}>
                  <BookOpen size={28} color="#60a5fa" />
                </div>
                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '9999px', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', fontWeight: 600 }}>Click to Open Demo →</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Digital Cashbook</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Real-time Cash In (+) and Cash Out (-) daily balance tracking with category tagging and live calculations.
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('udhar')}
              className="glass-card glass-card-interactive" 
              style={{ padding: '1.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '10px' }}>
                  <Smartphone size={28} color="#34d399" />
                </div>
                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', fontWeight: 600 }}>Click to Open Demo →</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Gave / Got Customer Dues</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Udhar ledger book tracking credit given and debit received from customers with WhatsApp reminder templates.
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('auth')}
              className="glass-card glass-card-interactive" 
              style={{ padding: '1.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '10px' }}>
                  <ShieldCheck size={28} color="#c084fc" />
                </div>
                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '9999px', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', fontWeight: 600 }}>Click to Test API →</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>JWT Security & REST API</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Bcrypt password hashing, JWT bearer token security, and Express API integration endpoint runner.
              </p>
            </div>
          </div>

          {/* Architecture Summary Box */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} color="#60a5fa" /> Day 8 Capstone System Blueprint Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ color: '#60a5fa', fontWeight: 700, marginBottom: '0.25rem' }}>🌐 8 Marketing Pages</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Home, Features, Pricing, Download, About, Contact, Blog, Privacy.</div>
              </div>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ color: '#34d399', fontWeight: 700, marginBottom: '0.25rem' }}>📱 7 Core App Modules</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Auth, Cashbook, Udhar Ledgers, Multi-Business, Reports, Reminders, Admin.</div>
              </div>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ color: '#c084fc', fontWeight: 700, marginBottom: '0.25rem' }}>⚡ MERN + Next.js 14</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>React 18 App Router, Express REST backend, MongoDB Mongoose ODM.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIGITAL CASHBOOK DEMO */}
      {activeTab === 'cashbook' && (
        <div className="animate-fade-in">
          {/* Summary Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #10b981' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Total Cash In (+)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399' }}>Rs. {totalCashIn.toLocaleString()}</div>
            </div>
            <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #ef4444' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Total Cash Out (-)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f87171' }}>Rs. {totalCashOut.toLocaleString()}</div>
            </div>
            <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #3b82f6' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Net Daily Balance</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: netCashBalance >= 0 ? '#60a5fa' : '#f87171' }}>
                Rs. {netCashBalance.toLocaleString()}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem', flexWrap: 'wrap' }}>
            {/* Entry Form */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} color="#60a5fa" /> Add Cash Entry
              </h3>
              <form onSubmit={handleAddCashEntry}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setCashType('in')}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: cashType === 'in' ? '#10b981' : 'transparent',
                      background: cashType === 'in' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
                      color: cashType === 'in' ? '#34d399' : '#94a3b8',
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
                    onClick={() => setCashType('out')}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: cashType === 'out' ? '#ef4444' : 'transparent',
                      background: cashType === 'out' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)',
                      color: cashType === 'out' ? '#f87171' : '#94a3b8',
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
                    placeholder="e.g. 5000"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Category</label>
                  <select
                    value={cashCategory}
                    onChange={(e) => setCashCategory(e.target.value)}
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
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Description / Note</label>
                  <input
                    type="text"
                    placeholder="e.g. Shop sales or Supplier bill"
                    value={cashNote}
                    onChange={(e) => setCashNote(e.target.value)}
                    className="input-field"
                  />
                </div>

                <button 
                  type="submit"
                  className={cashType === 'in' ? 'btn-success' : 'btn-danger'}
                  style={{ width: '100%' }}
                >
                  Save {cashType === 'in' ? 'Cash In (+)' : 'Cash Out (-)'} Entry
                </button>
              </form>
            </div>

            {/* Transaction List */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Today's Cash Ledger Entries</h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{cashTransactions.length} entries</span>
              </div>

              {cashTransactions.length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>No entries recorded yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cashTransactions.map(t => (
                    <div 
                      key={t.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'rgba(15, 23, 42, 0.6)',
                        padding: '0.9rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                    >
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
                          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t.note}</div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.category} • {t.time}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ 
                          fontWeight: 700, 
                          fontSize: '1.05rem', 
                          color: t.type === 'in' ? '#34d399' : '#f87171' 
                        }}>
                          {t.type === 'in' ? '+' : '-'} Rs. {t.amount.toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDeleteCash(t.id)}
                          style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
                          title="Delete entry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: UDHAR LEDGERS (GAVE / GOT) */}
      {activeTab === 'udhar' && (
        <div className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem' }}>
            {/* Left Column: Customer Directory */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} color="#34d399" /> Customer & Vendor Directory
              </h3>

              {/* Add Customer Form */}
              <form onSubmit={handleAddCustomer} style={{ marginBottom: '1.25rem' }}>
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  className="input-field"
                  style={{ marginBottom: '0.5rem' }}
                  required
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={newCustPhone}
                    onChange={(e) => setNewCustPhone(e.target.value)}
                    className="input-field"
                  />
                  <button type="submit" className="btn-success" style={{ whiteSpace: 'nowrap' }}>+ Add</button>
                </div>
              </form>

              {/* Customer List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {customers.map(c => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCustId(c.id)}
                    style={{
                      padding: '0.85rem',
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
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{c.phone}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        fontSize: '0.85rem', 
                        fontWeight: 700,
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
            </div>

            {/* Right Column: Customer Ledger Details */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{selectedCustomer.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{selectedCustomer.phone}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Net Customer Balance</div>
                  <div style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: 800,
                    color: selectedCustomer.netBalance > 0 ? '#34d399' : selectedCustomer.netBalance < 0 ? '#f87171' : '#94a3b8'
                  }}>
                    Rs. {Math.abs(selectedCustomer.netBalance).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Record Entry Form */}
              <form onSubmit={handleAddLedgerEntry} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '10px', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <button
                    type="button"
                    onClick={() => setLedgerType('gave')}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: 'none',
                      background: ledgerType === 'gave' ? '#ef4444' : 'rgba(255,255,255,0.05)',
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
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: 'none',
                      background: ledgerType === 'got' ? '#10b981' : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    You Got (Aap ko Mile)
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="number"
                    placeholder="Enter Amount (PKR)"
                    value={ledgerAmount}
                    onChange={(e) => setLedgerAmount(e.target.value)}
                    className="input-field"
                    required
                  />
                  <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>Save Entry</button>
                </div>
              </form>

              {/* WhatsApp Reminder Trigger */}
              {selectedCustomer.netBalance > 0 && (
                <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#34d399', fontSize: '0.9rem' }}>💬 Send WhatsApp Payment Reminder</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Generate pre-filled reminder template for {selectedCustomer.name}</div>
                  </div>
                  <button 
                    onClick={() => setWhatsappModal(`Respected ${selectedCustomer.name}, your total due payment on HisabDo is Rs. ${selectedCustomer.netBalance.toLocaleString()}. Please clear it at your earliest convenience.`)}
                    className="btn-success" 
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    Preview Link
                  </button>
                </div>
              )}

              {/* Modal Preview */}
              {whatsappModal && (
                <div style={{ marginTop: '1rem', background: '#0f172a', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>WhatsApp Template Output:</div>
                  <div style={{ fontStyle: 'italic', color: '#f8fafc', fontSize: '0.85rem', marginBottom: '0.75rem' }}>"{whatsappModal}"</div>
                  <button onClick={() => setWhatsappModal(null)} style={{ background: '#334155', border: 'none', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Close Preview</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: JWT AUTH & API TESTER */}
      {activeTab === 'auth' && (
        <div className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem' }}>
            {/* Form */}
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`tab-btn ${authMode === 'login' ? 'active' : ''}`}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Login API
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`tab-btn ${authMode === 'register' ? 'active' : ''}`}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Register API
                </button>
              </div>

              <form onSubmit={handleSimulateAuth}>
                {authMode === 'register' && (
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Full Name</label>
                    <input
                      type="text"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                )}

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Email Address</label>
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Password</label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={apiLoading}>
                  {apiLoading ? <RefreshCw size={16} className="animate-spin" /> : <Lock size={16} />}
                  {authMode === 'login' ? 'Send POST /api/auth/login Request' : 'Send POST /api/auth/register Request'}
                </button>
              </form>
            </div>

            {/* API Console Response Output */}
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Key size={18} color="#c084fc" /> Express API Console & JWT Token
              </h3>

              {jwtToken && (
                <div style={{ marginBottom: '1rem', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '0.85rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 700, marginBottom: '0.25rem' }}>Active JWT Token (Stored in Session):</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', wordBreak: 'break-all', fontFamily: 'monospace' }}>{jwtToken}</div>
                </div>
              )}

              <div style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', minHeight: '180px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>// JSON Response Payload</div>
                {apiResponse ? (
                  <pre style={{ color: '#34d399', fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                ) : (
                  <div style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic' }}>
                    Click button to send request to Express API backend on port 5000...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


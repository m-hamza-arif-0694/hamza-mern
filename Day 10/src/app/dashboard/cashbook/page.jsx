'use client';

import React, { useState } from 'react';
import { 
  BookOpen, Plus, ArrowDownLeft, ArrowUpRight, Trash2, 
  Search, Filter, ShieldCheck, CheckCircle2, TrendingUp
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Table from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';
import { validateAmount, validateRequired } from '../../../lib/validation';

export default function CashbookModulePage() {
  // Cash Transactions State
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'in', amount: 24000, category: 'Sales', note: 'Bulk Electronics Counter Sale', time: '09:30 AM' },
    { id: 2, type: 'out', amount: 5500, category: 'Utilities', note: 'Shop Electricity Bill', time: '11:15 AM' },
    { id: 3, type: 'in', amount: 14500, category: 'Sales', note: 'Accessories Wholesale Order', time: '01:45 PM' },
    { id: 4, type: 'out', amount: 8000, category: 'Inventory', note: 'Supplier Stock Advance', time: '04:20 PM' }
  ]);

  // Form Input States
  const [entryType, setEntryType] = useState('in');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Sales');
  const [note, setNote] = useState('');

  // Filter & Search States
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Form Validation Errors State
  const [errors, setErrors] = useState({});

  // Handlers
  const handleAddTransaction = (e) => {
    e.preventDefault();

    // Run Validation Rules
    const amountError = validateAmount(amount);
    const categoryError = validateRequired(category, 'Category');

    if (amountError || categoryError) {
      setErrors({
        amount: amountError,
        category: categoryError
      });
      return;
    }

    // Clear Errors if valid
    setErrors({});

    const newTx = {
      id: Date.now(),
      type: entryType,
      amount: parseFloat(amount),
      category: category,
      note: note.trim() || (entryType === 'in' ? 'Cash In Entry' : 'Cash Out Entry'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTransactions([newTx, ...transactions]);
    setAmount('');
    setNote('');
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Calculations
  const filteredTransactions = transactions.filter(t => {
    const matchesFilter = activeCategoryFilter === 'All' || t.category === activeCategoryFilter;
    const matchesSearch = searchQuery === '' || 
      t.note.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalIn = transactions.filter(t => t.type === 'in').reduce((acc, t) => acc + t.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'out').reduce((acc, t) => acc + t.amount, 0);
  const netCash = totalIn - totalOut;

  // Table Columns Setup
  const tableColumns = [
    { header: 'Type', align: 'left' },
    { header: 'Description / Note', align: 'left' },
    { header: 'Category', align: 'left' },
    { header: 'Time', align: 'left' },
    { header: 'Amount (PKR)', align: 'right' },
    { header: 'Action', align: 'center' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge-blue" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>Functional Core Module 01</span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>Digital Cashbook Management</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Track real-time counter sales, daily expenses, and running cash balance with form validation.</p>
        </div>
        <Badge variant="green" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '0.3rem' }} /> Active Ledger
        </Badge>
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
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Net Daily Cash</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: netCash >= 0 ? '#60a5fa' : '#f87171' }}>
            Rs. {netCash.toLocaleString()}
          </div>
        </Card>
      </div>

      {/* WORKSPACE GRID: FORM + TABLE */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* VALIDATED ENTRY FORM */}
        <Card>
          <CardHeader title="Log Cash Entry" icon={BookOpen} subtitle="Validates amount & category fields" />
          <CardBody>
            <form onSubmit={handleAddTransaction}>
              {/* Type Switcher */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setEntryType('in')}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: entryType === 'in' ? '#10b981' : 'rgba(255,255,255,0.08)',
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
                  onClick={() => setEntryType('out')}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: entryType === 'out' ? '#ef4444' : 'rgba(255,255,255,0.08)',
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

              {/* Amount Input with Validation Error alert */}
              <Input
                label="Amount (PKR)"
                type="number"
                placeholder="e.g. 5000"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errors.amount) setErrors({ ...errors, amount: null });
                }}
                error={errors.amount}
                required
              />

              {/* Category Select */}
              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                  { label: 'Sales', value: 'Sales' },
                  { label: 'Expenses', value: 'Expenses' },
                  { label: 'Salary', value: 'Salary' },
                  { label: 'Utilities', value: 'Utilities' },
                  { label: 'Inventory', value: 'Inventory' }
                ]}
                error={errors.category}
                required
              />

              {/* Note / Description Input */}
              <Input
                label="Description / Note (Optional)"
                type="text"
                placeholder="e.g. Counter sale or Electricity bill"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <Button
                type="submit"
                variant={entryType === 'in' ? 'success' : 'danger'}
                style={{ width: '100%', marginTop: '0.5rem' }}
                icon={Plus}
              >
                Save {entryType === 'in' ? 'Cash In (+)' : 'Cash Out (-)'} Entry
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* TRANSACTIONS REUSABLE TABLE CONTAINER */}
        <Card>
          <CardHeader 
            title="Today's Cash Ledger" 
            subtitle={`${filteredTransactions.length} items logged`}
            action={
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Input
                  placeholder="Search entries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={Search}
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', width: '180px' }}
                />
              </div>
            }
          />
          <CardBody>
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {['All', 'Sales', 'Expenses', 'Utilities', 'Salary', 'Inventory'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    border: '1px solid',
                    borderColor: activeCategoryFilter === cat ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                    background: activeCategoryFilter === cat ? 'rgba(59, 130, 246, 0.2)' : 'rgba(15,23,42,0.6)',
                    color: activeCategoryFilter === cat ? '#60a5fa' : '#94a3b8',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Reusable Table Component */}
            <Table
              columns={tableColumns}
              data={filteredTransactions}
              emptyMessage="No cashbook entries match your filter criteria."
              renderRow={(t) => (
                <>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{
                      padding: '0.4rem',
                      borderRadius: '8px',
                      width: 'fit-content',
                      background: t.type === 'in' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: t.type === 'in' ? '#34d399' : '#f87171'
                    }}>
                      {t.type === 'in' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'white', fontSize: '0.9rem' }}>
                    {t.note}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <Badge variant={t.category === 'Sales' ? 'green' : t.category === 'Expenses' ? 'red' : 'purple'}>
                      {t.category}
                    </Badge>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                    {t.time}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right', fontWeight: 800, fontSize: '1rem', color: t.type === 'in' ? '#34d399' : '#f87171' }}>
                    {t.type === 'in' ? '+' : '-'} Rs. {t.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(t.id)}
                      style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
                      title="Delete Entry"
                    >
                      <Trash2 size={16} />
                    </button>
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

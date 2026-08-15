'use client';

import React, { useState } from 'react';
import { 
  BookOpen, Plus, ArrowDownLeft, ArrowUpRight, Trash2, Edit, 
  Search, RefreshCw
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Table from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import { LoadingState, ErrorState } from '../../../components/ui/StateAlert';
import { validateAmount, validateRequired } from '../../../lib/validation';

export default function CashbookCRUDPage() {
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'in', amount: 28000, category: 'Sales', note: 'Morning Counter Sale', time: '09:30 AM' },
    { id: 2, type: 'out', amount: 6200, category: 'Utilities', note: 'Electricity Bill', time: '11:15 AM' },
    { id: 3, type: 'in', amount: 15500, category: 'Sales', note: 'Wholesale Accessories', time: '01:45 PM' }
  ]);

  const [entryType, setEntryType] = useState('in');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Sales');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});

  const [editModalTx, setEditModalTx] = useState(null);
  const [editType, setEditType] = useState('in');
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('Sales');
  const [editNote, setEditNote] = useState('');
  const [editErrors, setEditErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTransaction = (e) => {
    e.preventDefault();

    const amountErr = validateAmount(amount);
    const categoryErr = validateRequired(category, 'Category');

    if (amountErr || categoryErr) {
      setErrors({ amount: amountErr, category: categoryErr });
      return;
    }

    setErrors({});

    const newTx = {
      id: Date.now(),
      type: entryType,
      amount: parseFloat(amount),
      category: category,
      note: note.trim() || (entryType === 'in' ? 'Cash In' : 'Cash Out'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTransactions([newTx, ...transactions]);
    setAmount('');
    setNote('');
  };

  const handleOpenEditModal = (tx) => {
    setEditModalTx(tx);
    setEditType(tx.type);
    setEditAmount(tx.amount.toString());
    setEditCategory(tx.category);
    setEditNote(tx.note);
    setEditErrors({});
  };

  const handleUpdateTransaction = (e) => {
    e.preventDefault();

    const amtErr = validateAmount(editAmount);
    const catErr = validateRequired(editCategory, 'Category');

    if (amtErr || catErr) {
      setEditErrors({ amount: amtErr, category: catErr });
      return;
    }

    setEditErrors({});

    setTransactions(transactions.map(t => {
      if (t.id === editModalTx.id) {
        return {
          ...t,
          type: editType,
          amount: parseFloat(editAmount),
          category: editCategory,
          note: editNote.trim() || t.note
        };
      }
      return t;
    }));

    setEditModalTx(null);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const filteredTransactions = transactions.filter(t => 
    searchQuery === '' || 
    t.note.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalIn = transactions.filter(t => t.type === 'in').reduce((acc, t) => acc + t.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'out').reduce((acc, t) => acc + t.amount, 0);
  const netCash = totalIn - totalOut;

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge variant="blue" style={{ marginBottom: '0.4rem' }}>Module 1 (Core CRUD Module)</Badge>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>Digital Cashbook</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Create, view, edit via modal, and delete cash transactions.</p>
        </div>
      </div>

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
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: netCash >= 0 ? '#60a5fa' : '#f87171' }}>Rs. {netCash.toLocaleString()}</div>
        </Card>
      </div>

      {/* VERTICAL STACK: CREATE ENTRY FORM (TOP) -> TRANSACTIONS TABLE (BELOW) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Card>
          <CardHeader title="Create Entry" icon={Plus} />
          <CardBody>
            <form onSubmit={handleAddTransaction}>
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
                    cursor: 'pointer'
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
                    cursor: 'pointer'
                  }}
                >
                  <ArrowUpRight size={16} /> Cash Out (-)
                </button>
              </div>

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

              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                  { label: 'Sales', value: 'Sales' },
                  { label: 'Expenses', value: 'Expenses' },
                  { label: 'Salary', value: 'Salary' },
                  { label: 'Utilities', value: 'Utilities' }
                ]}
              />

              <Input
                label="Description"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <Button type="submit" variant={entryType === 'in' ? 'success' : 'danger'} style={{ width: '100%' }} icon={Plus}>
                Add Transaction
              </Button>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Transactions Table"
            subtitle={`${filteredTransactions.length} entries`}
            action={
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', width: '160px' }}
              />
            }
          />
          <CardBody>
            <Table
              columns={[
                { header: 'Type' },
                { header: 'Description' },
                { header: 'Amount', align: 'right' },
                { header: 'Actions', align: 'center' }
              ]}
              data={filteredTransactions}
              renderRow={(t) => (
                <>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <Badge variant={t.type === 'in' ? 'green' : 'red'}>
                      {t.type === 'in' ? '+' : '-'}
                    </Badge>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'white' }}>{t.note}</td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right', fontWeight: 800, color: t.type === 'in' ? '#34d399' : '#f87171' }}>
                    {t.type === 'in' ? '+' : '-'} Rs. {t.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                      <button onClick={() => handleOpenEditModal(t)} style={{ background: 'rgba(59, 130, 246, 0.15)', border: 'none', color: '#60a5fa', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer' }}>
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDeleteTransaction(t.id)} style={{ background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#f87171', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </>
              )}
            />
          </CardBody>
        </Card>
      </div>

      {/* EDIT MODAL */}
      <Modal isOpen={!!editModalTx} onClose={() => setEditModalTx(null)} title="✏️ Edit Cashbook Transaction">
        <form onSubmit={handleUpdateTransaction}>
          <Input
            label="Amount (PKR)"
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
            error={editErrors.amount}
            required
          />
          <Input
            label="Description"
            value={editNote}
            onChange={(e) => setEditNote(e.target.value)}
          />
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setEditModalTx(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Update Entry</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

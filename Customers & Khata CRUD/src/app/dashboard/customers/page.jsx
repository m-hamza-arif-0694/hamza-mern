'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, UserPlus, Phone, Send, Edit, Trash2, MessageSquare, 
  Search, Filter, PlusCircle, MinusCircle, RefreshCw, FileText, 
  TrendingUp, TrendingDown, CheckCircle2, AlertTriangle, Sparkles,
  ArrowUpRight, ArrowDownLeft, DollarSign, Database
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';
import { LoadingState, EmptyState, ErrorState, SuccessBanner } from '../../../components/ui/StateAlert';
import AddCustomerModal from '../../../components/customers/AddCustomerModal';
import EditCustomerModal from '../../../components/customers/EditCustomerModal';
import DeleteCustomerModal from '../../../components/customers/DeleteCustomerModal';
import AddKhataEntryModal from '../../../components/customers/AddKhataEntryModal';
import EditKhataEntryModal from '../../../components/customers/EditKhataEntryModal';
import WhatsAppReminderModal from '../../../components/customers/WhatsAppReminderModal';
import StatementModal from '../../../components/customers/StatementModal';

export default function CustomersKhataCRUDPage() {
  // State for Customer Directory
  const [customers, setCustomers] = useState([]);
  const [selectedCustId, setSelectedCustId] = useState(null);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalReceivable: 0,
    totalPayable: 0,
    netMarketPosition: 0,
    settledCount: 0,
    highCreditAlertCount: 0
  });

  // State for Selected Customer Ledger Entries
  const [khataEntries, setKhataEntries] = useState([]);
  const [khataLoading, setKhataLoading] = useState(false);

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [balanceFilter, setBalanceFilter] = useState('all'); // 'all', 'receivable', 'payable', 'settled'
  const [categoryFilter, setCategoryFilter] = useState('all');

  // UI State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modals Control
  const [isAddCustOpen, setIsAddCustOpen] = useState(false);
  const [editingCust, setEditingCust] = useState(null);
  const [deletingCust, setDeletingCust] = useState(null);
  
  const [addEntryType, setAddEntryType] = useState('GAVE_CREDIT');
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isStatementOpen, setIsStatementOpen] = useState(false);

  // Fetch Customers List from API
  const fetchCustomers = useCallback(async (selectId = null) => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      if (balanceFilter !== 'all') params.append('balanceType', balanceFilter);
      if (categoryFilter !== 'all') params.append('category', categoryFilter);

      const res = await fetch(`/api/customers?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch customers');
      }

      setCustomers(data.data || []);
      if (data.stats) setStats(data.stats);

      // Select customer logic
      if (data.data && data.data.length > 0) {
        if (selectId) {
          setSelectedCustId(selectId);
        } else if (!selectedCustId || !data.data.some(c => (c._id || c.id) === selectedCustId)) {
          setSelectedCustId(data.data[0]._id || data.data[0].id);
        }
      } else {
        setSelectedCustId(null);
        setKhataEntries([]);
      }
    } catch (err) {
      setError(err.message || 'Error loading customers');
    } finally {
      setLoading(false);
    }
  }, [search, balanceFilter, categoryFilter, selectedCustId]);

  // Fetch Khata entries for selected customer
  const fetchKhataEntries = useCallback(async (custId) => {
    if (!custId) {
      setKhataEntries([]);
      return;
    }
    try {
      setKhataLoading(true);
      const res = await fetch(`/api/customers/${custId}/khata`);
      const data = await res.json();

      if (res.ok && data.data) {
        setKhataEntries(data.data);
      }
    } catch (err) {
      console.error('Error fetching khata entries:', err);
    } finally {
      setKhataLoading(false);
    }
  }, []);

  // Initial load & search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, balanceFilter, categoryFilter]);

  // Load khata entries when selected customer changes
  useEffect(() => {
    if (selectedCustId) {
      fetchKhataEntries(selectedCustId);
    }
  }, [selectedCustId, fetchKhataEntries]);

  // Seed sample database
  const handleSeedDatabase = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('Sample Pakistani merchant customer and ledger records loaded successfully!');
        fetchCustomers();
      }
    } catch (err) {
      setError('Failed to seed database: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Callback after Customer created
  const handleCustomerCreated = (newCust) => {
    setSuccessMsg(`Customer "${newCust.name}" registered successfully!`);
    fetchCustomers(newCust._id || newCust.id);
  };

  // Callback after Customer updated
  const handleCustomerUpdated = (updatedCust) => {
    setSuccessMsg(`Customer profile for "${updatedCust.name}" updated successfully.`);
    setCustomers(prev => prev.map(c => (c._id || c.id) === (updatedCust._id || updatedCust.id) ? updatedCust : c));
  };

  // Callback after Customer deleted
  const handleCustomerDeleted = (deletedId) => {
    setSuccessMsg('Customer record and transaction history deleted successfully.');
    const remaining = customers.filter(c => (c._id || c.id) !== deletedId);
    setCustomers(remaining);
    if (remaining.length > 0) {
      setSelectedCustId(remaining[0]._id || remaining[0].id);
    } else {
      setSelectedCustId(null);
      setKhataEntries([]);
    }
    // Refresh stats
    fetchCustomers();
  };

  // Callback after Khata Entry added
  const handleEntryAdded = (newEntry, updatedCustomer) => {
    setSuccessMsg(`Transaction of Rs. ${Number(newEntry.amount).toLocaleString()} recorded successfully!`);
    if (updatedCustomer) {
      setCustomers(prev => prev.map(c => (c._id || c.id) === (updatedCustomer._id || updatedCustomer.id) ? updatedCustomer : c));
    }
    if (selectedCustId) {
      fetchKhataEntries(selectedCustId);
    }
    fetchCustomers(selectedCustId);
  };

  // Callback after Khata Entry updated
  const handleEntryUpdated = (updatedEntry, updatedCustomer) => {
    setSuccessMsg('Transaction entry updated.');
    if (updatedCustomer) {
      setCustomers(prev => prev.map(c => (c._id || c.id) === (updatedCustomer._id || updatedCustomer.id) ? updatedCustomer : c));
    }
    if (selectedCustId) {
      fetchKhataEntries(selectedCustId);
    }
  };

  // Delete single khata entry
  const handleDeleteEntry = async (entryId) => {
    if (!selectedCustId || !confirm('Are you sure you want to delete this transaction entry?')) return;
    try {
      const res = await fetch(`/api/customers/${selectedCustId}/khata/${entryId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('Transaction entry deleted and balance recalculated.');
        if (data.customer) {
          setCustomers(prev => prev.map(c => (c._id || c.id) === selectedCustId ? data.customer : c));
        }
        fetchKhataEntries(selectedCustId);
      }
    } catch (err) {
      setError('Error deleting transaction: ' + err.message);
    }
  };

  const selectedCustomer = customers.find(c => (c._id || c.id) === selectedCustId) || (customers.length > 0 ? customers[0] : null);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <Badge variant="purple">Customers & Khata CRUD Specialist</Badge>
            <Badge variant="green">Live DB Connected</Badge>
            <Badge variant="blue">Zod Validated</Badge>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
            Customer Udhar & Khata Ledgers
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
            Full CRUD operations, Pakistani mobile validation (+923xxxxxxxxx), real-time running balance, and WhatsApp dues reminders.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button variant="secondary" size="sm" icon={RefreshCw} onClick={() => fetchCustomers(selectedCustId)} loading={loading}>
            Refresh
          </Button>
          <Button variant="secondary" size="sm" icon={Sparkles} onClick={handleSeedDatabase}>
            Seed Sample Data
          </Button>
          <Button variant="primary" size="md" icon={UserPlus} onClick={() => setIsAddCustOpen(true)}>
            Add New Customer
          </Button>
        </div>
      </div>

      {/* SUCCESS / ERROR ALERTS */}
      <SuccessBanner message={successMsg} onDismiss={() => setSuccessMsg('')} />
      <ErrorState message={error} onDismiss={() => setError('')} />

      {/* METRIC STATS CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}>
        {/* Total Customers */}
        <Card style={{ padding: '1.2rem', background: 'rgba(15, 23, 42, 0.75)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Total Accounts</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', marginTop: '0.2rem' }}>
                {stats.totalCustomers}
              </div>
            </div>
            <div style={{ padding: '0.65rem', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
              <Users size={24} />
            </div>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.5rem' }}>
            {stats.settledCount} accounts settled (Rs. 0)
          </div>
        </Card>

        {/* Total Receivable (You Will Get) */}
        <Card style={{ padding: '1.2rem', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#34d399', textTransform: 'uppercase', fontWeight: 700 }}>Total Udhar (You Will Get)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '0.2rem' }}>
                Rs. {(stats.totalReceivable || 0).toLocaleString()}
              </div>
            </div>
            <div style={{ padding: '0.65rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <TrendingUp size={24} />
            </div>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.5rem' }}>
            Pending payments from customers
          </div>
        </Card>

        {/* Total Payable (You Will Give) */}
        <Card style={{ padding: '1.2rem', borderLeft: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#f87171', textTransform: 'uppercase', fontWeight: 700 }}>Advance / You Will Give</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f87171', marginTop: '0.2rem' }}>
                Rs. {(stats.totalPayable || 0).toLocaleString()}
              </div>
            </div>
            <div style={{ padding: '0.65rem', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
              <TrendingDown size={24} />
            </div>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.5rem' }}>
            Customer advance deposits
          </div>
        </Card>

        {/* Net Market Balance */}
        <Card style={{ padding: '1.2rem', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#c084fc', textTransform: 'uppercase', fontWeight: 700 }}>Net Market Position</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: (stats.netMarketPosition || 0) >= 0 ? '#34d399' : '#f87171', marginTop: '0.2rem' }}>
                Rs. {Math.abs(stats.netMarketPosition || 0).toLocaleString()}
              </div>
            </div>
            <div style={{ padding: '0.65rem', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc' }}>
              <DollarSign size={24} />
            </div>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.5rem' }}>
            {(stats.netMarketPosition || 0) >= 0 ? 'Net positive receivables' : 'Net customer advances'}
          </div>
        </Card>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <Card style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Search Box */}
          <div style={{ flex: '1 1 260px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search by customer name, phone (+92...), or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>

          {/* Balance Filter Tabs */}
          <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.8)', padding: '0.25rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'receivable', label: '🟢 You Will Get' },
              { id: 'payable', label: '🔴 You Give' },
              { id: 'settled', label: 'Settled (Rs. 0)' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setBalanceFilter(tab.id)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: balanceFilter === tab.id ? '#3b82f6' : 'transparent',
                  color: balanceFilter === tab.id ? 'white' : '#94a3b8',
                  fontWeight: balanceFilter === tab.id ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div style={{ minWidth: '160px' }}>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-field"
              style={{ cursor: 'pointer', padding: '0.55rem 0.85rem' }}
            >
              <option value="all">All Categories</option>
              <option value="Retail">Retail</option>
              <option value="Wholesale">Wholesale</option>
              <option value="Distributor">Distributor</option>
              <option value="VIP">VIP</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>
      </Card>

      {/* TWO-COLUMN MASTER-DETAIL WORKSPACE */}
      <div className="responsive-workspace-grid">
        {/* LEFT COLUMN: CUSTOMER DIRECTORY */}
        <div>
          <Card style={{ height: '100%', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              title="Customer Directory"
              subtitle={`${customers.length} registered accounts`}
              icon={Users}
              action={
                <Button variant="primary" size="sm" icon={UserPlus} onClick={() => setIsAddCustOpen(true)}>
                  Add
                </Button>
              }
            />

            <CardBody style={{ flex: 1, overflowY: 'auto' }}>
              {loading && customers.length === 0 ? (
                <LoadingState message="Loading customers..." />
              ) : customers.length === 0 ? (
                <EmptyState
                  title="No Customers Found"
                  message={search ? 'No customer matches your search criteria.' : 'Start by registering your first customer or seeding sample data.'}
                  actionText="Register Customer"
                  onAction={() => setIsAddCustOpen(true)}
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {customers.map((c) => {
                    const custId = c._id || c.id;
                    const isSelected = selectedCustId === custId;
                    const isReceivable = c.netBalance > 0;
                    const isPayable = c.netBalance < 0;

                    return (
                      <div
                        key={custId}
                        onClick={() => setSelectedCustId(custId)}
                        style={{
                          padding: '1rem',
                          borderRadius: '12px',
                          background: isSelected ? 'rgba(59, 130, 246, 0.18)' : 'rgba(15, 23, 42, 0.6)',
                          border: '1px solid',
                          borderColor: isSelected ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.07)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.75rem'
                        }}
                      >
                        {/* Customer Avatar & Details */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '10px',
                            background: isSelected 
                              ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' 
                              : 'rgba(30, 41, 59, 0.8)',
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            {c.name.substring(0, 2).toUpperCase()}
                          </div>

                          <div>
                            <div style={{ fontWeight: 700, color: 'white', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <span>{c.name}</span>
                              {c.category && (
                                <span style={{ fontSize: '0.68rem', background: 'rgba(255,255,255,0.08)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: '#94a3b8' }}>
                                  {c.category}
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem' }}>
                              <span>{c.phone}</span>
                              {c.city && <span>• {c.city}</span>}
                            </div>
                          </div>
                        </div>

                        {/* Net Balance & Actions */}
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                          <div style={{
                            fontWeight: 800,
                            fontSize: '0.95rem',
                            color: isReceivable ? '#34d399' : isPayable ? '#f87171' : '#94a3b8'
                          }}>
                            {isReceivable ? `Rs. ${c.netBalance.toLocaleString()}` : isPayable ? `Rs. ${Math.abs(c.netBalance).toLocaleString()}` : 'Settled (Rs. 0)'}
                          </div>

                          <div style={{ fontSize: '0.7rem', fontWeight: 600, color: isReceivable ? '#34d399' : isPayable ? '#f87171' : '#64748b' }}>
                            {isReceivable ? 'You Will Get' : isPayable ? 'You Will Give' : 'Clear'}
                          </div>

                          <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.15rem' }}>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setEditingCust(c); }}
                              title="Edit Customer Profile"
                              style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', padding: '0.3rem 0.5rem', borderRadius: '6px', cursor: 'pointer' }}
                            >
                              <Edit size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setDeletingCust(c); }}
                              title="Delete Customer"
                              style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '0.3rem 0.5rem', borderRadius: '6px', cursor: 'pointer' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* RIGHT COLUMN: SELECTED CUSTOMER KHATA LEDGER WORKSPACE */}
        <div>
          {selectedCustomer ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Selected Customer Header Profile Card */}
              <Card style={{ borderLeft: selectedCustomer.netBalance >= 0 ? '4px solid #10b981' : '4px solid #ef4444' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
                    }}>
                      {selectedCustomer.name.substring(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'white' }}>{selectedCustomer.name}</h2>
                        <Badge variant="blue">{selectedCustomer.category || 'Retail'}</Badge>
                        <Badge variant={selectedCustomer.status === 'active' ? 'green' : 'red'}>
                          {selectedCustomer.status || 'active'}
                        </Badge>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <span>📞 {selectedCustomer.phone}</span>
                        {selectedCustomer.city && <span>📍 {selectedCustomer.city}</span>}
                        {selectedCustomer.address && <span>• {selectedCustomer.address}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Net Balance Large Badge */}
                  <div style={{
                    background: selectedCustomer.netBalance >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid',
                    borderColor: selectedCustomer.netBalance >= 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '12px',
                    textAlign: 'right'
                  }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: selectedCustomer.netBalance >= 0 ? '#34d399' : '#f87171' }}>
                      {selectedCustomer.netBalance >= 0 ? 'Net Receivable (You Will Get)' : 'Net Advance (You Will Give)'}
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: selectedCustomer.netBalance >= 0 ? '#34d399' : '#f87171' }}>
                      Rs. {Math.abs(selectedCustomer.netBalance).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Credit Limit Alert Bar */}
                {selectedCustomer.creditLimit > 0 && (
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                      <span>Credit Limit: Rs. {selectedCustomer.creditLimit.toLocaleString()}</span>
                      <span>Usage: {Math.min(100, Math.round((Math.max(0, selectedCustomer.netBalance) / selectedCustomer.creditLimit) * 100))}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${Math.min(100, Math.max(0, (selectedCustomer.netBalance / selectedCustomer.creditLimit) * 100))}%`,
                          background: selectedCustomer.netBalance > selectedCustomer.creditLimit ? '#ef4444' : '#3b82f6',
                          borderRadius: '3px'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons Toolbar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={MinusCircle}
                      onClick={() => { setAddEntryType('GAVE_CREDIT'); setIsAddEntryOpen(true); }}
                    >
                      🔴 You Gave (Udhar / Credit)
                    </Button>

                    <Button
                      variant="success"
                      size="sm"
                      icon={PlusCircle}
                      onClick={() => { setAddEntryType('GOT_PAYMENT'); setIsAddEntryOpen(true); }}
                    >
                      🟢 You Got (Wasooli / Payment)
                    </Button>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={MessageSquare}
                      onClick={() => setIsWhatsAppOpen(true)}
                    >
                      WhatsApp Reminder
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      icon={FileText}
                      onClick={() => setIsStatementOpen(true)}
                    >
                      Statement
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Edit}
                      onClick={() => setEditingCust(selectedCustomer)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Transactions Ledger Table Card */}
              <Card>
                <CardHeader
                  title="Transaction History Ledger"
                  subtitle={`${khataEntries.length} recorded entries with calculated running balance`}
                  icon={Database}
                  action={
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={RefreshCw}
                      onClick={() => fetchKhataEntries(selectedCustomer._id || selectedCustomer.id)}
                      loading={khataLoading}
                    >
                      Refresh Ledger
                    </Button>
                  }
                />

                <CardBody>
                  {khataLoading ? (
                    <LoadingState message="Fetching ledger transactions..." />
                  ) : khataEntries.length === 0 ? (
                    <EmptyState
                      title="No Transactions Recorded"
                      message={`No credit or payment entries exist for ${selectedCustomer.name} yet.`}
                      actionText="Record First Entry"
                      onAction={() => { setAddEntryType('GAVE_CREDIT'); setIsAddEntryOpen(true); }}
                    />
                  ) : (
                    <div className="horizontal-scroll-container">
                      <table style={{ width: '100%', minWidth: '650px', borderCollapse: 'separate', borderSpacing: '0 0.5rem' }}>
                        <thead>
                          <tr>
                            <th style={{ textAlign: 'left', padding: '0.65rem 0.85rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Date</th>
                            <th style={{ textAlign: 'left', padding: '0.65rem 0.85rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Type</th>
                            <th style={{ textAlign: 'left', padding: '0.65rem 0.85rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Details / Note</th>
                            <th style={{ textAlign: 'left', padding: '0.65rem 0.85rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Method</th>
                            <th style={{ textAlign: 'right', padding: '0.65rem 0.85rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Amount</th>
                            <th style={{ textAlign: 'right', padding: '0.65rem 0.85rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Net Running</th>
                            <th style={{ textAlign: 'center', padding: '0.65rem 0.85rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {khataEntries.map((e) => {
                            const isCredit = e.type === 'GAVE_CREDIT' || e.type === 'gave';
                            const entryId = e._id || e.id;

                            return (
                              <tr
                                key={entryId}
                                style={{
                                  background: 'rgba(15, 23, 42, 0.6)',
                                  borderRadius: '10px',
                                  borderLeft: isCredit ? '3px solid #ef4444' : '3px solid #10b981'
                                }}
                              >
                                <td style={{ padding: '0.75rem 0.85rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
                                  {new Date(e.date).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>

                                <td style={{ padding: '0.75rem 0.85rem' }}>
                                  <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '6px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    background: isCredit ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                    color: isCredit ? '#f87171' : '#34d399'
                                  }}>
                                    {isCredit ? <ArrowDownLeft size={13} /> : <ArrowUpRight size={13} />}
                                    {isCredit ? 'You Gave' : 'You Got'}
                                  </span>
                                </td>

                                <td style={{ padding: '0.75rem 0.85rem', fontSize: '0.85rem', color: 'white' }}>
                                  {e.billNumber && (
                                    <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600, marginRight: '0.4rem' }}>
                                      {e.billNumber}
                                    </span>
                                  )}
                                  {e.description || '-'}
                                </td>

                                <td style={{ padding: '0.75rem 0.85rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                                  {e.paymentMethod || 'Cash'}
                                </td>

                                <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right', fontWeight: 800, fontSize: '0.92rem', color: isCredit ? '#f87171' : '#34d399' }}>
                                  {isCredit ? '-' : '+'} Rs. {Number(e.amount).toLocaleString()}
                                </td>

                                <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right', fontWeight: 800, fontSize: '0.92rem', color: '#e2e8f0' }}>
                                  Rs. {Number(e.balanceAfter || 0).toLocaleString()}
                                </td>

                                <td style={{ padding: '0.75rem 0.85rem', textAlign: 'center' }}>
                                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem' }}>
                                    <button
                                      type="button"
                                      onClick={() => setEditingEntry(e)}
                                      title="Edit Transaction"
                                      style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', padding: '0.3rem 0.5rem', borderRadius: '6px', cursor: 'pointer' }}
                                    >
                                      <Edit size={13} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteEntry(entryId)}
                                      title="Delete Transaction"
                                      style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '0.3rem 0.5rem', borderRadius: '6px', cursor: 'pointer' }}
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>
          ) : (
            <Card style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
              <Users size={48} color="#475569" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>No Customer Selected</h3>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                Please select a customer from the directory on the left or register a new customer to manage their Udhar Khata ledger.
              </p>
              <Button variant="primary" icon={UserPlus} onClick={() => setIsAddCustOpen(true)}>
                Add Customer Profile
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* ALL MODAL DIALOGS */}
      <AddCustomerModal
        isOpen={isAddCustOpen}
        onClose={() => setIsAddCustOpen(false)}
        onCustomerCreated={handleCustomerCreated}
      />

      <EditCustomerModal
        isOpen={!!editingCust}
        onClose={() => setEditingCust(null)}
        customer={editingCust}
        onCustomerUpdated={handleCustomerUpdated}
      />

      <DeleteCustomerModal
        isOpen={!!deletingCust}
        onClose={() => setDeletingCust(null)}
        customer={deletingCust}
        onCustomerDeleted={handleCustomerDeleted}
      />

      <AddKhataEntryModal
        isOpen={isAddEntryOpen}
        onClose={() => setIsAddEntryOpen(false)}
        customer={selectedCustomer}
        defaultType={addEntryType}
        onEntryAdded={handleEntryAdded}
      />

      <EditKhataEntryModal
        isOpen={!!editingEntry}
        onClose={() => setEditingEntry(null)}
        customer={selectedCustomer}
        entry={editingEntry}
        onEntryUpdated={handleEntryUpdated}
      />

      <WhatsAppReminderModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        customer={selectedCustomer}
      />

      <StatementModal
        isOpen={isStatementOpen}
        onClose={() => setIsStatementOpen(false)}
        customer={selectedCustomer}
        entries={khataEntries}
      />
    </div>
  );
}

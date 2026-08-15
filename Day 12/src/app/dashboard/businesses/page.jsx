'use client';

import React, { useState } from 'react';
import { 
  Building2, Plus, Edit, Trash2, MapPin, CheckCircle2, 
  ShieldCheck, RefreshCw, ArrowRight 
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Table from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import { LoadingState, ErrorState } from '../../../components/ui/StateAlert';
import { useAuth } from '../../../context/AuthContext';
import { validateAmount, validateRequired } from '../../../lib/validation';

export default function MultiBusinessCRUDPage() {
  const { activeBranch, setActiveBranch } = useAuth();

  // Multi-Business Branches State
  const [branches, setBranches] = useState([
    { id: 1, name: 'Hamza Electronics — Main Hall', location: 'Hafeez Centre, Lahore', type: 'Electronics & Mobiles', startingCash: 42500, staffCount: 4, status: 'Active' },
    { id: 2, name: 'Hamza Accessories & Wholesale', location: 'Hall Road, Lahore', type: 'Wholesale Accessories', startingCash: 28000, staffCount: 2, status: 'Active' },
    { id: 3, name: 'Hamza Mobile Repair Hub', location: 'Saddar, Karachi', type: 'Repair Services', startingCash: 15000, staffCount: 3, status: 'Active' }
  ]);

  // Form State: Add Branch
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Electronics & Mobiles');
  const [cash, setCash] = useState('');
  const [errors, setErrors] = useState({});

  // Form State: Edit Branch (Modal)
  const [editBranchModal, setEditBranchModal] = useState(null);
  const [editName, setEditName] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editType, setEditType] = useState('Electronics & Mobiles');
  const [editCash, setEditCash] = useState('');
  const [editErrors, setEditErrors] = useState({});

  // UI State Simulator Toggles
  const [isLoading, setIsLoading] = useState(false);

  // --- CRUD 1: CREATE BRANCH ---
  const handleAddBranch = (e) => {
    e.preventDefault();

    const nameErr = validateRequired(name, 'Branch Name');
    const locErr = validateRequired(location, 'Branch City / Location');
    const cashErr = validateAmount(cash);

    if (nameErr || locErr || cashErr) {
      setErrors({ name: nameErr, location: locErr, cash: cashErr });
      return;
    }

    setErrors({});

    const newBranch = {
      id: Date.now(),
      name: name.trim(),
      location: location.trim(),
      type: type,
      startingCash: parseFloat(cash),
      staffCount: 1,
      status: 'Active'
    };

    setBranches([newBranch, ...branches]);
    setName('');
    setLocation('');
    setCash('');
  };

  // --- CRUD 2: EDIT BRANCH (PREPARE MODAL) ---
  const handleOpenEditBranchModal = (branch) => {
    setEditBranchModal(branch);
    setEditName(branch.name);
    setEditLocation(branch.location);
    setEditType(branch.type);
    setEditCash(branch.startingCash.toString());
    setEditErrors({});
  };

  // --- CRUD 3: UPDATE BRANCH (SUBMIT MODAL) ---
  const handleUpdateBranch = (e) => {
    e.preventDefault();

    const nameErr = validateRequired(editName, 'Branch Name');
    const locErr = validateRequired(editLocation, 'Branch Location');
    const cashErr = validateAmount(editCash);

    if (nameErr || locErr || cashErr) {
      setEditErrors({ name: nameErr, location: locErr, cash: cashErr });
      return;
    }

    setEditErrors({});

    const updatedBranches = branches.map(b => {
      if (b.id === editBranchModal.id) {
        return {
          ...b,
          name: editName.trim(),
          location: editLocation.trim(),
          type: editType,
          startingCash: parseFloat(editCash)
        };
      }
      return b;
    });

    setBranches(updatedBranches);

    // If edited branch is currently active, update activeBranch context!
    if (activeBranch && activeBranch.id === editBranchModal.id) {
      setActiveBranch({
        ...activeBranch,
        name: editName.trim(),
        location: editLocation.trim(),
        type: editType,
        cashBalance: parseFloat(editCash)
      });
    }

    setEditBranchModal(null);
  };

  // --- CRUD 4: DELETE BRANCH ---
  const handleDeleteBranch = (id) => {
    const remaining = branches.filter(b => b.id !== id);
    setBranches(remaining);
    if (activeBranch && activeBranch.id === id && remaining.length > 0) {
      setActiveBranch(remaining[0]);
    }
  };

  const totalBranchesCash = branches.reduce((acc, b) => acc + b.startingCash, 0);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge variant="purple" style={{ marginBottom: '0.4rem' }}>Module 3 (NEW Core CRUD Module)</Badge>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>Multi-Business Branch Management</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Create, view, edit branch locations, and switch active shop context across the entire Web App.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="secondary" size="sm" onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 700);
          }}>
            <RefreshCw size={14} /> Refresh State
          </Button>
        </div>
      </div>

      {/* METRIC SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <Card borderLeftColor="#8b5cf6">
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Active Registered Branches</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc' }}>{branches.length} Outlets</div>
        </Card>
        <Card borderLeftColor="#10b981">
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Combined Branch Cash Pool</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>Rs. {totalBranchesCash.toLocaleString()}</div>
        </Card>
        <Card borderLeftColor="#3b82f6">
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Active Context</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#60a5fa' }}>{activeBranch ? activeBranch.name : 'Main Hall'}</div>
        </Card>
      </div>

      {/* VERTICAL STACK: REGISTER BRANCH FORM (TOP) -> BRANCHES DIRECTORY TABLE (BELOW) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* CREATE BRANCH FORM */}
        <Card>
          <CardHeader title="Register New Branch" subtitle="Form validation enabled" icon={Plus} />
          <CardBody>
            <form onSubmit={handleAddBranch}>
              <Input
                label="Branch / Shop Name"
                placeholder="e.g. Hamza Electronics — Branch 2"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                error={errors.name}
                required
              />

              <Input
                label="City / Location"
                placeholder="e.g. Liberty Market, Lahore"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors({ ...errors, location: null });
                }}
                error={errors.location}
                icon={MapPin}
                required
              />

              <Select
                label="Business Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                options={[
                  { label: 'Electronics & Mobiles', value: 'Electronics & Mobiles' },
                  { label: 'Wholesale Accessories', value: 'Wholesale Accessories' },
                  { label: 'Repair Services', value: 'Repair Services' },
                  { label: 'General Kiryana Store', value: 'General Kiryana Store' }
                ]}
              />

              <Input
                label="Initial Starting Cash (PKR)"
                type="number"
                placeholder="e.g. 25000"
                value={cash}
                onChange={(e) => {
                  setCash(e.target.value);
                  if (errors.cash) setErrors({ ...errors, cash: null });
                }}
                error={errors.cash}
                required
              />

              <Button type="submit" variant="primary" style={{ width: '100%' }} icon={Building2}>
                Save & Register Branch
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* BRANCHES LIST & SWITCHER TABLE */}
        <Card>
          <CardHeader title="Branch Directory" subtitle={`${branches.length} outlets registered`} icon={Building2} />
          <CardBody>
            {isLoading ? (
              <LoadingState message="Loading business branch directory..." />
            ) : (
              <Table
                columns={[
                  { header: 'Branch Name' },
                  { header: 'Location' },
                  { header: 'Cash Pool', align: 'right' },
                  { header: 'Actions', align: 'center' }
                ]}
                data={branches}
                renderRow={(b) => {
                  const isCurrent = activeBranch && activeBranch.id === b.id;
                  return (
                    <>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ fontWeight: 700, color: 'white' }}>{b.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{b.type}</div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: '#cbd5e1' }}>{b.location}</td>
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right', fontWeight: 800, color: '#34d399' }}>
                        Rs. {b.startingCash.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                          <button
                            onClick={() => setActiveBranch(b)}
                            style={{
                              background: isCurrent ? '#10b981' : 'rgba(59, 130, 246, 0.15)',
                              border: '1px solid',
                              borderColor: isCurrent ? '#10b981' : 'rgba(59, 130, 246, 0.3)',
                              color: 'white',
                              padding: '0.3rem 0.6rem',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              fontWeight: 700
                            }}
                          >
                            {isCurrent ? '● Active' : 'Switch Context'}
                          </button>
                          <button
                            onClick={() => handleOpenEditBranchModal(b)}
                            style={{ background: 'rgba(59, 130, 246, 0.15)', border: 'none', color: '#60a5fa', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer' }}
                            title="Edit Branch"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteBranch(b.id)}
                            style={{ background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#f87171', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer' }}
                            title="Delete Branch"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </>
                  );
                }}
              />
            )}
          </CardBody>
        </Card>
      </div>

      {/* EDIT BRANCH MODAL */}
      <Modal
        isOpen={!!editBranchModal}
        onClose={() => setEditBranchModal(null)}
        title="✏️ Edit Business Branch Details"
      >
        <form onSubmit={handleUpdateBranch}>
          <Input
            label="Branch Name"
            value={editName}
            onChange={(e) => {
              setEditName(e.target.value);
              if (editErrors.name) setEditErrors({ ...editErrors, name: null });
            }}
            error={editErrors.name}
            required
          />

          <Input
            label="Location"
            value={editLocation}
            onChange={(e) => {
              setEditLocation(e.target.value);
              if (editErrors.location) setEditErrors({ ...editErrors, location: null });
            }}
            error={editErrors.location}
            icon={MapPin}
            required
          />

          <Select
            label="Business Type"
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
            options={[
              { label: 'Electronics & Mobiles', value: 'Electronics & Mobiles' },
              { label: 'Wholesale Accessories', value: 'Wholesale Accessories' },
              { label: 'Repair Services', value: 'Repair Services' },
              { label: 'General Kiryana Store', value: 'General Kiryana Store' }
            ]}
          />

          <Input
            label="Starting Cash (PKR)"
            type="number"
            value={editCash}
            onChange={(e) => {
              setEditCash(e.target.value);
              if (editErrors.cash) setEditErrors({ ...editErrors, cash: null });
            }}
            error={editErrors.cash}
            required
          />

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setEditBranchModal(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Update Branch Details
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

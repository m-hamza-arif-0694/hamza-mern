'use client';

import React from 'react';
import { Printer, Download, FileText, CheckCircle2, Building, Phone } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function StatementModal({ isOpen, onClose, customer, entries = [] }) {
  if (!customer) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Type', 'Amount (PKR)', 'Payment Method', 'Bill/Invoice #', 'Description', 'Balance After'];
    const rows = entries.map(e => [
      new Date(e.date).toLocaleDateString(),
      e.type === 'GAVE_CREDIT' ? 'Credit (You Gave)' : 'Payment (You Got)',
      e.amount,
      e.paymentMethod,
      e.billNumber || '-',
      `"${(e.description || '').replace(/"/g, '""')}"`,
      e.balanceAfter
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Statement_${customer.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📄 Printable Customer Ledger Statement" maxWidth="750px">
      <div id="printable-statement" style={{ color: 'white' }}>
        {/* Statement Header */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#60a5fa' }}>HisabDo Merchant Portal</div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Hamza Retail & Electronics Group</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Hafeez Centre, Main Boulevard, Lahore</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Statement Date:</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>
              {new Date().toLocaleDateString('en-PK', { dateStyle: 'medium' })}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '0.2rem' }}>● Verified Digital Ledger</div>
          </div>
        </div>

        {/* Customer Account Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Customer Name</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>{customer.name}</div>
            <div style={{ fontSize: '0.78rem', color: '#60a5fa' }}>{customer.phone}</div>
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Location & Type</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>{customer.city || 'Lahore'}</div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Category: {customer.category}</div>
          </div>

          <div style={{
            background: customer.netBalance >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            padding: '0.85rem',
            borderRadius: '10px',
            border: '1px solid',
            borderColor: customer.netBalance >= 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'
          }}>
            <div style={{ fontSize: '0.72rem', color: customer.netBalance >= 0 ? '#34d399' : '#f87171', textTransform: 'uppercase', fontWeight: 700 }}>
              {customer.netBalance >= 0 ? 'Net Receivable (You Will Get)' : 'Net Payable (You Will Give)'}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: customer.netBalance >= 0 ? '#34d399' : '#f87171' }}>
              Rs. {Math.abs(customer.netBalance).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Ledger Entries Table */}
        <div style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '1.25rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead style={{ background: '#1e293b', position: 'sticky', top: 0 }}>
              <tr>
                <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', color: '#94a3b8' }}>Date</th>
                <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', color: '#94a3b8' }}>Type</th>
                <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', color: '#94a3b8' }}>Ref / Note</th>
                <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', color: '#94a3b8' }}>Amount (PKR)</th>
                <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', color: '#94a3b8' }}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '1.5rem', color: '#64748b' }}>
                    No transaction entries recorded yet.
                  </td>
                </tr>
              ) : (
                entries.map((e, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '0.6rem 0.75rem' }}>{new Date(e.date).toLocaleDateString()}</td>
                    <td style={{ padding: '0.6rem 0.75rem', fontWeight: 600, color: e.type === 'GAVE_CREDIT' ? '#f87171' : '#34d399' }}>
                      {e.type === 'GAVE_CREDIT' ? '🔴 You Gave' : '🟢 You Got'}
                    </td>
                    <td style={{ padding: '0.6rem 0.75rem', color: '#cbd5e1' }}>
                      {e.billNumber ? `[${e.billNumber}] ` : ''}{e.description || '-'}
                    </td>
                    <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: e.type === 'GAVE_CREDIT' ? '#f87171' : '#34d399' }}>
                      Rs. {Number(e.amount).toLocaleString()}
                    </td>
                    <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#e2e8f0' }}>
                      Rs. {Number(e.balanceAfter || 0).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="secondary" size="sm" icon={Download} onClick={handleExportCSV}>
              Export CSV
            </Button>
            <Button variant="primary" size="sm" icon={Printer} onClick={handlePrint}>
              Print Statement
            </Button>
          </div>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

'use client';

import React from 'react';
import { Inbox } from 'lucide-react';

export default function Table({
  columns = [],
  data = [],
  keyExtractor = (item, index) => item.id || index,
  renderRow,
  emptyMessage = 'No records found.'
}) {
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '12px', border: '1px dashed rgba(255, 255, 255, 0.1)' }}>
        <Inbox size={40} color="#475569" style={{ marginBottom: '0.75rem' }} />
        <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.5rem' }}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                style={{
                  textAlign: col.align || 'left',
                  padding: '0.75rem 1rem',
                  color: '#64748b',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={keyExtractor(item, idx)}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                borderRadius: '10px',
                transition: 'background 0.2s ease'
              }}
            >
              {renderRow(item, idx)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

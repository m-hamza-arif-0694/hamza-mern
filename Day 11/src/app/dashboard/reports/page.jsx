'use client';

import React, { useState } from 'react';
import { FileBarChart, Download, Calendar, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Input from '../../../components/ui/Input';

export default function ReportsModulePage() {
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-08-13');

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge variant="blue" style={{ marginBottom: '0.4rem' }}>Financial Analytics & Reports</Badge>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>Financial Statement Exports</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Generate PDF customer ledgers and daily Cashbook statements for tax audit and printing.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        <Card>
          <CardHeader title="Report Date Range" subtitle="Select period for statements" icon={Calendar} />
          <CardBody>
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
              <Button variant="primary" icon={Download} onClick={() => alert(`Downloading PDF Statement from ${startDate} to ${endDate}`)}>
                Export PDF Cashbook Statement
              </Button>
              <Button variant="success" icon={Download} onClick={() => alert(`Exporting Excel CSV Ledger from ${startDate} to ${endDate}`)}>
                Export Excel CSV Ledger
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Report Preview Summary" subtitle="Period: Aug 01 - Aug 13, 2026" icon={FileBarChart} />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px' }}>
                <span style={{ color: '#cbd5e1' }}>Total Gross Revenue</span>
                <span style={{ fontWeight: 800, color: '#34d399' }}>Rs. 185,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px' }}>
                <span style={{ color: '#cbd5e1' }}>Total Shop Expenses</span>
                <span style={{ fontWeight: 800, color: '#f87171' }}>Rs. 42,500</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '10px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                <span style={{ color: '#60a5fa', fontWeight: 700 }}>Net Operating Profit</span>
                <span style={{ fontWeight: 800, color: '#60a5fa', fontSize: '1.1rem' }}>Rs. 142,500</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

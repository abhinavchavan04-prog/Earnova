'use client';

import { useState } from 'react';
import { formatCurrency, statusLabel } from '@/utils/format';

const MOCK_PAYOUTS = [
  { id: '1', userName: 'Priya Sharma', userId: 'user1', amount: 1000000, method: 'upi', accountDetails: 'priya@paytm', status: 'pending', source: 'bucket2', createdAt: '2026-08-13T10:00:00Z' },
  { id: '2', userName: 'Vikram Singh', userId: 'user4', amount: 500000, method: 'bank', accountDetails: 'SBI ****1234', status: 'pending', source: 'bucket1', createdAt: '2026-08-12T14:00:00Z' },
  { id: '3', userName: 'Rahul Verma', userId: 'user2', amount: 200000, method: 'upi', accountDetails: 'rahul@gpay', status: 'pending', source: 'bucket1', createdAt: '2026-08-12T09:00:00Z' },
  { id: '4', userName: 'Anita Desai', userId: 'user3', amount: 350000, method: 'paypal', accountDetails: 'anita@email.com', status: 'completed', source: 'bucket2', createdAt: '2026-08-10T16:00:00Z' },
  { id: '5', userName: 'Sneha Patel', userId: 'user5', amount: 100000, method: 'upi', accountDetails: 'sneha@upi', status: 'completed', source: 'bucket1', createdAt: '2026-08-08T11:00:00Z' },
];

export default function AdminPayoutsPage() {
  const [statusFilter, setStatusFilter] = useState('pending');

  const filtered = MOCK_PAYOUTS.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    return true;
  });

  const pendingTotal = MOCK_PAYOUTS.filter((p) => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">Payouts</h3>
        <p className="page-subtitle">
          Process pending payouts, hold disputed requests, export financial data.
        </p>
      </div>

      {/* Summary */}
      <div className="grid-3" style={{ marginBottom: 'var(--sp-8)' }}>
        <div className="metric-card">
          <div className="metric-card-label">Pending payouts</div>
          <div className="metric-card-value">{MOCK_PAYOUTS.filter((p) => p.status === 'pending').length}</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Pending amount</div>
          <div className="metric-card-value" style={{ color: 'var(--p-600)' }}>
            {formatCurrency(pendingTotal, false)}
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Processed this month</div>
          <div className="metric-card-value">{MOCK_PAYOUTS.filter((p) => p.status === 'completed').length}</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--sp-6)' }}>
        {['pending', 'processing', 'completed', 'held', 'all'].map((s) => (
          <button
            key={s}
            className={`tab ${statusFilter === s ? 'tab-active' : ''}`}
            onClick={() => setStatusFilter(s)}
          >
            {s === 'all' ? 'All' : statusLabel(s)}
          </button>
        ))}
      </div>

      {/* Payouts table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Account</th>
              <th>Source</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((payout) => (
              <tr key={payout.id}>
                <td style={{ fontWeight: 'var(--weight-medium)' }}>{payout.userName}</td>
                <td style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-600)' }}>
                  {formatCurrency(payout.amount, false)}
                </td>
                <td>
                  <span className="badge badge-default">{payout.method.toUpperCase()}</span>
                </td>
                <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)' }}>
                  {payout.accountDetails}
                </td>
                <td>
                  <span className={`badge ${payout.source === 'bucket2' ? 'badge-warning' : 'badge-info'}`}>
                    {payout.source}
                  </span>
                </td>
                <td>
                  <span className={`badge ${payout.status === 'pending' ? 'badge-warning' : payout.status === 'completed' ? 'badge-success' : payout.status === 'held' ? 'badge-danger' : 'badge-info'}`}>
                    {statusLabel(payout.status)}
                  </span>
                </td>
                <td>
                  {payout.status === 'pending' && (
                    <div className="flex-gap-2">
                      <button className="btn btn-primary btn-sm">Process</button>
                      <button className="btn btn-ghost btn-sm" style={{ color: 'var(--d-500)' }}>Hold</button>
                    </div>
                  )}
                  {payout.status === 'held' && (
                    <button className="btn btn-ghost btn-sm">Release</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export */}
      <div style={{ marginTop: 'var(--sp-6)', display: 'flex', gap: 'var(--sp-3)' }}>
        <button className="btn btn-secondary btn-sm">Export CSV</button>
        <button className="btn btn-secondary btn-sm">Financial report</button>
      </div>
    </div>
  );
}

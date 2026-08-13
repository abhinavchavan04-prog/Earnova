'use client';

import { useState } from 'react';
import { formatCurrency, formatDate, statusLabel } from '@/utils/format';

const MOCK_USERS = [
  { uid: '1', displayName: 'Priya Sharma', email: 'priya@example.com', role: 'subscriber', subscription: { status: 'active', tier: 'pro' }, wallet: { balance: 1250000 }, profile: { kycStatus: 'verified' }, createdAt: '2026-07-01T00:00:00Z' },
  { uid: '2', displayName: 'Rahul Verma', email: 'rahul@example.com', role: 'subscriber', subscription: { status: 'active', tier: 'basic' }, wallet: { balance: 85000 }, profile: { kycStatus: 'pending' }, createdAt: '2026-07-15T00:00:00Z' },
  { uid: '3', displayName: 'Anita Desai', email: 'anita@example.com', role: 'subscriber', subscription: { status: 'cancelled', tier: 'pro' }, wallet: { balance: 0 }, profile: { kycStatus: 'verified' }, createdAt: '2026-06-10T00:00:00Z' },
  { uid: '4', displayName: 'Vikram Singh', email: 'vikram@example.com', role: 'subscriber', subscription: { status: 'active', tier: 'pro' }, wallet: { balance: 3200000 }, profile: { kycStatus: 'verified' }, createdAt: '2026-05-20T00:00:00Z' },
  { uid: '5', displayName: 'Sneha Patel', email: 'sneha@example.com', role: 'subscriber', subscription: { status: 'halted', tier: 'basic' }, wallet: { balance: 15000 }, profile: { kycStatus: 'not_submitted' }, createdAt: '2026-08-01T00:00:00Z' },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = MOCK_USERS.filter((u) => {
    if (search && !u.displayName.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && u.subscription.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">User Management</h3>
        <p className="page-subtitle">
          Manage subscribers — view activity, adjust subscriptions, handle fraud.
        </p>
      </div>

      {/* Filters */}
      <div className="flex-gap-4" style={{ marginBottom: 'var(--sp-6)' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: 'var(--sp-4)' }}
        />
        <select className="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="cancelled">Cancelled</option>
          <option value="halted">Halted</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Wallet</th>
              <th>KYC</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.uid}>
                <td>
                  <div>
                    <div style={{ fontWeight: 'var(--weight-medium)' }}>{user.displayName}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>{user.email}</div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${user.subscription.tier === 'pro' ? 'badge-primary' : 'badge-default'}`}>
                    {user.subscription.tier?.toUpperCase()}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.subscription.status === 'active' ? 'badge-success' : user.subscription.status === 'halted' ? 'badge-danger' : 'badge-warning'}`}>
                    {statusLabel(user.subscription.status)}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-medium)' }}>
                  {formatCurrency(user.wallet.balance, false)}
                </td>
                <td>
                  <span className={`badge ${user.profile.kycStatus === 'verified' ? 'badge-success' : user.profile.kycStatus === 'pending' ? 'badge-warning' : 'badge-default'}`}>
                    {statusLabel(user.profile.kycStatus)}
                  </span>
                </td>
                <td style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
                  {formatDate(user.createdAt)}
                </td>
                <td>
                  <div className="flex-gap-2">
                    <a href={`/admin/users/${user.uid}`} className="btn btn-ghost btn-sm">
                      View
                    </a>
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--d-500)' }}>
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination placeholder */}
      <div className="pagination">
        <div className="pagination-info">Showing {filtered.length} of {MOCK_USERS.length} users</div>
        <div className="pagination-controls">
          <button className="pagination-btn">←</button>
          <button className="pagination-btn pagination-btn-active">1</button>
          <button className="pagination-btn">→</button>
        </div>
      </div>
    </div>
  );
}

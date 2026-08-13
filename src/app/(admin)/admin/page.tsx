'use client';

import { formatCurrency } from '@/utils/format';

// Mock metrics — will be replaced with Firestore aggregation queries
const METRICS = {
  activeSubscribers: 142,
  mrr: 7850000, // ₹78,500
  bucket1TasksToday: 847,
  bucket1PayoutTotal: 425000,
  bucket2OpenJobs: 8,
  bucket2InReview: 3,
  bucket2Delivered: 12,
  pendingPayouts: 5,
  pendingPayoutAmount: 2150000,
};

const ALERTS = [
  { type: 'review', message: '3 Bucket 2 deliverables awaiting review', href: '/admin/bucket2/review-queue' },
  { type: 'review', message: '7 Bucket 1 manual submissions pending', href: '/admin/bucket1/review-queue' },
  { type: 'payout', message: '5 payout requests pending', href: '/admin/payouts' },
];

export default function AdminDashboardPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">Admin Dashboard</h3>
        <p className="page-subtitle">
          Platform overview — subscribers, revenue, and operational queues.
        </p>
      </div>

      {/* Alert cards */}
      {ALERTS.length > 0 && (
        <div className="stack stack-3" style={{ marginBottom: 'var(--sp-8)' }}>
          {ALERTS.map((alert, i) => (
            <a
              key={i}
              href={alert.href}
              className="card"
              style={{
                background: alert.type === 'review' ? 'var(--w-50)' : 'var(--i-50)',
                borderColor: alert.type === 'review' ? 'var(--w-200)' : 'var(--i-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--sp-4) var(--sp-5)',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: 'var(--text-sm)', color: alert.type === 'review' ? 'var(--w-500)' : 'var(--i-500)', fontWeight: 'var(--weight-medium)' }}>
                {alert.message}
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)' }}>→</span>
            </a>
          ))}
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid-4" style={{ marginBottom: 'var(--sp-8)' }}>
        <div className="metric-card">
          <div className="metric-card-label">Active Subscribers</div>
          <div className="metric-card-value">{METRICS.activeSubscribers}</div>
          <div className="metric-card-trend metric-card-trend-up">↑ 12% vs last month</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">MRR</div>
          <div className="metric-card-value">{formatCurrency(METRICS.mrr, false)}</div>
          <div className="metric-card-trend metric-card-trend-up">↑ 8% vs last month</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Bucket 1 Tasks Today</div>
          <div className="metric-card-value">{METRICS.bucket1TasksToday}</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Bucket 1 Payouts Today</div>
          <div className="metric-card-value">{formatCurrency(METRICS.bucket1PayoutTotal, false)}</div>
        </div>
      </div>

      {/* Bucket 2 Pipeline + Payouts */}
      <div className="grid-2" style={{ marginBottom: 'var(--sp-8)', alignItems: 'start' }}>
        <div className="card">
          <h5 style={{ marginBottom: 'var(--sp-4)' }}>Bucket 2 Pipeline</h5>
          <div className="stack stack-4">
            <div className="flex-between">
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                <span style={{ fontSize: 'var(--text-sm)' }}>Open jobs</span>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)' }}>
                {METRICS.bucket2OpenJobs}
              </span>
            </div>
            <div className="flex-between">
              <div className="flex-gap-2">
                <span className="status-dot status-dot-pending" />
                <span style={{ fontSize: 'var(--text-sm)' }}>In review</span>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)' }}>
                {METRICS.bucket2InReview}
              </span>
            </div>
            <div className="flex-between">
              <div className="flex-gap-2">
                <span className="status-dot" style={{ background: 'var(--i-500)' }} />
                <span style={{ fontSize: 'var(--text-sm)' }}>Delivered</span>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)' }}>
                {METRICS.bucket2Delivered}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h5 style={{ marginBottom: 'var(--sp-4)' }}>Pending Payouts</h5>
          <div className="flex-between" style={{ marginBottom: 'var(--sp-3)' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>Requests</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)' }}>
              {METRICS.pendingPayouts}
            </span>
          </div>
          <div className="flex-between" style={{ marginBottom: 'var(--sp-4)' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>Total amount</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-600)' }}>
              {formatCurrency(METRICS.pendingPayoutAmount, false)}
            </span>
          </div>
          <a href="/admin/payouts" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            Process payouts →
          </a>
        </div>
      </div>

      {/* Recent Activity (placeholder) */}
      <div className="card">
        <h5 style={{ marginBottom: 'var(--sp-4)' }}>Recent Admin Activity</h5>
        <div className="stack stack-3">
          {[
            { action: 'Approved deliverable', target: 'Landing page — FinPay', time: '2 hours ago', admin: 'You' },
            { action: 'Created job', target: 'Social media mgmt — RetailCo', time: '5 hours ago', admin: 'You' },
            { action: 'Processed payout', target: '₹10,000 → user@email.com', time: '1 day ago', admin: 'You' },
            { action: 'Suspended user', target: 'flagged_user@spam.com', time: '2 days ago', admin: 'You' },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex-between"
              style={{ padding: 'var(--sp-3) 0', borderBottom: i < 3 ? '1px solid var(--n-100)' : 'none' }}
            >
              <div>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--n-800)' }}>
                  {activity.action}
                </span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}> — {activity.target}</span>
              </div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', whiteSpace: 'nowrap' }}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

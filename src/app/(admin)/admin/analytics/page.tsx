'use client';

import { formatCurrency } from '@/utils/format';

export default function AdminAnalyticsPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">Analytics &amp; Reporting</h3>
        <p className="page-subtitle">
          Platform performance across subscribers, revenue, and operational metrics.
        </p>
      </div>

      {/* Subscriber Metrics */}
      <div style={{ marginBottom: 'var(--sp-10)' }}>
        <h5 style={{ marginBottom: 'var(--sp-4)' }}>Subscribers</h5>
        <div className="grid-4">
          <div className="metric-card">
            <div className="metric-card-label">Total subscribers</div>
            <div className="metric-card-value">142</div>
            <div className="metric-card-trend metric-card-trend-up">↑ 12% MoM</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">Active</div>
            <div className="metric-card-value">128</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">Churn rate</div>
            <div className="metric-card-value">4.2%</div>
            <div className="metric-card-trend metric-card-trend-down">↑ from 3.8%</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">MRR</div>
            <div className="metric-card-value">{formatCurrency(7850000, false)}</div>
            <div className="metric-card-trend metric-card-trend-up">↑ 8% MoM</div>
          </div>
        </div>
        <div className="grid-2" style={{ marginTop: 'var(--sp-4)' }}>
          <div className="metric-card">
            <div className="metric-card-label">Basic tier</div>
            <div className="metric-card-value">89</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">Pro tier</div>
            <div className="metric-card-value">53</div>
          </div>
        </div>
      </div>

      {/* Bucket 1 Metrics */}
      <div style={{ marginBottom: 'var(--sp-10)' }}>
        <h5 style={{ marginBottom: 'var(--sp-4)' }}>Bucket 1 — Micro-tasks</h5>
        <div className="grid-4">
          <div className="metric-card">
            <div className="metric-card-label">Tasks this month</div>
            <div className="metric-card-value">12,847</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">Top category</div>
            <div className="metric-card-value" style={{ fontSize: 'var(--text-lg)' }}>Ad Watch</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">Total payouts</div>
            <div className="metric-card-value">{formatCurrency(4250000, false)}</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">Avg per user</div>
            <div className="metric-card-value">{formatCurrency(33200, false)}</div>
          </div>
        </div>
      </div>

      {/* Bucket 2 Metrics */}
      <div style={{ marginBottom: 'var(--sp-10)' }}>
        <h5 style={{ marginBottom: 'var(--sp-4)' }}>Bucket 2 — Freelance Agency</h5>
        <div className="grid-4">
          <div className="metric-card">
            <div className="metric-card-label">Active clients</div>
            <div className="metric-card-value">8</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">Avg job value</div>
            <div className="metric-card-value">{formatCurrency(1800000, false)}</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">Avg turnaround</div>
            <div className="metric-card-value">4.2 days</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">Rejection rate</div>
            <div className="metric-card-value" style={{ color: 'var(--w-500)' }}>18%</div>
            <div className="metric-card-trend metric-card-trend-down">Quality signal</div>
          </div>
        </div>
        <div className="grid-2" style={{ marginTop: 'var(--sp-4)' }}>
          <div className="metric-card">
            <div className="metric-card-label">Track A (Design/Dev)</div>
            <div className="metric-card-value">3 active jobs</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">Track B (Volume)</div>
            <div className="metric-card-value">5 active jobs</div>
          </div>
        </div>
      </div>

      {/* Learn & Earn */}
      <div>
        <h5 style={{ marginBottom: 'var(--sp-4)' }}>Learn &amp; Earn</h5>
        <div className="grid-3">
          <div className="metric-card">
            <div className="metric-card-label">Published content</div>
            <div className="metric-card-value">4</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">Total views</div>
            <div className="metric-card-value">842</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">Pro unlock rate</div>
            <div className="metric-card-value">37%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

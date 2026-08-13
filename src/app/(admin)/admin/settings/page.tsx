'use client';

import { formatDateTime } from '@/utils/format';

const MOCK_AUDIT_LOG = [
  { id: '1', adminName: 'Abhinav', action: 'approved_deliverable', targetType: 'deliverable', targetId: 'del_001', timestamp: '2026-08-13T08:30:00Z' },
  { id: '2', adminName: 'Abhinav', action: 'created_job', targetType: 'job', targetId: 'job_003', timestamp: '2026-08-12T16:00:00Z' },
  { id: '3', adminName: 'Abhinav', action: 'processed_payout', targetType: 'payout', targetId: 'pay_005', timestamp: '2026-08-12T14:30:00Z' },
  { id: '4', adminName: 'Abhinav', action: 'suspended_user', targetType: 'user', targetId: 'usr_flagged', timestamp: '2026-08-11T10:00:00Z' },
  { id: '5', adminName: 'Abhinav', action: 'created_client', targetType: 'client', targetId: 'cli_004', timestamp: '2026-08-10T09:00:00Z' },
  { id: '6', adminName: 'Abhinav', action: 'updated_subscription', targetType: 'user', targetId: 'usr_002', timestamp: '2026-08-09T12:00:00Z' },
];

export default function AdminSettingsPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">Settings</h3>
        <p className="page-subtitle">
          Platform configuration, role management, and audit trail.
        </p>
      </div>

      {/* Roles */}
      <div className="card" style={{ marginBottom: 'var(--sp-8)' }}>
        <h5 style={{ marginBottom: 'var(--sp-4)' }}>Roles &amp; Permissions</h5>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Users</th>
                <th>Permissions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="badge badge-warning">Super Admin</span>
                </td>
                <td>1</td>
                <td style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>
                  Full access — all modules, billing, payouts, settings
                </td>
              </tr>
              <tr>
                <td>
                  <span className="badge badge-info">Ops / Reviewer</span>
                </td>
                <td>0</td>
                <td style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>
                  Review queues (Bucket 1 + 2), task management — no billing, no payout config
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Platform Config */}
      <div className="card" style={{ marginBottom: 'var(--sp-8)' }}>
        <h5 style={{ marginBottom: 'var(--sp-4)' }}>Platform Configuration</h5>
        <div className="stack stack-4" style={{ maxWidth: '480px' }}>
          <div className="input-group">
            <label className="input-label">Default platform margin %</label>
            <input type="number" className="input" defaultValue="30" />
            <span className="input-help">Applied to new Bucket 2 jobs unless overridden per client</span>
          </div>
          <div className="input-group">
            <label className="input-label">Minimum payout threshold (₹)</label>
            <input type="number" className="input" defaultValue="500" />
          </div>
          <button className="btn btn-primary">Save configuration</button>
        </div>
      </div>

      {/* Audit Log */}
      <div className="card">
        <h5 style={{ marginBottom: 'var(--sp-4)' }}>Audit Log</h5>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Admin</th>
                <th>Action</th>
                <th>Target</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_AUDIT_LOG.map((entry) => (
                <tr key={entry.id}>
                  <td style={{ fontWeight: 'var(--weight-medium)' }}>{entry.adminName}</td>
                  <td>
                    <span className="badge badge-default">
                      {entry.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)', color: 'var(--n-600)' }}>
                    {entry.targetType}/{entry.targetId}
                  </td>
                  <td style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
                    {formatDateTime(entry.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

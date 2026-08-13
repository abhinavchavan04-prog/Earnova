'use client';

import { useState } from 'react';
import { formatCurrency, formatDate, statusLabel } from '@/utils/format';

const MOCK_JOBS = [
  { id: '1', title: 'Landing page redesign', clientName: 'FinPay Technologies', category: 'graphic_design', track: 'A', budget: 2500000, deadline: '2026-08-28', status: 'in_review', assignedTo: 'Priya Sharma', marginPercent: 30 },
  { id: '2', title: 'React analytics dashboard', clientName: 'DataStream Analytics', category: 'web_dev', track: 'A', budget: 5000000, deadline: '2026-09-15', status: 'open', assignedTo: null, marginPercent: 30 },
  { id: '3', title: 'Social media — 30 posts', clientName: 'RetailCo India', category: 'social_media', track: 'B', budget: 800000, deadline: '2026-09-01', status: 'claimed', assignedTo: 'Rahul Verma', marginPercent: 25 },
  { id: '4', title: 'Email sequence — onboarding', clientName: 'ContentFirst Agency', category: 'copywriting', track: 'B', budget: 500000, deadline: '2026-08-22', status: 'delivered', assignedTo: 'Anita Desai', marginPercent: 25 },
  { id: '5', title: 'CRM data cleanup', clientName: 'RetailCo India', category: 'virtual_assistant', track: 'B', budget: 300000, deadline: '2026-08-20', status: 'closed', assignedTo: 'Vikram Singh', marginPercent: 20 },
];

const STATUS_COLORS: Record<string, string> = {
  open: 'badge-success',
  claimed: 'badge-info',
  in_review: 'badge-warning',
  delivered: 'badge-primary',
  closed: 'badge-default',
};

export default function AdminJobsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = MOCK_JOBS.filter((j) => {
    if (statusFilter !== 'all' && j.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h3 className="page-title">Job Management</h3>
            <p className="page-subtitle">
              Create jobs from client briefs, track pipeline, manage assignments.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
            + Create job
          </button>
        </div>
      </div>

      {/* Create form */}
      {showCreateForm && (
        <div className="card" style={{ marginBottom: 'var(--sp-6)', maxWidth: '640px' }}>
          <h5 style={{ marginBottom: 'var(--sp-4)' }}>Create new job</h5>
          <div className="stack stack-4">
            <div className="input-group">
              <label className="input-label">Job title</label>
              <input type="text" className="input" placeholder="e.g. Landing page redesign for FinPay" />
            </div>
            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">Client</label>
                <select className="select">
                  <option>Select client...</option>
                  <option>FinPay Technologies</option>
                  <option>RetailCo India</option>
                  <option>DataStream Analytics</option>
                  <option>ContentFirst Agency</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Category</label>
                <select className="select">
                  <option>Graphic Design</option>
                  <option>Web Development</option>
                  <option>App Development</option>
                  <option>Virtual Assistant</option>
                  <option>Copywriting</option>
                  <option>Social Media</option>
                  <option>Transcription</option>
                </select>
              </div>
            </div>
            <div className="grid-3">
              <div className="input-group">
                <label className="input-label">Budget (₹)</label>
                <input type="number" className="input" placeholder="25000" />
              </div>
              <div className="input-group">
                <label className="input-label">Deadline</label>
                <input type="date" className="input" />
              </div>
              <div className="input-group">
                <label className="input-label">Margin %</label>
                <input type="number" className="input" placeholder="30" defaultValue="30" />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Brief</label>
              <textarea className="textarea" placeholder="Full job description, requirements, deliverables..." rows={5} />
            </div>
            <div className="input-group">
              <label className="input-label">Attachments</label>
              <input type="file" className="input" multiple />
            </div>
            <div className="flex-gap-3">
              <button className="btn btn-primary">Create &amp; post job</button>
              <button className="btn btn-ghost" onClick={() => setShowCreateForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Pipeline filter */}
      <div className="tabs" style={{ marginBottom: 'var(--sp-6)' }}>
        {['all', 'open', 'claimed', 'in_review', 'delivered', 'closed'].map((status) => (
          <button
            key={status}
            className={`tab ${statusFilter === status ? 'tab-active' : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            {status === 'all' ? 'All' : statusLabel(status)}
          </button>
        ))}
      </div>

      {/* Jobs Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Job</th>
              <th>Client</th>
              <th>Track</th>
              <th>Budget</th>
              <th>Margin</th>
              <th>Status</th>
              <th>Assigned to</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => (
              <tr key={job.id}>
                <td style={{ fontWeight: 'var(--weight-medium)' }}>{job.title}</td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{job.clientName}</td>
                <td>
                  <span className={`badge ${job.track === 'A' ? 'badge-warning' : 'badge-info'}`}>
                    {job.track}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-medium)' }}>
                  {formatCurrency(job.budget, false)}
                </td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{job.marginPercent}%</td>
                <td>
                  <span className={`badge ${STATUS_COLORS[job.status] || 'badge-default'}`}>
                    {statusLabel(job.status)}
                  </span>
                </td>
                <td style={{ fontSize: 'var(--text-sm)', color: job.assignedTo ? 'var(--n-800)' : 'var(--n-500)' }}>
                  {job.assignedTo || 'Unassigned'}
                </td>
                <td style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
                  {formatDate(job.deadline)}
                </td>
                <td>
                  <button className="btn btn-ghost btn-sm">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

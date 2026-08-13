'use client';

import { useState } from 'react';
import { formatDate, statusLabel } from '@/utils/format';

const MOCK_CLIENTS = [
  { id: '1', name: 'FinPay Technologies', track: 'A', category: 'graphic_design', status: 'active', contactInfo: { email: 'team@finpay.io', company: 'FinPay' }, sourceOwner: 'Abhinav', createdAt: '2026-07-20T00:00:00Z' },
  { id: '2', name: 'RetailCo India', track: 'B', category: 'social_media', status: 'active', contactInfo: { email: 'marketing@retailco.in', company: 'RetailCo' }, sourceOwner: 'Abhinav', createdAt: '2026-08-01T00:00:00Z' },
  { id: '3', name: 'DataStream Analytics', track: 'A', category: 'web_dev', status: 'lead', contactInfo: { email: 'hello@datastream.io', company: 'DataStream' }, sourceOwner: 'Abhinav', createdAt: '2026-08-10T00:00:00Z' },
  { id: '4', name: 'ContentFirst Agency', track: 'B', category: 'copywriting', status: 'active', contactInfo: { email: 'ops@contentfirst.com', company: 'ContentFirst' }, sourceOwner: 'Abhinav', createdAt: '2026-07-25T00:00:00Z' },
  { id: '5', name: 'AppVentures', track: 'A', category: 'app_dev', status: 'closed', contactInfo: { email: 'build@appventures.co', company: 'AppVentures' }, sourceOwner: 'Abhinav', createdAt: '2026-06-15T00:00:00Z' },
];

const CATEGORY_LABELS: Record<string, string> = {
  graphic_design: 'Graphic Design',
  web_dev: 'Web Development',
  app_dev: 'App Development',
  virtual_assistant: 'Virtual Assistant',
  copywriting: 'Copywriting',
  social_media: 'Social Media',
  transcription: 'Transcription',
};

export default function AdminClientsPage() {
  const [trackFilter, setTrackFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filtered = MOCK_CLIENTS.filter((c) => {
    if (trackFilter !== 'all' && c.track !== trackFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h3 className="page-title">Client CRM</h3>
            <p className="page-subtitle">
              Manage client records across Track A (design/dev) and Track B (VA/copy/SMM/transcription).
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
            + Add client
          </button>
        </div>
      </div>

      {/* Create form */}
      {showCreateForm && (
        <div className="card" style={{ marginBottom: 'var(--sp-6)', maxWidth: '560px' }}>
          <h5 style={{ marginBottom: 'var(--sp-4)' }}>New client</h5>
          <div className="stack stack-4">
            <div className="input-group">
              <label className="input-label">Client/company name</label>
              <input type="text" className="input" placeholder="Acme Corp" />
            </div>
            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">Track</label>
                <select className="select">
                  <option value="A">Track A — Design &amp; Dev</option>
                  <option value="B">Track B — Volume &amp; Recurring</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Category</label>
                <select className="select">
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Contact email</label>
              <input type="email" className="input" placeholder="contact@company.com" />
            </div>
            <div className="input-group">
              <label className="input-label">Status</label>
              <select className="select">
                <option value="lead">Lead</option>
                <option value="active">Active</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Notes</label>
              <textarea className="textarea" placeholder="Deal notes, scope, next steps..." rows={3} />
            </div>
            <div className="flex-gap-3">
              <button className="btn btn-primary">Save client</button>
              <button className="btn btn-ghost" onClick={() => setShowCreateForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex-gap-4" style={{ marginBottom: 'var(--sp-6)' }}>
        <select className="select" value={trackFilter} onChange={(e) => setTrackFilter(e.target.value)}>
          <option value="all">All tracks</option>
          <option value="A">Track A</option>
          <option value="B">Track B</option>
        </select>
        <select className="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="lead">Lead</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Clients Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Track</th>
              <th>Category</th>
              <th>Status</th>
              <th>BD Owner</th>
              <th>Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((client) => (
              <tr key={client.id}>
                <td>
                  <div>
                    <div style={{ fontWeight: 'var(--weight-medium)' }}>{client.name}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>{client.contactInfo.email}</div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${client.track === 'A' ? 'badge-warning' : 'badge-info'}`}>
                    Track {client.track}
                  </span>
                </td>
                <td style={{ fontSize: 'var(--text-sm)' }}>
                  {CATEGORY_LABELS[client.category] || client.category}
                </td>
                <td>
                  <span className={`badge ${client.status === 'active' ? 'badge-success' : client.status === 'lead' ? 'badge-warning' : 'badge-default'}`}>
                    {statusLabel(client.status)}
                  </span>
                </td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{client.sourceOwner}</td>
                <td style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
                  {formatDate(client.createdAt)}
                </td>
                <td>
                  <div className="flex-gap-2">
                    <a href={`/admin/bucket2/clients/${client.id}`} className="btn btn-ghost btn-sm">Edit</a>
                    <a href="/admin/bucket2/jobs" className="btn btn-ghost btn-sm">Jobs</a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

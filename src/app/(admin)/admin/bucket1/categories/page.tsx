'use client';

import { useState } from 'react';
import { TASK_TYPES, TaskType } from '@/lib/constants';
import { statusLabel } from '@/utils/format';

const MOCK_CATEGORIES = [
  { id: '1', name: 'Ad Watching', type: TASK_TYPES.AD_WATCH, description: 'Watch ads and earn per view', isActive: true, sortOrder: 1 },
  { id: '2', name: 'Surveys', type: TASK_TYPES.SURVEY, description: 'Consumer and market research surveys', isActive: true, sortOrder: 2 },
  { id: '3', name: 'Data Entry', type: TASK_TYPES.DATA_ENTRY, description: 'Form filling and data processing tasks', isActive: true, sortOrder: 3 },
  { id: '4', name: 'AI Data Labeling', type: TASK_TYPES.DATA_LABELING, description: 'Label images, text, and audio for ML models', isActive: true, sortOrder: 4 },
  { id: '5', name: 'Song Review', type: TASK_TYPES.SONG_REVIEW, description: 'Listen and review music tracks', isActive: false, sortOrder: 5 },
  { id: '6', name: 'Digital Products', type: TASK_TYPES.DIGITAL_PRODUCT, description: 'Learn to create and sell digital products', isActive: true, sortOrder: 6 },
];

export default function AdminCategoriesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h3 className="page-title">Task Categories</h3>
            <p className="page-subtitle">Manage Bucket 1 task categories. Activate or deactivate categories as needed.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            + Add category
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 'var(--sp-6)', maxWidth: '480px' }}>
          <h5 style={{ marginBottom: 'var(--sp-4)' }}>New category</h5>
          <div className="stack stack-4">
            <div className="input-group">
              <label className="input-label">Category name</label>
              <input type="text" className="input" placeholder="e.g. App Testing" />
            </div>
            <div className="input-group">
              <label className="input-label">Type</label>
              <select className="select">
                {Object.entries(TASK_TYPES).map(([k, v]) => (
                  <option key={k} value={v}>{statusLabel(v)}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Description</label>
              <textarea className="textarea" placeholder="Brief description of this category" rows={2} />
            </div>
            <div className="flex-gap-3">
              <button className="btn btn-primary">Save</button>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CATEGORIES.map((cat) => (
              <tr key={cat.id}>
                <td style={{ fontWeight: 'var(--weight-medium)' }}>{cat.name}</td>
                <td><span className="badge badge-default">{statusLabel(cat.type)}</span></td>
                <td style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>{cat.description}</td>
                <td>
                  <span className={`badge ${cat.isActive ? 'badge-success' : 'badge-default'}`}>
                    {cat.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="flex-gap-2">
                    <button className="btn btn-ghost btn-sm">Edit</button>
                    <button className="btn btn-ghost btn-sm">
                      {cat.isActive ? 'Deactivate' : 'Activate'}
                    </button>
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

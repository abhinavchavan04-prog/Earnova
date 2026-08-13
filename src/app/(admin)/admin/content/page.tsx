'use client';

import { statusLabel } from '@/utils/format';

const MOCK_CONTENT = [
  { id: '1', title: 'Print-on-Demand: Complete Guide', type: 'guide', category: 'POD', unlockTier: 'basic', isPublished: true },
  { id: '2', title: 'Freelance Copywriting: From Zero to First Client', type: 'guide', category: 'Copywriting', unlockTier: 'pro', isPublished: true },
  { id: '3', title: 'Social Media Management Course', type: 'course', category: 'SMM', unlockTier: 'pro', isPublished: true },
  { id: '4', title: 'Data Labeling for AI', type: 'guide', category: 'AI', unlockTier: 'basic', isPublished: true },
];

export default function AdminContentPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h3 className="page-title">Learn &amp; Earn Content</h3>
            <p className="page-subtitle">Manage guides and courses. Set which subscription tier unlocks each item.</p>
          </div>
          <button className="btn btn-primary">+ Add content</button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Category</th>
              <th>Unlock Tier</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CONTENT.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 'var(--weight-medium)' }}>{item.title}</td>
                <td><span className="badge badge-default">{item.type}</span></td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{item.category}</td>
                <td>
                  <span className={`badge ${item.unlockTier === 'pro' ? 'badge-primary' : 'badge-default'}`}>
                    {item.unlockTier.toUpperCase()}
                  </span>
                </td>
                <td>
                  <span className={`badge ${item.isPublished ? 'badge-success' : 'badge-default'}`}>
                    {item.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>
                  <div className="flex-gap-2">
                    <button className="btn btn-ghost btn-sm">Edit</button>
                    <button className="btn btn-ghost btn-sm">
                      {item.isPublished ? 'Unpublish' : 'Publish'}
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

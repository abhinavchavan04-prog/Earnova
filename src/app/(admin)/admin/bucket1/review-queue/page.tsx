'use client';

import { timeAgo } from '@/utils/format';

const MOCK_REVIEWS = [
  { id: '1', taskTitle: 'Data entry — Product catalog batch 12', category: 'Data Entry', userName: 'Priya Sharma', submittedAt: '2026-08-13T10:00:00Z', evidence: 'Completed 150 entries. Attached CSV.' },
  { id: '2', taskTitle: 'Song review — Indie batch 8, Track 3', category: 'Song Review', userName: 'Rahul Verma', submittedAt: '2026-08-13T09:30:00Z', evidence: 'Genre: Lo-fi. Rating: 7/10. Detailed feedback provided.' },
  { id: '3', taskTitle: 'Data entry — Address verification batch 5', category: 'Data Entry', userName: 'Sneha Patel', submittedAt: '2026-08-12T16:00:00Z', evidence: 'Verified 200 addresses. 12 flagged as incomplete.' },
];

export default function Bucket1ReviewQueuePage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">Bucket 1 — Manual Review Queue</h3>
        <p className="page-subtitle">
          Tasks that can&apos;t be auto-verified (data entry, song review) — approve or reject with a reason.
        </p>
      </div>

      <div className="stack stack-4">
        {MOCK_REVIEWS.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-item-header">
              <div>
                <div className="flex-gap-2" style={{ marginBottom: 'var(--sp-2)' }}>
                  <span className="badge badge-default">{review.category}</span>
                </div>
                <h6>{review.taskTitle}</h6>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginTop: 'var(--sp-1)' }}>
                  By <strong>{review.userName}</strong> · {timeAgo(review.submittedAt)}
                </div>
              </div>
            </div>
            <div style={{ background: 'var(--n-100)', padding: 'var(--sp-3)', borderRadius: 'var(--radius-sm)', margin: 'var(--sp-3) 0', fontSize: 'var(--text-sm)', color: 'var(--n-700)' }}>
              {review.evidence}
            </div>
            <div className="review-item-actions">
              <button className="btn btn-primary btn-sm">✓ Approve &amp; credit</button>
              <button className="btn btn-danger btn-sm">✕ Reject</button>
            </div>
          </div>
        ))}
      </div>

      {MOCK_REVIEWS.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-title">Review queue is clear</div>
          <p className="empty-state-text">No manual-review tasks pending.</p>
        </div>
      )}
    </div>
  );
}

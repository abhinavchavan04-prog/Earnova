'use client';

import { useState } from 'react';
import { formatCurrency, formatDateTime, timeAgo } from '@/utils/format';

const MOCK_DELIVERABLES = [
  {
    id: '1', jobTitle: 'Landing page redesign — FinPay', freelancerName: 'Priya Sharma', freelancerEmail: 'priya@example.com',
    category: 'Graphic Design', track: 'A', budget: 2500000, submittedAt: '2026-08-13T08:00:00Z',
    notes: 'Attached Figma file with desktop and mobile mockups. Used the brand colors as specified in the brief.',
    fileUrls: ['landing_page_v1.fig', 'preview_desktop.png', 'preview_mobile.png'],
    reviewStatus: 'pending',
  },
  {
    id: '2', jobTitle: 'Email sequence — B2B SaaS onboarding', freelancerName: 'Anita Desai', freelancerEmail: 'anita@example.com',
    category: 'Copywriting', track: 'B', budget: 500000, submittedAt: '2026-08-12T16:30:00Z',
    notes: '10 emails written with subject lines and CTA suggestions. Google Doc link included.',
    fileUrls: ['email_sequence_draft.gdoc'],
    reviewStatus: 'pending',
  },
  {
    id: '3', jobTitle: 'Social media posts — RetailCo', freelancerName: 'Rahul Verma', freelancerEmail: 'rahul@example.com',
    category: 'SMM', track: 'B', budget: 800000, submittedAt: '2026-08-11T12:00:00Z',
    notes: 'First batch of 15 posts (Instagram + LinkedIn). Canva templates shared.',
    fileUrls: ['social_posts_batch1.zip'],
    reviewStatus: 'pending',
  },
];

export default function Bucket2ReviewQueuePage() {
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const handleApprove = (id: string) => {
    // TODO: Firestore update — deliverable.reviewStatus = 'approved', trigger client delivery
    alert(`Deliverable ${id} approved. Ready for client delivery.`);
    setReviewingId(null);
    setReviewNotes('');
  };

  const handleReject = (id: string) => {
    if (!reviewNotes.trim()) {
      alert('Please provide revision notes before rejecting.');
      return;
    }
    // TODO: Firestore update — deliverable.reviewStatus = 'rejected', send notes to freelancer
    alert(`Deliverable ${id} sent back for revision.`);
    setReviewingId(null);
    setReviewNotes('');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">Bucket 2 — Deliverable Review</h3>
        <p className="page-subtitle">
          Quality gate. Every deliverable is reviewed here before being sent to the client. This is critical since there&apos;s no upfront freelancer vetting.
        </p>
      </div>

      <div className="stack stack-6">
        {MOCK_DELIVERABLES.map((d) => (
          <div key={d.id} className="review-item">
            <div className="review-item-header">
              <div>
                <div className="flex-gap-2" style={{ marginBottom: 'var(--sp-2)' }}>
                  <span className={`badge ${d.track === 'A' ? 'badge-warning' : 'badge-info'}`}>
                    Track {d.track}
                  </span>
                  <span className="badge badge-default">{d.category}</span>
                </div>
                <h5 style={{ marginBottom: 'var(--sp-1)' }}>{d.jobTitle}</h5>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>
                  Submitted by <strong>{d.freelancerName}</strong> ({d.freelancerEmail})
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-600)' }}>
                  {formatCurrency(d.budget, false)}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginTop: 'var(--sp-1)' }}>
                  {timeAgo(d.submittedAt)}
                </div>
              </div>
            </div>

            {/* Freelancer notes */}
            <div style={{ background: 'var(--n-100)', padding: 'var(--sp-4)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--sp-4)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginBottom: 'var(--sp-2)' }}>
                Freelancer notes
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-800)' }}>
                {d.notes}
              </p>
            </div>

            {/* Files */}
            <div style={{ marginBottom: 'var(--sp-4)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginBottom: 'var(--sp-2)' }}>
                Attached files
              </div>
              <div className="flex-gap-2" style={{ flexWrap: 'wrap' }}>
                {d.fileUrls.map((file, i) => (
                  <span key={i} className="badge badge-default" style={{ cursor: 'pointer' }}>
                    📎 {file}
                  </span>
                ))}
              </div>
            </div>

            {/* Review actions */}
            {reviewingId === d.id ? (
              <div>
                <div className="input-group" style={{ marginBottom: 'var(--sp-4)' }}>
                  <label className="input-label">Review notes (required for rejection)</label>
                  <textarea
                    className="textarea"
                    placeholder="Explain what needs to be revised..."
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="review-item-actions" style={{ borderTop: 'none', paddingTop: 0 }}>
                  <button className="btn btn-primary btn-sm" onClick={() => handleApprove(d.id)}>
                    ✓ Approve &amp; send to client
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleReject(d.id)}>
                    ✕ Request revision
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => { setReviewingId(null); setReviewNotes(''); }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="review-item-actions">
                <button className="btn btn-primary btn-sm" onClick={() => setReviewingId(d.id)}>
                  Review deliverable
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {MOCK_DELIVERABLES.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-title">No deliverables to review</div>
          <p className="empty-state-text">
            All caught up. New submissions will appear here as freelancers complete their work.
          </p>
        </div>
      )}
    </div>
  );
}

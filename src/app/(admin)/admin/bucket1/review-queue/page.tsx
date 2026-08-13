'use client';

import { useState } from 'react';
import { timeAgo, formatPointsWithInr } from '@/utils/format';

interface ReviewItem {
  id: string;
  taskTitle: string;
  category: string;
  userName: string;
  submittedAt: string;
  evidence: string;
  submittedData?: Record<string, string>;
  accuracyScore: number; // e.g. 75 for 75%
  mistakesFound: string[]; // List of specific mistakes found in submission
  pointsReward: number;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: '1',
    taskTitle: 'Data Filling — E-Commerce Invoice Batch 12',
    category: 'Data Entry',
    userName: 'Sneha Patel',
    submittedAt: '2026-08-13T12:00:00Z',
    evidence: 'Submitted company invoice record.',
    submittedData: {
      'Company Name': 'FinTech Corp',
      'Email Address': 'contact-fintech',
      'Phone Number': '98765',
      'GSTIN': 'INVALID_GST_123',
      'Pincode': '400001',
    },
    accuracyScore: 50,
    mistakesFound: [
      'Invalid email format (missing domain & "@")',
      'Phone number incomplete (less than 10 digits)',
      'GSTIN format invalid (must be 15 alphanumeric chars)',
    ],
    pointsReward: 1500,
  },
  {
    id: '2',
    taskTitle: 'Data Filling — GST & Address Verification',
    category: 'Data Entry',
    userName: 'Rahul Verma',
    submittedAt: '2026-08-13T10:30:00Z',
    evidence: 'Submitted verified merchant address slip.',
    submittedData: {
      'Company Name': 'RetailCo India Pvt Ltd',
      'Email Address': 'support@retailco.in',
      'Phone Number': '+91 98765 43210',
      'GSTIN': '27AABCU9603R1ZM',
      'Pincode': '400',
    },
    accuracyScore: 75,
    mistakesFound: [
      'Pincode invalid (must be 6 digits, got 3 digits)',
    ],
    pointsReward: 2000,
  },
  {
    id: '3',
    taskTitle: 'Song Review — Indie Batch 8, Track 3',
    category: 'Song Review',
    userName: 'Priya Sharma',
    submittedAt: '2026-08-13T09:30:00Z',
    evidence: 'Genre: Lo-fi Chill. Rating: 8/10. Mixing & mastering feedback submitted.',
    accuracyScore: 100,
    mistakesFound: [],
    pointsReward: 100,
  },
];

export default function Bucket1ReviewQueuePage() {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [rejectionNotes, setRejectionNotes] = useState<Record<string, string>>({});

  const handleApprove = (id: string) => {
    const item = reviews.find((r) => r.id === id);
    alert(`Approved submission for ${item?.userName}! +${item?.pointsReward} Nova Points credited to user's wallet.`);
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const handleReject = (id: string) => {
    const item = reviews.find((r) => r.id === id);
    const note = rejectionNotes[id] || (item?.mistakesFound.length ? item.mistakesFound.join('; ') : 'Accuracy below required threshold.');
    alert(`Rejected submission for ${item?.userName}. Feedback sent to user: "${note}"`);
    setReviews(reviews.filter((r) => r.id !== id));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">Bucket 1 — Submission Review &amp; Accuracy Inspection</h3>
        <p className="page-subtitle">
          Inspect user data filling &amp; micro-task submissions. View accuracy scores, highlighted mistakes, and approve/reject before crediting <strong>Nova Points</strong>.
        </p>
      </div>

      <div className="stack stack-6">
        {reviews.map((review) => (
          <div key={review.id} className="review-item" style={{ borderLeft: `4px solid ${review.accuracyScore === 100 ? 'var(--s-500)' : review.accuracyScore >= 70 ? 'var(--w-500)' : 'var(--d-500)'}` }}>
            <div className="review-item-header">
              <div>
                <div className="flex-gap-2" style={{ marginBottom: 'var(--sp-2)' }}>
                  <span className="badge badge-default">{review.category}</span>
                  <span
                    className={`badge ${
                      review.accuracyScore === 100
                        ? 'badge-success'
                        : review.accuracyScore >= 70
                        ? 'badge-warning'
                        : 'badge-danger'
                    }`}
                  >
                    {review.accuracyScore}% Accuracy Score
                  </span>
                </div>
                <h5 style={{ marginBottom: 'var(--sp-1)' }}>{review.taskTitle}</h5>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>
                  Submitted by <strong>{review.userName}</strong> · {timeAgo(review.submittedAt)}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-600)' }}>
                  {review.pointsReward} NP
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
                  ≈ {formatPointsWithInr(review.pointsReward).split('(')[1].replace(')', '')}
                </div>
              </div>
            </div>

            {/* Submitted Data Fields (if Data Entry) */}
            {review.submittedData && (
              <div style={{ background: 'var(--n-100)', padding: 'var(--sp-4)', borderRadius: 'var(--radius-sm)', margin: 'var(--sp-3) 0' }}>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', color: 'var(--n-600)', marginBottom: 'var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Submitted Form Data:
                </div>
                <div className="grid-2" style={{ gap: 'var(--sp-2)' }}>
                  {Object.entries(review.submittedData).map(([key, val]) => (
                    <div key={key} style={{ fontSize: 'var(--text-xs)' }}>
                      <span style={{ color: 'var(--n-500)' }}>{key}:</span>{' '}
                      <strong style={{ color: 'var(--n-900)', fontFamily: 'var(--font-mono)' }}>{val}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mistakes / Error Inspector */}
            {review.mistakesFound.length > 0 ? (
              <div style={{ background: 'var(--d-50)', borderColor: 'var(--d-200)', border: '1px solid var(--d-200)', padding: 'var(--sp-4)', borderRadius: 'var(--radius-sm)', margin: 'var(--sp-3) 0' }}>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', color: 'var(--d-500)', marginBottom: 'var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  ❌ Detected Mistakes / Inaccuracies ({review.mistakesFound.length}):
                </div>
                <ul className="stack stack-2" style={{ paddingLeft: 'var(--sp-4)', fontSize: 'var(--text-sm)', color: 'var(--d-600)' }}>
                  {review.mistakesFound.map((mistake, idx) => (
                    <li key={idx}>{mistake}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div style={{ background: 'var(--s-50)', padding: 'var(--sp-3)', borderRadius: 'var(--radius-sm)', margin: 'var(--sp-3) 0', fontSize: 'var(--text-xs)', color: 'var(--s-500)', display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                <span>✓</span> <strong>100% Accuracy:</strong> No errors or mistakes detected in submitted data fields.
              </div>
            )}

            {/* Admin Action Bar */}
            <div className="review-item-actions" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              {review.mistakesFound.length > 0 && (
                <div className="input-group" style={{ marginBottom: 'var(--sp-2)' }}>
                  <input
                    type="text"
                    className="input"
                    placeholder="Feedback / reason for rejection..."
                    value={rejectionNotes[review.id] || ''}
                    onChange={(e) => setRejectionNotes({ ...rejectionNotes, [review.id]: e.target.value })}
                  />
                </div>
              )}
              <div className="flex-gap-3">
                <button className="btn btn-primary btn-sm" onClick={() => handleApprove(review.id)} style={{ flex: 1 }}>
                  ✓ Approve &amp; Credit {review.pointsReward} NP
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleReject(review.id)} style={{ flex: 1 }}>
                  ✕ Reject Submission
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-title">Review queue is clear</div>
          <p className="empty-state-text">All micro-task submissions have been evaluated.</p>
        </div>
      )}
    </div>
  );
}

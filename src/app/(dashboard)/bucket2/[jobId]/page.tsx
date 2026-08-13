'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatCurrency, formatDate } from '@/utils/format';

// Mock job data — will be replaced with Firestore fetch
const MOCK_JOB = {
  id: '1',
  title: 'Landing page redesign for fintech startup',
  category: 'graphic_design',
  track: 'A' as const,
  budget: 2500000,
  deadline: '2026-08-28',
  status: 'open' as const,
  brief: `We need a complete redesign of our landing page. The current design is outdated and we're seeing low conversion rates.

**Requirements:**
- Dark theme with clean, modern aesthetic
- Focus on conversion — clear CTA above the fold
- Responsive design (mobile-first)
- 3 sections: hero, features, pricing
- Integrate with our existing brand colors (deep blue + white)

**Deliverables:**
- Figma design file
- Desktop + mobile mockups
- Interactive prototype`,
  clientName: 'FinPay Technologies',
  platformMarginPercent: 30,
  attachments: [],
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [claiming, setClaiming] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitNotes, setSubmitNotes] = useState('');

  // In real app, fetch job by params.jobId from Firestore
  const job = MOCK_JOB;
  const freelancerPayout = job.budget * (1 - job.platformMarginPercent / 100);

  const handleClaim = async () => {
    setClaiming(true);
    // TODO: Firestore write — create job_assignment
    setTimeout(() => {
      setClaiming(false);
      alert('Job claimed! You can now submit your deliverable.');
    }, 1000);
  };

  return (
    <div className="page-container" style={{ maxWidth: 'var(--content-narrow)' }}>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => router.back()}
        style={{ marginBottom: 'var(--sp-6)' }}
      >
        ← Back to jobs
      </button>

      {/* Job header */}
      <div style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="flex-gap-2" style={{ marginBottom: 'var(--sp-3)' }}>
          <span className={`badge ${job.track === 'A' ? 'badge-warning' : 'badge-info'}`}>
            Track {job.track}
          </span>
          <span className="badge badge-default">{job.category.replace('_', ' ')}</span>
          <span className={`badge ${job.status === 'open' ? 'badge-success' : 'badge-default'}`}>
            {job.status}
          </span>
        </div>
        <h3>{job.title}</h3>
      </div>

      {/* Job details */}
      <div className="card" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="grid-3" style={{ marginBottom: 'var(--sp-6)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginBottom: 'var(--sp-1)' }}>
              Total budget
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--n-950)' }}>
              {formatCurrency(job.budget, false)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginBottom: 'var(--sp-1)' }}>
              Your payout
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-600)' }}>
              {formatCurrency(freelancerPayout, false)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginBottom: 'var(--sp-1)' }}>
              Deadline
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--n-950)' }}>
              {formatDate(job.deadline)}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--n-200)', paddingTop: 'var(--sp-5)' }}>
          <h6 style={{ marginBottom: 'var(--sp-3)' }}>Brief</h6>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--n-700)', lineHeight: 'var(--leading-relaxed)', whiteSpace: 'pre-wrap' }}>
            {job.brief}
          </div>
        </div>
      </div>

      {/* Actions */}
      {job.status === 'open' && !showSubmit && (
        <div className="flex-gap-3">
          <button
            className={`btn btn-primary btn-lg ${claiming ? 'btn-loading' : ''}`}
            onClick={handleClaim}
            disabled={claiming}
            style={{ flex: 1 }}
          >
            Claim this job
          </button>
        </div>
      )}

      {/* Submit deliverable (visible after claiming) */}
      {showSubmit && (
        <div className="card" style={{ marginTop: 'var(--sp-6)' }}>
          <h5 style={{ marginBottom: 'var(--sp-4)' }}>Submit deliverable</h5>
          <div className="input-group" style={{ marginBottom: 'var(--sp-4)' }}>
            <label className="input-label">File upload</label>
            <input type="file" className="input" multiple />
            <span className="input-help">Upload your completed deliverables (max 50MB total)</span>
          </div>
          <div className="input-group" style={{ marginBottom: 'var(--sp-4)' }}>
            <label className="input-label">Notes for reviewer</label>
            <textarea
              className="textarea"
              placeholder="Any notes about your submission..."
              value={submitNotes}
              onChange={(e) => setSubmitNotes(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }}>
            Submit for review
          </button>
        </div>
      )}

      {/* Info notice */}
      <div className="card" style={{ marginTop: 'var(--sp-6)', background: 'var(--i-50)', borderColor: 'var(--i-200)' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--i-500)' }}>
          All deliverables are reviewed by our team before being sent to the client. You&apos;ll be notified of approval or revision requests. Payment is credited to your wallet once the client signs off.
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { JOB_CATEGORIES, TRACKS } from '@/lib/constants';
import { formatCurrency, formatDate } from '@/utils/format';

const MOCK_JOBS = [
  { id: '1', title: 'Landing page redesign for fintech startup', category: JOB_CATEGORIES.GRAPHIC_DESIGN, track: TRACKS.A, budget: 2500000, deadline: '2026-08-28', status: 'open', brief: 'Redesign the main landing page with a focus on conversion. Dark theme, modern aesthetic.' },
  { id: '2', title: 'React dashboard for analytics SaaS', category: JOB_CATEGORIES.WEB_DEV, track: TRACKS.A, budget: 5000000, deadline: '2026-09-15', status: 'open', brief: 'Build a responsive dashboard with charts, data tables, and role-based access.' },
  { id: '3', title: 'Social media management — 30 posts/month', category: JOB_CATEGORIES.SMM, track: TRACKS.B, budget: 800000, deadline: '2026-09-01', status: 'open', brief: 'Create and schedule 30 social media posts across Instagram and LinkedIn.' },
  { id: '4', title: 'Copywriting — SaaS email sequence (10 emails)', category: JOB_CATEGORIES.COPYWRITING, track: TRACKS.B, budget: 500000, deadline: '2026-08-22', status: 'open', brief: 'Write a 10-email onboarding drip sequence for a B2B SaaS product.' },
  { id: '5', title: 'Virtual assistant — CRM data cleanup', category: JOB_CATEGORIES.VA, track: TRACKS.B, budget: 300000, deadline: '2026-08-20', status: 'open', brief: 'Clean up 2,000 contacts in HubSpot — remove duplicates, verify emails, add tags.' },
  { id: '6', title: 'Transcription — 5 podcast episodes', category: JOB_CATEGORIES.TRANSCRIPTION, track: TRACKS.B, budget: 200000, deadline: '2026-08-25', status: 'open', brief: 'Transcribe 5 podcast episodes (30-45 min each) with timestamps.' },
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

export default function Bucket2Page() {
  const [trackFilter, setTrackFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = MOCK_JOBS.filter((job) => {
    if (trackFilter !== 'all' && job.track !== trackFilter) return false;
    if (categoryFilter !== 'all' && job.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">Freelance jobs</h3>
        <p className="page-subtitle">
          Real client work sourced by our team. Claim a job, deliver the work, get paid (minus platform margin).
        </p>
      </div>

      {/* Filters */}
      <div className="flex-gap-4" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="input-group" style={{ minWidth: 160 }}>
          <label className="input-label">Track</label>
          <select className="select" value={trackFilter} onChange={(e) => setTrackFilter(e.target.value)}>
            <option value="all">All tracks</option>
            <option value="A">Track A — Design &amp; Dev</option>
            <option value="B">Track B — Volume &amp; Recurring</option>
          </select>
        </div>
        <div className="input-group" style={{ minWidth: 200 }}>
          <label className="input-label">Category</label>
          <select className="select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All categories</option>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Jobs list */}
      <div className="stack stack-4">
        {filtered.map((job) => (
          <div key={job.id} className="task-card">
            <div className="task-card-header">
              <div style={{ flex: 1 }}>
                <div className="flex-gap-2" style={{ marginBottom: 'var(--sp-2)' }}>
                  <span className={`badge ${job.track === 'A' ? 'badge-warning' : 'badge-info'}`}>
                    Track {job.track}
                  </span>
                  <span className="badge badge-default">
                    {CATEGORY_LABELS[job.category] || job.category}
                  </span>
                </div>
                <div className="task-card-title" style={{ fontSize: 'var(--text-md)' }}>
                  {job.title}
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginTop: 'var(--sp-2)', lineHeight: 'var(--leading-normal)' }}>
                  {job.brief}
                </p>
              </div>
            </div>
            <div className="flex-between" style={{ marginTop: 'var(--sp-4)', paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--n-200)' }}>
              <div className="task-card-meta">
                <span>Budget: <strong style={{ color: 'var(--p-600)' }}>{formatCurrency(job.budget, false)}</strong></span>
                <span>Deadline: {formatDate(job.deadline)}</span>
              </div>
              <Link href={`/bucket2/${job.id}`} className="btn btn-primary btn-sm">
                View &amp; claim
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-title">No jobs match your filters</div>
          <p className="empty-state-text">
            Try broadening your filters or check back later as new jobs are added.
          </p>
        </div>
      )}
    </div>
  );
}

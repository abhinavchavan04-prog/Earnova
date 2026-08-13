'use client';

import Link from 'next/link';
import { useAuth } from '@/features/auth';
import { formatCurrency } from '@/utils/format';
import { SUB_STATUS, TASK_TYPES } from '@/lib/constants';

// Mock data for initial UI — will be replaced with Firestore queries
const MOCK_RECENT_TASKS = [
  { id: '1', title: 'Survey — Consumer preferences 2026', payout: 2500, category: 'Survey', status: 'verified' },
  { id: '2', title: 'Ad view — Mobile gaming campaign', payout: 500, category: 'Ad Watch', status: 'verified' },
  { id: '3', title: 'Data entry — Product catalog batch 12', payout: 15000, category: 'Data Entry', status: 'pending' },
];

const MOCK_OPEN_JOBS = [
  { id: '1', title: 'Landing page design for SaaS startup', budget: 1500000, track: 'A', category: 'Graphic Design', deadline: '2026-08-25' },
  { id: '2', title: 'Social media management — 30 posts', budget: 800000, track: 'B', category: 'SMM', deadline: '2026-09-01' },
];

const TASK_CATEGORIES = [
  { name: 'Ad Watching', type: TASK_TYPES.AD_WATCH, count: 24, color: 'var(--p-600)' },
  { name: 'Surveys', type: TASK_TYPES.SURVEY, count: 18, color: 'var(--i-500)' },
  { name: 'Data Entry', type: TASK_TYPES.DATA_ENTRY, count: 7, color: 'var(--s-500)' },
  { name: 'AI Labeling', type: TASK_TYPES.DATA_LABELING, count: 12, color: 'var(--w-500)' },
  { name: 'Song Review', type: TASK_TYPES.SONG_REVIEW, count: 5, color: 'var(--d-500)' },
  { name: 'Digital Products', type: TASK_TYPES.DIGITAL_PRODUCT, count: 3, color: 'var(--n-600)' },
];

export default function DashboardPage() {
  const { profile } = useAuth();

  const isSubscribed = profile?.subscription?.status === SUB_STATUS.ACTIVE;

  return (
    <div className="page-container">
      {/* Greeting */}
      <div className="page-header">
        <h3 className="page-title">
          {profile?.displayName ? `Hey, ${profile.displayName.split(' ')[0]}` : 'Dashboard'}
        </h3>
        <p className="page-subtitle">
          {isSubscribed
            ? 'Here\'s your earning activity and available work.'
            : 'Subscribe to start earning.'}
        </p>
      </div>

      {/* Subscription CTA if not subscribed */}
      {!isSubscribed && (
        <div className="card" style={{ borderColor: 'var(--p-300)', background: 'var(--p-50)', marginBottom: 'var(--sp-8)' }}>
          <h4 style={{ marginBottom: 'var(--sp-2)' }}>Activate your subscription</h4>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-4)' }}>
            Choose a plan to unlock micro-tasks, freelance jobs, and earning guides.
          </p>
          <Link href="/signup?step=plan" className="btn btn-primary">
            Choose a plan
          </Link>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid-4" style={{ marginBottom: 'var(--sp-8)' }}>
        <div className="wallet-card">
          <div className="wallet-label">Wallet balance</div>
          <div className="wallet-balance">
            {formatCurrency(profile?.wallet?.balance || 0, false)}
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Total earned</div>
          <div className="metric-card-value">
            {formatCurrency(profile?.wallet?.totalEarned || 0, false)}
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Tasks completed</div>
          <div className="metric-card-value">0</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Jobs delivered</div>
          <div className="metric-card-value">0</div>
        </div>
      </div>

      {/* Two-column: Bucket 1 categories + Bucket 2 open jobs */}
      <div className="grid-2" style={{ marginBottom: 'var(--sp-8)', alignItems: 'start' }}>
        {/* Bucket 1 — Task Categories */}
        <div>
          <div className="flex-between" style={{ marginBottom: 'var(--sp-4)' }}>
            <h5>Micro-tasks</h5>
            <Link href="/bucket1" className="btn btn-ghost btn-sm">
              View all →
            </Link>
          </div>
          <div className="stack stack-3">
            {TASK_CATEGORIES.map((cat) => (
              <Link
                key={cat.type}
                href={`/bucket1?category=${cat.type}`}
                className="task-card"
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div className="flex-between">
                  <div className="flex-gap-3">
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 'var(--radius-full)',
                        background: cat.color,
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    />
                    <span className="task-card-title">{cat.name}</span>
                  </div>
                  <span className="badge badge-default">{cat.count} available</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bucket 2 — Open Jobs */}
        <div>
          <div className="flex-between" style={{ marginBottom: 'var(--sp-4)' }}>
            <h5>Freelance jobs</h5>
            <Link href="/bucket2" className="btn btn-ghost btn-sm">
              View all →
            </Link>
          </div>
          <div className="stack stack-3">
            {MOCK_OPEN_JOBS.map((job) => (
              <Link
                key={job.id}
                href={`/bucket2/${job.id}`}
                className="task-card"
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div className="task-card-header">
                  <div>
                    <div className="task-card-title">{job.title}</div>
                    <div className="task-card-meta" style={{ marginTop: 'var(--sp-2)' }}>
                      <span className="badge badge-default">Track {job.track}</span>
                      <span>{job.category}</span>
                      <span>Due {job.deadline}</span>
                    </div>
                  </div>
                </div>
                <div className="task-card-payout" style={{ marginTop: 'var(--sp-3)' }}>
                  {formatCurrency(job.budget, false)}
                </div>
              </Link>
            ))}

            {MOCK_OPEN_JOBS.length === 0 && (
              <div className="empty-state" style={{ padding: 'var(--sp-8)' }}>
                <div className="empty-state-title">No open jobs right now</div>
                <p className="empty-state-text">
                  New jobs are posted as clients come in. Check back soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ marginBottom: 'var(--sp-8)' }}>
        <h5 style={{ marginBottom: 'var(--sp-4)' }}>Recent activity</h5>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Category</th>
                <th>Payout</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RECENT_TASKS.map((task) => (
                <tr key={task.id}>
                  <td style={{ fontWeight: 'var(--weight-medium)' }}>{task.title}</td>
                  <td>{task.category}</td>
                  <td className="task-card-payout" style={{ fontSize: 'var(--text-sm)' }}>
                    {formatCurrency(task.payout, false)}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        task.status === 'verified'
                          ? 'badge-success'
                          : task.status === 'pending'
                          ? 'badge-warning'
                          : 'badge-default'
                      }`}
                    >
                      {task.status}
                    </span>
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

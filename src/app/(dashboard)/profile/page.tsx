'use client';

import { useAuth } from '@/features/auth';
import { statusLabel, formatDate } from '@/utils/format';

export default function ProfilePage() {
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <div className="page-container" style={{ maxWidth: 'var(--content-narrow)' }}>
      <div className="page-header">
        <h3 className="page-title">Profile</h3>
        <p className="page-subtitle">Manage your account details and preferences.</p>
      </div>

      {/* Account Info */}
      <div className="card" style={{ marginBottom: 'var(--sp-6)' }}>
        <h5 style={{ marginBottom: 'var(--sp-4)' }}>Account</h5>
        <div className="stack stack-4">
          <div className="flex-between">
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>Name</span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)' }}>
              {profile.displayName}
            </span>
          </div>
          <div className="flex-between">
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>Email</span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)' }}>
              {profile.email}
            </span>
          </div>
          <div className="flex-between">
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>Member since</span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)' }}>
              {profile.createdAt ? formatDate(profile.createdAt) : '—'}
            </span>
          </div>
          <div className="flex-between">
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>KYC status</span>
            <span className={`badge ${profile.profile?.kycStatus === 'verified' ? 'badge-success' : 'badge-warning'}`}>
              {statusLabel(profile.profile?.kycStatus || 'not_submitted')}
            </span>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="card" style={{ marginBottom: 'var(--sp-6)' }}>
        <h5 style={{ marginBottom: 'var(--sp-4)' }}>Subscription</h5>
        <div className="stack stack-4">
          <div className="flex-between">
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>Status</span>
            <span className={`badge ${profile.subscription?.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
              {statusLabel(profile.subscription?.status || 'pending')}
            </span>
          </div>
          <div className="flex-between">
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>Plan</span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)' }}>
              {profile.subscription?.tier?.toUpperCase() || 'None'}
            </span>
          </div>
          {profile.subscription?.renewalDate && (
            <div className="flex-between">
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>Renewal date</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)' }}>
                {formatDate(profile.subscription.renewalDate)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Skills / Categories */}
      <div className="card">
        <h5 style={{ marginBottom: 'var(--sp-4)' }}>Skills &amp; categories</h5>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-4)' }}>
          These help us show you relevant Bucket 2 jobs. They don&apos;t restrict access — you can claim any job category.
        </p>
        <div className="flex-gap-2" style={{ flexWrap: 'wrap' }}>
          {(profile.profile?.categories?.length || 0) > 0 ? (
            profile.profile?.categories.map((cat: string) => (
              <span key={cat} className="badge badge-primary">{cat.replace('_', ' ')}</span>
            ))
          ) : (
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)' }}>
              No categories selected yet
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthGuard, useAuth } from '@/features/auth';
import { APP_NAME, SUB_STATUS } from '@/lib/constants';
import { formatCurrency } from '@/utils/format';
import { getInitials } from '@/utils/format';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: '◆' },
  { label: 'Micro-tasks', href: '/bucket1', icon: '⚡' },
  { label: 'Freelance jobs', href: '/bucket2', icon: '⬡' },
  { label: 'Learn & Earn', href: '/learn', icon: '◈' },
  { label: 'Wallet', href: '/wallet', icon: '◉' },
  { label: 'Profile', href: '/profile', icon: '○' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile, logout } = useAuth();

  return (
    <AuthGuard>
      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <Link href="/dashboard" className="sidebar-logo">
              {APP_NAME}
            </Link>
          </div>

          <nav className="sidebar-nav">
            <div className="sidebar-section-label">Menu</div>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${
                  pathname === item.href || pathname.startsWith(item.href + '/')
                    ? 'sidebar-link-active'
                    : ''
                }`}
              >
                <span className="sidebar-link-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {/* Admin link — only for admin/ops users */}
            {profile && (profile.role === 'admin' || profile.role === 'ops') && (
              <>
                <div className="sidebar-section-label" style={{ marginTop: 'var(--sp-4)' }}>
                  Admin
                </div>
                <Link
                  href="/admin"
                  className={`sidebar-link ${
                    pathname.startsWith('/admin') ? 'sidebar-link-active' : ''
                  }`}
                >
                  <span className="sidebar-link-icon">⬢</span>
                  Admin Panel
                </Link>
              </>
            )}
          </nav>

          {/* Wallet preview */}
          <div className="sidebar-footer">
            {profile && (
              <div style={{ marginBottom: 'var(--sp-4)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginBottom: 'var(--sp-1)' }}>
                  Wallet Balance
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-600)' }}>
                  {formatCurrency(profile.wallet?.balance || 0, false)}
                </div>
              </div>
            )}

            {/* User info */}
            <div className="flex-gap-3" style={{ paddingTop: 'var(--sp-3)', borderTop: '1px solid var(--n-200)' }}>
              <div className="avatar">
                {profile ? getInitials(profile.displayName || 'U') : '?'}
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--n-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {profile?.displayName || 'User'}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
                  {profile?.subscription?.status === SUB_STATUS.ACTIVE
                    ? `${profile.subscription.tier?.toUpperCase()} plan`
                    : 'No active plan'}
                </div>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={logout}
                title="Sign out"
              >
                ↗
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}

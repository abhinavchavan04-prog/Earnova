'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthGuard, useAuth } from '@/features/auth';
import { APP_NAME, SUB_STATUS } from '@/lib/constants';
import { formatCurrency, paiseToPoints, getInitials } from '@/utils/format';

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
  const router = useRouter();
  const { profile, logout } = useAuth();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1 && document.referrer.includes(window.location.host)) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <AuthGuard>
      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header flex-between">
            <Link href="/" className="sidebar-logo" title="Return to Landing Page">
              {APP_NAME}
            </Link>
            <Link href="/" className="btn btn-ghost btn-sm" style={{ fontSize: 'var(--text-xs)', color: 'var(--p-600)' }} title="Return to Home Page">
              🏠 Home
            </Link>
          </div>

          <nav className="sidebar-nav">
            <div className="sidebar-section-label">Menu</div>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${
                  pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
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
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-600)', fontSize: 'var(--text-md)' }}>
                  {paiseToPoints(profile.wallet?.balance || 0)} NP
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
                  ≈ {formatCurrency(profile.wallet?.balance || 0, false)}
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
                title="Leave & Return to Home Page"
              >
                🏠 Leave
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Top Universal Navbar */}
          <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--sp-3) var(--sp-6)',
            background: 'var(--n-0)',
            borderBottom: '1px solid var(--n-200)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}>
            <div className="flex-gap-3">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={handleBack}
                style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)', display: 'flex', alignItems: 'center', gap: 'var(--sp-1)' }}
              >
                ← Back
              </button>
              <span style={{ color: 'var(--n-300)' }}>|</span>
              <Link href="/" className="btn btn-ghost btn-sm" style={{ fontSize: 'var(--text-xs)', color: 'var(--p-600)' }}>
                🏠 Home Page
              </Link>
            </div>

            <div className="flex-gap-3">
              <Link href="/wallet" className="badge badge-primary" style={{ padding: 'var(--sp-1) var(--sp-3)', fontSize: 'var(--text-xs)' }}>
                {paiseToPoints(profile?.wallet?.balance || 0)} NP
              </Link>
              {profile?.role === 'admin' && (
                <Link href="/admin" className="btn btn-secondary btn-sm" style={{ fontSize: 'var(--text-xs)' }}>
                  ⬢ Switch to Admin
                </Link>
              )}
              <button onClick={logout} className="btn btn-ghost btn-sm" style={{ fontSize: 'var(--text-xs)', color: 'var(--d-500)' }}>
                🏠 Leave &amp; Sign Out
              </button>
            </div>
          </header>

          <main className="main-content" style={{ flex: 1 }}>
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

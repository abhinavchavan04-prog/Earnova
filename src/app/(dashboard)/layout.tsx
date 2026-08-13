'use client';

import { useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

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
        {/* Sidebar (Desktop view) */}
        <aside className="sidebar desktop-sidebar">
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
            padding: 'var(--sp-3) var(--sp-4)',
            background: 'var(--n-0)',
            borderBottom: '1px solid var(--n-200)',
            position: 'sticky',
            top: 0,
            zIndex: 20,
          }}>
            <div className="flex-gap-2" style={{ alignItems: 'center' }}>
              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                style={{
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  fontSize: '20px',
                  color: 'var(--n-950)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--n-100)',
                }}
                className="mobile-hamburger-btn"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>

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
                🏠 Home
              </Link>
            </div>

            <div className="flex-gap-3" style={{ alignItems: 'center' }}>
              <Link href="/wallet" className="badge badge-primary" style={{ padding: 'var(--sp-1) var(--sp-3)', fontSize: 'var(--text-xs)' }}>
                {paiseToPoints(profile?.wallet?.balance || 0)} NP
              </Link>
              {profile?.role === 'admin' && (
                <Link href="/admin" className="btn btn-secondary btn-sm desktop-only-btn" style={{ fontSize: 'var(--text-xs)' }}>
                  ⬢ Admin
                </Link>
              )}
              <button onClick={logout} className="btn btn-ghost btn-sm" style={{ fontSize: 'var(--text-xs)', color: 'var(--d-500)' }}>
                🏠 Leave
              </button>
            </div>
          </header>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                top: '60px',
                background: 'var(--n-50)',
                zIndex: 100,
                padding: 'var(--sp-6) var(--sp-4)',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-4)',
                borderBottom: '2px solid var(--n-200)',
                boxShadow: 'var(--shadow-overlay)',
              }}
            >
              <div className="sidebar-section-label">Navigation Menu</div>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`sidebar-link ${
                    pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                      ? 'sidebar-link-active'
                      : ''
                  }`}
                  style={{ minHeight: '44px' }}
                >
                  <span className="sidebar-link-icon">{item.icon}</span>
                  {item.label}
                </Link>
              ))}

              {profile && (profile.role === 'admin' || profile.role === 'ops') && (
                <Link
                  href="/admin"
                  onClick={closeMobileMenu}
                  className="sidebar-link"
                  style={{ minHeight: '44px', background: 'var(--n-900)', color: 'var(--n-50)' }}
                >
                  <span className="sidebar-link-icon">⬢</span>
                  Admin Panel
                </Link>
              )}

              <hr style={{ border: 'none', borderTop: '1px solid var(--n-200)', margin: 'var(--sp-2) 0' }} />

              {/* Wallet Summary */}
              {profile && (
                <div style={{ padding: 'var(--sp-3)', background: 'var(--n-100)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>Wallet Balance</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-600)', fontSize: 'var(--text-lg)' }}>
                    {paiseToPoints(profile.wallet?.balance || 0)} NP (≈ {formatCurrency(profile.wallet?.balance || 0, false)})
                  </div>
                </div>
              )}

              <button
                onClick={() => { closeMobileMenu(); logout(); }}
                className="btn btn-danger btn-lg"
                style={{ width: '100%', marginTop: 'auto' }}
              >
                🏠 Sign Out &amp; Return to Home
              </button>
            </div>
          )}

          {/* Style block for responsive sidebar media queries */}
          <style jsx>{`
            @media (max-width: 767px) {
              .desktop-sidebar {
                display: none !important;
              }
              .mobile-hamburger-btn {
                display: flex !important;
              }
              .desktop-only-btn {
                display: none !important;
              }
            }
          `}</style>

          <main className="main-content" style={{ flex: 1 }}>
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

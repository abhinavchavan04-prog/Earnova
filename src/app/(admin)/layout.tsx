'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminGuard, useAuth } from '@/features/auth';
import { APP_NAME } from '@/lib/constants';
import { getInitials } from '@/utils/format';

const ADMIN_NAV = [
  { section: 'Overview', items: [
    { label: 'Dashboard', href: '/admin', icon: '◆' },
  ]},
  { section: 'Users', items: [
    { label: 'User Management', href: '/admin/users', icon: '○' },
  ]},
  { section: 'Bucket 1', items: [
    { label: 'Categories', href: '/admin/bucket1/categories', icon: '▤' },
    { label: 'Offers', href: '/admin/bucket1/offers', icon: '⚡' },
    { label: 'Ad Partners', href: '/admin/bucket1/partners', icon: '⬡' },
    { label: 'Review Queue', href: '/admin/bucket1/review-queue', icon: '◈' },
  ]},
  { section: 'Bucket 2', items: [
    { label: 'Clients', href: '/admin/bucket2/clients', icon: '⬢' },
    { label: 'Jobs', href: '/admin/bucket2/jobs', icon: '◉' },
    { label: 'Review Queue', href: '/admin/bucket2/review-queue', icon: '◈' },
  ]},
  { section: 'Content', items: [
    { label: 'Learn & Earn', href: '/admin/content', icon: '◇' },
  ]},
  { section: 'Finance', items: [
    { label: 'Payouts', href: '/admin/payouts', icon: '◎' },
    { label: 'Analytics', href: '/admin/analytics', icon: '▣' },
  ]},
  { section: 'System', items: [
    { label: 'Settings', href: '/admin/settings', icon: '⚙' },
  ]},
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile, logout } = useAuth();

  return (
    <AdminGuard>
      <div className="app-layout">
        {/* Admin Sidebar */}
        <aside className="sidebar" style={{ background: 'var(--n-0)' }}>
          <div className="sidebar-header">
            <Link href="/admin" className="sidebar-logo">
              {APP_NAME}
              <span className="badge badge-warning" style={{ marginLeft: 'var(--sp-2)' }}>Admin</span>
            </Link>
          </div>

          <nav className="sidebar-nav" style={{ overflowY: 'auto' }}>
            {ADMIN_NAV.map((section) => (
              <div key={section.section}>
                <div className="sidebar-section-label">{section.section}</div>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar-link ${
                      pathname === item.href ? 'sidebar-link-active' : ''
                    }`}
                  >
                    <span className="sidebar-link-icon">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <Link href="/dashboard" className="btn btn-ghost btn-sm" style={{ width: '100%', marginBottom: 'var(--sp-3)' }}>
              ← Back to user dashboard
            </Link>
            <div className="flex-gap-3" style={{ paddingTop: 'var(--sp-3)', borderTop: '1px solid var(--n-200)' }}>
              <div className="avatar" style={{ background: 'var(--w-100)', color: 'var(--w-500)' }}>
                {profile ? getInitials(profile.displayName || 'A') : '?'}
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--n-900)' }}>
                  {profile?.displayName || 'Admin'}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
                  {profile?.role === 'admin' ? 'Super Admin' : 'Ops/Reviewer'}
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={logout} title="Sign out">
                ↗
              </button>
            </div>
          </div>
        </aside>

        <main className="main-content">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}

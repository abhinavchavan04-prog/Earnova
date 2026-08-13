'use client';

import React from 'react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';
import { ROLES, SUB_STATUS, UserRole } from '@/lib/constants';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  requireSubscription?: boolean;
  fallback?: React.ReactNode;
}

/**
 * Protects routes based on authentication, role, and subscription status.
 * - No user → redirect to /login
 * - No subscription (when required) → redirect to /signup (plan selection)
 * - Wrong role → shows access denied
 */
export function AuthGuard({
  children,
  requiredRole,
  requireSubscription = false,
  fallback,
}: AuthGuardProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      fallback || (
        <div className="flex-center" style={{ minHeight: '100vh' }}>
          <div className="spinner spinner-lg" />
        </div>
      )
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  if (!profile) {
    return (
      <div className="flex-center" style={{ minHeight: '100vh' }}>
        <div className="spinner spinner-lg" />
      </div>
    );
  }

  // Check role
  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(profile.role as UserRole)) {
      return (
        <div className="flex-center" style={{ minHeight: '100vh' }}>
          <div className="empty-state">
            <div className="empty-state-title">Access Denied</div>
            <p className="empty-state-text">
              You don&apos;t have permission to view this page.
            </p>
            <button
              className="btn btn-secondary"
              style={{ marginTop: 'var(--sp-6)' }}
              onClick={() => router.push('/dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      );
    }
  }

  // Check subscription
  if (requireSubscription && profile.subscription.status !== SUB_STATUS.ACTIVE) {
    router.push('/signup?step=plan');
    return null;
  }

  return <>{children}</>;
}

/**
 * Convenience wrapper for admin-only routes.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole={[ROLES.ADMIN, ROLES.OPS]}>
      {children}
    </AuthGuard>
  );
}

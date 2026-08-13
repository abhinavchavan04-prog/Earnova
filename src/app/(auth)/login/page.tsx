'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth';
import { APP_NAME } from '@/lib/constants';

export default function LoginPage() {
  const { signIn, signInWithGoogle, demoSignIn, logout, error, clearError, user } = useAuth();
  const router = useRouter();

  // Login Mode State: 'subscriber' | 'admin'
  const [loginMode, setLoginMode] = useState<'subscriber' | 'admin'>('subscriber');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signIn(email, password, rememberMe);
      const isAdmin = email.toLowerCase() === 'abhinavchavan04@gmail.com' || loginMode === 'admin';
      router.push(isAdmin ? '/admin' : '/dashboard');
    } catch {
      // Error handled cleanly
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdminQuickFill = () => {
    setEmail('abhinavchavan04@gmail.com');
    setPassword('admin123456');
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle(rememberMe);
      router.push(loginMode === 'admin' ? '/admin' : '/dashboard');
    } catch {
      // Error handled cleanly
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-brand">{APP_NAME}</div>

      {/* Admin / Subscriber Mode Toggle Tabs */}
      <div
        style={{
          display: 'flex',
          background: 'var(--n-100)',
          borderRadius: 'var(--radius-full)',
          padding: '4px',
          marginBottom: 'var(--sp-6)',
          border: '1px solid var(--n-150)',
        }}
      >
        <button
          type="button"
          onClick={() => { setLoginMode('subscriber'); setEmail(''); }}
          style={{
            flex: 1,
            padding: 'var(--sp-2) var(--sp-3)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-semibold)',
            background: loginMode === 'subscriber' ? 'var(--n-900)' : 'transparent',
            color: loginMode === 'subscriber' ? 'var(--n-50)' : 'var(--n-600)',
            transition: 'all 150ms ease',
          }}
        >
          👤 Subscriber Login
        </button>
        <button
          type="button"
          onClick={() => { setLoginMode('admin'); handleAdminQuickFill(); }}
          style={{
            flex: 1,
            padding: 'var(--sp-2) var(--sp-3)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-semibold)',
            background: loginMode === 'admin' ? 'var(--n-900)' : 'transparent',
            color: loginMode === 'admin' ? 'var(--n-50)' : 'var(--n-600)',
            transition: 'all 150ms ease',
          }}
        >
          🛡️ Admin Portal Login
        </button>
      </div>

      <h2 className="auth-heading">
        {loginMode === 'admin' ? '🛡️ Administrator Portal' : 'Sign In to Earnova'}
      </h2>
      <p className="auth-subtext">
        {loginMode === 'admin'
          ? 'Manage users, review Bucket 1 & 2 task queues, and process payouts.'
          : 'Access your subscriber dashboard, micro-tasks, and wallet earnings.'}
      </p>

      {/* If already signed in banner */}
      {user && (
        <div
          className="card"
          style={{
            background: 'var(--p-50)',
            borderColor: 'var(--p-300)',
            marginBottom: 'var(--sp-5)',
            padding: 'var(--sp-4)',
          }}
        >
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-700)', marginBottom: 'var(--sp-2)' }}>
            ℹ️ Currently signed in as <strong>{user.email || user.displayName || 'Active User'}</strong>
          </div>
          <div className="flex-gap-2">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => router.push(user.email?.toLowerCase() === 'abhinavchavan04@gmail.com' ? '/admin' : '/dashboard')}
              style={{ flex: 1 }}
            >
              Continue to Dashboard →
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={logout}
              style={{ flex: 1, color: 'var(--d-500)' }}
            >
              Sign Out &amp; Switch Account
            </button>
          </div>
        </div>
      )}

      {/* Instant Demo Preview Section (Subscriber only) */}
      {loginMode === 'subscriber' && (
        <div
          className="card"
          style={{
            background: 'var(--n-100)',
            borderColor: 'var(--n-200)',
            boxShadow: 'var(--shadow-raised)',
            padding: 'var(--sp-4)',
            marginBottom: 'var(--sp-6)',
          }}
        >
          <div className="flex-between" style={{ marginBottom: 'var(--sp-2)' }}>
            <span className="badge badge-primary" style={{ fontWeight: 'var(--weight-bold)', fontSize: 'var(--text-xs)' }}>
              ✨ INSTANT PLATFORM PREVIEW
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
              No password required
            </span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-600)', marginBottom: 'var(--sp-3)', lineHeight: 'var(--leading-relaxed)' }}>
            Experience live micro-tasks, accuracy scoring, and calculated wallet earnings without saving session.
          </p>
          <button
            type="button"
            onClick={() => { demoSignIn('subscriber'); router.push('/dashboard'); }}
            className="btn btn-primary btn-sm"
            style={{ width: '100%', textTransform: 'none', fontWeight: 'var(--weight-semibold)' }}
          >
            ⚡ Test Subscriber View
          </button>
        </div>
      )}

      {/* Admin Mode Shortcut Helper */}
      {loginMode === 'admin' && (
        <div
          className="card"
          style={{
            background: 'var(--w-50)',
            borderColor: 'var(--w-200)',
            marginBottom: 'var(--sp-5)',
            padding: 'var(--sp-4)',
          }}
        >
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--w-700)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--sp-2)' }}>
            🔑 Administrator Credentials Shortcut:
          </div>
          <button
            type="button"
            onClick={handleAdminQuickFill}
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', background: 'var(--n-50)', color: 'var(--n-950)' }}
          >
            Auto-fill Admin Email (abhinavchavan04@gmail.com)
          </button>
        </div>
      )}

      {error && (
        <div
          className="card"
          style={{
            background: 'var(--d-50)',
            borderColor: 'var(--d-200)',
            marginBottom: 'var(--sp-5)',
            padding: 'var(--sp-4)',
          }}
        >
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--d-500)' }}>
            {error}
          </p>
          <button
            className="btn btn-ghost btn-sm"
            onClick={clearError}
            style={{ marginTop: 'var(--sp-2)' }}
          >
            Dismiss
          </button>
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="email">
            {loginMode === 'admin' ? 'Admin Email Address' : 'Email Address'}
          </label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder={loginMode === 'admin' ? 'abhinavchavan04@gmail.com' : 'you@example.com'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            minLength={6}
          />
        </div>

        {/* Remember Me checkbox */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', margin: 'var(--sp-1) 0 var(--sp-3) 0' }}>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: 'var(--p-600)', cursor: 'pointer' }}
          />
          <label htmlFor="rememberMe" style={{ fontSize: 'var(--text-xs)', color: 'var(--n-600)', cursor: 'pointer', userSelect: 'none' }}>
            Remember me (Keep me signed in directly on next visit)
          </label>
        </div>

        <button
          type="submit"
          className={`btn btn-primary btn-lg ${submitting ? 'btn-loading' : ''}`}
          disabled={submitting}
          style={{ width: '100%' }}
        >
          {loginMode === 'admin' ? 'Sign in to Admin Portal' : 'Sign in'}
        </button>

        <div className="auth-divider">or</div>

        <button
          type="button"
          className="btn btn-secondary btn-lg"
          onClick={handleGoogle}
          style={{ width: '100%' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </form>

      <div className="auth-footer">
        Don&apos;t have an account?{' '}
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
}

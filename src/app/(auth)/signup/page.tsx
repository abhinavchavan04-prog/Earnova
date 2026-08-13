'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth';
import { APP_NAME } from '@/lib/constants';

export default function SignupPage() {
  const { signUp, signInWithGoogle, error, clearError, loading, user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already logged in
  if (user && !loading) {
    router.push('/dashboard');
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signUp(email, password, name);
      router.push('/dashboard');
    } catch {
      // Error handled by AuthProvider
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch {
      // Error handled by AuthProvider
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-brand">{APP_NAME}</div>
      <h2 className="auth-heading">Create your account</h2>
      <p className="auth-subtext">
        Sign up to access earning opportunities across micro-tasks, freelance work, and skill guides.
      </p>

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
          <label className="input-label" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            type="text"
            className="input"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="you@example.com"
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
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength={6}
          />
          <span className="input-help">Minimum 6 characters</span>
        </div>

        <button
          type="submit"
          className={`btn btn-primary btn-lg ${submitting ? 'btn-loading' : ''}`}
          disabled={submitting}
          style={{ width: '100%' }}
        >
          Create account
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
        Already have an account?{' '}
        <Link href="/login">Sign in</Link>
      </div>
    </div>
  );
}

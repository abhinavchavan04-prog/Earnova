import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Successful',
  description: 'Your payment was successfully processed.',
};

export default function PaymentSuccessPage() {
  return (
    <div style={{ background: 'var(--n-0)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--sp-6)' }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', padding: 'var(--sp-8)' }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--sp-2)' }}>🎉</div>
        <span className="badge badge-success" style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', marginBottom: 'var(--sp-4)' }}>
          Payment Verified &amp; Active
        </span>
        <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-2)' }}>Welcome to {APP_NAME}!</h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--sp-6)' }}>
          Your subscription is now active. Your verified micro-task feeds and freelance job streams are unlocked in your dashboard.
        </p>

        <div className="stack stack-3">
          <Link href="/dashboard" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            Go to Your Earning Dashboard →
          </Link>
          <Link href="/wallet" className="btn btn-secondary" style={{ width: '100%' }}>
            View Wallet Balance
          </Link>
        </div>
      </div>
    </div>
  );
}

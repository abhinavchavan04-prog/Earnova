import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Failed',
  description: 'Your payment attempt could not be completed.',
};

export default function PaymentFailedPage() {
  return (
    <div style={{ background: 'var(--n-0)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--sp-6)' }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', padding: 'var(--sp-8)' }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--sp-2)' }}>⚠️</div>
        <span className="badge badge-danger" style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', marginBottom: 'var(--sp-4)' }}>
          Payment Unsuccessful
        </span>
        <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-2)' }}>Transaction Failed</h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--sp-6)' }}>
          We could not verify or complete your transaction. No money was deducted from your account, or any deducted amount will be auto-refunded within 48 hours by your bank.
        </p>

        <div className="stack stack-3">
          <Link href="/signup" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            Try Again / Select Plan
          </Link>
          <Link href="/contact" className="btn btn-secondary" style={{ width: '100%' }}>
            Contact Support Helpdesk
          </Link>
        </div>
      </div>
    </div>
  );
}

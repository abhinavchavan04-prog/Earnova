import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and data protection terms for Earnova subscribers.',
};

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--n-0)', minHeight: '100vh', padding: 'var(--sp-12) var(--sp-6)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }} className="card">
        <Link href="/" className="btn btn-ghost btn-sm" style={{ width: 'fit-content', marginBottom: 'var(--sp-4)' }}>
          ← Back to Home
        </Link>
        
        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--sp-4)' }}>Privacy Policy</h1>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-400)', marginBottom: 'var(--sp-6)' }}>
          Last Updated: August 13, 2026
        </p>

        <div className="stack stack-4" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-700)', lineHeight: 'var(--leading-relaxed)' }}>
          <section>
            <h3>1. Data We Collect</h3>
            <p>
              When you register on {APP_NAME}, we collect your name, email address, payment details (processed securely via Razorpay), and payout details (UPI ID or Bank Account Number) required to deposit your task earnings.
            </p>
          </section>

          <section>
            <h3>2. Payment Processing Security</h3>
            <p>
              All financial transactions and subscription payments are processed through Razorpay using 256-bit SSL encryption. We do not store full credit/debit card numbers or bank passwords on our servers.
            </p>
          </section>

          <section>
            <h3>3. How We Use Your Information</h3>
            <p>
              Your data is strictly used to deliver verified task queues, calculate Nova Points balances, verify task submissions, and process automated wallet withdrawals.
            </p>
          </section>

          <section>
            <h3>4. Data Retention &amp; Rights</h3>
            <p>
              You retain the right to request deletion or modification of your account data by contacting our support team at support@earnova.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

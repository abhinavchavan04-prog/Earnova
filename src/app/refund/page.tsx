import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description: 'Cancellation and refund guidelines for Earnova subscription plans.',
};

export default function RefundPage() {
  return (
    <div style={{ background: 'var(--n-0)', minHeight: '100vh', padding: 'var(--sp-12) var(--sp-6)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }} className="card">
        <Link href="/" className="btn btn-ghost btn-sm" style={{ width: 'fit-content', marginBottom: 'var(--sp-4)' }}>
          ← Back to Home
        </Link>
        
        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--sp-4)' }}>Refund &amp; Cancellation Policy</h1>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-400)', marginBottom: 'var(--sp-6)' }}>
          Last Updated: August 13, 2026
        </p>

        <div className="stack stack-4" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-700)', lineHeight: 'var(--leading-relaxed)' }}>
          <section>
            <h3>1. Instant Digital Access</h3>
            <p>
              {APP_NAME} provides instant digital access to task feeds, learning modules, and direct client contracts immediately upon subscription confirmation.
            </p>
          </section>

          <section>
            <h3>2. 7-Day Fair Refund Guarantee</h3>
            <p>
              If you are dissatisfied with your subscription and have completed fewer than 5 tasks within 7 days of purchase, you may request a 100% refund.
            </p>
          </section>

          <section>
            <h3>3. How to Request a Refund</h3>
            <p>
              To initiate a cancellation or refund request, email us at <strong>support@earnova.com</strong> with your registered email and Razorpay Payment ID. Approved refunds are credited to your original payment method within 5–7 business days.
            </p>
          </section>

          <section>
            <h3>4. Subscription Cancellation</h3>
            <p>
              You can cancel auto-renewal at any time from your Profile settings. Your plan will remain active until the end of the current billing cycle.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

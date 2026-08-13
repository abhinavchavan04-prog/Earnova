import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms of service and subscription agreement for Earnova users.',
};

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--n-0)', minHeight: '100vh', padding: 'var(--sp-12) var(--sp-6)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }} className="card">
        <Link href="/" className="btn btn-ghost btn-sm" style={{ width: 'fit-content', marginBottom: 'var(--sp-4)' }}>
          ← Back to Home
        </Link>
        
        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--sp-4)' }}>Terms &amp; Conditions</h1>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-400)', marginBottom: 'var(--sp-6)' }}>
          Last Updated: August 13, 2026
        </p>

        <div className="stack stack-4" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-700)', lineHeight: 'var(--leading-relaxed)' }}>
          <section>
            <h3>1. Subscription Agreement</h3>
            <p>
              {APP_NAME} is a digital work sourcing and micro-task platform. Access to task queues and client jobs requires an active subscription (Basic, Advanced, or Ultra).
            </p>
          </section>

          <section>
            <h3>2. Digital Service Grant</h3>
            <p>
              All memberships provide instant digital access upon successful payment confirmation. No physical delivery or tangible goods are involved.
            </p>
          </section>

          <section>
            <h3>3. Acceptable Use &amp; Automated Verification</h3>
            <p>
              Task submissions are subject to automated quality and anti-spam verification. Fraudulent submissions or bot usage will result in immediate account termination without refund.
            </p>
          </section>

          <section>
            <h3>4. Governing Law</h3>
            <p>
              These terms are governed by the laws of India. Any legal disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

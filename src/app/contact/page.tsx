import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Support and business inquiry contacts for Earnova.',
};

export default function ContactPage() {
  return (
    <div style={{ background: 'var(--n-0)', minHeight: '100vh', padding: 'var(--sp-12) var(--sp-6)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }} className="card">
        <Link href="/" className="btn btn-ghost btn-sm" style={{ width: 'fit-content', marginBottom: 'var(--sp-4)' }}>
          ← Back to Home
        </Link>
        
        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--sp-4)' }}>Contact Us</h1>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-400)', marginBottom: 'var(--sp-6)' }}>
          Our support team is available Monday through Saturday (9:00 AM – 7:00 PM IST).
        </p>

        <div className="grid-2" style={{ gap: 'var(--sp-6)', marginBottom: 'var(--sp-8)' }}>
          <div className="card" style={{ background: 'var(--n-0)', borderColor: 'var(--n-200)' }}>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-bold)', marginBottom: 'var(--sp-2)' }}>
              📧 Email Support
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginBottom: 'var(--sp-3)' }}>
              For account, task verification, or payment inquiries:
            </p>
            <a href="mailto:support@earnova.com" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-bold)', color: 'var(--p-500)' }}>
              support@earnova.com
            </a>
          </div>

          <div className="card" style={{ background: 'var(--n-0)', borderColor: 'var(--n-200)' }}>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-bold)', marginBottom: 'var(--sp-2)' }}>
              🏢 Registered Office
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)' }}>
              <strong>{APP_NAME} Technologies Private Limited</strong><br />
              Level 4, Corporate Park, BKC<br />
              Mumbai, Maharashtra — 400051, India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

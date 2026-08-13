import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export default function LandingPage() {
  return (
    <div>
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="sidebar-logo">{APP_NAME}</div>
        <div className="flex-gap-3">
          <Link href="/login" className="btn btn-ghost">
            Log in
          </Link>
          <Link href="/signup" className="btn btn-primary">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-tag">
          Subscription-based earning platform
        </div>
        <h1>
          Stop juggling 8 sites.
          <br />
          <span className="landing-hero-accent">Earn from one dashboard.</span>
        </h1>
        <p>
          Micro-tasks, freelance client work, and skill-building guides — all behind a single subscription. We source the work, you do the earning.
        </p>
        <div className="flex-gap-3">
          <Link href="/signup" className="btn btn-primary btn-lg">
            Subscribe &amp; start earning
          </Link>
          <Link href="#how-it-works" className="btn btn-secondary btn-lg">
            See how it works
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="landing-section">
        <div className="landing-section-label">How it works</div>
        <h2>Three earning layers, one subscription</h2>
        <p>
          Pick the work that fits your skills and schedule. Everything is accessible from day one — no portfolios, no skill tests, no gates beyond your subscription.
        </p>

        <div className="grid-3" style={{ marginTop: 'var(--sp-8)' }}>
          {/* Bucket 1 */}
          <div className="card">
            <div className="badge badge-primary" style={{ marginBottom: 'var(--sp-4)' }}>
              Bucket 1
            </div>
            <h4 style={{ marginBottom: 'var(--sp-3)' }}>Micro-tasks</h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-4)' }}>
              Ad-watching, surveys, data entry, AI data labeling, song reviews. Quick tasks, quick payouts.
            </p>
            <div className="stack stack-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Pay-per-task, auto-verified
              </div>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                In-house + affiliate offers
              </div>
            </div>
          </div>

          {/* Bucket 2 */}
          <div className="card" style={{ borderColor: 'var(--p-200)' }}>
            <div className="badge badge-warning" style={{ marginBottom: 'var(--sp-4)' }}>
              Bucket 2
            </div>
            <h4 style={{ marginBottom: 'var(--sp-3)' }}>Freelance jobs</h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-4)' }}>
              Real client work — design, development, VA, copywriting, social media management, transcription. We find the clients, you deliver the work.
            </p>
            <div className="stack stack-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Project-based + retainer work
              </div>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Quality-reviewed before client delivery
              </div>
            </div>
          </div>

          {/* Learn & Earn */}
          <div className="card">
            <div className="badge badge-info" style={{ marginBottom: 'var(--sp-4)' }}>
              Learn &amp; Earn
            </div>
            <h4 style={{ marginBottom: 'var(--sp-3)' }}>Skill guides</h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-4)' }}>
              Step-by-step guides on monetizable skills. Starting with print-on-demand — more categories coming.
            </p>
            <div className="stack stack-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Practical, action-oriented content
              </div>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Included with your subscription
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="landing-section" style={{ borderTop: '1px solid var(--n-100)' }}>
        <div className="landing-section-label">Pricing</div>
        <h2>One subscription, everything unlocked</h2>
        <p>No per-task fees. No hidden charges. Subscribe and earn.</p>

        <div className="grid-2" style={{ maxWidth: '720px', marginTop: 'var(--sp-8)' }}>
          {/* Basic */}
          <div className="card">
            <h5 style={{ marginBottom: 'var(--sp-1)' }}>Basic</h5>
            <div style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--n-950)', marginBottom: 'var(--sp-1)' }}>
              ₹299<span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', fontWeight: 'var(--weight-regular)' }}>/mo</span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-6)' }}>
              Micro-tasks + basic guides
            </p>
            <div className="stack stack-3" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-700)', marginBottom: 'var(--sp-6)' }}>
              <div>✓ All Bucket 1 tasks</div>
              <div>✓ Basic Learn &amp; Earn content</div>
              <div>✓ In-platform wallet</div>
              <div>✓ Standard payouts</div>
            </div>
            <Link href="/signup?plan=basic" className="btn btn-secondary" style={{ width: '100%' }}>
              Start with Basic
            </Link>
          </div>

          {/* Pro */}
          <div className="card" style={{ borderColor: 'var(--p-300)', background: 'var(--p-50)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--sp-1)' }}>
              <h5>Pro</h5>
              <span className="badge badge-primary">Most popular</span>
            </div>
            <div style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-600)', marginBottom: 'var(--sp-1)' }}>
              ₹799<span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', fontWeight: 'var(--weight-regular)' }}>/mo</span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-6)' }}>
              Everything — tasks + freelance jobs + all guides
            </p>
            <div className="stack stack-3" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-700)', marginBottom: 'var(--sp-6)' }}>
              <div>✓ Everything in Basic</div>
              <div>✓ All Bucket 2 freelance jobs</div>
              <div>✓ All Learn &amp; Earn content</div>
              <div>✓ Priority payouts</div>
              <div>✓ Priority job access</div>
            </div>
            <Link href="/signup?plan=pro" className="btn btn-primary" style={{ width: '100%' }}>
              Go Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: 'var(--sp-8)', borderTop: '1px solid var(--n-100)', textAlign: 'center' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)' }}>
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

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
          Micro-tasks, data filling, freelance client work, and high-ticket opportunities — all behind a single subscription. We source the work, you do the earning.
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
            <h4 style={{ marginBottom: 'var(--sp-3)' }}>Micro-tasks &amp; Data Filling</h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-4)' }}>
              Ad-watching, surveys, data entry, form filling, AI data labeling, song reviews. Earn <strong>Nova Points (10 NP = ₹1)</strong> instantly.
            </p>
            <div className="stack stack-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Pay-per-task, auto &amp; accuracy verified
              </div>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                In-house direct sponsors + affiliate offers
              </div>
            </div>
          </div>

          {/* Bucket 2 */}
          <div className="card" style={{ borderColor: 'var(--p-200)' }}>
            <div className="badge badge-warning" style={{ marginBottom: 'var(--sp-4)' }}>
              Bucket 2
            </div>
            <h4 style={{ marginBottom: 'var(--sp-3)' }}>Freelance Agency Layer</h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-4)' }}>
              Real client work — design, development, VA, copywriting, SMM, transcription. We acquire the clients, you deliver the work.
            </p>
            <div className="stack stack-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Track A (Design/Dev) + Track B (Volume/Retainer)
              </div>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Quality inspection before client handoff
              </div>
            </div>
          </div>

          {/* Learn & Earn */}
          <div className="card">
            <div className="badge badge-info" style={{ marginBottom: 'var(--sp-4)' }}>
              High-Ticket &amp; Guides
            </div>
            <h4 style={{ marginBottom: 'var(--sp-3)' }}>High-Ticket &amp; Skill Guides</h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-4)' }}>
              Direct access to high-ticket custom client projects and step-by-step monetizable skill guides.
            </p>
            <div className="stack stack-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Custom enterprise client deals
              </div>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Dedicated account support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="landing-section" style={{ borderTop: '1px solid var(--n-100)' }}>
        <div className="landing-section-label">Pricing</div>
        <h2>Transparent Tiers for Every Earner</h2>
        <p>Choose your earning power. No per-task fees or hidden charges.</p>

        <div className="grid-3" style={{ marginTop: 'var(--sp-8)' }}>
          {/* Basic ₹999 */}
          <div className="card">
            <h5 style={{ marginBottom: 'var(--sp-1)' }}>Basic Plan</h5>
            <div style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--n-950)', marginBottom: 'var(--sp-1)' }}>
              ₹999<span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', fontWeight: 'var(--weight-regular)' }}>/mo</span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-6)' }}>
              Micro-tasks, data filling &amp; basic guides
            </p>
            <div className="stack stack-3" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-700)', marginBottom: 'var(--sp-6)' }}>
              <div>✓ All Bucket 1 micro-tasks &amp; data filling</div>
              <div>✓ Earn Nova Points (10 NP = ₹1)</div>
              <div>✓ Basic Learn &amp; Earn content</div>
              <div>✓ In-platform wallet &amp; payouts</div>
            </div>
            <Link href="/signup?plan=basic" className="btn btn-secondary" style={{ width: '100%' }}>
              Start Basic (₹999)
            </Link>
          </div>

          {/* Advanced ₹1,999 */}
          <div className="card" style={{ borderColor: 'var(--p-300)', background: 'var(--p-50)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--sp-1)' }}>
              <h5>Advanced Plan</h5>
              <span className="badge badge-primary">Most Popular</span>
            </div>
            <div style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-600)', marginBottom: 'var(--sp-1)' }}>
              ₹1,999<span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', fontWeight: 'var(--weight-regular)' }}>/mo</span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-6)' }}>
              Tasks + all Bucket 2 freelance client jobs
            </p>
            <div className="stack stack-3" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-700)', marginBottom: 'var(--sp-6)' }}>
              <div>✓ Everything in Basic</div>
              <div>✓ All Bucket 2 Freelance Jobs (Track A &amp; B)</div>
              <div>✓ All Learn &amp; Earn courses</div>
              <div>✓ Priority payouts &amp; job claims</div>
            </div>
            <Link href="/signup?plan=advanced" className="btn btn-primary" style={{ width: '100%' }}>
              Go Advanced (₹1,999)
            </Link>
          </div>

          {/* Ultra ₹5,000 */}
          <div className="card" style={{ borderColor: 'var(--w-300)', background: 'var(--w-50)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--sp-1)' }}>
              <h5>Ultra Plan</h5>
              <span className="badge badge-warning">High-Ticket</span>
            </div>
            <div style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--w-500)', marginBottom: 'var(--sp-1)' }}>
              ₹5,000<span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', fontWeight: 'var(--weight-regular)' }}>/mo</span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-6)' }}>
              Custom high-ticket client deals &amp; enterprise leads
            </p>
            <div className="stack stack-3" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-700)', marginBottom: 'var(--sp-6)' }}>
              <div>✓ Everything in Advanced</div>
              <div>✓ High-Ticket Custom Client Deals</div>
              <div>✓ Dedicated Account Manager</div>
              <div>✓ Instant Payout Approvals</div>
            </div>
            <Link href="/signup?plan=ultra" className="btn btn-secondary" style={{ width: '100%' }}>
              Get Ultra (₹5,000)
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

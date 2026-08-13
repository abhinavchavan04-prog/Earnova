import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--n-0)', minHeight: '100vh', color: 'var(--n-600)' }}>
      {/* Navigation */}
      <nav className="landing-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <div className="sidebar-logo">{APP_NAME}</div>
          <span className="badge badge-primary" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Verified Work Provider
          </span>
        </div>
        <div className="flex-gap-3">
          <Link href="/login" className="btn btn-ghost">
            Log in
          </Link>
          <Link href="/signup" className="btn btn-primary">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-tag">
          ✦ OFFICIAL DIRECT JOB &amp; MICRO-TASK PROVIDER
        </div>
        <h1 style={{ margin: 'var(--sp-2) 0' }}>
          Direct Access to High-Paying
          <br />
          <span className="landing-hero-accent">Micro-Tasks &amp; Freelance Jobs.</span>
        </h1>
        <p style={{ margin: 'var(--sp-2) 0 var(--sp-6) 0' }}>
          Earnova partners directly with global ad networks, AI research labs, and corporate clients to source verified daily tasks and freelance projects — delivered straight to your dashboard with 100% payout assurance.
        </p>
        <div className="flex-gap-3">
          <Link href="/signup" className="btn btn-primary btn-lg">
            Explore Opportunities &amp; Start Earning
          </Link>
          <Link href="#business-model" className="btn btn-secondary btn-lg">
            How Our Business Works
          </Link>
        </div>

        {/* Live Metrics Grid */}
        <div
          className="grid-4"
          style={{
            width: '100%',
            marginTop: 'var(--sp-12)',
            padding: 'var(--sp-8)',
            background: 'var(--n-50)',
            border: '1.5px solid var(--n-150)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-raised)',
          }}
        >
          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-bold)', color: 'var(--p-500)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--sp-1)' }}>
              Total Paid Out
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--n-950)' }}>
              ₹2.4 Cr+
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-400)', marginTop: 'var(--sp-1)' }}>
              Direct subscriber payouts
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-bold)', color: 'var(--p-500)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--sp-1)' }}>
              Active Earners
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--n-950)' }}>
              14,800+
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-400)', marginTop: 'var(--sp-1)' }}>
              Verified platform members
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-bold)', color: 'var(--p-500)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--sp-1)' }}>
              Task Accuracy Rate
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--n-950)' }}>
              99.4%
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-400)', marginTop: 'var(--sp-1)' }}>
              Automated quality verification
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-bold)', color: 'var(--p-500)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--sp-1)' }}>
              Payout Settlement
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--n-950)' }}>
              Instant / 24h
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-400)', marginTop: 'var(--sp-1)' }}>
              Razorpay, UPI &amp; Bank Transfer
            </div>
          </div>
        </div>
      </section>

      {/* Business Model Overview */}
      <section id="business-model" className="landing-section" style={{ borderTop: '1.5px solid var(--n-150)' }}>
        <div className="landing-section-label">Our Business Sourcing Engine</div>
        <h2 style={{ margin: 'var(--sp-2) 0' }}>How Earnova Sources &amp; Allocates Work</h2>
        <p style={{ margin: 'var(--sp-2) 0 var(--sp-6) 0' }}>
          Unlike freelance bidding sites where you fight for low-cost proposals, Earnova acts as a direct enterprise contractor. We secure bulk task inventories and client retainers, then distribute guaranteed work streams directly to subscribers.
        </p>

        <div className="grid-3" style={{ marginTop: 'var(--sp-4)' }}>
          {/* Sourcing Pillar 1 */}
          <div className="card">
            <div className="badge badge-primary" style={{ alignSelf: 'flex-start', marginBottom: 'var(--sp-4)' }}>
              Direct Corporate Partners
            </div>
            <h4 style={{ marginBottom: 'var(--sp-3)', color: 'var(--n-950)' }}>
              1. Institutional Task Inventory
            </h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: '1.6' }}>
              We partner directly with AI companies (RLHF data labeling), research agencies, ad networks, and music review platforms to receive thousands of daily micro-tasks.
            </p>
          </div>

          {/* Sourcing Pillar 2 */}
          <div className="card">
            <div className="badge badge-warning" style={{ alignSelf: 'flex-start', marginBottom: 'var(--sp-4)' }}>
              Agency Client Desk
            </div>
            <h4 style={{ marginBottom: 'var(--sp-3)', color: 'var(--n-950)' }}>
              2. Pre-Acquired Freelance Jobs
            </h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: '1.6' }}>
              Our dedicated sales team signs enterprise design, web development, copywriting, and VA client contracts, eliminating cold pitching for our subscribers.
            </p>
          </div>

          {/* Sourcing Pillar 3 */}
          <div className="card">
            <div className="badge badge-success" style={{ alignSelf: 'flex-start', marginBottom: 'var(--sp-4)' }}>
              Automated Payout Engine
            </div>
            <h4 style={{ marginBottom: 'var(--sp-3)', color: 'var(--n-950)' }}>
              3. Transparent Nova Point Calculations
            </h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: '1.6' }}>
              Every completed micro-task instantly adds verified <strong>Nova Points (10 NP = ₹1)</strong> directly into your platform wallet with clear breakdown logs.
            </p>
          </div>
        </div>
      </section>

      {/* Earning Layers / Buckets */}
      <section className="landing-section" style={{ borderTop: '1.5px solid var(--n-150)' }}>
        <div className="landing-section-label">Earning Streams</div>
        <h2 style={{ margin: 'var(--sp-2) 0' }}>Three Work Categories Built For Your Schedule</h2>
        <p style={{ margin: 'var(--sp-2) 0 var(--sp-6) 0' }}>
          Subscribers unlock immediate access to all three work categories from day one based on their active subscription tier.
        </p>

        <div className="grid-3" style={{ marginTop: 'var(--sp-4)' }}>
          {/* Bucket 1 */}
          <div className="card" style={{ justifyContent: 'space-between' }}>
            <div>
              <div className="badge badge-primary" style={{ alignSelf: 'flex-start', marginBottom: 'var(--sp-4)' }}>
                Bucket 1: High Volume
              </div>
              <h4 style={{ marginBottom: 'var(--sp-3)', color: 'var(--n-950)' }}>
                Micro-tasks &amp; Data Filling
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', marginBottom: 'var(--sp-6)', lineHeight: '1.6' }}>
                Instant entry tasks including ad-watching, survey completions, data extraction, AI image tagging, and audio rating. Earn Nova Points (10 NP = ₹1).
              </p>
            </div>
            <div className="stack stack-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--n-400)', paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--n-150)' }}>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Auto-verified payouts &amp; zero portfolio requirement
              </div>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Unlimited daily task availability
              </div>
            </div>
          </div>

          {/* Bucket 2 */}
          <div className="card" style={{ borderColor: 'var(--p-300)', justifyContent: 'space-between' }}>
            <div>
              <div className="badge badge-warning" style={{ alignSelf: 'flex-start', marginBottom: 'var(--sp-4)' }}>
                Bucket 2: Skilled Work
              </div>
              <h4 style={{ marginBottom: 'var(--sp-3)', color: 'var(--n-950)' }}>
                Freelance Agency Jobs
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', marginBottom: 'var(--sp-6)', lineHeight: '1.6' }}>
                Delivered client projects in UI/UX design, Next.js development, Virtual Assistance, Copywriting, Social Media, and Transcription.
              </p>
            </div>
            <div className="stack stack-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--n-400)', paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--n-150)' }}>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Track A (High-Skill) + Track B (Volume Retainer)
              </div>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Internal quality review before client delivery
              </div>
            </div>
          </div>

          {/* Learn & Earn */}
          <div className="card" style={{ justifyContent: 'space-between' }}>
            <div>
              <div className="badge badge-info" style={{ alignSelf: 'flex-start', marginBottom: 'var(--sp-4)' }}>
                High-Ticket &amp; Skill Guides
              </div>
              <h4 style={{ marginBottom: 'var(--sp-3)', color: 'var(--n-950)' }}>
                High-Ticket Client Deals &amp; Guides
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', marginBottom: 'var(--sp-6)', lineHeight: '1.6' }}>
                Direct access to high-ticket custom enterprise client proposals, skill acceleration courses, and dedicated account management.
              </p>
            </div>
            <div className="stack stack-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--n-400)', paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--n-150)' }}>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Direct enterprise deal allocations
              </div>
              <div className="flex-gap-2">
                <span className="status-dot status-dot-active" />
                Dedicated 1-on-1 support manager
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Pricing Tiers */}
      <section className="landing-section" style={{ borderTop: '1.5px solid var(--n-150)' }}>
        <div className="landing-section-label">Subscription Plans</div>
        <h2 style={{ margin: 'var(--sp-2) 0' }}>Transparent Pricing. Zero Hidden Fees.</h2>
        <p style={{ margin: 'var(--sp-2) 0 var(--sp-6) 0' }}>
          Select the membership tier that matches your earning goals. Upgrade or cancel anytime from your profile settings.
        </p>

        <div className="grid-3" style={{ marginTop: 'var(--sp-4)' }}>
          {/* Basic ₹999 */}
          <div className="card" style={{ justifyContent: 'space-between' }}>
            <div>
              <h5 style={{ marginBottom: 'var(--sp-2)', color: 'var(--n-950)' }}>Basic Membership</h5>
              <div style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--n-950)', marginBottom: 'var(--sp-2)' }}>
                ₹999<span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-400)', fontWeight: 'var(--weight-regular)' }}>/mo</span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', marginBottom: 'var(--sp-6)', lineHeight: '1.5' }}>
                Ideal for beginners focusing on daily micro-tasks &amp; data filling.
              </p>
              <div className="stack stack-3" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-6)' }}>
                <div>✓ Access to all Bucket 1 micro-tasks</div>
                <div>✓ Earn Nova Points (10 NP = ₹1)</div>
                <div>✓ Standard automated accuracy verification</div>
                <div>✓ Wallet dashboard &amp; basic guides</div>
                <div>✓ ₹5,000 threshold for wallet withdrawal</div>
              </div>
            </div>
            <Link href="/signup?plan=basic" className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
              Start Basic (₹999)
            </Link>
          </div>

          {/* Advanced ₹1,999 */}
          <div className="card" style={{ borderColor: 'var(--p-300)', background: 'var(--p-50)', justifyContent: 'space-between' }}>
            <div>
              <div className="flex-between" style={{ marginBottom: 'var(--sp-2)' }}>
                <h5 style={{ color: 'var(--n-950)' }}>Advanced Membership</h5>
                <span className="badge badge-primary">Most Popular</span>
              </div>
              <div style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-500)', marginBottom: 'var(--sp-2)' }}>
                ₹1,999<span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-400)', fontWeight: 'var(--weight-regular)' }}>/mo</span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', marginBottom: 'var(--sp-6)', lineHeight: '1.5' }}>
                Full access to micro-tasks plus all Bucket 2 freelance client jobs.
              </p>
              <div className="stack stack-3" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-6)' }}>
                <div>✓ Everything in Basic tier</div>
                <div>✓ Unlocks Bucket 2 Freelance Client Jobs</div>
                <div>✓ Access Track A (Design/Dev) &amp; Track B (Retainers)</div>
                <div>✓ Full access to all Learn &amp; Earn skill courses</div>
                <div>✓ Priority job queue allocation</div>
              </div>
            </div>
            <Link href="/signup?plan=advanced" className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>
              Go Advanced (₹1,999)
            </Link>
          </div>

          {/* Ultra ₹5,000 */}
          <div className="card" style={{ borderColor: 'var(--w-300)', background: 'var(--w-50)', justifyContent: 'space-between' }}>
            <div>
              <div className="flex-between" style={{ marginBottom: 'var(--sp-2)' }}>
                <h5 style={{ color: 'var(--n-950)' }}>Ultra Premier</h5>
                <span className="badge badge-warning">High-Ticket</span>
              </div>
              <div style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--w-500)', marginBottom: 'var(--sp-2)' }}>
                ₹5,000<span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-400)', fontWeight: 'var(--weight-regular)' }}>/mo</span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', marginBottom: 'var(--sp-6)', lineHeight: '1.5' }}>
                For high-ticket freelancers &amp; immediate withdrawal privileges.
              </p>
              <div className="stack stack-3" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-6)' }}>
                <div>✓ Everything in Advanced tier</div>
                <div>✓ Unlocks High-Ticket Enterprise Client Deals</div>
                <div>✓ Dedicated 1-on-1 Account Manager</div>
                <div>✓ Instant Payout Approvals &amp; Direct Bank Settlement</div>
                <div>✓ Priority 24/7 VIP Support</div>
              </div>
            </div>
            <Link href="/signup?plan=ultra" className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
              Get Ultra Premier (₹5,000)
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="landing-section" style={{ borderTop: '1.5px solid var(--n-150)' }}>
        <div className="landing-section-label">FAQ</div>
        <h2 style={{ margin: 'var(--sp-2) 0' }}>Frequently Asked Questions</h2>
        <p style={{ margin: 'var(--sp-2) 0 var(--sp-6) 0' }}>
          Everything you need to know about how Earnova operates, tasks, and payouts.
        </p>

        <div className="stack stack-4" style={{ marginTop: 'var(--sp-4)' }}>
          <div className="card">
            <h4 style={{ marginBottom: 'var(--sp-2)', color: 'var(--n-950)' }}>
              How does Earnova source jobs and micro-tasks?
            </h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: '1.6' }}>
              Earnova operates as an institutional partner for major ad networks, data research firms, and enterprise clients. We negotiate bulk contracts for micro-tasks and freelance work, then feed those opportunities directly into our platform dashboard for active subscribers.
            </p>
          </div>

          <div className="card">
            <h4 style={{ marginBottom: 'var(--sp-2)', color: 'var(--n-950)' }}>
              What are Nova Points (NP) and how are they calculated?
            </h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: '1.6' }}>
              Nova Points are our standardized task currency. Every micro-task awards a fixed number of Nova Points based on estimated completion time and accuracy. The conversion rate is fixed at <strong>10 NP = ₹1</strong>, which is automatically calculated and shown in real-time in your wallet.
            </p>
          </div>

          <div className="card">
            <h4 style={{ marginBottom: 'var(--sp-2)', color: 'var(--n-950)' }}>
              How do payouts and withdrawals work?
            </h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: '1.6' }}>
              When you submit a withdrawal request, our automated system calculates your earned balance from verified task submissions and freelance project completions. Payouts are settled via Razorpay, UPI, or direct bank transfer. (Note: Wallet withdrawals require an active Premier subscription tier).
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: 'var(--sp-10)', borderTop: '1.5px solid var(--n-150)', background: 'var(--n-50)', textAlign: 'center' }}>
        <div style={{ maxWidth: 'var(--content-max-width)', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-4)' }}>
          <div className="sidebar-logo">{APP_NAME}</div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-400)', maxWidth: '540px' }}>
            Earnova is a subscription-based job provider &amp; micro-task aggregation platform. Sourcing opportunities globally so you can earn from one unified dashboard.
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-300)', marginTop: 'var(--sp-2)' }}>
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

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

        {/* Desktop Nav Actions */}
        <div className="flex-gap-3 desktop-nav-actions" style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="#business-model" className="btn btn-ghost" style={{ fontSize: 'var(--text-xs)' }}>
            How It Works
          </Link>
          <Link href="#pricing" className="btn btn-ghost" style={{ fontSize: 'var(--text-xs)' }}>
            Pricing
          </Link>
          <Link href="#faq" className="btn btn-ghost" style={{ fontSize: 'var(--text-xs)' }}>
            FAQ
          </Link>
          <Link href="/login" className="btn btn-ghost">
            Log in
          </Link>
          <Link href="/signup" className="btn btn-primary">
            Get started
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            fontSize: '22px',
            color: 'var(--n-950)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--n-100)',
          }}
          className="mobile-hamburger-btn"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--n-50)',
              borderBottom: '2px solid var(--n-200)',
              boxShadow: 'var(--shadow-overlay)',
              padding: 'var(--sp-6) var(--sp-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-4)',
              zIndex: 100,
            }}
          >
            <Link href="#business-model" onClick={closeMobileMenu} className="btn btn-ghost" style={{ justifyContent: 'flex-start', width: '100%' }}>
              How It Works
            </Link>
            <Link href="#pricing" onClick={closeMobileMenu} className="btn btn-ghost" style={{ justifyContent: 'flex-start', width: '100%' }}>
              Pricing
            </Link>
            <Link href="#faq" onClick={closeMobileMenu} className="btn btn-ghost" style={{ justifyContent: 'flex-start', width: '100%' }}>
              FAQ
            </Link>
            <hr style={{ border: 'none', borderTop: '1px solid var(--n-150)' }} />
            <Link href="/login" onClick={closeMobileMenu} className="btn btn-secondary" style={{ width: '100%' }}>
              Log in
            </Link>
            <Link href="/signup" onClick={closeMobileMenu} className="btn btn-primary" style={{ width: '100%' }}>
              Get started
            </Link>
          </div>
        )}
      </nav>

      {/* Style block for responsive hamburger media queries */}
      <style jsx>{`
        @media (max-width: 767px) {
          .desktop-nav-actions {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>

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
        <div className="flex-gap-3" style={{ flexWrap: 'wrap', width: '100%' }}>
          <Link href="/signup" className="btn btn-primary btn-lg" style={{ flex: '1 1 240px' }}>
            Explore Opportunities &amp; Start Earning
          </Link>
          <Link href="#business-model" className="btn btn-secondary btn-lg" style={{ flex: '1 1 240px' }}>
            How Our Business Works
          </Link>
        </div>

        {/* Grounded Metrics Grid */}
        <div
          className="grid-4"
          style={{
            width: '100%',
            marginTop: 'var(--sp-8)',
            padding: 'var(--sp-6)',
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
              ₹45.8 Lakhs+
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
              4,850+
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
              Automated submission verifications
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-bold)', color: 'var(--p-500)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--sp-1)' }}>
              Payout Settlement
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--s-500)' }}>
              Instant / 24h
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-400)', marginTop: 'var(--sp-1)' }}>
              Razorpay, UPI &amp; Direct Bank
            </div>
          </div>
        </div>
      </section>

      {/* 🔴 LIVE PLATFORM ACTIVITY STREAM */}
      <section className="landing-section" style={{ borderTop: '1px solid var(--n-150)', background: 'var(--n-50)' }}>
        <div className="landing-section-label">🔴 REAL-TIME PLATFORM ACTIVITY</div>
        <h2>Live Verification Feed &amp; Earner Activity</h2>
        <p>Subscribers are completing tasks and earning Nova Points every minute.</p>

        <div className="grid-2" style={{ gap: 'var(--sp-4)', marginTop: 'var(--sp-4)' }}>
          <div className="card" style={{ padding: 'var(--sp-4)', background: 'var(--n-0)', borderColor: 'var(--n-200)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--sp-2)' }}>
              <span className="badge badge-success" style={{ fontSize: '11px' }}>🟢 Bucket 1 Micro-Task Verified</span>
              <span style={{ fontSize: '11px', color: 'var(--n-400)' }}>Just now</span>
            </div>
            <div style={{ fontWeight: 'var(--weight-bold)', fontSize: 'var(--text-sm)', color: 'var(--n-950)' }}>
              Data Entry &amp; Form Verification — +50 NP (₹5.00)
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginTop: 'var(--sp-1)' }}>
              Submitted by <strong>Priya R.</strong> (Mumbai) • Score 100%
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--sp-4)', background: 'var(--n-0)', borderColor: 'var(--n-200)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--sp-2)' }}>
              <span className="badge badge-success" style={{ fontSize: '11px' }}>🟢 Bucket 1 UI Review Verified</span>
              <span style={{ fontSize: '11px', color: 'var(--n-400)' }}>2 mins ago</span>
            </div>
            <div style={{ fontWeight: 'var(--weight-bold)', fontSize: 'var(--text-sm)', color: 'var(--n-950)' }}>
              UI Component Feedback Review — +120 NP (₹12.00)
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginTop: 'var(--sp-1)' }}>
              Submitted by <strong>Rahul M.</strong> (Bengaluru) • Score 98%
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--sp-4)', background: 'var(--n-0)', borderColor: 'var(--n-200)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--sp-2)' }}>
              <span className="badge badge-success" style={{ fontSize: '11px' }}>🟢 Bucket 1 Brand Task Verified</span>
              <span style={{ fontSize: '11px', color: 'var(--n-400)' }}>4 mins ago</span>
            </div>
            <div style={{ fontWeight: 'var(--weight-bold)', fontSize: 'var(--text-sm)', color: 'var(--n-950)' }}>
              Sponsored Brand Engagement — +30 NP (₹3.00)
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginTop: 'var(--sp-1)' }}>
              Submitted by <strong>Sneha K.</strong> (Pune) • Score 100%
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--sp-4)', background: 'var(--n-0)', borderColor: 'var(--n-200)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--sp-2)' }}>
              <span className="badge badge-primary" style={{ fontSize: '11px' }}>🟢 Bucket 2 Freelance Job Assigned</span>
              <span style={{ fontSize: '11px', color: 'var(--n-400)' }}>7 mins ago</span>
            </div>
            <div style={{ fontWeight: 'var(--weight-bold)', fontSize: 'var(--text-sm)', color: 'var(--n-950)' }}>
              Copywriting Retainer — +₹450 Direct Payout
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginTop: 'var(--sp-1)' }}>
              Assigned to <strong>Dev A.</strong> (Delhi NCR) • Advanced Tier Subscriber
            </div>
          </div>
        </div>
      </section>

      {/* 📊 EARNOVA VS TRADITIONAL PLATFORMS COMPARISON MATRIX */}
      <section className="landing-section" style={{ borderTop: '1px solid var(--n-150)' }}>
        <div className="landing-section-label">📊 WHY CHOOSE EARNOVA</div>
        <h2>Earnova vs. Traditional Freelance Sites</h2>
        <p>See why thousands of earners switch from open bidding sites to Earnova&apos;s direct task provider engine.</p>

        <div className="table-container" style={{ marginTop: 'var(--sp-6)' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Feature / Dimension</th>
                <th style={{ color: 'var(--p-500)' }}>Earnova Platform</th>
                <th>Traditional Freelance Sites (Upwork/Fiverr)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Job Access</strong></td>
                <td><span className="badge badge-success">✓ Guaranteed Daily Feed</span></td>
                <td>Unpredictable Bidding &amp; Cold Pitching</td>
              </tr>
              <tr>
                <td><strong>Platform Fee / Commission</strong></td>
                <td><span className="badge badge-success">✓ 0% Fee (You Keep 100%)</span></td>
                <td>10% – 20% Cut On Every Earnings</td>
              </tr>
              <tr>
                <td><strong>Client Sourcing</strong></td>
                <td><span className="badge badge-success">✓ Sourced by Earnova Team</span></td>
                <td>You Compete with 500+ Freelancers</td>
              </tr>
              <tr>
                <td><strong>Payout Settlement</strong></td>
                <td><span className="badge badge-success">✓ Instant / 24 Hours</span></td>
                <td>14-Day Payment Security Holds</td>
              </tr>
              <tr>
                <td><strong>Skill Upskilling</strong></td>
                <td><span className="badge badge-success">✓ Learn &amp; Earn Included</span></td>
                <td>None (Pay Third-Party Courses)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 🗺️ 4-STEP EARNER JOURNEY */}
      <section className="landing-section" style={{ borderTop: '1px solid var(--n-150)', background: 'var(--n-50)' }}>
        <div className="landing-section-label">🗺️ YOUR ROADMAP TO EARNING</div>
        <h2>How You Earn on Earnova in 4 Simple Steps</h2>
        <p>A structured, guaranteed workflow designed for steady income.</p>

        <div className="grid-4" style={{ gap: 'var(--sp-6)', marginTop: 'var(--sp-6)' }}>
          <div className="card" style={{ background: 'var(--n-0)' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-bold)', color: 'var(--p-500)', textTransform: 'uppercase', marginBottom: 'var(--sp-2)' }}>
              Step 1
            </div>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)' }}>Choose Your Plan</h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)' }}>
              Select Basic (₹999), Advanced (₹1,999), or Ultra (₹5,000) to activate your account and unlock your task queues.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--n-0)' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-bold)', color: 'var(--p-500)', textTransform: 'uppercase', marginBottom: 'var(--sp-2)' }}>
              Step 2
            </div>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)' }}>Access Live Feed</h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)' }}>
              Browse refreshed Bucket 1 micro-tasks (surveys, data entry, reviews) and Bucket 2 client projects.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--n-0)' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-bold)', color: 'var(--p-500)', textTransform: 'uppercase', marginBottom: 'var(--sp-2)' }}>
              Step 3
            </div>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)' }}>Complete Tasks</h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)' }}>
              Submit verified work. Earn calculated Nova Points (10 NP = ₹1) instantly upon automated quality check.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--n-0)' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-bold)', color: 'var(--p-500)', textTransform: 'uppercase', marginBottom: 'var(--sp-2)' }}>
              Step 4
            </div>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)' }}>Instant Payout</h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)' }}>
              Withdraw earnings directly to your UPI ID or Bank account via integrated Razorpay Payouts.
            </p>
          </div>
        </div>
      </section>

      {/* How Business Model Works */}
      <section id="business-model" className="landing-section" style={{ borderTop: '1px solid var(--n-150)' }}>
        <div className="landing-section-label">HOW OUR BUSINESS WORKS</div>
        <h2>Why Do We Charge a Subscription?</h2>
        <p style={{ maxWidth: '800px' }}>
          Unlike standard job portals that take 10%–20% commission from your earnings or force you to compete with hundreds of bidders, Earnova functions as a <strong>Direct Work Sourcing Engine</strong>.
        </p>

        <div className="grid-3" style={{ gap: 'var(--sp-6)', marginTop: 'var(--sp-6)' }}>
          <div className="card">
            <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-2)' }}>🤝</div>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)' }}>1. Direct Client Contracts</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)' }}>
              Our operations team signs bulk contracts with global ad networks, research firms, and tech startups. We bring the work directly to you.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-2)' }}>🛡️</div>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)' }}>2. Zero Commission Cuts</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)' }}>
              Your subscription covers infrastructure, automated task verification, and Razorpay payout fees. You keep <strong>100%</strong> of the task payout.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-2)' }}>⚡</div>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)' }}>3. Guaranteed Task Allocations</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)' }}>
              Subscriptions allow us to balance task inventory per user tier so every subscriber has active tasks waiting in their queue daily.
            </p>
          </div>
        </div>
      </section>

      {/* Subscription Pricing */}
      <section id="pricing" className="landing-section" style={{ borderTop: '1px solid var(--n-150)', background: 'var(--n-50)' }}>
        <div className="landing-section-label">MEMBERSHIP TIERS</div>
        <h2>Choose Your Earning Plan</h2>
        <p>Select the plan that matches your income goals. Upgrade anytime as you complete more tasks.</p>

        <div className="grid-3" style={{ gap: 'var(--sp-6)', marginTop: 'var(--sp-8)' }}>
          {/* Basic Plan */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--n-0)' }}>
            <span className="badge badge-default" style={{ width: 'fit-content', marginBottom: 'var(--sp-3)' }}>
              GET STARTED
            </span>
            <h3 style={{ fontSize: 'var(--text-xl)' }}>Basic Plan</h3>
            <div style={{ margin: 'var(--sp-4) 0' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-bold)', color: 'var(--n-950)' }}>
                ₹999
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-400)' }}> / lifetime access</span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginBottom: 'var(--sp-6)' }}>
              Ideal for students and beginners looking for daily micro-task earnings.
            </p>
            <ul className="stack stack-3" style={{ listStyle: 'none', marginBottom: 'var(--sp-8)', flex: 1, fontSize: 'var(--text-xs)', color: 'var(--n-700)' }}>
              <li>✓ Daily Bucket 1 Micro-Tasks (Ads, Surveys, Apps)</li>
              <li>✓ Up to <strong>150 NP (₹15.00) / day</strong> earning limit</li>
              <li>✓ Access to Learn &amp; Earn video guides</li>
              <li>✓ Weekly UPI &amp; Bank Payout settlement</li>
            </ul>
            <Link href="/signup?tier=basic" className="btn btn-secondary btn-lg" style={{ width: '100%' }}>
              Select Basic Plan
            </Link>
          </div>

          {/* Advanced Plan */}
          <div
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--n-0)',
              borderColor: 'var(--p-500)',
              boxShadow: 'var(--shadow-overlay)',
              position: 'relative',
            }}
          >
            <span className="badge badge-primary" style={{ width: 'fit-content', marginBottom: 'var(--sp-3)', background: 'var(--p-500)' }}>
              MOST POPULAR
            </span>
            <h3 style={{ fontSize: 'var(--text-xl)' }}>Advanced Plan</h3>
            <div style={{ margin: 'var(--sp-4) 0' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-bold)', color: 'var(--n-950)' }}>
                ₹1,999
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-400)' }}> / lifetime access</span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginBottom: 'var(--sp-6)' }}>
              For active earners who want high-priority task queues and higher daily caps.
            </p>
            <ul className="stack stack-3" style={{ listStyle: 'none', marginBottom: 'var(--sp-8)', flex: 1, fontSize: 'var(--text-xs)', color: 'var(--n-700)' }}>
              <li>✓ Priority Bucket 1 Micro-Tasks Queue</li>
              <li>✓ Up to <strong>500 NP (₹50.00) / day</strong> micro-task limit</li>
              <li>✓ Access to Entry-Level Freelance Jobs (Bucket 2)</li>
              <li>✓ 24-Hour Express Payout Settlement</li>
              <li>✓ Priority Email &amp; WhatsApp Support</li>
            </ul>
            <Link href="/signup?tier=advanced" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Select Advanced Plan
            </Link>
          </div>

          {/* Ultra Plan */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--n-0)' }}>
            <span className="badge badge-default" style={{ width: 'fit-content', marginBottom: 'var(--sp-3)' }}>
              MAXIMUM EARNINGS
            </span>
            <h3 style={{ fontSize: 'var(--text-xl)' }}>Ultra Plan</h3>
            <div style={{ margin: 'var(--sp-4) 0' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-bold)', color: 'var(--n-950)' }}>
                ₹5,000
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--n-400)' }}> / lifetime access</span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginBottom: 'var(--sp-6)' }}>
              For dedicated freelancers seeking premium corporate contracts and unlimited task access.
            </p>
            <ul className="stack stack-3" style={{ listStyle: 'none', marginBottom: 'var(--sp-8)', flex: 1, fontSize: 'var(--text-xs)', color: 'var(--n-700)' }}>
              <li>✓ <strong>Unlimited</strong> Daily Bucket 1 Micro-Tasks</li>
              <li>✓ Direct Assignment to Premium Bucket 2 Jobs</li>
              <li>✓ Dedicated Account Manager</li>
              <li>✓ Instant Instant Payout Settlements</li>
              <li>✓ Exclusive Client Project Retainers</li>
            </ul>
            <Link href="/signup?tier=ultra" className="btn btn-secondary btn-lg" style={{ width: '100%' }}>
              Select Ultra Plan
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="landing-section" style={{ borderTop: '1px solid var(--n-150)' }}>
        <div className="landing-section-label">FREQUENTLY ASKED QUESTIONS</div>
        <h2>Got Questions? We Have Answers.</h2>

        <div className="stack stack-4" style={{ marginTop: 'var(--sp-6)', maxWidth: '800px' }}>
          <div className="card">
            <h3 style={{ fontSize: 'var(--text-md)', marginBottom: 'var(--sp-2)' }}>What are Nova Points (NP)?</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)' }}>
              Nova Points (NP) are Earnova&apos;s calculated reward unit. <strong>10 Nova Points = ₹1.00 INR</strong>. Every time you complete a micro-task, your wallet is credited instantly in NP, which translates directly into rupees during withdrawal.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 'var(--text-md)', marginBottom: 'var(--sp-2)' }}>How quickly do I get paid after withdrawing?</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)' }}>
              Payout requests are processed automatically via Razorpay Payouts directly to your UPI ID or Bank account. Ultra members get instant payouts, Advanced members within 24 hours, and Basic members weekly.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 'var(--text-md)', marginBottom: 'var(--sp-2)' }}>Is there any guarantee of available tasks?</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)' }}>
              Yes! Our partner ad networks and corporate clients refresh task queues daily. Subscription tiers ensure that task allocation matches server capacity, preventing task exhaustion.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 'var(--text-md)', marginBottom: 'var(--sp-2)' }}>Can I upgrade my tier later?</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-500)', lineHeight: 'var(--leading-relaxed)' }}>
              Absolutely. You can start on the Basic Plan (₹999) and upgrade to Advanced or Ultra at any time directly from your Profile settings.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--n-150)',
          padding: 'var(--sp-12) var(--sp-10)',
          background: 'var(--n-50)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--content-max-width)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--sp-6)',
          }}
        >
          <div>
            <div className="sidebar-logo" style={{ marginBottom: 'var(--sp-2)' }}>
              {APP_NAME}
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-400)', maxWidth: '400px' }}>
              Earnova is a direct work sourcing engine connecting subscribers with verified micro-tasks and freelance opportunities.
            </p>
          </div>

          <div className="flex-gap-6" style={{ flexWrap: 'wrap', fontSize: 'var(--text-xs)' }}>
            <Link href="/login" style={{ color: 'var(--n-600)' }}>Log in</Link>
            <Link href="/signup" style={{ color: 'var(--n-600)' }}>Sign up</Link>
            <Link href="#pricing" style={{ color: 'var(--n-600)' }}>Pricing Tiers</Link>
            <Link href="#business-model" style={{ color: 'var(--n-600)' }}>Business Model</Link>
          </div>
        </div>

        <div
          style={{
            maxWidth: 'var(--content-max-width)',
            margin: 'var(--sp-8) auto 0 auto',
            paddingTop: 'var(--sp-6)',
            borderTop: '1px solid var(--n-150)',
            fontSize: '11px',
            color: 'var(--n-400)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--sp-4)',
          }}
        >
          <div>© {new Date().getFullYear()} {APP_NAME} Technologies. All rights reserved.</div>
          <div>Razorpay Verified Payout Partner • 256-bit SSL Security</div>
        </div>
      </footer>
    </div>
  );
}

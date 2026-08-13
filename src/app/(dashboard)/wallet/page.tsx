'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/features/auth';
import { formatCurrency, formatDateTime, statusLabel, paiseToPoints, formatPointsWithInr } from '@/utils/format';
import { PAYOUT_METHODS, MIN_PAYOUT_AMOUNT, TIERS } from '@/lib/constants';

const MOCK_TRANSACTIONS = [
  { id: '1', type: 'credit', amount: 2500, points: 250, source: 'bucket1', description: 'Survey — Consumer Preferences 2026', status: 'completed', createdAt: '2026-08-13T10:00:00Z' },
  { id: '2', type: 'credit', amount: 300, points: 30, source: 'bucket1', description: 'Ad View — Mobile Gaming Campaign', status: 'completed', createdAt: '2026-08-12T14:30:00Z' },
  { id: '3', type: 'credit', amount: 15000, points: 1500, source: 'bucket1', description: 'Data Filling — E-Commerce Catalog Batch 12', status: 'completed', createdAt: '2026-08-11T16:00:00Z' },
  { id: '4', type: 'credit', amount: 1750000, points: 175000, source: 'bucket2', description: 'Landing Page Redesign — FinPay Client', status: 'completed', createdAt: '2026-08-10T09:00:00Z' },
];

export default function WalletPage() {
  const { profile } = useAuth();
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState(PAYOUT_METHODS.UPI);
  const [payoutDetails, setPayoutDetails] = useState('');
  const [payoutAmount, setPayoutAmount] = useState('');

  const balance = profile?.wallet?.balance || 1750000; // default ₹17,500 = 1,750 NP
  const totalEarned = profile?.wallet?.totalEarned || 2750000;
  const userTier = profile?.subscription?.tier || TIERS.BASIC;
  const isUltraUser = userTier === TIERS.ULTRA;

  const handleWithdrawClick = () => {
    setShowPayoutModal(true);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">Nova Points &amp; Wallet</h3>
        <p className="page-subtitle">
          Track your task earnings calculated in <strong>Nova Points (10 NP = ₹1)</strong>. Subscriptions unlock tasks &amp; calculations — payouts are processed for Ultra plan members.
        </p>
      </div>

      {/* Wallet stats */}
      <div className="grid-3" style={{ marginBottom: 'var(--sp-8)' }}>
        <div className="wallet-card">
          <div className="wallet-label">Calculated Balance</div>
          <div className="wallet-balance" style={{ fontSize: 'var(--text-2xl)' }}>
            {paiseToPoints(balance)} NP
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginTop: 'var(--sp-1)' }}>
            ≈ {formatCurrency(balance, false)}
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Total Earned</div>
          <div className="metric-card-value">{paiseToPoints(totalEarned)} NP</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)', marginTop: 'var(--sp-1)' }}>
            ≈ {formatCurrency(totalEarned, false)}
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Current Plan</div>
          <div className="metric-card-value" style={{ fontSize: 'var(--text-lg)', textTransform: 'capitalize' }}>
            {userTier} Plan
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: userTier === TIERS.ULTRA ? 'var(--s-500)' : 'var(--w-500)', marginTop: 'var(--sp-1)' }}>
            {userTier === TIERS.ULTRA ? '✓ Direct Payouts Active' : '🔒 Upgrade to Ultra for Payouts'}
          </div>
        </div>
      </div>

      {/* Withdraw Action Banner */}
      <div className="card" style={{ marginBottom: 'var(--sp-8)', background: 'var(--p-50)', borderColor: 'var(--p-300)' }}>
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
          <div>
            <h5 style={{ marginBottom: 'var(--sp-1)' }}>Withdraw Earnings to Bank / UPI</h5>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>
              Accumulated earnings: <strong>{formatPointsWithInr(paiseToPoints(balance))}</strong>
            </p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={handleWithdrawClick}>
            Withdraw Money / Request Payout
          </button>
        </div>
      </div>

      {/* Withdrawal Tier Gate Modal */}
      {showPayoutModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <div className="flex-gap-2">
                <span style={{ fontSize: 'var(--text-xl)' }}>🔒</span>
                <h5 className="modal-title">Withdrawal Tier Gate</h5>
              </div>
              <button className="modal-close" onClick={() => setShowPayoutModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              {!isUltraUser ? (
                /* Upgrade Required Gate for Basic ₹999 / Advanced ₹1,999 users */
                <div className="stack stack-4" style={{ textAlign: 'center', padding: 'var(--sp-4) 0' }}>
                  <div style={{ fontSize: 'var(--text-4xl)' }}>💼</div>
                  <h4>Ultra Plan Required for Payouts</h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    You have calculated earnings of <strong>{formatPointsWithInr(paiseToPoints(balance))}</strong>.
                    <br /><br />
                    Subscribers on <strong>Basic (₹999/mo)</strong> and <strong>Advanced (₹1,999/mo)</strong> plans can perform all micro-tasks, data filling, and calculate total earnings. Direct withdrawal of funds to your UPI, PayPal, or Bank account requires an active <strong>Ultra Plan (₹5,000/mo)</strong> subscription.
                  </p>

                  <div className="card" style={{ background: 'var(--w-50)', borderColor: 'var(--w-200)', textAlign: 'left' }}>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', color: 'var(--w-500)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 'var(--sp-1)' }}>
                      Ultra Plan Benefits (₹5,000/mo)
                    </div>
                    <ul className="stack stack-2" style={{ paddingLeft: 'var(--sp-4)', fontSize: 'var(--text-xs)', color: 'var(--n-700)' }}>
                      <li>✓ Direct Payout Withdrawals (UPI, Bank, PayPal)</li>
                      <li>✓ Instant 24-hour Payout Approvals</li>
                      <li>✓ High-Ticket Custom Client Projects</li>
                      <li>✓ Dedicated Account Manager Support</li>
                    </ul>
                  </div>

                  <div className="flex-gap-3" style={{ marginTop: 'var(--sp-2)' }}>
                    <Link href="/signup?plan=ultra" className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                      Upgrade to Ultra (₹5,000)
                    </Link>
                    <button className="btn btn-ghost btn-lg" onClick={() => setShowPayoutModal(false)}>
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                /* Ultra Plan Payout Form */
                <div className="stack stack-4">
                  <div style={{ background: 'var(--s-50)', padding: 'var(--sp-3)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', color: 'var(--s-500)' }}>
                    ✓ <strong>Ultra Subscription Active:</strong> Direct payout withdrawals unlocked!
                  </div>

                  <div className="input-group">
                    <label className="input-label">Payout Amount (in Nova Points)</label>
                    <input
                      type="number"
                      className="input"
                      placeholder={`Max ${paiseToPoints(balance)} NP`}
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Payout Method</label>
                    <select
                      className="select"
                      value={payoutMethod}
                      onChange={(e) => setPayoutMethod(e.target.value as typeof payoutMethod)}
                    >
                      <option value="upi">UPI (Instant Transfer)</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank">Bank Transfer (NEFT/IMPS)</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      {payoutMethod === 'upi' ? 'UPI ID' : payoutMethod === 'paypal' ? 'PayPal Email' : 'Bank Account &amp; IFSC'}
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder={payoutMethod === 'upi' ? 'name@paytm' : payoutMethod === 'paypal' ? 'email@example.com' : 'Account number, IFSC code'}
                      value={payoutDetails}
                      onChange={(e) => setPayoutDetails(e.target.value)}
                    />
                  </div>

                  <div className="flex-gap-3">
                    <button
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                      onClick={() => {
                        alert('Payout request submitted successfully! Your account manager will process the transfer within 24 hours.');
                        setShowPayoutModal(false);
                      }}
                    >
                      Submit Payout Request
                    </button>
                    <button className="btn btn-ghost" onClick={() => setShowPayoutModal(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Transaction history */}
      <h5 style={{ marginBottom: 'var(--sp-4)' }}>Earning History &amp; Points Log</h5>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Source</th>
              <th>Nova Points Earned</th>
              <th>Calculated Value</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_TRANSACTIONS.map((tx) => (
              <tr key={tx.id}>
                <td style={{ fontWeight: 'var(--weight-medium)' }}>{tx.description}</td>
                <td>
                  <span className="badge badge-default">{tx.source}</span>
                </td>
                <td style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--weight-bold)',
                  color: 'var(--p-600)',
                }}>
                  +{tx.points} NP
                </td>
                <td style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>
                  ≈ {formatCurrency(tx.amount, false)}
                </td>
                <td>
                  <span className={`badge ${tx.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                    {statusLabel(tx.status)}
                  </span>
                </td>
                <td style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
                  {formatDateTime(tx.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

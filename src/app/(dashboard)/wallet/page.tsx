'use client';

import { useState } from 'react';
import { useAuth } from '@/features/auth';
import { formatCurrency, formatDateTime, statusLabel } from '@/utils/format';
import { PAYOUT_METHODS, MIN_PAYOUT_AMOUNT } from '@/lib/constants';

const MOCK_TRANSACTIONS = [
  { id: '1', type: 'credit', amount: 2500, source: 'bucket1', description: 'Survey — Consumer preferences 2026', status: 'completed', createdAt: '2026-08-13T10:00:00Z' },
  { id: '2', type: 'credit', amount: 500, source: 'bucket1', description: 'Ad view — Mobile gaming campaign', status: 'completed', createdAt: '2026-08-12T14:30:00Z' },
  { id: '3', type: 'credit', amount: 1750000, source: 'bucket2', description: 'Landing page redesign — FinPay', status: 'completed', createdAt: '2026-08-10T09:00:00Z' },
  { id: '4', type: 'debit', amount: 1000000, source: 'payout', description: 'Payout — UPI', status: 'completed', createdAt: '2026-08-08T16:00:00Z' },
];

export default function WalletPage() {
  const { profile } = useAuth();
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState(PAYOUT_METHODS.UPI);
  const [payoutDetails, setPayoutDetails] = useState('');
  const [payoutAmount, setPayoutAmount] = useState('');

  const balance = profile?.wallet?.balance || 0;
  const totalEarned = profile?.wallet?.totalEarned || 0;
  const canPayout = balance >= MIN_PAYOUT_AMOUNT;

  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">Wallet</h3>
        <p className="page-subtitle">
          Your earnings across all buckets. Request payouts when your balance exceeds {formatCurrency(MIN_PAYOUT_AMOUNT, false)}.
        </p>
      </div>

      {/* Wallet stats */}
      <div className="grid-3" style={{ marginBottom: 'var(--sp-8)' }}>
        <div className="wallet-card">
          <div className="wallet-label">Available balance</div>
          <div className="wallet-balance">{formatCurrency(balance, false)}</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Total earned</div>
          <div className="metric-card-value">{formatCurrency(totalEarned, false)}</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Total withdrawn</div>
          <div className="metric-card-value">{formatCurrency(totalEarned - balance, false)}</div>
        </div>
      </div>

      {/* Payout button */}
      <div style={{ marginBottom: 'var(--sp-8)' }}>
        {!showPayoutForm ? (
          <button
            className="btn btn-primary"
            onClick={() => setShowPayoutForm(true)}
            disabled={!canPayout}
          >
            {canPayout ? 'Request payout' : `Min. ${formatCurrency(MIN_PAYOUT_AMOUNT, false)} required`}
          </button>
        ) : (
          <div className="card" style={{ maxWidth: '480px' }}>
            <h5 style={{ marginBottom: 'var(--sp-4)' }}>Request payout</h5>
            <div className="stack stack-4">
              <div className="input-group">
                <label className="input-label">Amount</label>
                <input
                  type="number"
                  className="input"
                  placeholder={`Min ${formatCurrency(MIN_PAYOUT_AMOUNT, false)}`}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Payout method</label>
                <select
                  className="select"
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value as typeof payoutMethod)}
                >
                  <option value="upi">UPI</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank">Bank transfer</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">
                  {payoutMethod === 'upi' ? 'UPI ID' : payoutMethod === 'paypal' ? 'PayPal email' : 'Account details'}
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder={payoutMethod === 'upi' ? 'name@paytm' : payoutMethod === 'paypal' ? 'email@example.com' : 'Bank name, account number, IFSC'}
                  value={payoutDetails}
                  onChange={(e) => setPayoutDetails(e.target.value)}
                />
              </div>
              <div className="flex-gap-3">
                <button className="btn btn-primary" style={{ flex: 1 }}>
                  Submit request
                </button>
                <button className="btn btn-ghost" onClick={() => setShowPayoutForm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transaction history */}
      <h5 style={{ marginBottom: 'var(--sp-4)' }}>Transaction history</h5>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Source</th>
              <th>Amount</th>
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
                  fontWeight: 'var(--weight-semibold)',
                  color: tx.type === 'credit' ? 'var(--s-500)' : 'var(--d-500)',
                }}>
                  {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount, false)}
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

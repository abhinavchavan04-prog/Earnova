'use client';

import { formatCurrency, formatDateTime, statusLabel } from '@/utils/format';

const MOCK_PARTNERS = [
  { id: '1', name: 'CPX Research', status: 'active', totalOffers: 45, totalPayouts: 125000, lastPostbackAt: '2026-08-13T12:30:00Z' },
  { id: '2', name: 'AdGate Media', status: 'active', totalOffers: 32, totalPayouts: 89000, lastPostbackAt: '2026-08-13T11:45:00Z' },
  { id: '3', name: 'Torox', status: 'testing', totalOffers: 0, totalPayouts: 0, lastPostbackAt: null },
  { id: '4', name: 'Lootably', status: 'inactive', totalOffers: 18, totalPayouts: 42000, lastPostbackAt: '2026-08-01T08:00:00Z' },
];

export default function AdminPartnersPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h3 className="page-title">Ad Network Partners</h3>
            <p className="page-subtitle">
              Manage offerwall/ad-network partner credentials, monitor integration health, and reconcile payouts.
            </p>
          </div>
          <button className="btn btn-primary">+ Add partner</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--sp-6)', background: 'var(--i-50)', borderColor: 'var(--i-200)' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--i-500)' }}>
          This is the operational home for the in-house ad-watching BD dependency. Each partner integration requires API keys, postback secrets, and signed agreements. Engineering builds the postback pipeline; BD closes the partnerships.
        </p>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Partner</th>
              <th>Status</th>
              <th>Active Offers</th>
              <th>Total Payouts</th>
              <th>Last Postback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PARTNERS.map((partner) => (
              <tr key={partner.id}>
                <td style={{ fontWeight: 'var(--weight-medium)' }}>{partner.name}</td>
                <td>
                  <span className={`badge ${partner.status === 'active' ? 'badge-success' : partner.status === 'testing' ? 'badge-warning' : 'badge-default'}`}>
                    {statusLabel(partner.status)}
                  </span>
                </td>
                <td>{partner.totalOffers}</td>
                <td style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-medium)' }}>
                  {formatCurrency(partner.totalPayouts, false)}
                </td>
                <td style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
                  {partner.lastPostbackAt ? formatDateTime(partner.lastPostbackAt) : 'Never'}
                </td>
                <td>
                  <div className="flex-gap-2">
                    <button className="btn btn-ghost btn-sm">Configure</button>
                    <button className="btn btn-ghost btn-sm">Test</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

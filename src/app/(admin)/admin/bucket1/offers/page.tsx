'use client';

import { formatCurrency, statusLabel } from '@/utils/format';

const MOCK_OFFERS = [
  { id: '1', title: '30-second mobile game ad', categoryName: 'Ad Watching', source: 'in_house', payoutAmount: 300, isActive: true },
  { id: '2', title: 'Short survey — Travel habits', categoryName: 'Surveys', source: 'affiliate', payoutAmount: 2500, isActive: true },
  { id: '3', title: 'Video ad — Fintech campaign', categoryName: 'Ad Watching', source: 'in_house', payoutAmount: 500, isActive: true },
  { id: '4', title: 'E-commerce data entry batch', categoryName: 'Data Entry', source: 'in_house', payoutAmount: 15000, isActive: true },
  { id: '5', title: 'Object detection labeling', categoryName: 'AI Data Labeling', source: 'affiliate', payoutAmount: 50000, isActive: true },
  { id: '6', title: 'Indie music review batch', categoryName: 'Song Review', source: 'affiliate', payoutAmount: 1000, isActive: false },
];

export default function AdminOffersPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h3 className="page-title">Task Offers</h3>
            <p className="page-subtitle">Manage individual task offers. Set payout rates, source type, and availability.</p>
          </div>
          <button className="btn btn-primary">+ Add offer</button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Offer</th>
              <th>Category</th>
              <th>Source</th>
              <th>Payout</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_OFFERS.map((offer) => (
              <tr key={offer.id}>
                <td style={{ fontWeight: 'var(--weight-medium)' }}>{offer.title}</td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{offer.categoryName}</td>
                <td>
                  <span className={`badge ${offer.source === 'in_house' ? 'badge-primary' : 'badge-info'}`}>
                    {offer.source === 'in_house' ? 'In-house' : 'Affiliate'}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-600)' }}>
                  {formatCurrency(offer.payoutAmount, false)}
                </td>
                <td>
                  <span className={`badge ${offer.isActive ? 'badge-success' : 'badge-default'}`}>
                    {offer.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="flex-gap-2">
                    <button className="btn btn-ghost btn-sm">Edit</button>
                    <button className="btn btn-ghost btn-sm">
                      {offer.isActive ? 'Deactivate' : 'Activate'}
                    </button>
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

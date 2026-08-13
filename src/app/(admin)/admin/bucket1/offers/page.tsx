'use client';

import { useState } from 'react';
import { formatPointsWithInr } from '@/utils/format';

interface OfferItem {
  id: string;
  title: string;
  categoryName: string;
  source: 'in_house' | 'affiliate';
  pointsReward: number; // Nova Points
  payoutAmount: number; // in paise
  isVisible: boolean; // Show/Hide control
  isFeatured: boolean;
}

const INITIAL_OFFERS: OfferItem[] = [
  { id: '1', title: 'Watch 30-sec Mobile Game Ad', categoryName: 'Ad Watching', source: 'in_house', pointsReward: 30, payoutAmount: 300, isVisible: true, isFeatured: true },
  { id: '2', title: 'Short Survey — Travel Habits', categoryName: 'Surveys', source: 'affiliate', pointsReward: 250, payoutAmount: 2500, isVisible: true, isFeatured: false },
  { id: '3', title: 'Watch 15-sec Brand Campaign Ad', categoryName: 'Ad Watching', source: 'in_house', pointsReward: 20, payoutAmount: 200, isVisible: true, isFeatured: false },
  { id: '4', title: 'Data Filling — E-Commerce Invoice Batch 12', categoryName: 'Data Entry', source: 'in_house', pointsReward: 1500, payoutAmount: 15000, isVisible: true, isFeatured: true },
  { id: '5', title: 'AI Object Labeling — Dataset #84', categoryName: 'AI Data Labeling', source: 'affiliate', pointsReward: 5000, payoutAmount: 50000, isVisible: true, isFeatured: false },
  { id: '6', title: 'Indie Music Review Batch 8', categoryName: 'Song Review', source: 'affiliate', pointsReward: 100, payoutAmount: 1000, isVisible: false, isFeatured: false },
];

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<OfferItem[]>(INITIAL_OFFERS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Ad Watching');
  const [newPoints, setNewPoints] = useState(50);
  const [newSource, setNewSource] = useState<'in_house' | 'affiliate'>('in_house');

  const handleToggleVisibility = (id: string) => {
    setOffers(
      offers.map((o) => (o.id === id ? { ...o, isVisible: !o.isVisible } : o))
    );
  };

  const handleToggleFeatured = (id: string) => {
    setOffers(
      offers.map((o) => (o.id === id ? { ...o, isFeatured: !o.isFeatured } : o))
    );
  };

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newOfferItem: OfferItem = {
      id: Date.now().toString(),
      title: newTitle,
      categoryName: newCategory,
      source: newSource,
      pointsReward: Number(newPoints),
      payoutAmount: Number(newPoints) * 100, // 10 NP = ₹1 (100 paise)
      isVisible: true,
      isFeatured: false,
    };

    setOffers([newOfferItem, ...offers]);
    setNewTitle('');
    setNewPoints(50);
    setShowAddForm(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h3 className="page-title">Ad &amp; Task Offer Management</h3>
            <p className="page-subtitle">
              Control which ads &amp; tasks to <strong>Show / Hide</strong> to users, configure <strong>Nova Points (10 NP = ₹1)</strong> rewards, and feature top ads.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
            + Create New Ad / Task Offer
          </button>
        </div>
      </div>

      {showAddForm && (
        <form className="card" style={{ marginBottom: 'var(--sp-6)', maxWidth: '580px' }} onSubmit={handleAddOffer}>
          <h5 style={{ marginBottom: 'var(--sp-4)' }}>New Ad Campaign / Task Offer</h5>
          <div className="stack stack-4">
            <div className="input-group">
              <label className="input-label">Offer Title / Campaign Name</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Watch 30-sec EV Brand Ad"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">Category</label>
                <select className="select" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                  <option>Ad Watching</option>
                  <option>Surveys</option>
                  <option>Data Entry</option>
                  <option>AI Data Labeling</option>
                  <option>Song Review</option>
                  <option>Digital Products</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Source</label>
                <select className="select" value={newSource} onChange={(e) => setNewSource(e.target.value as 'in_house' | 'affiliate')}>
                  <option value="in_house">In-House Direct Sponsor</option>
                  <option value="affiliate">Affiliate / Offerwall Partner</option>
                </select>
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Nova Points Reward (10 NP = ₹1)</label>
              <input
                type="number"
                className="input"
                placeholder="50"
                value={newPoints}
                onChange={(e) => setNewPoints(Number(e.target.value))}
                required
                min={1}
              />
              <span className="input-help">
                User reward: <strong>{newPoints} NP</strong> (≈ ₹{(newPoints / 10).toFixed(2)})
              </span>
            </div>
            <div className="flex-gap-3">
              <button type="submit" className="btn btn-primary">
                Publish &amp; Show to Users
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Offers Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Ad / Offer Name</th>
              <th>Category</th>
              <th>Source</th>
              <th>Reward (Points)</th>
              <th>Visibility to Users</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} style={{ opacity: offer.isVisible ? 1 : 0.6 }}>
                <td>
                  <div style={{ fontWeight: 'var(--weight-medium)' }}>{offer.title}</div>
                </td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{offer.categoryName}</td>
                <td>
                  <span className={`badge ${offer.source === 'in_house' ? 'badge-primary' : 'badge-info'}`}>
                    {offer.source === 'in_house' ? 'In-house' : 'Affiliate'}
                  </span>
                </td>
                <td>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-600)' }}>
                    {offer.pointsReward} NP
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
                    ≈ {formatPointsWithInr(offer.pointsReward).split('(')[1].replace(')', '')}
                  </div>
                </td>
                <td>
                  <button
                    className={`badge ${offer.isVisible ? 'badge-success' : 'badge-danger'}`}
                    style={{ cursor: 'pointer', border: 'none' }}
                    onClick={() => handleToggleVisibility(offer.id)}
                    title="Click to toggle user visibility"
                  >
                    {offer.isVisible ? '👁️ Shown to Users' : '🙈 Hidden from Users'}
                  </button>
                </td>
                <td>
                  <button
                    className={`badge ${offer.isFeatured ? 'badge-warning' : 'badge-default'}`}
                    style={{ cursor: 'pointer', border: 'none' }}
                    onClick={() => handleToggleFeatured(offer.id)}
                  >
                    {offer.isFeatured ? '⭐ Featured' : 'Standard'}
                  </button>
                </td>
                <td>
                  <div className="flex-gap-2">
                    <button className="btn btn-ghost btn-sm" onClick={() => handleToggleVisibility(offer.id)}>
                      {offer.isVisible ? 'Hide' : 'Show'}
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

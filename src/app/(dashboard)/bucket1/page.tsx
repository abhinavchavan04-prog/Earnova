'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TASK_TYPES } from '@/lib/constants';
import { formatCurrency } from '@/utils/format';

const CATEGORIES = [
  { id: 'all', name: 'All Tasks', type: 'all' },
  { id: '1', name: 'Ad Watching', type: TASK_TYPES.AD_WATCH, description: 'Watch ads and offers, earn per view', color: 'var(--p-600)' },
  { id: '2', name: 'Surveys', type: TASK_TYPES.SURVEY, description: 'Share opinions on products and services', color: 'var(--i-500)' },
  { id: '3', name: 'Data Entry', type: TASK_TYPES.DATA_ENTRY, description: 'Fill forms and process data', color: 'var(--s-500)' },
  { id: '4', name: 'AI Data Labeling', type: TASK_TYPES.DATA_LABELING, description: 'Label data for machine learning models', color: 'var(--w-500)' },
  { id: '5', name: 'Song Review', type: TASK_TYPES.SONG_REVIEW, description: 'Listen and review music tracks', color: 'var(--d-500)' },
  { id: '6', name: 'Digital Products', type: TASK_TYPES.DIGITAL_PRODUCT, description: 'Learn to sell digital products', color: 'var(--n-600)' },
];

const MOCK_OFFERS = [
  { id: '1', title: 'Watch 30-second mobile game ad', categoryType: TASK_TYPES.AD_WATCH, source: 'in_house', payoutAmount: 300, isActive: true },
  { id: '2', title: 'Complete short survey — Travel habits', categoryType: TASK_TYPES.SURVEY, source: 'affiliate', payoutAmount: 2500, isActive: true },
  { id: '3', title: 'Video ad — Fintech campaign', categoryType: TASK_TYPES.AD_WATCH, source: 'in_house', payoutAmount: 500, isActive: true },
  { id: '4', title: 'Data entry — E-commerce product listings', categoryType: TASK_TYPES.DATA_ENTRY, source: 'in_house', payoutAmount: 15000, isActive: true },
  { id: '5', title: 'Label images — Object detection dataset', categoryType: TASK_TYPES.DATA_LABELING, source: 'affiliate', payoutAmount: 50000, isActive: true },
  { id: '6', title: 'Review indie tracks — Batch 8', categoryType: TASK_TYPES.SONG_REVIEW, source: 'affiliate', payoutAmount: 1000, isActive: true },
  { id: '7', title: 'Market research survey — Tech products', categoryType: TASK_TYPES.SURVEY, source: 'in_house', payoutAmount: 5000, isActive: true },
  { id: '8', title: 'Watch 15-second brand ad', categoryType: TASK_TYPES.AD_WATCH, source: 'in_house', payoutAmount: 200, isActive: true },
];

export default function Bucket1Page() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filteredOffers = activeCategory === 'all'
    ? MOCK_OFFERS
    : MOCK_OFFERS.filter((o) => o.categoryType === activeCategory);

  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">Micro-tasks</h3>
        <p className="page-subtitle">
          Browse available tasks by category. Complete tasks to earn — payouts are credited to your wallet.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--sp-6)', overflowX: 'auto' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`tab ${activeCategory === cat.type ? 'tab-active' : ''}`}
            onClick={() => setActiveCategory(cat.type)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Task offers grid */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {filteredOffers.map((offer) => (
          <div key={offer.id} className="task-card">
            <div className="task-card-header">
              <div style={{ flex: 1 }}>
                <div className="task-card-title">{offer.title}</div>
                <div className="task-card-meta" style={{ marginTop: 'var(--sp-2)' }}>
                  <span className={`badge ${offer.source === 'in_house' ? 'badge-primary' : 'badge-info'}`}>
                    {offer.source === 'in_house' ? 'In-house' : 'Partner'}
                  </span>
                </div>
              </div>
              <div className="task-card-payout">
                {formatCurrency(offer.payoutAmount, false)}
              </div>
            </div>
            <div style={{ marginTop: 'var(--sp-4)', display: 'flex', gap: 'var(--sp-3)' }}>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                Start task
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-title">No tasks in this category</div>
          <p className="empty-state-text">
            New tasks are added regularly. Check back soon or try another category.
          </p>
        </div>
      )}
    </div>
  );
}

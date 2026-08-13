'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TASK_TYPES } from '@/lib/constants';
import { paiseToPoints, formatPointsWithInr } from '@/utils/format';

const CATEGORIES = [
  { id: 'all', name: 'All Tasks', type: 'all' },
  { id: '1', name: 'Ad Watching', type: TASK_TYPES.AD_WATCH, description: 'Watch video & banner ads, earn Nova Points', color: 'var(--p-600)' },
  { id: '2', name: 'Surveys', type: TASK_TYPES.SURVEY, description: 'Share opinions on consumer products', color: 'var(--i-500)' },
  { id: '3', name: 'Data Entry & Filling', type: TASK_TYPES.DATA_ENTRY, description: 'Fill form batches & data verification', color: 'var(--s-500)' },
  { id: '4', name: 'AI Data Labeling', type: TASK_TYPES.DATA_LABELING, description: 'Label objects & text for AI models', color: 'var(--w-500)' },
  { id: '5', name: 'Song Review', type: TASK_TYPES.SONG_REVIEW, description: 'Listen and rate indie tracks', color: 'var(--d-500)' },
  { id: '6', name: 'Digital Products', type: TASK_TYPES.DIGITAL_PRODUCT, description: 'Learn & distribute digital guides', color: 'var(--n-600)' },
];

const MOCK_OFFERS = [
  { id: '1', title: 'Watch 30-sec Mobile Game Ad', categoryType: TASK_TYPES.AD_WATCH, source: 'in_house', pointsReward: 30, payoutAmount: 300, isVisible: true, isFeatured: true },
  { id: '2', title: 'Complete Survey — Consumer Travel Habits', categoryType: TASK_TYPES.SURVEY, source: 'affiliate', pointsReward: 250, payoutAmount: 2500, isVisible: true },
  { id: '3', title: 'Watch 15-sec Brand Campaign Ad', categoryType: TASK_TYPES.AD_WATCH, source: 'in_house', pointsReward: 20, payoutAmount: 200, isVisible: true },
  { id: '4', title: 'Data Filling — E-Commerce Product Details Batch 12', categoryType: TASK_TYPES.DATA_ENTRY, source: 'in_house', pointsReward: 1500, payoutAmount: 15000, isVisible: true, isFeatured: true },
  { id: '5', title: 'AI Labeling — Bounding Box Dataset #84', categoryType: TASK_TYPES.DATA_LABELING, source: 'affiliate', pointsReward: 5000, payoutAmount: 50000, isVisible: true },
  { id: '6', title: 'Review Indie Track — Batch 8', categoryType: TASK_TYPES.SONG_REVIEW, source: 'affiliate', pointsReward: 100, payoutAmount: 1000, isVisible: true },
  { id: '7', title: 'Tech Opinion Survey 2026', categoryType: TASK_TYPES.SURVEY, source: 'in_house', pointsReward: 500, payoutAmount: 5000, isVisible: true },
  { id: '8', title: 'Data Filling — Invoice & GST Form Verification', categoryType: TASK_TYPES.DATA_ENTRY, source: 'in_house', pointsReward: 2000, payoutAmount: 20000, isVisible: true },
];

interface DataFormState {
  companyName: string;
  email: string;
  phone: string;
  gstin: string;
  pincode: string;
}

export default function Bucket1Page() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // Active task modal state
  const [activeTask, setActiveTask] = useState<typeof MOCK_OFFERS[0] | null>(null);
  const [formData, setFormData] = useState<DataFormState>({
    companyName: '',
    email: '',
    phone: '',
    gstin: '',
    pincode: '',
  });

  // Completion modal state
  const [submittedResult, setSubmittedResult] = useState<{
    accuracy: number;
    mistakes: string[];
    earnedPoints: number;
    status: 'verified' | 'rejected' | 'pending';
  } | null>(null);

  const filteredOffers = (activeCategory === 'all'
    ? MOCK_OFFERS
    : MOCK_OFFERS.filter((o) => o.categoryType === activeCategory)
  ).filter((o) => o.isVisible !== false);

  const handleStartTask = (offer: typeof MOCK_OFFERS[0]) => {
    setActiveTask(offer);
    setFormData({ companyName: '', email: '', phone: '', gstin: '', pincode: '' });
    setSubmittedResult(null);
  };

  const handleFillDemoPerfect = () => {
    setFormData({
      companyName: 'FinTech Solutions Pvt Ltd',
      email: 'contact@fintech.co.in',
      phone: '+91 98765 43210',
      gstin: '27AABCU9603R1ZM',
      pincode: '400001',
    });
  };

  const handleFillDemoFlawed = () => {
    setFormData({
      companyName: 'FinTech',
      email: 'invalid-email-address',
      phone: '98765',
      gstin: 'INVALID_GST',
      pincode: '400',
    });
  };

  const handleSubmitDataFilling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTask) return;

    // Evaluate accuracy & mistake detection
    const mistakes: string[] = [];
    let accuracy = 100;

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      mistakes.push("Invalid email format (missing '@' or domain)");
      accuracy -= 25;
    }
    if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      mistakes.push('Phone number incomplete (less than 10 digits)');
      accuracy -= 25;
    }
    if (formData.gstin.length < 15) {
      mistakes.push('GSTIN format invalid (must be 15 alphanumeric characters)');
      accuracy -= 25;
    }
    if (formData.pincode.length !== 6) {
      mistakes.push('Pincode invalid (must be exactly 6 digits)');
      accuracy -= 25;
    }

    accuracy = Math.max(0, accuracy);

    const isVerified = accuracy === 100;
    const isPendingReview = accuracy >= 50 && accuracy < 100;

    setSubmittedResult({
      accuracy,
      mistakes,
      earnedPoints: isVerified ? activeTask.pointsReward : 0,
      status: isVerified ? 'verified' : isPendingReview ? 'pending' : 'rejected',
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">Micro-tasks &amp; Data Entry</h3>
        <p className="page-subtitle">
          Earn <strong>Nova Points (10 NP = ₹1)</strong> for ads, surveys, and data filling tasks. High accuracy ensures instant verification!
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
          <div
            key={offer.id}
            className="task-card"
            style={{
              borderColor: offer.isFeatured ? 'var(--p-300)' : 'var(--n-200)',
              background: offer.isFeatured ? 'var(--p-50)' : 'var(--n-50)',
            }}
          >
            <div className="task-card-header">
              <div style={{ flex: 1 }}>
                <div className="flex-gap-2" style={{ marginBottom: 'var(--sp-2)' }}>
                  {offer.isFeatured && <span className="badge badge-primary">Featured</span>}
                  <span className={`badge ${offer.source === 'in_house' ? 'badge-warning' : 'badge-info'}`}>
                    {offer.source === 'in_house' ? 'In-house' : 'Partner'}
                  </span>
                </div>
                <div className="task-card-title">{offer.title}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--p-600)', fontSize: 'var(--text-md)' }}>
                  {offer.pointsReward} NP
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--n-500)' }}>
                  ≈ {formatPointsWithInr(offer.pointsReward).split('(')[1].replace(')', '')}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'var(--sp-4)', display: 'flex', gap: 'var(--sp-3)' }}>
              <button
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
                onClick={() => handleStartTask(offer)}
              >
                {offer.categoryType === TASK_TYPES.DATA_ENTRY ? 'Start Data Filling' : 'Start Task'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Task Completion / Data Filling */}
      {activeTask && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <div>
                <span className="badge badge-primary" style={{ marginBottom: 'var(--sp-1)' }}>
                  {activeTask.pointsReward} NP Reward
                </span>
                <h5 className="modal-title">{activeTask.title}</h5>
              </div>
              <button className="modal-close" onClick={() => setActiveTask(null)}>✕</button>
            </div>

            <div className="modal-body">
              {!submittedResult ? (
                activeTask.categoryType === TASK_TYPES.DATA_ENTRY ? (
                  <form onSubmit={handleSubmitDataFilling} className="stack stack-4">
                    <div style={{ background: 'var(--n-100)', padding: 'var(--sp-3)', borderRadius: 'var(--radius-sm)' }}>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--n-600)' }}>
                        📋 <strong>Data Filling Guidelines:</strong> Fill all 5 fields accurately from the client invoice slip. Accuracy score will be evaluated upon submission. 100% accuracy gets instant auto-credit of <strong>{activeTask.pointsReward} NP</strong>.
                      </p>
                    </div>

                    <div className="flex-gap-2">
                      <button type="button" className="btn btn-ghost btn-sm" onClick={handleFillDemoPerfect}>
                        ⚡ Auto-Fill 100% Accurate Sample
                      </button>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={handleFillDemoFlawed} style={{ color: 'var(--w-500)' }}>
                        ⚠️ Auto-Fill Flawed Sample
                      </button>
                    </div>

                    <div className="input-group">
                      <label className="input-label">Company Name</label>
                      <input
                        type="text"
                        className="input"
                        placeholder="e.g. FinTech Solutions Pvt Ltd"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid-2">
                      <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <input
                          type="text"
                          className="input"
                          placeholder="contact@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Phone Number</label>
                        <input
                          type="text"
                          className="input"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid-2">
                      <div className="input-group">
                        <label className="input-label">GSTIN Number (15 digits)</label>
                        <input
                          type="text"
                          className="input"
                          placeholder="27AABCU9603R1ZM"
                          value={formData.gstin}
                          onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                          required
                        />
                      </div>
                      <div className="input-group">
                        <label className="input-label">PIN Code (6 digits)</label>
                        <input
                          type="text"
                          className="input"
                          placeholder="400001"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                      Submit &amp; Evaluate Accuracy
                    </button>
                  </form>
                ) : (
                  /* Standard Ad or Survey view */
                  <div className="stack stack-4" style={{ textAlign: 'center', padding: 'var(--sp-6) 0' }}>
                    <div style={{ fontSize: 'var(--text-4xl)' }}>▶️</div>
                    <h5>Watch Ad Video ({activeTask.pointsReward} NP)</h5>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)' }}>
                      Watch the complete 15-second sponsor campaign video to receive your Nova Points credit.
                    </p>
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={() => {
                        setSubmittedResult({
                          accuracy: 100,
                          mistakes: [],
                          earnedPoints: activeTask.pointsReward,
                          status: 'verified',
                        });
                      }}
                    >
                      Complete Ad View
                    </button>
                  </div>
                )
              ) : (
                /* Evaluation Result Screen */
                <div className="stack stack-4">
                  <div
                    className="card"
                    style={{
                      background: submittedResult.status === 'verified' ? 'var(--s-50)' : submittedResult.status === 'pending' ? 'var(--w-50)' : 'var(--d-50)',
                      borderColor: submittedResult.status === 'verified' ? 'var(--s-200)' : submittedResult.status === 'pending' ? 'var(--w-200)' : 'var(--d-200)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--sp-2)' }}>
                      {submittedResult.status === 'verified' ? '🎉' : submittedResult.status === 'pending' ? '⏳' : '❌'}
                    </div>
                    <h4>Accuracy Score: {submittedResult.accuracy}%</h4>
                    <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--sp-1)' }}>
                      {submittedResult.status === 'verified'
                        ? `Perfect submission! +${submittedResult.earnedPoints} Nova Points credited to your wallet.`
                        : submittedResult.status === 'pending'
                        ? 'Submission has errors and was routed to the Admin Review Queue for manual check.'
                        : 'Submission rejected due to multiple data errors. Please fix mistakes and re-submit.'}
                    </p>
                  </div>

                  {submittedResult.mistakes.length > 0 && (
                    <div className="card" style={{ background: 'var(--n-100)' }}>
                      <h6 style={{ color: 'var(--d-500)', marginBottom: 'var(--sp-2)' }}>
                        ⚠️ Mistakes Identified ({submittedResult.mistakes.length}):
                      </h6>
                      <ul className="stack stack-2" style={{ paddingLeft: 'var(--sp-4)', fontSize: 'var(--text-sm)', color: 'var(--n-700)' }}>
                        {submittedResult.mistakes.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex-gap-3">
                    <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setActiveTask(null)}>
                      Close
                    </button>
                    {submittedResult.status !== 'verified' && (
                      <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setSubmittedResult(null)}>
                        Try Again
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

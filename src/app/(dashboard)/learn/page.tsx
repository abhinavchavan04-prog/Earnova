'use client';

import { useAuth } from '@/features/auth';
import { TIERS } from '@/lib/constants';

const MOCK_CONTENT = [
  { id: '1', title: 'Print-on-Demand: Complete Guide to Earning on Etsy & Redbubble', type: 'guide', category: 'POD', unlockTier: TIERS.BASIC, isPublished: true, description: 'Step-by-step guide covering niche research, design creation, platform setup, SEO optimization, and scaling your POD business.' },
  { id: '2', title: 'Freelance Copywriting: From Zero to First Client', type: 'guide', category: 'Copywriting', unlockTier: TIERS.ADVANCED, isPublished: true, description: 'Learn how to write compelling copy, find clients, price your services, and build a portfolio without previous experience.' },
  { id: '3', title: 'Social Media Management: Building a Client-Ready Service', type: 'course', category: 'SMM', unlockTier: TIERS.ADVANCED, isPublished: true, description: 'Complete course on content strategy, scheduling tools, analytics reporting, and client management for social media managers.' },
  { id: '4', title: 'Data Labeling for AI: Understanding the Opportunity', type: 'guide', category: 'AI', unlockTier: TIERS.BASIC, isPublished: true, description: 'Overview of AI data labeling as an earning category — what it is, what platforms pay, and how to qualify for higher-paying tasks.' },
];

export default function LearnPage() {
  const { profile } = useAuth();
  const userTier = profile?.subscription?.tier;

  const canAccess = (contentTier: string) => {
    if (!userTier) return false;
    if (userTier === TIERS.ADVANCED || userTier === TIERS.ULTRA) return true;
    return contentTier === TIERS.BASIC;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h3 className="page-title">Learn &amp; Earn</h3>
        <p className="page-subtitle">
          Practical guides and courses on monetizable skills. Learn at your own pace, then apply what you know.
        </p>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        {MOCK_CONTENT.map((item) => {
          const locked = !canAccess(item.unlockTier);
          return (
            <div
              key={item.id}
              className="card"
              style={{ opacity: locked ? 0.6 : 1, position: 'relative' }}
            >
              {locked && (
                <div className="badge badge-warning" style={{ position: 'absolute', top: 'var(--sp-4)', right: 'var(--sp-4)' }}>
                  Pro only
                </div>
              )}
              <div className="flex-gap-2" style={{ marginBottom: 'var(--sp-3)' }}>
                <span className="badge badge-default">{item.type}</span>
                <span className="badge badge-default">{item.category}</span>
              </div>
              <h5 style={{ marginBottom: 'var(--sp-3)' }}>{item.title}</h5>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--n-600)', marginBottom: 'var(--sp-4)', lineHeight: 'var(--leading-relaxed)' }}>
                {item.description}
              </p>
              <button
                className={`btn ${locked ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                disabled={locked}
                style={{ width: '100%' }}
              >
                {locked ? 'Upgrade to Pro' : 'Start reading'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

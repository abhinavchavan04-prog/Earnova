import 'server-only';

import Razorpay from 'razorpay';

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder',
});

export const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'webhook_secret_placeholder';

// Subscription plan IDs — configure these in Razorpay Dashboard first
export const PLANS = {
  basic: {
    id: process.env.RAZORPAY_PLAN_BASIC_ID || 'plan_basic_placeholder',
    name: 'Basic',
    price: 99900, // in paise (₹999)
    interval: 'monthly' as const,
    features: [
      'Bucket 1 — Micro-tasks & Data Filling',
      'Nova Points Earning (10 NP = ₹1)',
      'Learn & Earn — Basic guides',
      'Standard payouts',
    ],
  },
  advanced: {
    id: process.env.RAZORPAY_PLAN_ADVANCED_ID || 'plan_advanced_placeholder',
    name: 'Advanced',
    price: 199900, // in paise (₹1,999)
    interval: 'monthly' as const,
    features: [
      'Everything in Basic',
      'Bucket 2 — All Freelance Agency Jobs',
      'Learn & Earn — All courses & guides',
      'Priority Payout Processing',
      'Priority Job Claiming',
    ],
  },
  ultra: {
    id: process.env.RAZORPAY_PLAN_ULTRA_ID || 'plan_ultra_placeholder',
    name: 'Ultra',
    price: 500000, // in paise (₹5,000)
    interval: 'monthly' as const,
    features: [
      'Everything in Advanced',
      'High-Ticket Client Project Access',
      'Dedicated Account Manager',
      'Instant Payout Approvals',
      'Custom Agency Support & Direct Leads',
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;

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
    price: 29900, // in paise (₹299)
    interval: 'monthly' as const,
    features: [
      'Bucket 1 — All micro-tasks',
      'Learn & Earn — Basic content',
      'In-platform wallet',
      'Standard payouts',
    ],
  },
  pro: {
    id: process.env.RAZORPAY_PLAN_PRO_ID || 'plan_pro_placeholder',
    name: 'Pro',
    price: 79900, // in paise (₹799)
    interval: 'monthly' as const,
    features: [
      'Everything in Basic',
      'Bucket 2 — All freelance jobs',
      'Learn & Earn — All content',
      'Priority payouts',
      'Priority job access',
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;

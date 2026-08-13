// App-wide constants

export const APP_NAME = 'Earnova';
export const APP_DESCRIPTION = 'One subscription. Real earning opportunities. Micro-tasks, freelance jobs, and skill guides — all in one dashboard.';

// User roles
export const ROLES = {
  SUBSCRIBER: 'subscriber',
  ADMIN: 'admin',
  OPS: 'ops',
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

// Subscription tiers
export const TIERS = {
  BASIC: 'basic',
  ADVANCED: 'advanced',
  ULTRA: 'ultra',
} as const;

export type SubscriptionTier = (typeof TIERS)[keyof typeof TIERS];

// Subscription status
export const SUB_STATUS = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  HALTED: 'halted',
  PENDING: 'pending',
  EXPIRED: 'expired',
} as const;

export type SubscriptionStatus = (typeof SUB_STATUS)[keyof typeof SUB_STATUS];

// Bucket 1 — Task categories
export const TASK_TYPES = {
  AD_WATCH: 'ad_watch',
  SURVEY: 'survey',
  DATA_ENTRY: 'data_entry',
  DATA_LABELING: 'data_labeling',
  SONG_REVIEW: 'song_review',
  DIGITAL_PRODUCT: 'digital_product',
} as const;

export type TaskType = (typeof TASK_TYPES)[keyof typeof TASK_TYPES];

// Bucket 1 — Task offer source
export const OFFER_SOURCES = {
  IN_HOUSE: 'in_house',
  AFFILIATE: 'affiliate',
} as const;

export type OfferSource = (typeof OFFER_SOURCES)[keyof typeof OFFER_SOURCES];

// Bucket 1 — Task completion status
export const TASK_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  PAID: 'paid',
} as const;

export type TaskCompletionStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

// Bucket 2 — Tracks
export const TRACKS = {
  A: 'A',
  B: 'B',
} as const;

export type Track = (typeof TRACKS)[keyof typeof TRACKS];

// Bucket 2 — Job categories
export const JOB_CATEGORIES = {
  GRAPHIC_DESIGN: 'graphic_design',
  WEB_DEV: 'web_dev',
  APP_DEV: 'app_dev',
  VA: 'virtual_assistant',
  COPYWRITING: 'copywriting',
  SMM: 'social_media',
  TRANSCRIPTION: 'transcription',
} as const;

export type JobCategory = (typeof JOB_CATEGORIES)[keyof typeof JOB_CATEGORIES];

// Bucket 2 — Job status
export const JOB_STATUS = {
  OPEN: 'open',
  CLAIMED: 'claimed',
  IN_REVIEW: 'in_review',
  DELIVERED: 'delivered',
  CLOSED: 'closed',
} as const;

export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];

// Bucket 2 — Assignment status
export const ASSIGNMENT_STATUS = {
  CLAIMED: 'claimed',
  SUBMITTED: 'submitted',
  REVISION: 'revision',
  APPROVED: 'approved',
  PAID: 'paid',
} as const;

export type AssignmentStatus = (typeof ASSIGNMENT_STATUS)[keyof typeof ASSIGNMENT_STATUS];

// Bucket 2 — Client status
export const CLIENT_STATUS = {
  LEAD: 'lead',
  ACTIVE: 'active',
  CLOSED: 'closed',
} as const;

export type ClientStatus = (typeof CLIENT_STATUS)[keyof typeof CLIENT_STATUS];

// Bucket 2 — Deliverable review status
export const REVIEW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export type ReviewStatus = (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS];

// Learn & Earn — Content type
export const CONTENT_TYPES = {
  GUIDE: 'guide',
  COURSE: 'course',
} as const;

export type ContentType = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];

// Wallet — Transaction types
export const TX_TYPES = {
  CREDIT: 'credit',
  DEBIT: 'debit',
} as const;

export type TransactionType = (typeof TX_TYPES)[keyof typeof TX_TYPES];

// Wallet — Transaction source
export const TX_SOURCES = {
  BUCKET1: 'bucket1',
  BUCKET2: 'bucket2',
  PAYOUT: 'payout',
  REFUND: 'refund',
} as const;

export type TransactionSource = (typeof TX_SOURCES)[keyof typeof TX_SOURCES];

// Payout methods
export const PAYOUT_METHODS = {
  UPI: 'upi',
  PAYPAL: 'paypal',
  BANK: 'bank',
} as const;

export type PayoutMethod = (typeof PAYOUT_METHODS)[keyof typeof PAYOUT_METHODS];

// Payout status
export const PAYOUT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  HELD: 'held',
} as const;

export type PayoutStatus = (typeof PAYOUT_STATUS)[keyof typeof PAYOUT_STATUS];

// KYC status
export const KYC_STATUS = {
  NOT_SUBMITTED: 'not_submitted',
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
} as const;

export type KycStatus = (typeof KYC_STATUS)[keyof typeof KYC_STATUS];

// Payout threshold (in paise)
export const MIN_PAYOUT_AMOUNT = 50000; // ₹500

// Default platform margin for Bucket 2
export const DEFAULT_PLATFORM_MARGIN_PERCENT = 30;

// Currency & Points formatting
export const CURRENCY = {
  code: 'INR',
  symbol: '₹',
  locale: 'en-IN',
};

// Points system: 10 Nova Points = ₹1.00 (100 paise)
export const POINTS_CONFIG = {
  name: 'Nova Points',
  symbol: 'NP',
  pointsPerRupee: 10, // 10 NP = ₹1
};


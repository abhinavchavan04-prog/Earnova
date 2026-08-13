import {
  UserRole,
  SubscriptionTier,
  SubscriptionStatus,
  TaskType,
  OfferSource,
  TaskCompletionStatus,
  Track,
  JobCategory,
  JobStatus,
  AssignmentStatus,
  ClientStatus,
  ReviewStatus,
  ContentType,
  TransactionType,
  TransactionSource,
  PayoutMethod,
  PayoutStatus,
  KycStatus,
} from '@/lib/constants';

// ============================================================
// USER
// ============================================================

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  role: UserRole;
  subscription: {
    status: SubscriptionStatus;
    tier: SubscriptionTier | null;
    planId: string | null;
    razorpaySubId: string | null;
    startDate: string | null;
    renewalDate: string | null;
  };
  wallet: {
    balance: number; // in paise
    totalEarned: number;
  };
  profile: {
    skills: string[];
    categories: JobCategory[];
    kycStatus: KycStatus;
  };
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// BUCKET 1 — Tasks
// ============================================================

export interface TaskCategory {
  id: string;
  name: string;
  type: TaskType;
  description: string;
  iconUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface TaskOffer {
  id: string;
  categoryId: string;
  source: OfferSource;
  title: string;
  description: string;
  payoutAmount: number; // in paise
  pointsReward: number; // in Nova Points (10 NP = ₹1)
  externalOfferId?: string;
  partnerUrl?: string;
  partnerId?: string;
  isActive: boolean;
  isVisible: boolean; // Admin show/hide toggle
  isFeatured?: boolean; // Highlighted offer
  createdAt: string;
}

export interface TaskCompletion {
  id: string;
  userId: string;
  userName?: string;
  offerId: string;
  categoryId: string;
  status: TaskCompletionStatus;
  evidence?: string; // URL or text for manual review
  submittedData?: Record<string, string>; // Form/data entry submitted key-values
  accuracyScore?: number; // 0-100 percentage accuracy
  mistakesFound?: string[]; // Specific errors identified (e.g. "Missing area code", "Invalid GST number")
  rejectionReason?: string;
  completedAt: string;
  verifiedAt?: string;
}

// ============================================================
// BUCKET 1 — Ad Network Partners
// ============================================================

export interface AdNetworkPartner {
  id: string;
  name: string;
  apiKey?: string;
  postbackSecret: string;
  status: 'active' | 'inactive' | 'testing';
  integrationNotes?: string;
  totalOffers: number;
  totalPayouts: number; // in paise
  lastPostbackAt?: string;
  createdAt: string;
}

// ============================================================
// BUCKET 2 — Clients & Jobs
// ============================================================

export interface Client {
  id: string;
  name: string;
  contactInfo: {
    email?: string;
    phone?: string;
    company?: string;
  };
  track: Track;
  category: JobCategory;
  status: ClientStatus;
  sourceOwner?: string; // BD owner
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  clientId: string;
  clientName?: string; // denormalized for display
  category: JobCategory;
  track: Track;
  title: string;
  brief: string;
  budget: number; // in paise
  deadline: string;
  attachments: string[]; // URLs
  status: JobStatus;
  platformMarginPercent: number;
  assignedTo?: string; // userId
  assignedToName?: string; // denormalized
  createdAt: string;
  updatedAt: string;
}

export interface JobAssignment {
  id: string;
  jobId: string;
  userId: string;
  userName?: string;
  status: AssignmentStatus;
  claimedAt: string;
  submittedAt?: string;
  reviewedAt?: string;
}

export interface Deliverable {
  id: string;
  jobAssignmentId: string;
  jobId: string;
  userId: string;
  fileUrls: string[];
  content?: string;
  notes?: string;
  reviewStatus: ReviewStatus;
  reviewerId?: string;
  reviewNotes?: string;
  submittedAt: string;
  reviewedAt?: string;
}

// ============================================================
// LEARN & EARN
// ============================================================

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  category: string;
  body: string; // markdown
  thumbnailUrl?: string;
  isPaid: boolean;
  unlockTier: SubscriptionTier;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// WALLET & PAYOUTS
// ============================================================

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number; // in paise
  source: TransactionSource;
  referenceId: string;
  referenceType: string;
  description?: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

export interface PayoutRequest {
  id: string;
  userId: string;
  userName?: string;
  amount: number; // in paise
  method: PayoutMethod;
  accountDetails: string; // UPI ID, PayPal email, or bank details (encrypted in production)
  status: PayoutStatus;
  processedBy?: string; // admin userId
  processedAt?: string;
  holdReason?: string;
  createdAt: string;
}

// ============================================================
// ADMIN
// ============================================================

export interface AuditLogEntry {
  id: string;
  adminId: string;
  adminName?: string;
  action: string;
  targetType: string;
  targetId: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface SubscriptionEvent {
  id: string;
  userId: string;
  event: string;
  razorpayPaymentId?: string;
  amount: number;
  timestamp: string;
}

// ============================================================
// UI / Component Props
// ============================================================

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
}

import { CURRENCY, POINTS_CONFIG } from '@/lib/constants';

/**
 * Format a number in paise to a readable INR string.
 * formatCurrency(79900) → "₹799.00"
 * formatCurrency(79900, false) → "₹799"
 */
export function formatCurrency(paise: number, showDecimals = true): string {
  const amount = paise / 100;
  if (showDecimals) {
    return new Intl.NumberFormat(CURRENCY.locale, {
      style: 'currency',
      currency: CURRENCY.code,
      minimumFractionDigits: 2,
    }).format(amount);
  }
  return `${CURRENCY.symbol}${new Intl.NumberFormat(CURRENCY.locale).format(Math.floor(amount))}`;
}

/**
 * Convert paise (100 paise = ₹1) to Nova Points (10 NP = ₹1).
 * paiseToPoints(2500) → 250 NP (since ₹25 = 250 NP)
 */
export function paiseToPoints(paise: number): number {
  const rupees = paise / 100;
  return Math.round(rupees * POINTS_CONFIG.pointsPerRupee);
}

/**
 * Convert Nova Points to paise.
 * pointsToPaise(250) → 2500 paise (₹25)
 */
export function pointsToPaise(points: number): number {
  const rupees = points / POINTS_CONFIG.pointsPerRupee;
  return Math.round(rupees * 100);
}

/**
 * Format Nova Points.
 * formatPoints(250) → "250 NP"
 */
export function formatPoints(points: number): string {
  return `${new Intl.NumberFormat().format(points)} ${POINTS_CONFIG.symbol}`;
}

/**
 * Format Nova Points with INR equivalent.
 * formatPointsWithInr(250) → "250 NP (≈ ₹25)"
 */
export function formatPointsWithInr(points: number): string {
  const rupees = points / POINTS_CONFIG.pointsPerRupee;
  const inrStr = formatCurrency(rupees * 100, false);
  return `${new Intl.NumberFormat().format(points)} ${POINTS_CONFIG.symbol} (≈ ${inrStr})`;
}

/**
 * Format a date string to a human-readable format.
 * formatDate('2026-08-13T12:00:00Z') → "Aug 13, 2026"
 */
export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateStr));
}

/**
 * Format a date string to include time.
 * formatDateTime('2026-08-13T12:00:00Z') → "Aug 13, 2026, 5:30 PM"
 */
export function formatDateTime(dateStr: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(dateStr));
}

/**
 * Relative time string.
 * timeAgo('2026-08-13T12:00:00Z') → "2 hours ago"
 */
export function timeAgo(dateStr: string): string {
  const now = Date.now();
  const past = new Date(dateStr).getTime();
  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 30) return formatDate(dateStr);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}

/**
 * Truncate a string to a max length with ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 1) + '…';
}

/**
 * Generate initials from a name.
 * getInitials("Abhinav Kumar") → "AK"
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Capitalize first letter.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert a status slug to a readable label.
 * statusLabel('in_review') → "In Review"
 */
export function statusLabel(status: string): string {
  return status
    .split('_')
    .map((w) => capitalize(w))
    .join(' ');
}

/**
 * Generate a unique ID (client-side fallback, Firestore auto-generates IDs on server).
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

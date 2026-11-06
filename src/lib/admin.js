import { BUSINESSES } from '../data/businesses.js';

export const STATUS = {
  received: ['Application Received', 'info'],
  correction: ['Correction requested', 'closing'],
  approved: ['SCCN Enterprise Member', 'open'],
  declined: ['Declined', 'red'],
  expired: ['Expired', 'closed'],
};
export const PAY = { verified: ['Verified', 'open'], pending: ['Pending webhook', 'closing'], failed: ['Failed', 'closed'], unpaid: ['Unpaid', 'closed'], refunded: ['Refunded', 'dark'] };

/** Registry rows = live applications + existing catalogue members not represented by an application. */
export function registryRows(apps) {
  const appNames = new Set(apps.map((a) => a.business));
  const members = BUSINESSES.filter((b) => !appNames.has(b.name)).map((b) => ({
    id: b.no, business: b.name, founder: '[Founder]', inst: b.inst, sector: b.cat, state: b.state, stage: '—',
    status: b.no.startsWith('SCCN-25') ? 'expired' : 'approved', readiness: b.featured ? 'Opportunity-Ready for a Specific Call' : 'Developing',
    payment: { status: 'verified' }, no: b.no, published: true, member: true, submittedAt: '2026-09-01', featured: b.featured, reviewed: b.reviewed,
  }));
  return [...apps, ...members];
}

export const fmtDT = (iso) => (iso ? new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—');
export const ago = (iso) => {
  if (!iso) return '—';
  const d = Math.floor((Date.now() - new Date(iso)) / 864e5);
  return d <= 0 ? 'Today' : d === 1 ? 'Yesterday' : d < 30 ? `${d} days ago` : new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

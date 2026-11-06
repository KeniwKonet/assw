/**
 * Mock data layer for the MVP front end.
 * Everything here persists to localStorage so flows work end-to-end in the browser.
 * Replace each exported function with a call to the real API (see README → "Backend handoff").
 * NOTE: payment confirmation must happen server-side via gateway webhooks in production.
 */
import { useSyncExternalStore } from 'react';
import { BUSINESSES } from '../data/businesses.js';

const KEY = 'assw-mvp-v1';
const listeners = new Set();

const now = () => new Date().toISOString();
const rand = (n = 8) => Array.from({ length: n }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');

const SEED_APPS = [
  { id: 'APP-26-01988', business: 'Thread & Ankara', founder: 'Kemi Adebayo', email: 'kemi@example.com', inst: 'UNILAG', sector: 'Fashion & clothing', state: 'Lagos', stage: 'Revenue-generating', status: 'received', readiness: '', payment: { ref: 'SCCN-TX-4M7N2B8C', status: 'verified', gateway: 'Paystack', at: '2026-10-31T10:16:00+01:00' }, no: null, published: false, consentCatalogue: true, consentReferral: false, submittedAt: '2026-10-31T10:14:00+01:00', description: 'Made-to-measure ankara pieces and small-batch ready-to-wear for students and young professionals.', log: [['Application submitted', 'Kemi Adebayo', '2026-10-31T10:14:00+01:00'], ['Payment verified by webhook', 'System', '2026-10-31T10:16:00+01:00'], ['Duplicate check passed', 'System', '2026-10-31T10:16:00+01:00']] },
  { id: 'APP-26-02011', business: 'Farm Ledger NG', founder: 'Seyi Fashola', email: 'seyi@example.com', inst: 'FUTA', sector: 'Agriculture & agribusiness', state: 'Ondo', stage: 'Proof of concept', status: 'received', readiness: '', duplicateOf: 'FarmLedger', payment: { ref: 'SCCN-TX-9QX24LRT', status: 'pending', gateway: 'Paystack', at: null }, no: null, published: false, consentCatalogue: true, consentReferral: true, submittedAt: '2026-11-04T09:00:00+01:00', description: 'Record-keeping app for poultry farmers.', log: [['Application submitted', 'Seyi Fashola', '2026-11-04T09:00:00+01:00']] },
  { id: 'APP-26-01954', business: 'Glow Botanics', founder: 'Funmi Ojo', email: 'funmi@example.com', inst: 'UI, Ibadan', sector: 'Beauty & cosmetics', state: 'Oyo', stage: 'Early-stage', status: 'received', readiness: '', payment: { ref: 'SCCN-TX-2P8L1R0A', status: 'failed', gateway: 'Flutterwave', at: '2026-11-02T09:10:00+01:00' }, no: null, published: false, consentCatalogue: true, consentReferral: false, submittedAt: '2026-11-02T09:05:00+01:00', description: 'Shea-based skincare in small batches.', log: [['Application submitted', 'Funmi Ojo', '2026-11-02T09:05:00+01:00'], ['Payment failed at provider', 'System', '2026-11-02T09:10:00+01:00']] },
  { id: 'APP-26-01932', business: 'Ìrẹ̀sí Kitchen', founder: 'Adaeze Okafor', email: 'founder@example.com', inst: 'AFUED, Ondo', sector: 'Food & catering', state: 'Ondo', stage: 'Revenue-generating', status: 'approved', readiness: 'Application Preparation', payment: { ref: 'SCCN-TX-7F3K9Q2M', status: 'verified', gateway: 'Paystack', at: '2026-10-06T13:42:00+01:00' }, no: 'SCCN-26-00148', issuedAt: '2026-10-12', published: false, consentCatalogue: true, consentReferral: false, submittedAt: '2026-10-06T13:30:00+01:00', description: 'Home-style Nigerian rice dishes and event trays for campus societies, departmental events and family gatherings in Ondo.', log: [['Application submitted', 'Adaeze Okafor', '2026-10-06T13:30:00+01:00'], ['Payment verified by webhook', 'System', '2026-10-06T13:42:00+01:00'], ['Approved — SCCN-26-00148 issued', 'Tunde A. (Reviewer)', '2026-10-12T10:00:00+01:00']] },
];

const initial = () => ({ session: null, draft: null, apps: SEED_APPS, enquiries: [], seq: 149 });

let state = load();
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...initial(), ...JSON.parse(raw) } : initial();
  } catch {
    return initial();
  }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode: keep in memory */ }
}
function set(patch) {
  state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) };
  save();
  listeners.forEach((l) => l());
}
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };

export function useStore(selector) {
  return useSyncExternalStore(subscribe, () => selector(state), () => selector(state));
}
export const useSession = () => useStore((s) => s.session);
export const useApps = () => useStore((s) => s.apps);
export const useDraft = () => useStore((s) => s.draft);

/* ---------- auth ---------- */
export function signIn(email, name) {
  const role = /admin|staff/i.test(email) ? 'admin' : (state.apps.some((a) => a.email === email) || /founder/i.test(email) ? 'founder' : 'member');
  const app = state.apps.find((a) => a.email === email);
  set({ session: { email, name: name || app?.founder || email.split('@')[0], role } });
  return role;
}
export function signUp({ first, last, email, path }) {
  set({ session: { email, name: `${first} ${last}`.trim(), role: path === 'founder' ? 'founder' : 'member' } });
}
export const signOut = () => set({ session: null });

/* ---------- application ---------- */
export const saveDraft = (draft) => set({ draft: { ...draft, savedAt: now() } });

export function submitApplication(d) {
  const id = 'APP-26-0' + (2100 + state.apps.length);
  const app = {
    id, business: d.bizName, founder: d.fullName, email: d.email || state.session?.email || '', inst: d.institution, sector: d.sector, state: d.state,
    stage: d.stage, status: 'received', readiness: '', payment: { ref: null, status: 'unpaid' }, no: null, published: false,
    consentCatalogue: !!d.cCatalogue, consentReferral: !!d.cReferral, submittedAt: now(), description: d.description, log: [['Application submitted', d.fullName || 'Applicant', now()]],
  };
  set((s) => ({ apps: [app, ...s.apps], draft: null }));
  return id;
}

export function getMyApp() {
  const email = state.session?.email;
  return state.apps.find((a) => a.email && a.email === email) || null;
}
export const useMyApp = () => useStore((s) => s.apps.find((a) => a.email && a.email === s.session?.email) || null);

/* ---------- payments (mock gateway) ---------- */
export function startPayment(appId, gateway) {
  const app = state.apps.find((a) => a.id === appId);
  if (app && app.payment.status === 'verified') return { duplicate: true, ref: app.payment.ref };
  const ref = 'SCCN-TX-' + rand();
  updateApp(appId, { payment: { ref, status: 'pending', gateway, at: null } });
  return { ref };
}
/** Simulates the webhook. outcome: 'verified' | 'failed' */
export function confirmPayment(appId, outcome) {
  const app = state.apps.find((a) => a.id === appId);
  if (!app) return;
  updateApp(appId, { payment: { ...app.payment, status: outcome, at: now() } }, outcome === 'verified' ? 'Payment verified by webhook' : 'Payment failed at provider', 'System');
}

/* ---------- admin ---------- */
export function updateApp(id, patch, logText, who = 'Admin') {
  set((s) => ({ apps: s.apps.map((a) => (a.id === id ? { ...a, ...patch, log: logText ? [...a.log, [logText, who, now()]] : a.log } : a)) }));
}
export function decide(id, decision, reason, readiness) {
  if (decision === 'approve') {
    const seq = state.seq + 1;
    const no = 'SCCN-26-' + String(seq).padStart(5, '0');
    set({ seq });
    updateApp(id, { status: 'approved', no, issuedAt: now().slice(0, 10), readiness }, `Approved — ${no} issued${reason ? ' · ' + reason : ''}`, 'Reviewer');
    return no;
  }
  updateApp(id, { status: decision === 'correct' ? 'correction' : 'declined', reason, readiness }, (decision === 'correct' ? 'Correction requested: ' : 'Declined: ') + reason, 'Reviewer');
  return null;
}
export function setPublished(id, published) {
  updateApp(id, { published }, published ? 'Founder confirmed listing — published' : 'Listing unpublished by founder', 'Founder');
}

/* ---------- enquiries ---------- */
export function recordEnquiry(kind, data) {
  const ref = kind.slice(0, 3).toUpperCase() + '-' + Math.floor(10000 + Math.random() * 89999);
  set((s) => ({ enquiries: [{ ref, kind, data, at: now() }, ...s.enquiries] }));
  return ref;
}

/* ---------- verification ---------- */
export function verifyNumber(input) {
  const no = input.trim().toUpperCase();
  const app = state.apps.find((a) => a.no === no);
  if (app) return { status: 'active', business: app.business, no, issued: app.issuedAt, slug: null };
  const biz = BUSINESSES.find((b) => b.no === no);
  if (!biz) return { status: 'none', no };
  if (no.startsWith('SCCN-25')) return { status: 'expired', business: biz.name, no };
  return { status: 'active', business: biz.name, no, issued: '2026-10-12', slug: biz.slug };
}

export function resetDemo() { state = initial(); save(); listeners.forEach((l) => l()); }

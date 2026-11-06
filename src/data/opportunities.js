// Sample Opportunity Desk listings. In production these come from the CMS/API with verification metadata.
// Status is derived from the deadline so an expired call is never shown as open.
export const OPP_TYPES = ['Grant', 'Equity-free funding', 'Competition', 'Accelerator', 'Loan', 'Internship / job', 'Procurement', 'Training', 'Scholarship', 'Pitch event', 'Mentorship', 'Market access'];

export const OPPORTUNITIES = [
  { slug: 'student-venture-funding-call', type: 'Equity-free funding', sector: 'Any sector', provider: '[Provider name]', title: 'Student Venture Funding Call', desc: 'Funding support for student-led ventures that can show a working product or service. Applicants are typically asked to demonstrate institutional status, business formalisation, proof of concept and a strong written application with supporting documents.', target: 'Student founders enrolled in a recognised tertiary institution.', elig: 'Enrolled student; formalised venture (e.g. CAC registration); evidence of proof of concept.', benefit: null, location: 'Nigeria · online application', deadline: '2026-11-28T23:59:00+01:00', verified: '2026-11-04', docs: 'Proof of studentship · CAC certificate · pitch deck · budget · evidence of traction', stage: ['Proof of concept', 'Revenue-generating'] },
  { slug: 'boosther', type: 'Training', sector: 'Women-led', provider: 'She Leads Africa × ASSW', title: 'BoostHer — women entrepreneurs & job-seekers', desc: 'Six-month mobilisation and delivery programme for young Nigerian women entrepreneurs and job-seekers. Final details to be confirmed before publication.', target: 'Young Nigerian women', elig: 'Young Nigerian women entrepreneurs and job-seekers.', benefit: 'Training & support', location: 'Nigeria', deadline: null, verified: '2026-11-02', docs: 'See provider page', stage: [] },
  { slug: 'campus-pitch-challenge-2026', type: 'Competition', sector: 'Technology', provider: '[Provider name]', title: 'Campus Pitch Challenge 2026', desc: 'Pitch competition for student founders with an early product or service.', target: 'Student founders', elig: 'Early-stage ventures from any institution.', benefit: null, location: 'Lagos & online', deadline: '2026-12-12T17:00:00+01:00', verified: '2026-11-01', docs: 'Pitch deck · 2-minute video', stage: ['Early-stage', 'Proof of concept'] },
  { slug: 'year-end-campus-fair', type: 'Market access', sector: 'Retail & food', provider: '[Provider name]', title: 'Vendor call — year-end campus fair', desc: 'Stand space for student businesses selling consumer goods.', target: 'Consumer businesses', elig: 'Revenue-generating student businesses.', benefit: 'Exhibition stand', location: 'Abuja', deadline: '2026-11-20T12:00:00+01:00', verified: '2026-10-30', docs: 'Product photos', stage: ['Revenue-generating'] },
  { slug: 'agri-youth-accelerator-3', type: 'Accelerator', sector: 'Agribusiness', provider: '[Provider name]', title: 'Agri-youth accelerator, cohort 3', desc: 'Twelve-week accelerator for agribusiness ventures.', target: 'Agribusiness founders', elig: 'Proof of concept or later.', benefit: 'Mentoring & demo day', location: 'Hybrid', deadline: '2027-01-15T23:59:00+01:00', verified: '2026-10-28', docs: 'Application form · deck', stage: ['Proof of concept', 'Growth-stage'] },
  { slug: 'youth-enterprise-micro-grant-2026', type: 'Grant', sector: 'Any sector', provider: '[Provider name]', title: 'Youth enterprise micro-grant 2026', desc: 'Closed call kept for reference and outcome tracking.', target: 'Young entrepreneurs', elig: 'Ages 18–35.', benefit: null, location: 'Nigeria', deadline: '2026-09-30T23:59:00+01:00', verified: '2026-10-01', docs: '—', stage: [] },
  { slug: 'graduate-digital-internship', type: 'Internship / job', sector: 'Digital', provider: '[Provider name]', title: 'Graduate digital internship', desc: 'Closed call kept for reference.', target: 'Final-year students & graduates', elig: 'Final-year students and recent graduates.', benefit: 'Paid internship', location: 'Lagos', deadline: '2026-10-15T17:00:00+01:00', verified: '2026-10-16', docs: 'CV', stage: [] },
];

const DAY = 864e5;
export function oppStatus(o, now = new Date()) {
  if (!o.deadline) return { key: 'open', label: 'Open', tone: 'open', days: null };
  const d = new Date(o.deadline);
  const days = Math.ceil((d - now) / DAY);
  if (days < 0) return { key: 'closed', label: 'Closed', tone: 'closed', days };
  if (days <= 21) return { key: 'closing', label: 'Closing soon', tone: 'closing', days };
  return { key: 'open', label: 'Open', tone: 'open', days };
}

export function fmtDeadline(o) {
  if (!o.deadline) return 'Rolling';
  const d = new Date(o.deadline);
  const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Africa/Lagos' });
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' });
  return `${date} · ${time} WAT`;
}

export const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
export const getOpportunity = (slug) => OPPORTUNITIES.find((o) => o.slug === slug);

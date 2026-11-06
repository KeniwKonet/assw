// Set VITE_SITE_URL to the official production domain before building (see .env.example).
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://asswnigeria.org').replace(/\/$/, '');
export const SITE_NAME = 'ASSW Nigeria';
export const DEFAULT_DESCRIPTION =
  'ASSW Nigeria advances student welfare and youth development through enterprise, employability, mentorship, leadership and access to opportunity. Home of the Students Chamber of Commerce Nigeria (SCCN).';
export const DEFAULT_IMAGE = '/brand/og-default.png';
export const TWITTER = ''; // ASSW has no confirmed X/Twitter handle yet

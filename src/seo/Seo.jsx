/**
 * Per-page SEO. On the server (prerender) tags are collected into a context; in the browser they
 * are applied to <head> on navigation so titles, canonicals and social tags stay correct in the SPA.
 */
import { createContext, useContext, useEffect } from 'react';
import { SITE_URL, SITE_NAME, DEFAULT_IMAGE, DEFAULT_DESCRIPTION, TWITTER } from './config.js';

const SeoContext = createContext(null);
export const SeoProvider = SeoContext.Provider;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function buildHead({ title, description = DEFAULT_DESCRIPTION, path = '/', image = DEFAULT_IMAGE, type = 'website', noindex = false, jsonLd = [] }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Empowering students, building the future`;
  const url = SITE_URL + (path === '/' ? '/' : path.replace(/\/$/, ''));
  const img = image.startsWith('http') ? image : SITE_URL + image;
  const meta = [
    ['name', 'description', description],
    ['name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'],
    ['property', 'og:site_name', SITE_NAME],
    ['property', 'og:type', type],
    ['property', 'og:title', fullTitle],
    ['property', 'og:description', description],
    ['property', 'og:url', url],
    ['property', 'og:image', img],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['property', 'og:locale', 'en_GB'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', fullTitle],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', img],
    ...(TWITTER ? [['name', 'twitter:site', TWITTER]] : []),
  ];
  return { fullTitle, url, meta, jsonLd: [].concat(jsonLd).filter(Boolean), noindex };
}

export function headToHtml(h) {
  return [
    `<title>${esc(h.fullTitle)}</title>`,
    ...h.meta.map(([a, k, v]) => `<meta ${a}="${k}" content="${esc(v)}" data-seo />`),
    h.noindex ? '' : `<link rel="canonical" href="${esc(h.url)}" data-seo />`,
    ...h.jsonLd.map((j) => `<script type="application/ld+json" data-seo>${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ');
}

function applyToDocument(h) {
  document.title = h.fullTitle;
  document.head.querySelectorAll('[data-seo]').forEach((n) => n.remove());
  const frag = document.createRange().createContextualFragment(headToHtml(h).replace(/<title>.*?<\/title>/, ''));
  document.head.appendChild(frag);
}

export default function Seo(props) {
  const collector = useContext(SeoContext);
  const head = buildHead(props);
  if (collector) collector.head = head; // server render: last <Seo> rendered wins (page-level)
  const key = JSON.stringify(head);
  useEffect(() => { applyToDocument(head); }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

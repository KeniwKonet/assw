// Server entry used only at build time to prerender public pages to static HTML (see scripts/prerender.mjs).
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import { SeoProvider, buildHead, headToHtml } from './seo/Seo.jsx';
import { SITE_URL } from './seo/config.js';
import { BUSINESSES } from './data/businesses.js';
import { OPPORTUNITIES, oppStatus } from './data/opportunities.js';

export function render(url) {
  const collector = {};
  const html = renderToString(
    <SeoProvider value={collector}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </SeoProvider>,
  );
  const head = collector.head || buildHead({});
  return { html, head: headToHtml(head), noindex: head.noindex };
}

const STATIC = [
  ['/', 1.0, 'weekly'], ['/about', 0.8, 'monthly'], ['/what-we-do', 0.8, 'monthly'], ['/sccn', 0.9, 'monthly'], ['/catalogue', 0.9, 'daily'],
  ['/register-business', 0.9, 'monthly'], ['/membership', 0.7, 'monthly'], ['/opportunities', 0.9, 'daily'], ['/programmes', 0.8, 'weekly'],
  ['/impact', 0.7, 'monthly'], ['/get-involved', 0.7, 'monthly'], ['/news', 0.7, 'weekly'], ['/contact', 0.6, 'yearly'], ['/verify', 0.4, 'yearly'],
  ['/policies/privacy', 0.2, 'yearly'], ['/policies/terms', 0.2, 'yearly'], ['/policies/listing-terms', 0.2, 'yearly'], ['/policies/cookies', 0.2, 'yearly'],
];

/** Every public URL to prerender, with sitemap hints. */
export function routes() {
  return [
    ...STATIC.map(([path, priority, changefreq]) => ({ path, priority, changefreq })),
    ...BUSINESSES.map((b) => ({ path: '/catalogue/' + b.slug, priority: 0.6, changefreq: 'monthly' })),
    ...OPPORTUNITIES.map((o) => ({ path: '/opportunities/' + o.slug, priority: oppStatus(o).key === 'closed' ? 0.1 : 0.7, changefreq: 'weekly', lastmod: o.verified })),
  ];
}

export { SITE_URL };

// Prerenders public routes into dist/ as static HTML, then writes sitemap.xml and robots.txt.
// Runs after `vite build` and the SSR build (see package.json "build").
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render, routes, SITE_URL } = await import(path.join(root, 'dist-ssr', 'entry-server.js'));

if (!process.env.VITE_SITE_URL) console.warn(`\n⚠  VITE_SITE_URL not set — canonical URLs and sitemap use the placeholder ${SITE_URL}. Set it to the official domain before deploying.\n`);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--seo-->') || !template.includes('<div id="root"></div>')) throw new Error('index.html is missing the <!--seo--> markers or empty #root');

const page = (html, head) => template
  .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, `<!--seo-->\n    ${head}\n    <!--/seo-->`)
  .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

const today = new Date().toISOString().slice(0, 10);
const indexed = [];
for (const r of routes()) {
  const { html, head, noindex } = render(r.path);
  const out = r.path === '/' ? path.join(dist, 'index.html') : path.join(dist, r.path.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(html, head));
  if (!noindex) indexed.push(r);
}
const nf = render('/__not-found__');
fs.writeFileSync(path.join(dist, '404.html'), page(nf.html, nf.head));

// Fallback shell for client-only routes (portal/admin): never indexed.
fs.writeFileSync(path.join(dist, 'app.html'), template.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, '<title>ASSW Nigeria</title>\n    <meta name="robots" content="noindex, nofollow" />'));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexed.map((r) => `  <url><loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc><lastmod>${r.lastmod || today}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority.toFixed(1)}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /admin
Disallow: /portal/
Disallow: /auth
Disallow: /apply
Disallow: /payment
Disallow: /certificate/
Disallow: /style-guide

Sitemap: ${SITE_URL}/sitemap.xml
`);

console.log(`Prerendered ${routes().length} pages (${indexed.length} in sitemap) + 404.html, robots.txt, sitemap.xml`);

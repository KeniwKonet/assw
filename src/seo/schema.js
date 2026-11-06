// schema.org JSON-LD builders. Only facts already published on the site are used.
import { SITE_URL } from './config.js';
import { SITE } from '../data/site.js';

const ORG_ID = SITE_URL + '/#organization';
const SCCN_ID = SITE_URL + '/sccn#organization';

export const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'NGO',
  '@id': ORG_ID,
  name: SITE.name,
  alternateName: ['ASSW Nigeria', 'ASSW'],
  url: SITE_URL + '/',
  logo: SITE_URL + '/brand/assw-logo-full.png',
  email: SITE.email,
  foundingDate: '2017',
  slogan: SITE.motto,
  description: SITE.shortDescription,
  address: { '@type': 'PostalAddress', streetAddress: SITE.address[0], addressLocality: 'Maitama, Abuja', addressCountry: 'NG' },
  areaServed: { '@type': 'Country', name: 'Nigeria' },
  subOrganization: { '@id': SCCN_ID },
  // TODO: add sameAs with confirmed social profile URLs
});

export const website = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_URL + '/#website',
  url: SITE_URL + '/',
  name: 'ASSW Nigeria',
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-GB',
  potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: SITE_URL + '/catalogue?q={search_term_string}' }, 'query-input': 'required name=search_term_string' },
});

export const sccn = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': SCCN_ID,
  name: 'Students Chamber of Commerce Nigeria',
  alternateName: 'SCCN',
  url: SITE_URL + '/sccn',
  description: SITE.sccnDescription,
  parentOrganization: { '@id': ORG_ID },
});

export const breadcrumbs = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE_URL + path })),
});

export const localBusiness = (b) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/catalogue/${b.slug}#business`,
  name: b.name,
  description: b.desc,
  url: `${SITE_URL}/catalogue/${b.slug}`,
  foundingDate: String(b.since),
  areaServed: b.area,
  address: { '@type': 'PostalAddress', addressLocality: b.city, addressRegion: b.state, addressCountry: 'NG' },
  memberOf: { '@id': SCCN_ID },
  makesOffer: b.products.map(([name, description]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, description } })),
});

export const itemList = (name, items) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE_URL + it.path, name: it.name })),
});

export const events = (list) => list.map((e) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: e.t,
  startDate: e.date,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: e.where === 'Online' ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
  location: e.where === 'Online' ? { '@type': 'VirtualLocation', url: SITE_URL + '/programmes?tab=events' } : { '@type': 'Place', name: e.where, address: { '@type': 'PostalAddress', addressLocality: e.where, addressCountry: 'NG' } },
  organizer: { '@id': ORG_ID },
}));

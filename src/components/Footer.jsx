import { Link } from 'react-router-dom';
import { SITE } from '../data/site.js';

const cols = [
  ['About', [['/about', 'Who we are'], ['/about#story', 'Our story'], ['/about#leadership', 'Leadership & governance'], ['/impact', 'Accountability & impact'], ['/news?t=Media', 'Media / press']]],
  ['SCCN', [['/sccn', 'About SCCN'], ['/catalogue', 'Explore the Catalogue'], ['/register-business', 'Register Your Business'], ['/opportunities', 'Find Opportunities'], ['/membership', 'Membership'], ['/verify', 'Verify a certificate']]],
];

export default function Footer() {
  return (
    <footer className="dark foot" style={{ padding: '80px 0 32px' }}>
      <div className="wrap col g56">
        <div className="ag" style={{ '--min': '200px', '--gap': '40px' }}>
          <div className="col g18" style={{ gridColumn: 'span 2', minWidth: 0 }}>
            <Link to="/" aria-label="ASSW Nigeria home"><img src="/brand/assw-logo-full-white.png" alt="Association for Students’ Social Welfare Nigeria" style={{ height: 120, width: 'auto' }} /></Link>
            <p style={{ color: 'var(--muted-d)', maxWidth: 380, fontSize: 15 }}>{SITE.shortDescription}</p>
            <p style={{ font: '600 18px/1.3 var(--f-d)' }}>{SITE.motto}</p>
          </div>
          {cols.map(([h, links]) => (
            <div className="col" key={h}>
              <span className="kicker" style={{ marginBottom: 14, fontSize: 12 }}>{h}</span>
              {links.map(([to, t]) => <Link key={t} to={to}>{t}</Link>)}
            </div>
          ))}
          <div className="col">
            <span className="kicker" style={{ marginBottom: 14, fontSize: 12 }}>Contact</span>
            <span style={{ color: '#C9D1DB', fontSize: 14, lineHeight: 1.7 }}>{SITE.address[0]},<br />{SITE.address[1]}</span>
            <a href={'mailto:' + SITE.email}>{SITE.email}</a>
            <Link to="/contact">{SITE.social}</Link>
            <Link to="/contact?t=complaint">Complaints / feedback</Link>
          </div>
        </div>
        <div style={{ borderRadius: 18, padding: '18px 20px', fontSize: 13, lineHeight: 1.6, color: '#C9D1DB', background: 'var(--ink-3)' }}>{SITE.disclaimer} Catalogue inclusion is not an endorsement or guarantee of quality.</div>
        <div className="row between g16" style={{ borderTop: '1px solid var(--line-d)', paddingTop: 24 }}>
          <span style={{ color: '#8D97A4', fontSize: 13 }}>© {new Date().getFullYear()} Association for Students’ Social Welfare Nigeria. SCCN is an ASSW initiative.</span>
          <div className="row g20">
            {[['privacy', 'Privacy Notice'], ['terms', 'Terms of Use'], ['listing-terms', 'Catalogue Listing Terms'], ['cookies', 'Cookies']].map(([k, t]) => (
              <Link key={k} to={'/policies/' + k} style={{ fontSize: 13 }}>{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

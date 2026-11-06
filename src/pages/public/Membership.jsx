import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Flag } from '../../components/UI.jsx';
import { SITE, naira } from '../../data/site.js';

const ROWS = [
  ['Community access & networking', '✓', '✓', '✓'], ['Programme & event updates', '✓', '✓', '✓'], ['Learning resources & guides', '✓', '✓', '✓'], ['Public opportunity notices', '✓', '✓', '✓'],
  ['Catalogue business profile', '—', '✓', '—'], ['SCCN membership number & certificate', '—', '✓', '—'], ['Business clinics', 'Open sessions', 'Priority access', '—'],
  ['Eligibility guidance for specific calls', '—', '✓', '—'], ['Mentor / partner introductions', '—', 'Potential, with consent', 'Mentor role'], ['Showcase consideration', '—', '✓', '—'],
];

export default function Membership() {
  const [a, setA] = useState('yes');
  const rec = a === 'yes'
    ? { t: 'SCCN Enterprise member', d: 'Get a reviewed catalogue profile, membership number, certificate and structured support. You can also join as a general member first.', cta: 'Register Your Business', to: '/register-business' }
    : { t: 'General member', d: 'Join free, learn through resources and clinics, and upgrade to enterprise membership when your business is up and running.', cta: 'Join ASSW', to: '/auth?mode=join' };
  return (
    <>
      <section className="grid-bg" style={{ padding: '72px 0 48px' }}>
        <div className="wrap col center g20">
          <Breadcrumb items={[['SCCN', '/sccn'], ['Membership']]} />
          <h1 className="d1" style={{ maxWidth: 980 }}>Membership that <span className="hl">fits</span> where you are.</h1>
          <p className="lead" style={{ maxWidth: 640 }}>General community membership is always free. Enterprise membership is a separate, optional pathway for student business owners.</p>
        </div>
      </section>

      <section style={{ padding: '24px 0 72px' }}>
        <div className="wrap ag" style={{ '--min': '340px', '--gap': '20px', alignItems: 'stretch' }}>
          <div className="card col g18" style={{ padding: 32 }}>
            <span className="st st-open self-start">Free</span><h2 className="d3">General member</h2>
            <p className="muted">For students and young people who want community, learning and updates.</p>
            <span className="bold-num" style={{ fontSize: 48 }}>₦0</span><hr className="rule" />
            <ul className="col g10" style={{ listStyle: 'none', fontSize: 15 }}><li>✓ Community access</li><li>✓ Programme &amp; event updates</li><li>✓ Learning resources</li><li>✓ Public opportunity notices</li></ul>
            <Link className="btn btn-outline mt-auto" to="/auth?mode=join">Join ASSW</Link>
          </div>
          <div className="card col g18" style={{ padding: 32, background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)', position: 'relative' }}>
            <span className="pill pill-red" style={{ position: 'absolute', top: -15, right: 24 }}>For founders</span>
            <span className="st st-info self-start">Enterprise</span><h2 className="d3">SCCN Enterprise member</h2>
            <p style={{ color: 'var(--muted-d)' }}>For student business owners who choose the catalogue and structured support pathway.</p>
            <div className="row g10" style={{ alignItems: 'baseline' }}><span className="bold-num" style={{ fontSize: 48 }}>{naira(SITE.contribution)}</span><Flag>To be confirmed</Flag></div><hr className="rule" />
            <ul className="col g10" style={{ listStyle: 'none', fontSize: 15 }}><li>✓ Everything in General</li><li>✓ Reviewed catalogue profile</li><li>✓ SCCN number &amp; certificate</li><li>✓ Clinics &amp; eligibility guidance</li><li>✓ Potential introductions</li></ul>
            <Link className="btn btn-primary mt-auto" to="/register-business">Register Your Business</Link>
          </div>
          <div className="card-p col g18" style={{ padding: 32 }}>
            <span className="st st-closed self-start">Planned</span><h2 className="d3">Alumni &amp; mentor</h2>
            <p className="muted">A future category for graduates and professionals who want to give back.</p>
            <span className="bold-num" style={{ fontSize: 48, color: '#8A93A0' }}>Soon</span><hr className="rule" />
            <p className="small">Until then, register interest as a mentor and we’ll be in touch.</p>
            <Link className="btn btn-line mt-auto" to="/get-involved?r=mentor">Become a Mentor</Link>
          </div>
        </div>
      </section>

      <section className="sec-s" style={{ background: 'var(--paper)' }}>
        <div className="wrap col g28">
          <h2 className="d2">Compare in detail</h2>
          <div className="tbl-box">
            <table className="tbl">
              <caption className="sr">Membership features by type</caption>
              <thead><tr><th style={{ width: '40%' }}>Feature</th><th>General</th><th>Enterprise</th><th>Alumni / mentor</th></tr></thead>
              <tbody>{ROWS.map((r) => <tr key={r[0]}><td style={{ fontWeight: 500 }}>{r[0]}</td><td>{r[1]}</td><td className="fw6" style={{ color: 'var(--blue)' }}>{r[2]}</td><td className="muted">{r[3]}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="small">No commission or success-based fee is charged. Any such arrangement would require Board approval, clear disclosure and legal review.</p>
        </div>
      </section>

      <section className="sec-s" style={{ paddingBottom: 112 }}>
        <div className="wrap">
          <div className="panel-d ag" style={{ '--min': '380px', '--gap': '40px', alignItems: 'center' }}>
            <div className="col g16"><span className="kicker">Not sure?</span><h2 className="d2">Find the right membership</h2><p style={{ color: 'var(--muted-d)' }}>Answer one question.</p></div>
            <div className="col g14">
              <span className="lbl" style={{ color: '#fff' }} id="qlbl">Do you currently own or co-own a business?</span>
              <div role="group" aria-labelledby="qlbl" className="row g10">
                <button type="button" aria-pressed={a === 'yes'} className={'btn ' + (a === 'yes' ? 'btn-primary' : 'btn-ghost-d')} onClick={() => setA('yes')}>Yes, I run a business</button>
                <button type="button" aria-pressed={a === 'no'} className={'btn ' + (a === 'no' ? 'btn-primary' : 'btn-ghost-d')} onClick={() => setA('no')}>Not yet</button>
              </div>
              <div className="col g12" style={{ background: 'var(--ink-3)', borderRadius: 20, padding: 24 }} aria-live="polite">
                <span className="kicker">We recommend</span>
                <span style={{ font: '700 26px/1.1 var(--f-d)' }}>{rec.t}</span>
                <p style={{ color: 'var(--muted-d)', fontSize: 15 }}>{rec.d}</p>
                <Link className="btn btn-primary self-start" to={rec.to}>{rec.cta}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Info } from '../../components/Icons.jsx';
import { Sticker } from '../../components/Brand.jsx';
import { Placeholder } from '../../components/UI.jsx';
import { SITE, naira } from '../../data/site.js';

const STEPS = [
  ['Identify', 'Find student-owned businesses and founders across institutions.'], ['Catalogue', 'Publish approved, consented business profiles.'],
  ['Assess', 'Understand stage, formalisation, traction and support needs.'], ['Develop', 'Clinics, training, mentoring and business resources.'],
  ['Prepare', 'Get eligible ventures ready for pitches, grants and calls.'], ['Match', 'Identify relevant opportunities by eligibility and fit.'],
  ['Connect', 'Introduce founders to mentors, markets and providers — with consent.'], ['Track', 'Record applications, referrals, outcomes and lessons.'],
];
const FAQ = [
  ['Who can register a business?', 'Current students and recent graduates who own or co-own a business. Final eligibility rules will be confirmed by ASSW before launch.'],
  ['What does the ₦5,000 contribution cover?', 'An enterprise participation contribution tied to defined services — catalogue profile, membership number, certificate and access to clinics and resources. It is not a fee for funding. Amount, validity, renewal, refund and waiver rules are pending confirmation.'],
  ['Will my phone number or address be public?', 'No. Personal phone numbers, private email, home address and student ID are never published unless you explicitly consent. You choose your public business enquiry channels.'],
  ['Does a listing mean SCCN endorses my business?', 'No. Catalogue inclusion is not an endorsement, guarantee of quality, investment recommendation or procurement approval.'],
  ['Can I update or remove my listing?', 'Yes. Edit your profile in the Enterprise Portal, request corrections, or withdraw public listing consent at any time.'],
];
const OFFERS = [['/catalogue', 'Catalogue preview', 'Student Enterprise Catalogue', 'A public, searchable directory of consented student business profiles.'], ['/programmes', 'Clinic session', 'Mentorship & Clinics', 'Formalisation, proof-of-concept, pitch decks, budgets and application clinics.'], ['/opportunities', 'Opportunity Desk', 'Opportunities & Funding', 'Verified, dated opportunity notices with practical readiness guidance.'], ['/catalogue', 'Market day', 'Market Access', 'Showcases, campus fairs and introductions to buyers — with founder consent.']];

const Li = ({ children, dark }) => <li className="row g10" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}><Check size={20} w={2.4} color={dark ? 'var(--sky)' : 'var(--blue)'} />{children}</li>;

export default function SCCN() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <section className="dark" style={{ padding: '88px 0 96px', backgroundImage: 'linear-gradient(#171D24 1px, transparent 1px), linear-gradient(90deg, #171D24 1px, transparent 1px)', backgroundSize: '120px 120px', position: 'relative', overflow: 'hidden' }}>
        <div className="wrap col g32" style={{ position: 'relative' }}>
          <div className="row g10"><span className="pill">An ASSW initiative</span><span className="tag tag-d" style={{ cursor: 'default' }}>Students Chamber of Commerce Nigeria</span></div>
          <h1 style={{ fontSize: 'clamp(42px, 6.6vw, 96px)', lineHeight: 0.96, letterSpacing: '-.04em', textTransform: 'uppercase', maxWidth: 1120 }}>Where student businesses become <span style={{ color: 'var(--sky)' }}>visible</span>, connected &amp; <span className="hl hl-red">opportunity-ready.</span></h1>
          <div className="row between end g40">
            <p className="lead" style={{ maxWidth: 600 }}>{SITE.sccnDescription}</p>
            <div className="row g10"><Link className="btn btn-primary" to="/register-business">Register Your Business</Link><Link className="btn btn-ghost-d" to="/catalogue">Explore the Catalogue</Link></div>
          </div>
          <Sticker text="GET VISIBLE · GET CONNECTED · GET READY ·" to="/register-business" label="Register your business" className="hide-lg" style={{ position: 'absolute', right: 32, top: 0 }} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap col g40">
          <div className="ag end" style={{ '--min': '420px', '--gap': '32px' }}>
            <div className="col g16"><span className="kicker">How SCCN works</span><h2 className="d2">From identified to opportunity-ready, in eight steps.</h2></div>
            <p className="lead">SCCN prepares and connects founders. Each opportunity provider keeps its own eligibility, due diligence and selection process — we never promise grants or selection.</p>
          </div>
          <ol className="ag" style={{ '--min': '280px', '--gap': '14px', listStyle: 'none' }}>
            {STEPS.map(([t, d], i) => {
              const hi = i === 4;
              return (
                <li key={t} className="col g14" style={{ padding: 26, borderRadius: 24, minHeight: 200, background: hi ? 'var(--blue)' : i % 2 ? 'var(--paper)' : '#fff', color: hi ? '#fff' : 'var(--ink)', border: hi || i % 2 ? 0 : '1px solid var(--line)' }}>
                  <div className="row between"><span style={{ font: '700 15px/1 var(--f-d)', opacity: 0.7 }}>0{i + 1}</span><span style={{ width: 10, height: 10, borderRadius: '50%', background: hi ? 'var(--red)' : 'var(--blue)' }} /></div>
                  <h3 style={{ fontSize: 30 }}>{t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.8 }}>{d}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="sec-s" style={{ background: 'var(--paper)' }}>
        <div className="wrap col g32">
          <div className="col center g14"><span className="kicker">Two ways in</span><h2 className="d2">Choose the route that fits you.</h2><p className="lead" style={{ maxWidth: 620 }}>Community membership is free and open. Enterprise participation is for student business owners who want a catalogue profile and structured support.</p></div>
          <div className="ag" style={{ '--min': '420px' }}>
            <div className="card col g20" style={{ padding: 40 }}>
              <div className="row between g12"><span className="st st-open">Free</span><span className="small">Students, aspiring founders, graduates</span></div>
              <h3 className="d3">Community membership</h3>
              <ul className="col g12" style={{ listStyle: 'none' }}><Li>Community access and networking</Li><Li>Programme and event updates</Li><Li>Learning resources and guides</Li><Li>Public opportunity notices</Li></ul>
              <Link className="btn btn-outline self-start mt-auto" to="/auth?mode=join">Join the community</Link>
            </div>
            <div className="card col g20" style={{ padding: 40, background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' }}>
              <div className="row between g12"><span className="st st-info">{naira(SITE.contribution)} contribution · to be confirmed</span><span className="small" style={{ color: 'var(--muted-d)' }}>Student business owners</span></div>
              <h3 className="d3">Enterprise participation</h3>
              <ul className="col g12" style={{ listStyle: 'none' }}><Li dark>Reviewed catalogue profile</Li><Li dark>Unique SCCN membership number &amp; certificate</Li><Li dark>Clinics, resources and eligibility guidance</Li><Li dark>Potential mentor and partner introductions</Li></ul>
              <Link className="btn btn-primary self-start mt-auto" to="/register-business">Register Your Business</Link>
            </div>
          </div>
          <Link className="btn btn-text" to="/membership" style={{ alignSelf: 'center' }}>Compare membership in detail</Link>
        </div>
      </section>

      <section className="sec">
        <div className="wrap col g32">
          <div className="col g14"><span className="kicker">The enterprise ecosystem</span><h2 className="d2">What SCCN offers</h2></div>
          <div className="ag" style={{ '--min': '290px', '--gap': '20px' }}>
            {OFFERS.map(([to, ph, t, d]) => (
              <Link key={t} to={to} className="card card-link col g16"><Placeholder label={ph} style={{ height: 170, borderRadius: '14px 14px 14px 56px' }} /><h3 className="d4">{t}</h3><p className="small">{d}</p></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-s">
        <div className="wrap">
          <div className="panel-d ag start" style={{ '--min': '420px', '--gap': '40px' }}>
            <div className="col g18">
              <span className="kicker">Questions</span>
              <h2 className="d2">Before you register</h2>
              <div className="note-d note" style={{ background: 'var(--ink-3)' }}><Info /><span>{SITE.disclaimer}</span></div>
            </div>
            <div className="col">
              {FAQ.map(([q, a], i) => (
                <div key={q} style={{ borderTop: '1px solid var(--line-d)' }}>
                  <h3 style={{ margin: 0 }}>
                    <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={'faq-' + i}
                      className="row between g16 w-full" style={{ flexWrap: 'nowrap', padding: '22px 0', background: 'none', border: 0, color: '#fff', cursor: 'pointer', textAlign: 'left', font: '600 19px/1.3 var(--f-d)' }}>
                      {q}<span aria-hidden="true" style={{ font: '400 26px/1 var(--f)', color: 'var(--sky)' }}>{open === i ? '–' : '+'}</span>
                    </button>
                  </h3>
                  {open === i && <p id={'faq-' + i} style={{ paddingBottom: 22, color: 'var(--muted-d)', fontSize: 15 }}>{a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec-s" style={{ paddingBottom: 112 }}>
        <div className="wrap ag" style={{ '--min': '420px' }}>
          <div className="card-p col g16" style={{ padding: 40 }}>
            <span className="kicker">Success stories</span>
            <h3 className="d3">[Consented founder story headline]</h3>
            <p className="muted">Short summary of the founder’s journey through SCCN — what support they used and what changed. Published only with written consent.</p>
            <Link className="btn btn-dark self-start" to="/news">All stories</Link>
          </div>
          <div className="card-blue col g16" style={{ padding: 40 }}>
            <span className="kicker" style={{ color: '#fff' }}>For partners &amp; providers</span>
            <h3 className="d3">Looking for a structured pipeline of student ventures?</h3>
            <p>Work with the SCCN Opportunity Desk on calls, clinics, showcases and market access. Identifiable founder data is shared only with consent.</p>
            <Link className="btn btn-white self-start" to="/get-involved?r=corporate">Partner with ASSW</Link>
          </div>
        </div>
      </section>
    </>
  );
}

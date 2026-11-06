import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkle } from '../../components/Icons.jsx';
import { Breadcrumb, Flag, Note, Placeholder } from '../../components/UI.jsx';
import { SITE, naira } from '../../data/site.js';
import { useDraft, useSession } from '../../lib/store.js';
import Seo from '../../seo/Seo.jsx';
import { breadcrumbs } from '../../seo/schema.js';

const PROCESS = [['Create account', 'Sign up and verify your email.'], ['Apply', 'Tell us about you and your business. Save and resume.'], ['Contribute', 'Pay securely. Your receipt is emailed.'], ['Review', 'SCCN checks completeness, duplicates and consent.'], ['Get your number', 'Approved members receive an SCCN number and certificate.'], ['Go live', 'Preview your listing and confirm publication.']];
const BENEFITS = ['Catalogue profile', 'Enterprise membership certificate', 'Unique SCCN membership number', 'Structured business profile', 'Relevant enterprise information', 'Access to clinics and resources', 'Opportunity notices & eligibility guidance', 'Potential mentor and partner introductions', 'Consideration for selected showcases'];
const ELIG = ['Current students of a Nigerian tertiary institution who own or co-own a business', 'Recent graduates within [X] years of graduation', 'Any stage — idea to expansion — and any sector', 'Applicants aged 18+ (under-18 policy to be confirmed)'];

export default function RegisterBusiness() {
  const session = useSession();
  const draft = useDraft();
  const start = session ? '/apply' : '/auth?mode=join&path=founder';
  return (
    <>
      <Seo title="Register Your Business" description="Put your student business on the map. Join the SCCN Student Enterprise Catalogue and get a membership number, certificate, clinics and opportunity guidance." path="/register-business" jsonLd={[breadcrumbs([['Home', '/'], ['SCCN', '/sccn'], ['Register Your Business', '/register-business']])]} />
      <section className="grid-bg" style={{ padding: '72px 0 80px', overflow: 'hidden' }}>
        <div className="wrap ag" style={{ '--min': '520px', '--gap': '48px', alignItems: 'center' }}>
          <div className="col g24">
            <Breadcrumb items={[['SCCN', '/sccn'], ['Register Your Business']]} />
            <h1 className="d1">Put your student business <span className="hl">on the map.</span></h1>
            <p className="lead" style={{ maxWidth: 560 }}>Join the SCCN Student Enterprise Catalogue, get a unique membership number and certificate, and access clinics and opportunity guidance built for student founders.</p>
            <div className="row g12">
              <Link className="btn btn-primary" to={start}>{draft ? 'Continue your application' : 'Start your application'} <ArrowRight /></Link>
              {!draft && <Link className="btn btn-line" to={session ? '/apply' : '/auth?next=apply'}>Resume a saved application</Link>}
            </div>
            <span className="small">About 15 minutes · save and resume at any time</span>
          </div>
          <div className="hide-sm" style={{ position: 'relative', minHeight: 440 }}>
            <Sparkle size={34} color="var(--red)" style={{ position: 'absolute', left: '4%', top: 0, zIndex: 2 }} />
            <Placeholder label="Photo: founder at market stall" style={{ position: 'absolute', left: '8%', top: 20, width: '56%', height: 300, borderRadius: '28px 28px 28px 110px', transform: 'rotate(-3deg)' }} />
            <div className="card col g14" style={{ position: 'absolute', right: 0, bottom: 0, width: 'min(330px, 80%)', boxShadow: '0 30px 60px rgba(12,16,21,.12)' }}>
              <div className="row between"><span className="small">SCCN Enterprise Member</span><span className="st st-open">Active</span></div>
              <span style={{ font: '700 22px/1.1 var(--f-d)' }}>Your Business Name</span>
              <span style={{ font: '600 15px/1 var(--f-d)', color: 'var(--blue)', letterSpacing: '.04em' }}>SCCN-26-00000</span>
              <hr className="rule" />
              <span className="small">Membership number · certificate · catalogue profile</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-s">
        <div className="wrap ag" style={{ '--min': '360px' }}>
          <div className="card col g18" style={{ padding: 36 }}>
            <span className="kicker">Eligibility</span>
            <h2 className="d3">Who can apply</h2>
            <ul className="col g12" style={{ listStyle: 'none' }}>{ELIG.map((e) => <li key={e} className="row g10" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}><Check size={20} w={2.4} color="var(--blue)" />{e}</li>)}</ul>
            <Flag style={{ alignSelf: 'flex-start' }}>Final criteria pending ASSW approval</Flag>
          </div>
          <div className="card col g18" style={{ padding: 36, background: 'var(--blue)', color: '#fff', borderColor: 'var(--blue)' }}>
            <span className="kicker" style={{ color: '#fff' }}>Enterprise participation contribution</span>
            <div className="row g10" style={{ alignItems: 'baseline' }}><span style={{ font: '700 72px/1 var(--f-d)', letterSpacing: '-.04em' }}>{naira(SITE.contribution)}</span><span style={{ color: '#DCE7F6' }}>/ [validity period]</span></div>
            <p style={{ color: '#E6EEF9' }}>Tied to defined services — your catalogue profile, membership number, certificate and access to clinics and resources. It is not a fee for funding or selection.</p>
            <hr className="rule" style={{ background: 'rgba(255,255,255,.3)' }} />
            <div className="ag" style={{ '--min': '160px', '--gap': '12px', fontSize: 14 }}><span>Renewal: <strong>[TBC]</strong></span><span>Refunds: <strong>[TBC]</strong></span><span>Waivers: <strong>[TBC]</strong></span><span>Payment: <strong>Paystack / Flutterwave</strong></span></div>
          </div>
        </div>
      </section>

      <section className="sec-s">
        <div className="wrap">
          <div className="panel-d col g32">
            <div className="row between end g16"><h2 className="d2">How it works</h2><p className="small" style={{ maxWidth: 360 }}>Review timelines will be published once the SCCN team confirms capacity.</p></div>
            <hr className="rule" />
            <ol className="ag" style={{ '--min': '190px', '--gap': '14px', listStyle: 'none' }}>
              {PROCESS.map(([t, d], i) => (
                <li key={t} className="col g12" style={{ padding: 22, borderRadius: 22, minHeight: 200, background: i === 4 ? 'var(--blue)' : 'var(--ink-3)' }}>
                  <span style={{ font: '700 40px/1 var(--f-d)', color: i === 4 ? '#fff' : 'var(--sky)' }}>0{i + 1}</span>
                  <h3 style={{ fontSize: 21 }}>{t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.8 }}>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap ag" style={{ '--min': '460px', '--gap': '48px' }}>
          <div className="col g20"><span className="kicker">Benefits</span><h2 className="d2">What participation includes</h2><p className="muted">Subject to SCCN capacity. Benefits are reviewed and may change — members will be notified.</p></div>
          <ul className="ag" style={{ '--min': '240px', '--gap': '12px', listStyle: 'none' }}>
            {BENEFITS.map((b) => (
              <li key={b} className="row g12" style={{ padding: 18, border: '1px solid var(--line)', borderRadius: 18, flexWrap: 'nowrap', alignItems: 'flex-start' }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--blue-10)', color: 'var(--blue)', display: 'grid', placeItems: 'center', flex: 'none' }}><Check /></span>
                <span style={{ fontSize: 15, lineHeight: 1.45, fontWeight: 500 }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-s" style={{ background: 'var(--paper)' }}>
        <div className="wrap col g32">
          <div className="col g14"><span className="kicker">Privacy</span><h2 className="d2">You control what is public.</h2></div>
          <div className="ag" style={{ '--min': '380px', '--gap': '20px' }}>
            <div className="card col g16" style={{ padding: 32 }}><div className="row g10"><span className="st st-open">Public catalogue</span><span className="small">With your consent</span></div><p>Business name, logo and photos, category, short description, founder story, products and services, service area, and the business enquiry channels you approve.</p></div>
            <div className="card col g16" style={{ padding: 32 }}><div className="row g10"><span className="st st-dark">Private registry</span><span className="small">Restricted to authorised staff</span></div><p>Personal phone and email, home address, student ID, CAC and tax details, revenue range, pitch deck and evidence. Never shared with funders, mentors or partners without your consent.</p></div>
          </div>
          <Note kind="red" style={{ padding: '24px 26px' }}><strong>Important:</strong> {SITE.disclaimer}</Note>
        </div>
      </section>

      <section className="sec-s" style={{ paddingBottom: 112 }}>
        <div className="wrap ag" style={{ '--min': '460px', alignItems: 'stretch' }}>
          <div className="card col g18" style={{ padding: 36 }}>
            <h2 className="d3">Have these ready</h2>
            <ul className="col g10" style={{ listStyle: 'none', fontSize: 15 }}>
              <li>· Institution, course and level details</li><li>· Business name, description and year started</li><li>· Logo and 2–6 product photos <span className="opt">(optional)</span></li>
              <li>· CAC certificate, if registered <span className="opt">(optional)</span></li><li>· Pitch deck or proof-of-concept evidence <span className="opt">(optional)</span></li><li>· A way to pay the contribution (card, transfer or USSD)</li>
            </ul>
          </div>
          <div className="panel-d col g20" style={{ justifyContent: 'center', padding: 48 }}>
            <h2 className="d2" style={{ textTransform: 'uppercase' }}>Ready when you are.</h2>
            <p style={{ color: 'var(--muted-d)' }}>Create an account, complete your application at your own pace and submit when you’re ready.</p>
            <div className="row g10"><Link className="btn btn-primary" to={start}>Start your application</Link><Link className="btn btn-ghost-d" to="/sccn">Read the FAQs</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}

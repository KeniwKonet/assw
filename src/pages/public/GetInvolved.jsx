import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUR, Check } from '../../components/Icons.jsx';
import { Breadcrumb, Field, Note } from '../../components/UI.jsx';
import { STATES } from '../../data/site.js';
import { recordEnquiry } from '../../lib/store.js';

const ROUTES = [
  { k: 'student', t: 'Join as a student', d: 'Free general membership — community, learning and updates.', kicker: 'Students', h: 'Join the ASSW community', p: 'Create a free account to join. If you run a business, you can also register it with SCCN.', kind: 'student' },
  { k: 'mentor', t: 'Become a mentor', d: 'Share your expertise with student founders and leaders.', kicker: 'Mentors', h: 'Mentor expression of interest', p: 'Tell us about your expertise. Founder information is shared with mentors only for an agreed purpose and with consent.', cta: 'Submit interest', kind: 'mentor' },
  { k: 'volunteer', t: 'Volunteer', d: 'Help deliver programmes, events and campus activity.', kicker: 'Volunteers', h: 'Volunteer with ASSW', p: 'Let us know where you’re based and how you’d like to help.', cta: 'Submit interest', kind: 'mentor' },
  { k: 'institution', t: 'Institutional partnership', d: 'Universities and colleges collaborating on student development.', kicker: 'Partnerships', h: 'Partner with ASSW', p: 'Tell us about your organisation and the kind of collaboration you have in mind.', cta: 'Send partnership enquiry', kind: 'partner', interest: 'Institutional collaboration' },
  { k: 'corporate', t: 'Corporate partnership', d: 'Talent, CSR, supplier discovery and innovation.', kicker: 'Partnerships', h: 'Partner with ASSW', p: 'From CSR and sponsorship to supplier discovery through the SCCN catalogue.', cta: 'Send partnership enquiry', kind: 'partner', interest: 'Corporate / CSR' },
  { k: 'support', t: 'Support a programme', d: 'Fund or sponsor a specific programme or clinic series.', kicker: 'Funders & sponsors', h: 'Support a programme', p: 'We report outcomes with clear periods, definitions and sources.', cta: 'Send enquiry', kind: 'partner', interest: 'Funding / sponsorship' },
];
const PATHWAYS = ['Institutional collaboration', 'Corporate / CSR', 'Programme delivery', 'Technical assistance', 'Enterprise development', 'Mentorship', 'Market access', 'Funding / sponsorship', 'Research / data collaboration'];
const empty = { org: '', name: '', role: '', email: '', phone: '', interest: '', contribution: '', expertise: '', geo: 'Nationwide', msg: '', consent: false, updates: false };
const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);

export default function GetInvolved() {
  const [params, setParams] = useSearchParams();
  const rk = params.get('r') || 'institution';
  const cur = ROUTES.find((r) => r.k === rk) || ROUTES[3];
  const [f, setF] = useState(empty);
  const [tried, setTried] = useState(false);
  const [ref, setRef] = useState('');
  const partner = cur.kind === 'partner';
  const pick = (k) => { setParams({ r: k }, { replace: true }); setTried(false); setRef(''); };
  const up = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const err = tried ? {
    org: partner && !f.org.trim() && 'Enter your organisation’s name', name: !f.name.trim() && 'Enter your name', email: !emailOk(f.email) && 'Enter a valid email address',
    msg: !f.msg.trim() && 'Tell us a little about what you have in mind', consent: !f.consent && 'Please agree so we can respond',
  } : {};
  const submit = (e) => {
    e.preventDefault();
    const ok = (!partner || f.org.trim()) && f.name.trim() && emailOk(f.email) && f.msg.trim() && f.consent;
    if (!ok) { setTried(true); return; }
    setRef(recordEnquiry(partner ? 'partnership' : cur.k, { ...f, interest: f.interest || cur.interest || '', route: cur.k }));
  };
  const errCount = Object.values(err).filter(Boolean).length;
  const ic = (k) => 'input' + (err[k] ? ' is-err' : '');

  return (
    <>
      <section className="grid-bg" style={{ padding: '72px 0 48px' }}>
        <div className="wrap col g24">
          <Breadcrumb items={[['Home', '/'], ['Get Involved']]} />
          <div className="ag end" style={{ '--min': '480px', '--gap': '32px' }}>
            <h1 className="d1">There’s a place for <span className="hl">you</span> here.</h1>
            <p className="lead">Students, mentors, volunteers, institutions, companies and funders all help widen access to opportunity. Choose how you’d like to take part.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '16px 0 56px' }}>
        <div className="wrap ag" style={{ '--min': '300px', '--gap': '14px' }}>
          {ROUTES.map((r) => {
            const on = r.k === cur.k;
            return (
              <button key={r.k} type="button" aria-pressed={on} onClick={() => pick(r.k)} className="col g14 start"
                style={{ padding: 24, borderRadius: 24, border: 0, cursor: 'pointer', fontFamily: 'var(--f)', minHeight: 170, color: '#fff', background: on ? 'var(--blue)' : 'var(--ink)' }}>
                <span className="row between start g12 w-full" style={{ flexWrap: 'nowrap' }}>
                  <span style={{ font: '700 26px/1.1 var(--f-d)', letterSpacing: '-.02em', textAlign: 'left' }}>{r.t}</span>
                  <span className="arrow-c" style={{ width: 44, height: 44, background: on ? 'var(--red)' : undefined }}><ArrowUR size={18} /></span>
                </span>
                <span style={{ fontSize: 14, lineHeight: 1.55, textAlign: 'left', opacity: 0.8 }}>{r.d}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="sec-s" style={{ background: 'var(--paper)', paddingBottom: 112 }}>
        <div className="wrap row g40" style={{ alignItems: 'flex-start' }}>
          <div className="col g20" style={{ flex: '1 1 340px' }}>
            <span className="kicker">{cur.kicker}</span>
            <h2 className="d2">{cur.h}</h2>
            <p className="muted">{cur.p}</p>
            {partner && (
              <div className="col g12">
                <span className="lbl">Partnership pathways</span>
                <div className="row g8">{PATHWAYS.map((p) => <button type="button" key={p} className={'tag' + (f.interest === p ? ' on' : '')} aria-pressed={f.interest === p} onClick={() => setF({ ...f, interest: p })}>{p}</button>)}</div>
                <Note style={{ background: '#fff' }}>We describe every partner accurately — partner, sponsor, supporter, venue, media partner or participant — and use logos only with permission.</Note>
              </div>
            )}
          </div>

          <div style={{ flex: '999 1 560px', minWidth: 0 }}>
            {cur.kind === 'student' ? (
              <div className="card col g16 start" style={{ padding: 44 }}>
                <h3 className="d3">Membership is free.</h3>
                <p className="muted">Create your account in under two minutes. You’ll get programme updates, resources and public opportunity notices.</p>
                <div className="row g10"><Link className="btn btn-primary" to="/auth?mode=join">Create free account</Link><Link className="btn btn-line" to="/register-business">I run a business</Link></div>
              </div>
            ) : ref ? (
              <div className="card col g16 start" style={{ padding: 44 }} role="status">
                <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--ok-10)', color: 'var(--ok)', display: 'grid', placeItems: 'center' }}><Check size={26} w={2.6} /></span>
                <h3 className="d3">Thanks — your enquiry is in.</h3>
                <p className="muted">Reference {ref}. Our team will reply to {f.email} within [X] working days.</p>
                <button type="button" className="btn btn-line" onClick={() => { setRef(''); setF(empty); setTried(false); }}>Send another enquiry</button>
              </div>
            ) : (
              <form className="card ag" noValidate onSubmit={submit} style={{ padding: 32, '--min': '250px', '--gap': '18px' }}>
                {errCount > 0 && <div className="span-all"><Note kind="red" role="alert">Please fix the {errCount} highlighted field{errCount > 1 ? 's' : ''} before sending.</Note></div>}
                {partner && <Field id="g1" label="Organisation" error={err.org}><input id="g1" className={ic('org')} autoComplete="organization" value={f.org} onChange={up('org')} /></Field>}
                <Field id="g2" label="Contact name" error={err.name}><input id="g2" className={ic('name')} autoComplete="name" value={f.name} onChange={up('name')} /></Field>
                {partner && <Field id="g3" label="Role / title" optional><input id="g3" className="input" autoComplete="organization-title" value={f.role} onChange={up('role')} /></Field>}
                <Field id="g4" label="Email" error={err.email}><input id="g4" type="email" className={ic('email')} autoComplete="email" value={f.email} onChange={up('email')} /></Field>
                <Field id="g5" label="Phone" optional><input id="g5" type="tel" className="input" autoComplete="tel" value={f.phone} onChange={up('phone')} /></Field>
                {partner && <Field id="g6" label="Area of interest"><select id="g6" className="input" value={f.interest || cur.interest} onChange={up('interest')}>{PATHWAYS.map((p) => <option key={p}>{p}</option>)}</select></Field>}
                {partner && <Field id="g7" label="Proposed contribution" optional><input id="g7" className="input" placeholder="e.g. venue, mentors, funding, expertise" value={f.contribution} onChange={up('contribution')} /></Field>}
                {!partner && <Field id="g8" label={cur.k === 'mentor' ? 'Expertise' : 'How you’d like to help'}><input id="g8" className="input" placeholder={cur.k === 'mentor' ? 'e.g. finance, marketing, agribusiness' : 'e.g. events, campus outreach, design'} value={f.expertise} onChange={up('expertise')} /></Field>}
                <Field id="g9" label="Geography"><select id="g9" className="input" value={f.geo} onChange={up('geo')}><option>Nationwide</option>{STATES.map((s) => <option key={s}>{s}</option>)}<option>Outside Nigeria</option></select></Field>
                <Field id="g10" label="Message" className="span-all" error={err.msg}><textarea id="g10" className={ic('msg')} placeholder="Tell us what you have in mind" value={f.msg} onChange={up('msg')} /></Field>
                <div className="span-all col g6">
                  <label className="check"><input type="checkbox" checked={f.consent} onChange={up('consent')} />I agree ASSW may store my details to respond to this enquiry, as described in the <Link to="/policies/privacy">Privacy Notice</Link>.</label>
                  {err.consent && <span className="err">{err.consent}</span>}
                </div>
                <label className="check span-all"><input type="checkbox" checked={f.updates} onChange={up('updates')} />Keep me updated about ASSW programmes <span className="opt">(optional)</span></label>
                <div className="span-all row g12"><button type="submit" className="btn btn-primary">{cur.cta}</button><span className="small">We never sell your data.</span></div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

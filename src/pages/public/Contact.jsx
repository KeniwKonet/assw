import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Breadcrumb, Field, Flag, Placeholder } from '../../components/UI.jsx';
import { SITE } from '../../data/site.js';
import { recordEnquiry } from '../../lib/store.js';

const TYPES = [
  { k: 'general', t: 'General enquiry', h: 'General enquiry', p: 'Questions about ASSW, SCCN, programmes or membership.', after: 'We aim to reply within [X] working days.' },
  { k: 'partnership', t: 'Partnership', h: 'Partnership enquiry', p: 'For institutions, companies, funders and programme partners. For the full form, use Get Involved.', after: 'Our partnerships team will reply.', org: true },
  { k: 'complaint', t: 'Complaints / feedback', h: 'Complaints & feedback', p: 'Tell us what happened. Complaints are logged, acknowledged and handled under our complaints procedure.', after: 'You’ll receive an acknowledgement and the name of the person handling it.' },
  { k: 'listing', t: 'Report a listing', h: 'Report a listing or request a correction', p: 'Help us keep the catalogue accurate and safe.', after: 'Our catalogue team will review the listing.', listing: true },
  { k: 'data', t: 'Data rights request', h: 'Your data rights', p: 'Access, correct or delete your data, or withdraw consent.', after: 'We will verify your identity before acting on the request.', rights: true },
];

export default function Contact() {
  const [params, setParams] = useSearchParams();
  const cur = TYPES.find((x) => x.k === params.get('t')) || TYPES[0];
  const [f, setF] = useState({ name: '', email: '', listing: params.get('b') || '', reason: '', request: '', org: '', role: '', msg: '', consent: false });
  const [tried, setTried] = useState(false);
  const [ref, setRef] = useState('');
  const up = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const ok = { name: f.name.trim(), email: /^\S+@\S+\.\S+$/.test(f.email), msg: f.msg.trim(), consent: f.consent };
  const err = tried ? { name: !ok.name && 'Enter your name', email: !ok.email && 'Enter a valid email address', msg: !ok.msg && 'Write your message', consent: !ok.consent && 'Please agree so we can respond' } : {};
  const send = (e) => { e.preventDefault(); if (Object.values(ok).every(Boolean)) setRef(recordEnquiry(cur.k, f)); else setTried(true); };
  const ic = (k) => 'input' + (err[k] ? ' is-err' : '');

  return (
    <>
      <section className="grid-bg" style={{ padding: '72px 0 48px' }}>
        <div className="wrap col g24"><Breadcrumb items={[['Home', '/'], ['Contact']]} /><h1 className="d1">Let’s <span className="hl">talk.</span></h1></div>
      </section>
      <section style={{ padding: '8px 0 96px' }}>
        <div className="wrap layout-side">
          <aside className="aside col g14" style={{ flexBasis: 340 }}>
            <div className="panel-d col g20" style={{ padding: 32, borderRadius: 28 }}>
              <div className="col g6"><span className="kicker">Office</span><address style={{ font: '600 20px/1.35 var(--f-d)', fontStyle: 'normal' }}>{SITE.address[0]},<br />{SITE.address[1]}</address><Flag style={{ alignSelf: 'flex-start', marginTop: 6 }}>Confirm public address</Flag></div>
              <hr className="rule" />
              <div className="col g6"><span className="kicker">Email</span><a href={'mailto:' + SITE.email} style={{ color: '#fff', font: '600 20px/1.3 var(--f-d)' }}>{SITE.email}</a></div>
              <hr className="rule" />
              <div className="col g10"><span className="kicker">Social</span><div className="row g8">{['Instagram', 'LinkedIn', 'Facebook'].map((s) => <a key={s} className="tag tag-d" href="#">{s} {SITE.social}</a>)}</div></div>
              <hr className="rule" />
              <div className="col g6"><span className="kicker">Phone / WhatsApp</span><span style={{ color: 'var(--muted-d)' }}>{SITE.phone}</span></div>
            </div>
            <Placeholder label="Map embed — Maitama, Abuja" style={{ height: 220, borderRadius: 28 }} />
          </aside>

          <div className="content col g20">
            <div className="col g12">
              <span className="lbl" id="tlbl">What can we help with?</span>
              <div role="group" aria-labelledby="tlbl" className="row g8">
                {TYPES.map((x) => <button key={x.k} type="button" className={'tag' + (x.k === cur.k ? ' on' : '')} aria-pressed={x.k === cur.k} onClick={() => { setParams({ t: x.k }, { replace: true }); setRef(''); setTried(false); }} style={{ minHeight: 42, padding: '0 18px' }}>{x.t}</button>)}
              </div>
            </div>
            {ref ? (
              <div className="card col g14 start" style={{ padding: 40 }} role="status"><span className="st st-open">Received</span><h2 className="d3">Thank you. We’ll be in touch.</h2><p className="muted">Reference {ref}. {cur.after}</p><button type="button" className="btn btn-line" onClick={() => setRef('')}>Send another message</button></div>
            ) : (
              <form className="card ag" noValidate onSubmit={send} style={{ padding: 32, '--min': '250px', '--gap': '18px' }}>
                <div className="span-all col g6"><h2 className="d3">{cur.h}</h2><p className="muted" style={{ fontSize: 15 }}>{cur.p}</p></div>
                <Field id="c1" label="Full name" error={err.name}><input id="c1" className={ic('name')} autoComplete="name" value={f.name} onChange={up('name')} /></Field>
                <Field id="c2" label="Email" error={err.email}><input id="c2" type="email" className={ic('email')} autoComplete="email" value={f.email} onChange={up('email')} /></Field>
                {cur.listing && <Field id="c3" label="Listing URL or business name" className="span-all"><input id="c3" className="input" placeholder="e.g. Ìrẹ̀sí Kitchen or the catalogue link" value={f.listing} onChange={up('listing')} /></Field>}
                {cur.listing && <Field id="c4" label="Reason" className="span-all"><select id="c4" className="input" value={f.reason} onChange={up('reason')}><option>Information is incorrect</option><option>This is my business — correction needed</option><option>Business no longer operating</option><option>Contains personal information</option><option>Inappropriate content</option></select></Field>}
                {cur.rights && <Field id="c5" label="Request type" className="span-all" hint="Some records may be retained where the law requires. We’ll explain what and why."><select id="c5" className="input" value={f.request} onChange={up('request')}><option>Access my data</option><option>Correct my data</option><option>Withdraw public listing consent</option><option>Delete my account</option><option>Withdraw marketing consent</option></select></Field>}
                {cur.org && <Field id="c6" label="Organisation"><input id="c6" className="input" autoComplete="organization" value={f.org} onChange={up('org')} /></Field>}
                {cur.org && <Field id="c7" label="Role" optional><input id="c7" className="input" value={f.role} onChange={up('role')} /></Field>}
                <Field id="c8" label="Message" className="span-all" error={err.msg}><textarea id="c8" className={ic('msg')} value={f.msg} onChange={up('msg')} /></Field>
                <div className="span-all col g6">
                  <label className="check"><input type="checkbox" checked={f.consent} onChange={up('consent')} />I agree ASSW may use these details to respond, as described in the <Link to="/policies/privacy">Privacy Notice</Link>.</label>
                  {err.consent && <span className="err">{err.consent}</span>}
                </div>
                <div className="span-all"><button type="submit" className="btn btn-primary">Send message</button></div>
              </form>
            )}
            <div className="ag" style={{ '--min': '200px', '--gap': '10px' }}>
              {[['privacy', 'Privacy Notice'], ['terms', 'Terms of Use'], ['listing-terms', 'Catalogue Listing Terms']].map(([k, t]) => <Link key={k} to={'/policies/' + k} className="card card-link fw6" style={{ padding: '18px 20px', fontSize: 15 }}>{t} →</Link>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Breadcrumb, Field, Flag, Note, Placeholder, Tabs } from '../../components/UI.jsx';
import { PROGRAMMES, EVENTS } from '../../data/programmes.js';
import { STATES } from '../../data/site.js';
import { recordEnquiry } from '../../lib/store.js';

const pillBg = (s) => (s === 'Active' ? 'var(--ok)' : s === 'Launching' ? 'var(--blue)' : 'var(--muted)');

export default function Programmes() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || 'current';
  const setTab = (t) => setParams(t === 'current' ? {} : { tab: t }, { replace: true });
  const [pick, setPick] = useState(PROGRAMMES[0].t);
  const [f, setF] = useState({ name: '', email: '', inst: '', state: '', why: '', share: false });
  const [tried, setTried] = useState(false);
  const [ref, setRef] = useState('');
  const goApply = (t) => { setPick(t); setRef(''); setTab('apply'); };
  const err = tried ? { name: !f.name.trim() && 'Enter your full name', email: !/^\S+@\S+\.\S+$/.test(f.email) && 'Enter a valid email address' } : {};
  const submit = (e) => { e.preventDefault(); if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email)) return setTried(true); setRef(recordEnquiry('programme', { programme: pick, ...f })); };

  return (
    <>
      <section className="grid-bg" style={{ padding: '72px 0 40px' }}>
        <div className="wrap col g24">
          <Breadcrumb items={[['Home', '/'], ['Programmes']]} />
          <div className="row between end g24"><h1 className="d1">Programmes <span className="hl">&amp;</span> events</h1><Flag>Status, facts &amp; partner wording to be confirmed before publishing</Flag></div>
          <Tabs label="Programme views" items={[['current', 'Current programmes'], ['past', 'Past programmes'], ['events', 'Events'], ['apply', 'Programme applications']]} value={tab} onChange={setTab} />
        </div>
      </section>

      <section style={{ padding: '24px 0 96px' }}>
        <div className="wrap">
          {tab === 'current' && (
            <div className="ag" style={{ '--min': '380px' }}>
              {PROGRAMMES.map((p) => (
                <article key={p.t} className="card col g18" style={{ padding: '14px 14px 26px' }}>
                  <div className="ph b" style={{ height: 220, borderRadius: '18px 18px 18px 70px', alignItems: 'flex-start' }} role="img" aria-label={p.t + ' image placeholder'}><span className="pill" style={{ background: pillBg(p.status), color: '#fff' }}>{p.status}</span></div>
                  <div className="col g10" style={{ padding: '0 12px', flex: 1 }}>
                    <span className="small">{p.partner}</span>
                    <h2 style={{ fontSize: 27 }}>{p.t}</h2>
                    <p style={{ fontSize: 15, color: '#2E3540' }}>{p.d}</p>
                    <div className="row g8 mt-auto" style={{ paddingTop: 10 }}><span className="tag" style={{ minHeight: 28, fontSize: 12, cursor: 'default' }}>{p.area}</span><span className="tag" style={{ minHeight: 28, fontSize: 12, cursor: 'default' }}>{p.who}</span></div>
                  </div>
                  <div className="row g10" style={{ padding: '0 12px' }}><Link className="btn btn-primary btn-sm" to="/what-we-do">Programme details</Link><button type="button" className="btn btn-line btn-sm" onClick={() => goApply(p.t)}>Apply / take part</button></div>
                </article>
              ))}
            </div>
          )}

          {tab === 'past' && (
            <div className="tbl-box">
              <table className="tbl">
                <thead><tr><th>Programme</th><th>Area</th><th>Period</th><th>Approved outputs</th><th>Status</th><th><span className="sr">Report</span></th></tr></thead>
                <tbody>{['Enterprise', 'Welfare', 'Career readiness'].map((a) => <tr key={a}><td className="fw6">[Past programme]</td><td>{a}</td><td>[Start – end]</td><td className="muted">[From metrics register]</td><td><span className="st st-closed">Completed</span></td><td><Link to="/impact">Report</Link></td></tr>)}</tbody>
              </table>
            </div>
          )}

          {tab === 'events' && (
            <div className="col g14">
              {EVENTS.map((e) => {
                const d = new Date(e.date);
                const past = e.status === 'Past';
                return (
                  <div key={e.t} className="card row g24" style={{ padding: '22px 26px' }}>
                    <div className="col center" style={{ width: 88, height: 88, borderRadius: 22, background: past ? '#8A93A0' : e.where === 'Online' ? 'var(--blue)' : 'var(--ink)', color: '#fff', justifyContent: 'center', flex: 'none' }}>
                      <span style={{ font: '700 32px/1 var(--f-d)' }}>{String(d.getDate()).padStart(2, '0')}</span>
                      <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em' }}>{d.toLocaleDateString('en-GB', { month: 'short' })}</span>
                    </div>
                    <div className="col g6 grow" style={{ minWidth: 240 }}><span className="small">{e.kind} · {e.where}</span><h3 className="d4">{e.t}</h3><span className="small">{e.time}</span></div>
                    <span className={'st ' + (past ? 'st-closed' : e.status === 'Open' ? 'st-open' : 'st-closing')}>{e.status}</span>
                    {past ? <button type="button" className="btn btn-line btn-sm">Watch recording</button> : <button type="button" className="btn btn-dark btn-sm" onClick={() => goApply(e.t)}>Register</button>}
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'apply' && (
            <div className="row g32" style={{ alignItems: 'flex-start' }}>
              <div className="col g16" style={{ flex: '1 1 320px' }}>
                <h2 className="d2">Programme application</h2>
                <p className="muted">Apply for a programme or register for an event. Signed-in members have these details filled in automatically.</p>
                <Note>Partner programmes may have their own eligibility and selection. We only share your details with the delivery partner if you agree below.</Note>
              </div>
              {ref ? (
                <div className="card col g14 start" style={{ flex: '999 1 520px', padding: 40 }} role="status">
                  <span className="st st-open">Application received</span><h3 className="d3">Thank you — we’ve got it.</h3>
                  <p className="muted">Reference {ref}. You’ll get an email confirmation and updates on next steps for {pick}.</p>
                  <button type="button" className="btn btn-line" onClick={() => { setRef(''); setTried(false); }}>Submit another</button>
                </div>
              ) : (
                <form className="card ag" noValidate onSubmit={submit} style={{ flex: '999 1 520px', '--min': '240px', '--gap': '18px', padding: 32 }}>
                  <Field id="pp" label="Programme or event" className="span-all"><select id="pp" className="input" value={pick} onChange={(e) => setPick(e.target.value)}>{[...PROGRAMMES.map((p) => p.t), ...EVENTS.filter((e) => e.status !== 'Past').map((e) => e.t)].map((t) => <option key={t}>{t}</option>)}</select></Field>
                  <Field id="pn" label="Full name" error={err.name}><input id="pn" className={'input' + (err.name ? ' is-err' : '')} autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
                  <Field id="pe" label="Email" error={err.email}><input id="pe" type="email" className={'input' + (err.email ? ' is-err' : '')} autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
                  <Field id="pi" label="Institution" optional><input id="pi" className="input" value={f.inst} onChange={(e) => setF({ ...f, inst: e.target.value })} /></Field>
                  <Field id="ps" label="State"><select id="ps" className="input" value={f.state} onChange={(e) => setF({ ...f, state: e.target.value })}><option value="">Select state</option>{STATES.map((s) => <option key={s}>{s}</option>)}</select></Field>
                  <Field id="pw" label="Why do you want to take part?" optional className="span-all"><textarea id="pw" className="input" value={f.why} onChange={(e) => setF({ ...f, why: e.target.value })} /></Field>
                  <label className="check span-all"><input type="checkbox" checked={f.share} onChange={(e) => setF({ ...f, share: e.target.checked })} />I agree ASSW may share my details with the named delivery partner for this programme.</label>
                  <div className="span-all"><button type="submit" className="btn btn-primary">Submit application</button></div>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

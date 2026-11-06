import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FlowHeader, UserChip } from '../../components/Shells.jsx';
import { Field } from '../../components/UI.jsx';
import { EVENTS, NEWS } from '../../data/programmes.js';
import { STATES } from '../../data/site.js';
import { useSession } from '../../lib/store.js';

function load(email) { try { return JSON.parse(localStorage.getItem('assw-profile-' + email)) || null; } catch { return null; } }

export default function MemberPortal() {
  const s = useSession();
  const [p, setP] = useState(() => load(s?.email) || { name: s?.name || '', institution: '', course: '', level: '', state: '', email1: true, email2: true, wa: false, sms: false });
  const [saved, setSaved] = useState(false);
  const [reg, setReg] = useState([]);
  if (!s) return <Navigate to="/auth" replace />;
  const up = (k) => (e) => { setSaved(false); setP({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }); };
  const save = (e) => { e.preventDefault(); try { localStorage.setItem('assw-profile-' + s.email, JSON.stringify(p)); } catch { /* ignore */ } setSaved(true); };

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <FlowHeader title="Member Portal" right={<><nav className="nav hide-sm" aria-label="Member" style={{ gap: 22 }}><Link to="/programmes">Programmes</Link><Link to="/news">Resources</Link><Link to="/opportunities">Opportunities</Link></nav><UserChip /></>} />
      <main id="main" className="wrap col g24" style={{ paddingTop: 32, paddingBottom: 64 }}>
        <div className="panel-d row between g24" style={{ padding: 40 }}>
          <div className="col g12" style={{ maxWidth: 640 }}><span className="kicker">General member · free</span><h1 className="d2">Welcome back, {s.name.split(' ')[0]}.</h1><p style={{ color: 'var(--muted-d)' }}>Your community hub for programmes, learning and opportunities.</p></div>
          <div className="col g12" style={{ background: 'var(--blue)', borderRadius: 24, padding: 24, maxWidth: 340 }}>
            <span style={{ font: '700 20px/1.2 var(--f-d)' }}>Started a business?</span>
            <span style={{ fontSize: 14, color: '#E6EEF9' }}>Apply for SCCN enterprise membership to get listed in the catalogue.</span>
            <Link className="btn btn-white btn-sm self-start" to="/apply">Register Your Business</Link>
          </div>
        </div>
        <div className="layout-side" style={{ gap: 24 }}>
          <div className="content col g20">
            <div className="box col g16">
              <div className="row between"><h2 className="d4">Upcoming for you</h2><Link to="/programmes?tab=events" className="small">All events</Link></div>
              <div className="col">
                {EVENTS.filter((e) => e.status !== 'Past').map((e) => {
                  const d = new Date(e.date); const on = reg.includes(e.t);
                  return (
                    <div key={e.t} className="row g14" style={{ padding: '14px 0', borderTop: '1px solid var(--line)' }}>
                      <div className="col center" style={{ width: 56, height: 56, borderRadius: 16, background: e.where === 'Online' ? 'var(--blue)' : 'var(--ink)', color: '#fff', justifyContent: 'center', flex: 'none' }}><span style={{ font: '700 20px/1 var(--f-d)' }}>{String(d.getDate()).padStart(2, '0')}</span><span style={{ fontSize: 10, textTransform: 'uppercase' }}>{d.toLocaleDateString('en-GB', { month: 'short' })}</span></div>
                      <div className="grow" style={{ minWidth: 200 }}><span className="fw6" style={{ display: 'block' }}>{e.t}</span><span className="small">{e.where} · {e.time}</span></div>
                      {on ? <span className="st st-open">Registered</span> : <button type="button" className="btn btn-primary btn-sm" onClick={() => setReg(reg.concat(e.t))}>Register</button>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="box col g16">
              <h2 className="d4">Recommended resources</h2>
              <div className="ag" style={{ '--min': '200px', '--gap': '12px' }}>
                {NEWS.filter((n) => n.type === 'Guide').map((n) => <Link key={n.t} to="/news?t=Guide" className="card-p card-link col g6" style={{ padding: 18 }}><span className="st st-info self-start">Guide</span><span className="fw6">{n.t}</span></Link>)}
              </div>
            </div>
          </div>
          <div className="aside col g20" style={{ flexBasis: 340 }}>
            <form className="box col g14" onSubmit={save}>
              <div className="row between"><h2 className="d4">My profile</h2>{saved && <span className="st st-open" role="status">Saved</span>}</div>
              <Field id="m1" label="Name"><input id="m1" className="input" value={p.name} onChange={up('name')} autoComplete="name" /></Field>
              <Field id="m2" label="Institution"><input id="m2" className="input" value={p.institution} onChange={up('institution')} /></Field>
              <div className="ag" style={{ '--min': '130px', '--gap': '12px' }}>
                <Field id="m3" label="Course"><input id="m3" className="input" value={p.course} onChange={up('course')} /></Field>
                <Field id="m4" label="Level"><select id="m4" className="input" value={p.level} onChange={up('level')}><option value="">Select…</option>{['100', '200', '300', '400', '500+', 'Graduated'].map((l) => <option key={l}>{l}</option>)}</select></Field>
              </div>
              <Field id="m5" label="Location"><select id="m5" className="input" value={p.state} onChange={up('state')}><option value="">Select…</option>{STATES.map((x) => <option key={x}>{x}</option>)}</select></Field>
              <fieldset className="col g10" style={{ border: 0, padding: 0, margin: '6px 0 0' }}>
                <legend className="lbl" style={{ marginBottom: 10 }}>Contact preferences</legend>
                <label className="check"><input type="checkbox" checked={p.email1} onChange={up('email1')} />Email — programme updates</label>
                <label className="check"><input type="checkbox" checked={p.email2} onChange={up('email2')} />Email — opportunity notices</label>
                <label className="check"><input type="checkbox" checked={p.wa} onChange={up('wa')} />WhatsApp (official ASSW line)</label>
                <label className="check"><input type="checkbox" checked={p.sms} onChange={up('sms')} />SMS</label>
              </fieldset>
              <button type="submit" className="btn btn-dark btn-sm self-start">Save changes</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

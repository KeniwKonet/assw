import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AdminShell } from '../../components/Shells.jsx';
import { Check } from '../../components/Icons.jsx';
import { Field, Note, Placeholder, Tabs } from '../../components/UI.jsx';
import { decide, updateApp, useApps } from '../../lib/store.js';
import { STATUS, PAY, fmtDT } from '../../lib/admin.js';
import { READINESS } from '../../data/site.js';

const CRITERIA = ['Problem / solution clarity', 'Prototype or proof of concept', 'Customer / market evidence', 'Traction', 'Team capacity', 'Formalisation', 'Financial records', 'Pitch / application quality', 'Opportunity fit'];
const LEVELS = ['Not evident', 'Emerging', 'Evident'];
const DECISIONS = [['approve', 'Approve'], ['correct', 'Request correction'], ['decline', 'Decline']];

export default function AdminReview() {
  const { id } = useParams();
  return <Review key={id} id={id} />;
}

function Review({ id }) {
  const nav = useNavigate();
  const apps = useApps();
  const app = apps.find((a) => a.id === id);
  const [tab, setTab] = useState('biz');
  const [c, setC] = useState(Array(9).fill(1));
  const [readiness, setReadiness] = useState(app?.readiness || 'Developing');
  const [d, setD] = useState('approve');
  const [reason, setReason] = useState('');
  const [err, setErr] = useState(false);
  const [revealed, setRevealed] = useState(false);

  if (!app) return <AdminShell><Note kind="warn">Application {id} not found. <Link to="/admin/registry">Back to registry</Link></Note></AdminShell>;
  const queue = apps.filter((a) => a.status === 'received');
  const idx = queue.findIndex((a) => a.id === id);
  const nextId = queue[idx + 1]?.id || queue.find((a) => a.id !== id)?.id;
  const decided = app.status !== 'received';
  const paid = app.payment.status === 'verified';
  const checks = [['Required fields', true], ['Payment verified', paid], ['No duplicates', !app.duplicateOf], ['Catalogue consent', app.consentCatalogue]];

  const confirm = () => {
    if (d !== 'approve' && !reason.trim()) { setErr(true); return; }
    decide(app.id, d, reason.trim(), readiness);
  };
  const dStyle = (k, on) => ({ minHeight: 48, padding: '0 16px', borderRadius: 14, cursor: 'pointer', textAlign: 'left', font: '600 15px/1 var(--f)', border: '1.5px solid', ...(on ? (k === 'approve' ? { background: 'var(--ok)', color: '#fff', borderColor: 'var(--ok)' } : k === 'correct' ? { background: 'var(--warn-10)', color: '#4A3200', borderColor: 'var(--warn)' } : { background: 'var(--red-10)', color: '#5A1416', borderColor: 'var(--red)' }) : { background: '#fff', color: 'var(--ink)', borderColor: 'var(--line)' }) });

  return (
    <AdminShell role="Enterprise Reviewer">
      <div className="bar">
        <div className="col g6">
          <Link to="/admin/registry" className="small">← Registry</Link>
          <div className="row g12"><h1 className="d3">{app.business}</h1><span className={'st st-' + STATUS[app.status][1]}>{STATUS[app.status][0]}</span></div>
          <span className="small">{app.id} · submitted {fmtDT(app.submittedAt)} · {app.founder}, {app.inst}</span>
        </div>
        {nextId && <button type="button" className="btn btn-line btn-sm" onClick={() => nav('/admin/review/' + nextId)}>Next in queue →</button>}
      </div>

      <div className="layout-side" style={{ gap: 20 }}>
        <div className="content col g20">
          <div className="ag" style={{ '--min': '170px', '--gap': '10px' }}>
            {checks.map(([t, ok]) => <div key={t} className="box row g10" style={{ padding: 16 }}><span className={'st ' + (ok ? 'st-open' : 'st-red')}>{ok ? '✓' : '!'}</span><span style={{ fontSize: 14, fontWeight: 500 }}>{t}</span></div>)}
          </div>
          {!paid && <Note kind="warn">Payment status: {PAY[app.payment.status][0]}. Approval should wait until payment is verified server-side.</Note>}
          {app.duplicateOf && <Note kind="red">Possible duplicate of existing listing “{app.duplicateOf}” (same founder and institution). Check before approving.</Note>}

          <div className="box col g18">
            <Tabs label="Application sections" items={[['biz', 'Business'], ['formal', 'Formalisation & traction'], ['files', 'Uploads'], ['needs', 'Needs & consents']]} value={tab} onChange={setTab} />
            {tab === 'biz' && (
              <dl className="ag" style={{ '--min': '260px', '--gap': '16px 24px', fontSize: 14, margin: 0 }}>
                {[['Trading name', app.business], ['Sector', app.sector], ['Stage', app.stage], ['State', app.state], ['Founder', app.founder], ['Institution', app.inst]].map(([k, v]) => <div key={k}><dt className="small">{k}</dt><dd className="fw6" style={{ margin: '4px 0 0' }}>{v || '—'}</dd></div>)}
                <div className="span-all"><dt className="small">Description</dt><dd style={{ margin: '4px 0 0' }}>{app.description}</dd></div>
              </dl>
            )}
            {tab === 'formal' && (
              <dl className="ag" style={{ '--min': '260px', '--gap': '16px 24px', fontSize: 14, margin: 0 }}>
                <div><dt className="small">CAC status</dt><dd className="fw6" style={{ margin: '4px 0 0' }}>Registered — business name</dd></div>
                <div><dt className="small">CAC number <span className="st st-dark" style={{ minHeight: 20, fontSize: 10 }}>Restricted</span></dt><dd className="fw6" style={{ margin: '4px 0 0' }}>{revealed ? 'BN 3829117' : 'BN ••••••7'} {!revealed && <button type="button" className="btn btn-text btn-sm" style={{ minHeight: 0, color: 'var(--blue)' }} onClick={() => { setRevealed(true); updateApp(app.id, {}, 'Revealed restricted field (CAC no.)', 'Reviewer'); }}>Reveal (logged)</button>}</dd></div>
                <div><dt className="small">Business bank account</dt><dd className="fw6" style={{ margin: '4px 0 0' }}>Yes</dd></div>
                <div><dt className="small">Customers</dt><dd className="fw6" style={{ margin: '4px 0 0' }}>21–100 · repeat customers</dd></div>
                <div><dt className="small">Revenue range <span className="st st-dark" style={{ minHeight: 20, fontSize: 10 }}>Restricted</span></dt><dd className="fw6" style={{ margin: '4px 0 0' }}>Hidden for your role</dd></div>
              </dl>
            )}
            {tab === 'files' && (
              <div className="ag" style={{ '--min': '200px', '--gap': '10px' }}>
                <Placeholder label="Logo · public" style={{ height: 130 }} /><Placeholder label="Product 1 · public" style={{ height: 130 }} /><Placeholder label="Product 2 · public" style={{ height: 130 }} />
                <div className="upload" style={{ padding: 14 }}><div className="col g4"><span className="fw6" style={{ fontSize: 14 }}>CAC certificate.pdf</span><span className="small">Restricted · access logged</span></div></div>
                <div className="upload" style={{ padding: 14 }}><div className="col g4"><span className="fw6" style={{ fontSize: 14 }}>Pitch deck.pdf</span><span className="small">Restricted · access logged</span></div></div>
              </div>
            )}
            {tab === 'needs' && <div className="col g12"><span className="lbl">Consents</span><span className="small">Catalogue {app.consentCatalogue ? '✓' : '✗'} · Referrals {app.consentReferral ? '✓' : '✗'}</span></div>}
          </div>

          <div className="box col g16">
            <div className="row between g12"><h2 className="d4">Readiness assessment</h2><span className="small">Internal · guides support and matching · never published or scored</span></div>
            <div className="col">
              {CRITERIA.map((t, i) => (
                <div key={t} className="row between g12" style={{ padding: '10px 0', borderTop: '1px solid var(--line)' }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }} id={'cr' + i}>{t}</span>
                  <div role="radiogroup" aria-labelledby={'cr' + i} className="row g4" style={{ background: 'var(--paper)', padding: 4, borderRadius: 999, flexWrap: 'nowrap' }}>
                    {LEVELS.map((l, k) => <button key={l} type="button" role="radio" aria-checked={c[i] === k} onClick={() => { const n = c.slice(); n[i] = k; setC(n); }} style={{ minHeight: 34, padding: '0 12px', borderRadius: 999, border: 0, cursor: 'pointer', font: '600 12px/1 var(--f)', background: c[i] === k ? 'var(--ink)' : 'transparent', color: c[i] === k ? '#fff' : 'var(--muted)' }}>{l}</button>)}
                  </div>
                </div>
              ))}
            </div>
            <Field id="rs" label="Internal readiness status"><select id="rs" className="input" value={readiness} onChange={(e) => setReadiness(e.target.value)}>{READINESS.map((r) => <option key={r}>{r}</option>)}</select></Field>
          </div>
        </div>

        <aside className="aside col g16" style={{ flexBasis: 340 }}>
          <div className="box col g14" style={{ border: '2px solid var(--ink)' }}>
            <h2 className="d4">Decision</h2>
            {decided ? (
              <div className="col g12" role="status">
                <span className={'st st-' + STATUS[app.status][1] + ' self-start'}>{STATUS[app.status][0]}</span>
                {app.no && <><span style={{ font: '700 24px/1 var(--f-d)', color: 'var(--blue)' }}>{app.no}</span><span className="small">Membership number and certificate generated. Founder notified to review their catalogue preview and confirm publication.</span><Link to={'/certificate/' + app.no} className="btn btn-line btn-sm self-start">View certificate</Link></>}
                {app.reason && <span className="small">Reason: “{app.reason}”</span>}
                {nextId && <button type="button" className="btn btn-primary btn-sm self-start" onClick={() => nav('/admin/review/' + nextId)}>Next application</button>}
              </div>
            ) : (
              <div className="col g10">
                <div role="radiogroup" aria-label="Decision" className="col g8">
                  {DECISIONS.map(([k, t]) => <button key={k} type="button" role="radio" aria-checked={d === k} onClick={() => { setD(k); setErr(false); }} style={dStyle(k, d === k)}>{t}</button>)}
                </div>
                <Field id="rr" label="Reason (recorded and shared with applicant)" error={err && 'A reason is required for this decision.'}>
                  <textarea id="rr" className={'input' + (err ? ' is-err' : '')} value={reason} onChange={(e) => { setReason(e.target.value); setErr(false); }} placeholder={d === 'approve' ? 'Optional note for the record' : d === 'correct' ? 'What should the applicant fix?' : 'Why is this application declined?'} style={{ minHeight: 100 }} />
                </Field>
                <button type="button" className="btn btn-primary" onClick={confirm}>Confirm decision</button>
              </div>
            )}
          </div>
          <div className="box col g14">
            <h2 className="d4">Audit log</h2>
            <ol className="tl" style={{ listStyle: 'none' }}>
              {[...app.log].reverse().map(([t, who, at], i) => <li key={i} className="tl-i done"><span className="tl-dot" style={{ width: 14, height: 14, margin: 5 }} /><div className="col g4"><span style={{ fontSize: 14, fontWeight: 500 }}>{t}</span><span className="small">{who} · {fmtDT(at)}</span></div></li>)}
            </ol>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}

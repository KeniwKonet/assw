import { useState } from 'react';
import { AdminShell } from '../../components/Shells.jsx';
import { Field, useToast } from '../../components/UI.jsx';
import { OPPORTUNITIES, OPP_TYPES, oppStatus, fmtDate } from '../../data/opportunities.js';
import { useApps } from '../../lib/store.js';
import { registryRows } from '../../lib/admin.js';

const initial = () => OPPORTUNITIES.map((o) => ({ ...o, admin: oppStatus(o).key === 'closed' ? 'Closed' : o.slug === 'agri-youth-accelerator-3' ? 'Needs re-verification' : 'Published' }))
  .concat([{ slug: 'state-procurement-student-suppliers', type: 'Procurement', sector: 'Any sector', provider: '[Provider name]', title: 'State procurement — student suppliers', desc: '', target: '', elig: '', benefit: null, location: '', deadline: null, verified: null, docs: '', stage: [], admin: 'Draft' }]);
const TONE = { Published: 'open', 'Needs re-verification': 'closing', Draft: 'closed', Closed: 'closed', Archived: 'dark' };

export default function AdminOpportunities() {
  const [list, setList] = useState(initial);
  const [sel, setSel] = useState(0);
  const [verified, setVerified] = useState(false);
  const [notified, setNotified] = useState([]);
  const [toast, say] = useToast();
  const apps = useApps();
  const cur = list[sel];
  const upd = (patch) => setList(list.map((o, i) => (i === sel ? { ...o, ...patch } : o)));
  const up = (k) => (e) => upd({ [k]: e.target.value });
  const act = (status) => {
    if (status === 'Published' && !verified) { say('Confirm verification against the official source before publishing'); return; }
    if (status === 'Published' && cur.deadline && new Date(cur.deadline) < new Date()) { say('Deadline has passed — expired calls cannot be published as open'); return; }
    upd({ admin: status, verified: status === 'Published' ? new Date().toISOString().slice(0, 10) : cur.verified });
    say(`${cur.title}: ${status.toLowerCase()} — logged`);
  };
  const matches = registryRows(apps).filter((r) => r.status === 'approved' || r.status === 'received').filter((r) => cur.stage.length === 0 || cur.stage.includes(r.stage) || r.stage === '—').slice(0, 5);

  return (
    <AdminShell role="Partnerships / Opportunity Officer">
      {toast}
      <div className="bar">
        <div className="col g6"><span className="small">Monitor · verify · tag · match · track</span><h1 className="d3">Opportunity Desk</h1></div>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => { setList([...list, { slug: 'new-' + list.length, type: 'Grant', sector: 'Any sector', provider: '', title: 'Untitled opportunity', desc: '', target: '', elig: '', benefit: null, location: '', deadline: null, verified: null, docs: '', stage: [], admin: 'Draft' }]); setSel(list.length); setVerified(false); }}>New opportunity</button>
      </div>
      <div className="layout-side" style={{ gap: 20 }}>
        <div className="aside col g10" style={{ flexBasis: 340 }}>
          {list.map((o, i) => (
            <button key={o.slug} type="button" aria-pressed={i === sel} onClick={() => { setSel(i); setVerified(false); }} className="col g8 start w-full"
              style={{ padding: 16, borderRadius: 18, cursor: 'pointer', fontFamily: 'var(--f)', background: '#fff', border: '2px solid ' + (i === sel ? 'var(--blue)' : 'var(--line)') }}>
              <span className="row between g8 w-full"><span className={'st st-' + TONE[o.admin]}>{o.admin}</span><span style={{ fontSize: 12, color: 'var(--muted)' }}>{o.deadline ? fmtDate(o.deadline) : 'No deadline'}</span></span>
              <span style={{ font: '700 16px/1.3 var(--f-d)', textAlign: 'left', color: 'var(--ink)' }}>{o.title}</span>
              <span style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'left' }}>{o.provider || '[Provider]'} · verified {o.verified ? fmtDate(o.verified) : '—'}</span>
            </button>
          ))}
        </div>

        <div className="content col g20">
          <div className="box col g18">
            <div className="bar">
              <div className="row g10"><h2 className="d4">{cur.title}</h2><span className={'st st-' + TONE[cur.admin]}>{cur.admin}</span></div>
              <div className="row g8"><button type="button" className="btn btn-primary btn-sm" onClick={() => act('Published')}>Publish</button><button type="button" className="btn btn-line btn-sm" onClick={() => act('Closed')}>Close</button><button type="button" className="btn btn-line btn-sm" onClick={() => act('Archived')}>Archive</button></div>
            </div>
            <div className="ag" style={{ '--min': '240px', '--gap': '14px' }}>
              <Field id="o1" label="Title"><input id="o1" className="input" value={cur.title} onChange={up('title')} /></Field>
              <Field id="o2" label="Provider"><input id="o2" className="input" value={cur.provider} onChange={up('provider')} /></Field>
              <Field id="o3" label="Type"><select id="o3" className="input" value={cur.type} onChange={up('type')}>{OPP_TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
              <Field id="o4" label="Sector"><input id="o4" className="input" value={cur.sector} onChange={up('sector')} /></Field>
              <Field id="o5" label="Description" className="span-all"><textarea id="o5" className="input" style={{ minHeight: 90 }} value={cur.desc} onChange={up('desc')} /></Field>
              <Field id="o6" label="Target group"><input id="o6" className="input" value={cur.target} onChange={up('target')} /></Field>
              <Field id="o7" label="Eligibility"><input id="o7" className="input" value={cur.elig} onChange={up('elig')} /></Field>
              <Field id="o8" label="Location"><input id="o8" className="input" value={cur.location} onChange={up('location')} /></Field>
              <Field id="o9" label="Award / benefit" optional hint="Only if confirmed by the provider."><input id="o9" className="input" value={cur.benefit || ''} onChange={up('benefit')} /></Field>
              <Field id="o10" label="Deadline (WAT)"><input id="o10" type="datetime-local" className="input" value={cur.deadline ? cur.deadline.slice(0, 16) : ''} onChange={(e) => upd({ deadline: e.target.value ? e.target.value + ':00+01:00' : null })} /></Field>
              <Field id="o12" label="Application link"><input id="o12" className="input" placeholder="https://" /></Field>
              <Field id="o13" label="Required documents"><input id="o13" className="input" value={cur.docs} onChange={up('docs')} /></Field>
              <Field id="o14" label="Official source URL"><input id="o14" className="input" placeholder="https://" /></Field>
            </div>
            <div className="row g14" style={{ padding: '14px 16px', background: 'var(--paper)', borderRadius: 14 }}>
              <label className="check grow" style={{ minWidth: 240 }}><input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} />I verified these details against the provider’s official source today.</label>
              <span className="small">Auto-closes at deadline · reminder 3 days before</span>
            </div>
          </div>

          <div className="box col g14">
            <div className="bar"><h2 className="d4">Potentially eligible ventures</h2><span className="small">Authorised registry data · only founders with communications consent can be notified</span></div>
            <div className="tbl-box">
              <table className="tbl" style={{ minWidth: 680 }}>
                <thead><tr><th>Business</th><th>Stage · readiness</th><th>Consent</th><th><span className="sr">Action</span></th></tr></thead>
                <tbody>
                  {matches.map((m) => {
                    const consent = m.member || m.consentReferral || m.consentCatalogue;
                    const sent = notified.includes(m.id + cur.slug);
                    return (
                      <tr key={m.id}>
                        <td className="fw6">{m.business}</td><td style={{ fontSize: 13 }}>{m.stage} · {m.readiness || '—'}</td>
                        <td><span className={'st ' + (consent ? 'st-open' : 'st-closed')}>{consent ? 'Comms consent' : 'No consent'}</span></td>
                        <td><button type="button" className={'btn btn-sm ' + (!consent ? 'btn-line is-disabled' : sent ? 'btn-line' : 'btn-dark')} disabled={!consent || sent} onClick={() => { setNotified([...notified, m.id + cur.slug]); say(`Notice sent to ${m.business}`); }}>{!consent ? 'Can’t notify' : sent ? 'Notified ✓' : 'Notify founder'}</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminShell } from '../../components/Shells.jsx';
import { Search } from '../../components/Icons.jsx';
import { useToast } from '../../components/UI.jsx';
import { useApps } from '../../lib/store.js';
import { registryRows, STATUS, PAY, ago } from '../../lib/admin.js';
import { READINESS } from '../../data/site.js';

const GROUPS = {
  All: () => true,
  'Awaiting review': (r) => r.status === 'received',
  Members: (r) => r.status === 'approved',
  'Correction requested': (r) => r.status === 'correction',
  Duplicates: (r) => !!r.duplicateOf,
  'Expired / declined': (r) => r.status === 'expired' || r.status === 'declined',
};

export default function AdminRegistry() {
  const apps = useApps();
  const all = registryRows(apps);
  const [g, setG] = useState('All');
  const [q, setQ] = useState('');
  const [sector, setSector] = useState('');
  const [state, setState] = useState('');
  const [ready, setReady] = useState('');
  const [sel, setSel] = useState([]);
  const [toast, say] = useToast();
  const ql = q.toLowerCase();
  const rows = all.filter((r) => GROUPS[g](r) && (!ql || (r.business + r.id + (r.no || '') + r.founder).toLowerCase().includes(ql)) && (!sector || r.sector === sector) && (!state || r.state === state) && (!ready || r.readiness === ready));
  const sectors = [...new Set(all.map((r) => r.sector))].sort();
  const states = [...new Set(all.map((r) => r.state))].sort();

  const exportCsv = () => {
    // Controlled export: aggregate-safe fields only (no personal contact data).
    const head = ['id', 'business', 'sector', 'state', 'status', 'readiness'];
    const csv = [head.join(','), ...rows.map((r) => head.map((h) => `"${String(h === 'status' ? STATUS[r.status][0] : r[h] || '').replace(/"/g, '""')}"`).join(','))].join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'sccn-registry-export.csv'; a.click();
    say('Export created and logged (no personal contact fields)');
  };

  return (
    <AdminShell>
      {toast}
      <div className="bar">
        <div className="col g6"><span className="small">Secure registry · private data restricted by role</span><h1 className="d3">Enterprise registry</h1></div>
        <div className="row g10"><Link className="btn btn-line btn-sm" to="/admin/content">Manage categories</Link><button type="button" className="btn btn-dark btn-sm" onClick={exportCsv}>Controlled export (CSV)</button></div>
      </div>
      <div className="row g8">
        {Object.keys(GROUPS).map((k) => <button key={k} type="button" className={'tag' + (g === k ? ' on' : '')} aria-pressed={g === k} onClick={() => setG(k)}>{k} <span style={{ opacity: 0.6 }}>{all.filter(GROUPS[k]).length}</span></button>)}
      </div>
      <div className="box row g10" style={{ padding: 16 }}>
        <label className="search" style={{ flex: '1 1 260px' }}><Search /><span className="sr">Search registry</span><input className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Business, founder, SCCN no. or application ID" style={{ minHeight: 44 }} /></label>
        <select className="input" aria-label="Sector" value={sector} onChange={(e) => setSector(e.target.value)} style={{ flex: '0 1 200px', minHeight: 44 }}><option value="">All sectors</option>{sectors.map((s) => <option key={s}>{s}</option>)}</select>
        <select className="input" aria-label="State" value={state} onChange={(e) => setState(e.target.value)} style={{ flex: '0 1 150px', minHeight: 44 }}><option value="">All states</option>{states.map((s) => <option key={s}>{s}</option>)}</select>
        <select className="input" aria-label="Readiness" value={ready} onChange={(e) => setReady(e.target.value)} style={{ flex: '0 1 230px', minHeight: 44 }}><option value="">Any readiness status</option>{READINESS.map((r) => <option key={r}>{r}</option>)}</select>
      </div>
      {sel.length > 0 && (
        <div className="row g12" style={{ background: 'var(--ink)', color: '#fff', borderRadius: 16, padding: '12px 16px' }}>
          <span className="fw6">{sel.length} selected</span>
          {['Assign reviewer', 'Tag for opportunity', 'Send renewal reminder'].map((t) => <button key={t} type="button" className="btn btn-ghost-d btn-sm" onClick={() => { say(`${t}: ${sel.length} record(s) — logged`); setSel([]); }}>{t}</button>)}
        </div>
      )}
      <div className="tbl-box">
        <table className="tbl" style={{ minWidth: 1040 }}>
          <caption className="sr">Enterprise registry records</caption>
          <thead><tr><th style={{ width: 40 }}><span className="sr">Select</span></th><th>Business</th><th>Founder · institution</th><th>Sector · state</th><th>Status</th><th>Readiness</th><th>Payment</th><th>Updated</th><th><span className="sr">Open</span></th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td><input type="checkbox" aria-label={'Select ' + r.business} checked={sel.includes(r.id)} onChange={() => setSel(sel.includes(r.id) ? sel.filter((x) => x !== r.id) : sel.concat(r.id))} style={{ width: 18, height: 18, accentColor: 'var(--blue)' }} /></td>
                <td><div className="col g4"><span className="fw6">{r.business}</span><span className="small">{r.no || r.id}</span>{r.duplicateOf && <span className="st st-red self-start">Possible duplicate</span>}</div></td>
                <td><div className="col g4"><span>{r.founder}</span><span className="small">{r.inst}</span></div></td>
                <td><div className="col g4"><span>{r.sector}</span><span className="small">{r.state}</span></div></td>
                <td><span className={'st st-' + STATUS[r.status][1]}>{r.featured ? 'Featured Business' : STATUS[r.status][0]}</span></td>
                <td style={{ fontSize: 13 }}>{r.readiness || '—'}</td>
                <td><span className={'st st-' + PAY[r.payment.status][1]}>{PAY[r.payment.status][0]}</span></td>
                <td className="small">{ago(r.submittedAt)}</td>
                <td>{r.member ? <Link className="btn btn-line btn-sm" to={'/verify?no=' + r.no}>Record</Link> : <Link className="btn btn-line btn-sm" to={'/admin/review/' + r.id}>Open</Link>}</td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={9} style={{ textAlign: 'center', padding: 40 }} className="muted">No records match these filters.</td></tr>}
          </tbody>
        </table>
      </div>
      <span className="small">Showing {rows.length} of {all.length} records · exports are logged and limited to authorised roles</span>
    </AdminShell>
  );
}

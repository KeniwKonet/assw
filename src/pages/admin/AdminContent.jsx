import { useState } from 'react';
import { AdminShell } from '../../components/Shells.jsx';
import { Note, Tabs, useToast } from '../../components/UI.jsx';
import { CATEGORIES } from '../../data/site.js';
import { useApps } from '../../lib/store.js';
import { fmtDT } from '../../lib/admin.js';

const FLOW = ['Draft', 'In review', 'Approved', 'Published', 'Archived'];
const NEXT = { Draft: 'In review', 'In review': 'Approved', Approved: 'Published', Published: 'Archived', Archived: 'Draft' };
const ACTION = { Draft: 'Submit for review', 'In review': 'Approve', Approved: 'Publish', Published: 'Archive', Archived: 'Restore' };
const TONE = { Draft: 'closed', 'In review': 'info', Approved: 'open', Published: 'dark', Archived: 'closed' };
const CONTENT = [['Homepage — impact snapshot', 'Homepage', 'In review', 'Content Editor'], ['BoostHer programme page', 'Programme', 'Draft', 'Content Editor'], ['GenNext Micro Business School announcement', 'News', 'In review', 'Partnerships'], ['Leadership & governance', 'Page', 'Approved', 'Super Admin'], ['Privacy Notice v1.0', 'Policy', 'Published', 'Super Admin'], ['Annual report 2025', 'Report', 'Archived', 'M&E Officer']];
const METRICS = [['20,000+ students impacted', '“Impacted” undefined; needs deduplication', '[—]', '[Programme sources]', 'M&E Officer', 'Needs evidence', 'closing'], ['30,000+ reached', 'Reach vs attendance vs unique people unclear', '[—]', '[—]', 'M&E Officer', 'Needs evidence', 'closing'], ['10+ states', 'States with evidenced activity', '2017–2026', 'Activity log', 'Programmes', 'In review', 'info'], ['300+ institutions', 'Reached / represented / registered — choose one', '[—]', '[—]', 'Partnerships', 'Needs evidence', 'closing'], ['Published catalogue listings', 'Approved listings with publication consent', 'Live', 'Registry', 'SCCN Admin', 'Approved', 'open']];
const Y = '✓', N = '—';
const ROLES = [['Super Administrator', Y, Y, 'Logged', Y, Y, Y, Y], ['ASSW Content Editor', Y, N, N, N, N, N, N], ['SCCN Programme Administrator', N, Y, 'Logged', 'View', Y, 'Limited', N], ['Enterprise Reviewer', N, 'Review', 'Logged', N, N, N, N], ['Finance Administrator', N, 'Status only', N, Y, N, 'Payments', N], ['Partnerships / Opportunity Officer', N, 'View', N, N, Y, N, N], ['M&E Officer', 'Reports', 'Aggregate', N, 'Aggregate', 'Aggregate', 'Approved', N], ['Founder / Member', N, 'Own', 'Own', 'Own receipts', 'View', 'Own data', N], ['Mentor / Partner', N, 'Shared only', N, N, N, N, N]];

export default function AdminContent() {
  const [tab, setTab] = useState('content');
  const [items, setItems] = useState(CONTENT.map(([t, type, s, o]) => ({ t, type, s, o })));
  const [cats, setCats] = useState(CATEGORIES);
  const [newCat, setNewCat] = useState('');
  const [toast, say] = useToast();
  const apps = useApps();
  const audit = apps.flatMap((a) => a.log.map(([x, who, at]) => ({ x, who, at, r: a.no || a.id }))).sort((a, b) => new Date(b.at) - new Date(a.at)).slice(0, 25);

  return (
    <AdminShell role="Super Administrator">
      {toast}
      <div className="bar">
        <div className="col g6"><span className="small">Draft → review → approve → publish → archive</span><h1 className="d3">Content, roles &amp; audit</h1></div>
        <Tabs label="Section" items={[['content', 'Content'], ['categories', 'Categories'], ['metrics', 'Metrics register'], ['roles', 'Roles & permissions'], ['audit', 'Audit log']]} value={tab} onChange={setTab} />
      </div>

      {tab === 'content' && (
        <div className="col g18">
          <div className="ag" style={{ '--min': '150px', '--gap': '10px' }}>
            {FLOW.map((f) => <div key={f} className="col g8" style={{ padding: 18, borderRadius: 18, ...(f === 'In review' ? { background: 'var(--blue)', color: '#fff' } : { background: '#fff', border: '1px solid var(--line)' }) }}><span style={{ font: '700 30px/1 var(--f-d)' }}>{items.filter((i) => i.s === f).length}</span><span style={{ fontSize: 13, fontWeight: 600 }}>{f}</span></div>)}
          </div>
          <div className="tbl-box"><table className="tbl"><thead><tr><th>Title</th><th>Type</th><th>Status</th><th>Owner</th><th><span className="sr">Action</span></th></tr></thead><tbody>
            {items.map((it, i) => <tr key={it.t}><td className="fw6">{it.t}</td><td>{it.type}</td><td><span className={'st st-' + TONE[it.s]}>{it.s}</span></td><td>{it.o}</td><td><button type="button" className="btn btn-line btn-sm" onClick={() => { setItems(items.map((x, k) => (k === i ? { ...x, s: NEXT[x.s] } : x))); say(`${it.t}: ${NEXT[it.s]}`); }}>{ACTION[it.s]}</button></td></tr>)}
          </tbody></table></div>
        </div>
      )}

      {tab === 'categories' && (
        <div className="box col g16">
          <Note>Admins can add, merge and retire categories. Retiring a category keeps existing listings until they are recategorised.</Note>
          <form className="row g10" onSubmit={(e) => { e.preventDefault(); if (newCat.trim()) { setCats([...cats, newCat.trim()]); setNewCat(''); say('Category added'); } }}>
            <label className="grow" style={{ minWidth: 220 }}><span className="sr">New category</span><input className="input" value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New category name" /></label>
            <button type="submit" className="btn btn-primary">Add category</button>
          </form>
          <div className="row g8">{cats.map((c) => <span key={c} className="tag" style={{ cursor: 'default' }}>{c}<button type="button" aria-label={'Retire ' + c} onClick={() => { setCats(cats.filter((x) => x !== c)); say(c + ' retired'); }} style={{ border: 0, background: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 16, padding: 0 }}>×</button></span>)}</div>
        </div>
      )}

      {tab === 'metrics' && (
        <div className="col g16">
          <Note style={{ background: '#fff' }}>Only metrics marked Approved can appear on public pages. Each needs a definition, period, source, calculation method and owner.</Note>
          <div className="tbl-box"><table className="tbl" style={{ minWidth: 980 }}><thead><tr><th>Metric</th><th>Definition</th><th>Period</th><th>Source</th><th>Owner</th><th>Status</th></tr></thead><tbody>
            {METRICS.map((m) => <tr key={m[0]}><td className="fw6">{m[0]}</td><td className="small">{m[1]}</td><td>{m[2]}</td><td>{m[3]}</td><td>{m[4]}</td><td><span className={'st st-' + m[6]}>{m[5]}</span></td></tr>)}
          </tbody></table></div>
        </div>
      )}

      {tab === 'roles' && (
        <div className="col g16">
          <div className="bar"><span className="small">Least-privilege access. Admin roles require MFA.</span><button type="button" className="btn btn-primary btn-sm" onClick={() => say('Invitation flow — connect to backend')}>Invite staff member</button></div>
          <div className="tbl-box"><table className="tbl" style={{ minWidth: 1000 }}><thead><tr><th>Role</th><th>Content</th><th>Applications</th><th>Private evidence</th><th>Payments</th><th>Opportunities</th><th>Exports</th><th>Settings</th></tr></thead><tbody>
            {ROLES.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className={i === 0 ? 'fw6' : ''}>{c}</td>)}</tr>)}
          </tbody></table></div>
        </div>
      )}

      {tab === 'audit' && (
        <div className="tbl-box"><table className="tbl" style={{ minWidth: 800 }}><thead><tr><th>When</th><th>Who</th><th>Action</th><th>Record</th></tr></thead><tbody>
          {audit.map((a, i) => <tr key={i}><td className="small">{fmtDT(a.at)}</td><td>{a.who}</td><td style={{ fontWeight: 500 }}>{a.x}</td><td style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>{a.r}</td></tr>)}
        </tbody></table></div>
      )}
    </AdminShell>
  );
}

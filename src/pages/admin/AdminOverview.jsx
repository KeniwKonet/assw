import { Link } from 'react-router-dom';
import { AdminShell } from '../../components/Shells.jsx';
import { Note } from '../../components/UI.jsx';
import { useApps, useSession } from '../../lib/store.js';
import { registryRows, ago } from '../../lib/admin.js';
import { OPPORTUNITIES, oppStatus } from '../../data/opportunities.js';
import { READINESS } from '../../data/site.js';

const WEEKS = [[14, 4], [18, 6], [22, 5], [19, 7], [27, 8], [31, 6], [26, 9], [34, 7]];

export default function AdminOverview() {
  const apps = useApps();
  const session = useSession();
  const rows = registryRows(apps);
  const awaiting = apps.filter((a) => a.status === 'received');
  const members = rows.filter((r) => r.status === 'approved');
  const published = rows.filter((r) => r.published);
  const openOpps = OPPORTUNITIES.filter((o) => oppStatus(o).key !== 'closed');
  const pending = apps.filter((a) => a.payment.status === 'pending');
  const readiness = READINESS.map((r) => [r, rows.filter((x) => x.readiness === r).length]);
  const rmax = Math.max(1, ...readiness.map((r) => r[1]));
  const byState = Object.entries(published.reduce((m, r) => ({ ...m, [r.state]: (m[r.state] || 0) + 1 }), {})).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...WEEKS.map((w) => w[0] + w[1]));
  const queue = [
    ...awaiting.map((a) => ({ tag: a.duplicateOf ? 'Duplicate?' : 'Review', tone: a.duplicateOf ? 'red' : 'info', t: `${a.business} — ${a.duplicateOf ? 'possible duplicate of ' + a.duplicateOf : 'new application'}`, age: ago(a.submittedAt), to: '/admin/review/' + a.id })),
    ...pending.map((a) => ({ tag: 'Payment', tone: 'closing', t: `${a.payment.ref} — paid at provider, webhook missing`, age: '1 day', to: '/admin/payments' })),
    { tag: 'Re-verify', tone: 'closing', t: 'Agri-youth accelerator — source page changed', age: 'Today', to: '/admin/opportunities' },
  ];

  return (
    <AdminShell>
      <div className="bar">
        <div className="col g6"><span className="small">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span><h1 className="d3">Good day, {session?.name?.split(' ')[0] || 'admin'}</h1></div>
        <div className="row g10"><label className="sr" htmlFor="period">Period</label><select id="period" className="input" style={{ width: 'auto', minHeight: 44 }}><option>Last 30 days</option><option>This quarter</option><option>2026</option></select><Link className="btn btn-line btn-sm" to="/admin/registry">Controlled export</Link></div>
      </div>
      <Note kind="warn" style={{ padding: '14px 18px' }}>Internal figures (partly sample data). Publish externally only through the approved metrics register.</Note>

      <div className="ag" style={{ '--min': '200px', '--gap': '14px' }}>
        {[['Applications in registry', apps.length, 'Live from portal', 'var(--muted)'], ['Awaiting review', awaiting.length, awaiting.length ? 'Oldest ' + ago(awaiting[awaiting.length - 1].submittedAt) : 'Queue clear', awaiting.length ? 'var(--red-d)' : 'var(--ok)'], ['Enterprise members', members.length, 'Active memberships', 'var(--muted)'], ['Published listings', published.length, `${members.length - published.length} awaiting consent`, 'var(--muted)'], ['Open opportunities', openOpps.length, 'Expired calls auto-closed', 'var(--muted)'], ['Payments to reconcile', pending.length, 'Pending webhooks', pending.length ? 'var(--warn)' : 'var(--ok)']].map(([t, v, d, c]) => (
          <div key={t} className="kpi"><span className="small">{t}</span><span className="v">{v}</span><span className="small" style={{ color: c }}>{d}</span></div>
        ))}
      </div>

      <div className="ag" style={{ '--min': '460px', '--gap': '20px' }}>
        <figure className="box col g18" style={{ margin: 0 }}>
          <div className="row between g12"><h2 className="d4">Applications per week</h2><span className="small">Sample · paid vs unpaid</span></div>
          <div className="row g10" style={{ alignItems: 'flex-end', height: 200, borderBottom: '1px solid var(--line)', paddingBottom: 4, flexWrap: 'nowrap' }} role="img" aria-label={'Weekly applications: ' + WEEKS.map((w) => w[0] + w[1]).join(', ')}>
            {WEEKS.map(([p, u], i) => (
              <div key={i} className="col g6" style={{ flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{p + u}</span>
                <div className="col" style={{ width: '100%', maxWidth: 36, height: ((p + u) / max) * 85 + '%', gap: 2 }}><div style={{ background: 'var(--blue-20)', borderRadius: '6px 6px 0 0', height: (u / (p + u)) * 100 + '%' }} /><div style={{ background: 'var(--blue)', borderRadius: '0 0 4px 4px', flex: 1 }} /></div>
              </div>
            ))}
          </div>
          <figcaption className="row g16" style={{ fontSize: 12 }}><span className="row g6"><span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--blue)' }} />Paid</span><span className="row g6"><span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--blue-20)' }} />Unpaid / draft</span></figcaption>
        </figure>
        <div className="box col g16">
          <div className="row between"><h2 className="d4">Readiness status</h2><span className="small">Internal only · not a ranking</span></div>
          {readiness.map(([t, v]) => (
            <div key={t} style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 220px) 1fr 32px', gap: 12, alignItems: 'center', fontSize: 13 }}><span>{t}</span><div style={{ height: 12, borderRadius: 99, background: 'var(--paper)' }}><div style={{ height: '100%', borderRadius: 99, background: 'var(--blue)', width: (v / rmax) * 100 + '%' }} /></div><span className="fw6" style={{ textAlign: 'right' }}>{v}</span></div>
          ))}
        </div>
      </div>

      <div className="ag" style={{ '--min': '460px', '--gap': '20px' }}>
        <div className="box col g6">
          <div className="row between" style={{ marginBottom: 8 }}><h2 className="d4">Needs your attention</h2><Link className="small" to="/admin/registry">Open registry</Link></div>
          {queue.map((q) => <Link key={q.t} to={q.to} className="row g14" style={{ padding: '14px 0', borderTop: '1px solid var(--line)', textDecoration: 'none', color: 'var(--ink)', flexWrap: 'nowrap' }}><span className={'st st-' + q.tone}>{q.tag}</span><span className="grow" style={{ fontWeight: 500, fontSize: 14 }}>{q.t}</span><span className="small">{q.age}</span></Link>)}
        </div>
        <div className="box col g6">
          <div className="row between" style={{ marginBottom: 8 }}><h2 className="d4">Published listings by state</h2></div>
          {byState.map(([s, v]) => <div key={s} className="row between" style={{ padding: '11px 0', borderTop: '1px solid var(--line)', fontSize: 14 }}><span>{s}</span><span className="fw6">{v}</span></div>)}
        </div>
      </div>
    </AdminShell>
  );
}

import { Link, Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Brand, Mark } from './Brand.jsx';
import { signOut, useApps, useSession } from '../lib/store.js';

/** Slim top bar for focused flows (application, payment, member portal). */
export function FlowHeader({ title, right }) {
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid var(--line)' }}>
      <div className="wrap row between g16" style={{ minHeight: 72 }}>
        <Link className="brand" to="/" aria-label="ASSW Nigeria home"><Mark height={34} /><span style={{ fontSize: 17 }}>{title}</span></Link>
        <div className="row g14">{right}</div>
      </div>
    </header>
  );
}

const ADMIN_NAV = [
  ['Overview', [['/admin', 'Dashboard', true]]],
  ['SCCN', [['/admin/registry', 'Enterprise registry'], ['/admin/review', 'Review queue', false, 'queue'], ['/admin/opportunities', 'Opportunity Desk'], ['/admin/payments', 'Payments']]],
  ['ASSW', [['/admin/content', 'Content, roles & audit']]],
];

export function AdminShell({ role = 'SCCN Programme Administrator', children }) {
  const apps = useApps();
  const nav = useNavigate();
  const loc = useLocation();
  const session = useSession();
  const queue = apps.filter((a) => a.status === 'received');
  const first = queue[0]?.id;
  if (!session || session.role !== 'admin') return <Navigate to="/auth?next=admin" replace />;
  return (
    <div className="app">
      <nav className="side" aria-label="Admin">
        <div style={{ padding: '4px 10px 6px' }}><Brand dark sub="Admin" to="/admin" compact /></div>
        <span style={{ color: '#7F8996', fontSize: 12, padding: '0 10px 6px' }}>{role} · MFA on</span>
        {ADMIN_NAV.map(([g, items]) => (
          <div key={g} className="col g6">
            <span className="grp">{g}</span>
            {items.map(([to, t, end, badge]) => (
              <NavLink key={to} end={end} to={badge === 'queue' ? (first ? '/admin/review/' + first : '/admin/registry') : to}
                className={({ isActive }) => 'nl' + (isActive || (badge === 'queue' && loc.pathname.startsWith('/admin/review')) ? ' on' : '')}>
                {t}{badge === 'queue' && queue.length > 0 && <span className="pill pill-red" style={{ marginLeft: 'auto', minHeight: 22, padding: '0 8px', fontSize: 11 }}>{queue.length}</span>}
              </NavLink>
            ))}
          </div>
        ))}
        <div className="col g6" style={{ marginTop: 'auto', paddingTop: 16 }}>
          <Link className="nl" to="/">View public site</Link>
          <button type="button" className="nl" onClick={() => { signOut(); nav('/auth'); }} style={{ background: 'none', border: 0, cursor: 'pointer', font: '500 14px/1 var(--f)', textAlign: 'left', color: '#C3CBD6', minHeight: 44, padding: '0 14px', borderRadius: 12 }}>Sign out</button>
        </div>
      </nav>
      <main className="main col g20" id="main">{children}</main>
    </div>
  );
}

export function UserChip() {
  const s = useSession();
  const nav = useNavigate();
  if (!s) return <Link className="btn btn-line btn-sm" to="/auth">Sign in</Link>;
  const ini = s.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="row g10">
      <span className="avatar" aria-hidden="true">{ini}</span>
      <span className="hide-sm fw6" style={{ fontSize: 14 }}>{s.name}</span>
      <button type="button" className="btn btn-text btn-sm" onClick={() => { signOut(); nav('/'); }}>Sign out</button>
    </div>
  );
}

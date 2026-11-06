import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Brand } from './Brand.jsx';
import { ArrowRight, Menu, Close, Search } from './Icons.jsx';
import { useSession } from '../lib/store.js';

const left = [['/about', 'About ASSW'], ['/what-we-do', 'What We Do'], ['/sccn', 'SCCN'], ['/programmes', 'Programmes']];
const right = [['/impact', 'Impact'], ['/get-involved', 'Get Involved'], ['/news', 'News']];
const drawer = [
  ['/about', 'About ASSW'], ['/what-we-do', 'What We Do'], ['/sccn', 'SCCN'], ['/catalogue', 'Student Enterprise Catalogue'],
  ['/opportunities', 'Opportunities & Funding'], ['/membership', 'Membership'], ['/programmes', 'Programmes'], ['/impact', 'Impact & Insights'],
  ['/get-involved', 'Get Involved'], ['/news', 'News & Resources'], ['/contact', 'Contact'],
];

const navCls = ({ isActive }) => (isActive ? 'on' : '');

export default function Header() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const session = useSession();
  useEffect(() => setOpen(false), [loc.pathname]);
  const sccnActive = ['/sccn', '/catalogue', '/register-business', '/membership', '/opportunities', '/verify'].some((p) => loc.pathname.startsWith(p));

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: '#fff', borderBottom: '1px solid var(--line)' }}>
      <div className="topbar">
        <div className="wrap row between g16" style={{ minHeight: 40 }}>
          <span className="hide-sm">Association for Students’ Social Welfare Nigeria · home of SCCN</span>
          <div className="row g20" style={{ marginLeft: 'auto' }}>
            {session ? (
              <Link to={session.role === 'admin' ? '/admin' : session.role === 'founder' ? '/portal/enterprise' : '/portal/member'}>{session.role === 'admin' ? 'Admin' : 'My portal'} · {session.name.split(' ')[0]}</Link>
            ) : (
              <>
                <Link to="/auth">Member Portal</Link>
                <Link to="/auth?next=enterprise">Enterprise Portal</Link>
              </>
            )}
            <Link to="/contact" className="hide-sm">Contact</Link>
            <Link to="/catalogue" aria-label="Search the catalogue" style={{ display: 'inline-flex' }}><Search size={16} /></Link>
          </div>
        </div>
      </div>
      <div className="wrap row g24" style={{ minHeight: 84, flexWrap: 'nowrap' }}>
        <nav className="nav hide-lg" aria-label="Primary" style={{ flex: 1 }}>
          {left.map(([to, t]) => (
            <NavLink key={to} to={to} className={to === '/sccn' ? () => (sccnActive ? 'on' : '') : navCls}>{t}</NavLink>
          ))}
        </nav>
        <Brand />
        <div className="row g24" style={{ flex: 1, justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
          <nav className="nav hide-lg" aria-label="Secondary">
            {right.map(([to, t]) => <NavLink key={to} to={to} className={navCls}>{t}</NavLink>)}
          </nav>
          <div className="row g10" style={{ flexWrap: 'nowrap' }}>
            <Link className="btn btn-outline btn-sm hide-sm" to="/auth?mode=join">Join ASSW <ArrowRight size={16} /></Link>
            <Link className="btn btn-primary btn-sm" to="/register-business">
              <span className="hide-sm">Register Your Business</span><span className="show-sm">Register</span>
            </Link>
            <button className="icon-btn show-lg" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="drawer show-lg" style={{ position: 'absolute', left: 0, right: 0, top: '100%', background: '#fff', borderBottom: '1px solid var(--line)', boxShadow: '0 24px 40px rgba(12,16,21,.12)', maxHeight: 'calc(100vh - 124px)', overflowY: 'auto' }}>
          <div className="wrap col" style={{ paddingTop: 16, paddingBottom: 24 }}>
            <div className="ag" style={{ '--min': '220px', '--gap': '10px', paddingBottom: 12 }}>
              <Link className="btn btn-primary" to="/register-business" style={{ fontFamily: 'var(--f)', fontSize: 15, border: 0 }}>Register Your Business</Link>
              <Link className="btn btn-outline" to="/auth?mode=join" style={{ fontFamily: 'var(--f)', fontSize: 15 }}>Join ASSW</Link>
            </div>
            {drawer.map(([to, t]) => <Link key={to} to={to}>{t} <span aria-hidden="true">→</span></Link>)}
          </div>
        </div>
      )}
    </header>
  );
}

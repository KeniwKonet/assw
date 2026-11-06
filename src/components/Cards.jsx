import { Link } from 'react-router-dom';
import { Pin } from './Icons.jsx';
import { oppStatus, fmtDeadline, fmtDate } from '../data/opportunities.js';

export function BizCard({ b, compact = false }) {
  return (
    <Link to={'/catalogue/' + b.slug} className="card-link col g14" style={{ color: 'var(--ink)', border: compact ? 0 : '1px solid var(--line)', borderRadius: 24, padding: compact ? 0 : '12px 12px 18px' }}>
      <div className="ph b" style={{ height: compact ? 220 : 190, borderRadius: compact ? '22px 22px 22px 70px' : '16px 16px 16px 56px', alignItems: 'flex-start', justifyContent: 'space-between' }} role="img" aria-label={b.name + ' photo placeholder'}>
        <span style={{ background: '#fff', fontWeight: 700, width: 44, height: 44, borderRadius: 12, display: 'grid', placeItems: 'center', padding: 0 }}>{b.initials}</span>
        {b.featured && <span className="pill pill-red" style={{ minHeight: 26, fontSize: 12 }}>Featured</span>}
      </div>
      <div className="col g6" style={{ padding: '0 6px' }}>
        <span className="d-card-title" style={{ color: 'var(--blue)' }}>{b.name}</span>
        <span className="small">{b.cat}{compact ? ' · ' + b.inst : ''}</span>
        {!compact && <p style={{ fontSize: 14, lineHeight: 1.5, color: '#2E3540' }}>{b.desc}</p>}
        <div className="row between g8" style={{ marginTop: 6 }}>
          <span className="row g6" style={{ fontSize: 13 }}><Pin />{b.city}, {b.state}</span>
          {!compact && <span className="small">{b.inst}</span>}
        </div>
      </div>
    </Link>
  );
}

export function OppCard({ o }) {
  const st = oppStatus(o);
  return (
    <Link to={'/opportunities/' + o.slug} className="card card-link col g14" style={{ padding: 26 }}>
      <div className="row between g12">
        <div className="row g8"><span className="tag" style={{ minHeight: 28, fontSize: 12 }}>{o.type}</span><span className="tag" style={{ minHeight: 28, fontSize: 12 }}>{o.sector}</span></div>
        <span className={'st st-' + st.tone}>{st.label}</span>
      </div>
      <div className="col g6">
        <span className="small">{o.provider}</span>
        <h2 style={{ fontSize: 25 }}>{o.title}</h2>
        <p style={{ fontSize: 15, color: '#2E3540' }}>{o.desc}</p>
      </div>
      <hr className="rule" />
      <div className="ag" style={{ '--min': '170px', '--gap': '12px', fontSize: 13 }}>
        <div className="col g4"><span className="muted">Eligibility</span><span className="fw6">{o.elig}</span></div>
        <div className="col g4"><span className="muted">Benefit</span><span className="fw6">{o.benefit || 'Not yet confirmed'}</span></div>
        <div className="col g4"><span className="muted">Deadline</span><span className="fw6">{fmtDeadline(o)}</span></div>
        <div className="col g4"><span className="muted">Verified</span><span className="fw6">{fmtDate(o.verified)}</span></div>
      </div>
    </Link>
  );
}

export function OppRowDark({ o }) {
  const st = oppStatus(o);
  return (
    <Link to={'/opportunities/' + o.slug} className="row g16" style={{ padding: '18px 0', borderTop: '1px solid var(--line-d)', textDecoration: 'none', color: '#fff', flexWrap: 'nowrap' }}>
      <div className="col g6 grow">
        <span style={{ fontSize: 12, color: 'var(--muted-d)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{o.type} · {o.provider}</span>
        <span style={{ font: '600 19px/1.25 var(--f-d)' }}>{o.title}</span>
        <span style={{ fontSize: 13, color: 'var(--muted-d)' }}>Deadline {fmtDeadline(o)} · verified {fmtDate(o.verified)}</span>
      </div>
      <span className={'st st-' + st.tone}>{st.label}</span>
    </Link>
  );
}

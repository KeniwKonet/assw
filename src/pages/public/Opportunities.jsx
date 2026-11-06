import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from '../../components/Icons.jsx';
import { Breadcrumb, Chips, Tabs } from '../../components/UI.jsx';
import { OppCard } from '../../components/Cards.jsx';
import { OPPORTUNITIES, OPP_TYPES, oppStatus } from '../../data/opportunities.js';
import { STAGES } from '../../data/site.js';
import { recordEnquiry } from '../../lib/store.js';

export default function Opportunities() {
  const [tab, setTab] = useState('open');
  const [type, setType] = useState('');
  const [q, setQ] = useState('');
  const [stage, setStage] = useState('');
  const [sub, setSub] = useState({ email: '', agree: false, done: false, err: '' });

  const ql = q.toLowerCase();
  const rows = OPPORTUNITIES
    .map((o) => ({ o, s: oppStatus(o) }))
    .filter(({ o, s }) => (tab === 'archive' ? s.key === 'closed' : s.key !== 'closed') && (!type || o.type === type) && (!stage || o.stage.includes(stage) || o.stage.length === 0)
      && (!ql || (o.title + o.provider + o.sector + o.desc).toLowerCase().includes(ql)))
    .sort((a, b) => (a.o.deadline ? new Date(a.o.deadline) : Infinity) - (b.o.deadline ? new Date(b.o.deadline) : Infinity));

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(sub.email)) return setSub({ ...sub, err: 'Enter a valid email address' });
    if (!sub.agree) return setSub({ ...sub, err: 'Please tick the box to agree to receive notices' });
    recordEnquiry('notices', { email: sub.email });
    setSub({ ...sub, done: true, err: '' });
  };

  return (
    <>
      <section className="dark" style={{ padding: '72px 0 64px' }}>
        <div className="wrap col g28">
          <Breadcrumb dark items={[['SCCN', '/sccn'], ['Opportunities & Funding']]} />
          <div className="row between end g32">
            <h1 className="d1" style={{ maxWidth: 860 }}>Find <span style={{ color: 'var(--sky)' }}>opportunities.</span> Get <span className="hl hl-red">ready.</span></h1>
            <p className="lead" style={{ maxWidth: 420 }}>Find relevant opportunities and practical guidance to help your venture prepare, apply and grow.</p>
          </div>
          <div className="row g10">
            <label className="search" style={{ flex: '1 1 340px' }}><Search /><span className="sr">Search opportunities</span>
              <input className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by keyword, provider or sector" style={{ borderRadius: 999, minHeight: 54, borderColor: 'var(--line-d)' }} />
            </label>
            <label style={{ flex: '0 1 220px' }}><span className="sr">Business stage</span>
              <select className="input" value={stage} onChange={(e) => setStage(e.target.value)} style={{ borderRadius: 999, minHeight: 54 }}><option value="">Any stage</option>{STAGES.map(([s]) => <option key={s}>{s}</option>)}</select>
            </label>
          </div>
          <div className="row g8"><Chips items={OPP_TYPES} value={type} onChange={setType} className="btn btn-sm btn-ghost-d" onCls="btn-primary" /></div>
        </div>
      </section>

      <section style={{ padding: '40px 0 96px' }}>
        <div className="wrap layout-side">
          <div className="content col g18">
            <div className="bar">
              <Tabs label="Status" items={[['open', 'Open & closing soon'], ['archive', 'Closed archive']]} value={tab} onChange={setTab} />
              <span className="small" aria-live="polite">{rows.length} listings · sorted by deadline</span>
            </div>
            {rows.map(({ o }) => <OppCard key={o.slug} o={o} />)}
            {rows.length === 0 && (
              <div className="card-p col center g12" style={{ padding: 48 }}>
                <h3 className="d4">No opportunities match right now</h3>
                <p className="muted" style={{ maxWidth: 420 }}>New calls are verified and added regularly. Turn on notices to hear when a relevant one opens.</p>
                <button type="button" className="btn btn-line" onClick={() => { setType(''); setQ(''); setStage(''); }}>Clear filters</button>
              </div>
            )}
            <p className="small">Every listing shows its source and verification date. Expired calls move to the archive automatically and are never shown as open.</p>
          </div>

          <aside className="aside col g16" style={{ flexBasis: 320 }}>
            <div className="card-blue col g14" style={{ padding: 28 }}>
              <span className="kicker" style={{ color: '#fff' }}>Opportunity Desk</span>
              <h2 className="d4" style={{ fontSize: 26 }}>Not sure you’re ready to apply?</h2>
              <p style={{ fontSize: 15, color: '#E6EEF9' }}>Enterprise members can book clinics on formalisation, proof-of-concept evidence, pitch decks, budgets and application completion.</p>
              <Link className="btn btn-white self-start" to="/register-business">Become an enterprise member</Link>
            </div>
            <form className="card col g14" onSubmit={subscribe} noValidate>
              <h2 className="d4">Get opportunity notices</h2>
              {sub.done ? <p className="st st-open" style={{ minHeight: 34 }} role="status">Subscribed — check your inbox to confirm.</p> : (
                <>
                  <p className="small">We’ll email you when a verified call matches your interests. Unsubscribe any time.</p>
                  <div className="field"><label htmlFor="ne">Email</label><input id="ne" className={'input' + (sub.err && !sub.email ? ' is-err' : '')} type="email" autoComplete="email" value={sub.email} onChange={(e) => setSub({ ...sub, email: e.target.value, err: '' })} /></div>
                  <label className="check"><input type="checkbox" checked={sub.agree} onChange={(e) => setSub({ ...sub, agree: e.target.checked, err: '' })} />I agree to receive opportunity notices from SCCN.</label>
                  {sub.err && <span className="err" role="alert">{sub.err}</span>}
                  <button type="submit" className="btn btn-dark">Subscribe</button>
                </>
              )}
            </form>
            <div className="card-p col g10" style={{ padding: 22 }}>
              <span className="lbl">Know of an opportunity?</span>
              <p className="small">Providers and partners can submit a call for verification.</p>
              <Link to="/contact?t=partnership" className="fw6" style={{ fontSize: 14 }}>Submit an opportunity</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

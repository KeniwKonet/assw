import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUR } from '../../components/Icons.jsx';
import { Breadcrumb, Note } from '../../components/UI.jsx';
import { getOpportunity, oppStatus, fmtDeadline, fmtDate } from '../../data/opportunities.js';
import NotFound from './NotFound.jsx';
import Seo from '../../seo/Seo.jsx';
import { breadcrumbs } from '../../seo/schema.js';

const ITEMS = [
  ['Institutional status confirmed', 'Proof of current studentship from your institution.'], ['Business formalised', 'CAC registration or the provider’s accepted equivalent.'],
  ['Proof of concept', 'Evidence your product or service works — users, pilots or sales.'], ['Pitch deck ready', '10–12 slides: problem, solution, market, traction, team, ask.'],
  ['Budget prepared', 'How you would use the funding, line by line.'], ['Supporting documents gathered', 'Everything on the provider’s documents list.'],
];

function readKey(slug) { try { return JSON.parse(localStorage.getItem('assw-ready-' + slug)) || []; } catch { return []; } }

export default function Opportunity() {
  const { slug } = useParams();
  const o = getOpportunity(slug);
  const [done, setDone] = useState(() => readKey(slug));
  const [saved, setSaved] = useState(false);
  if (!o) return <NotFound />;
  const s = oppStatus(o);
  const closed = s.key === 'closed';
  const toggle = (i) => {
    const n = done.includes(i) ? done.filter((x) => x !== i) : done.concat(i);
    setDone(n);
    try { localStorage.setItem('assw-ready-' + slug, JSON.stringify(n)); } catch { /* ignore */ }
  };
  const pct = Math.round((done.length / ITEMS.length) * 100);
  const icsHref = o.deadline ? 'data:text/calendar;charset=utf-8,' + encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Deadline: ${o.title}\nDTSTART:${new Date(o.deadline).toISOString().replace(/[-:]/g, '').slice(0, 15)}Z\nEND:VEVENT\nEND:VCALENDAR`) : null;

  return (
    <>
      <Seo title={o.title} description={`${closed ? 'Closed: ' : ''}${o.type} from ${o.provider}. Deadline: ${fmtDeadline(o)}. ${o.desc}`.slice(0, 300)} path={'/opportunities/' + o.slug} noindex={closed} jsonLd={[breadcrumbs([['Home', '/'], ['Opportunities', '/opportunities'], [o.title, '/opportunities/' + o.slug]])]} />
      {closed && (
        <div style={{ background: '#EDEFF2', borderBottom: '1px solid var(--line)' }}>
          <div className="wrap row g12" style={{ minHeight: 56 }}><span className="st st-closed">Closed</span><span style={{ fontSize: 14 }}>This call closed on {fmtDeadline(o)}. It is kept for reference — <Link to="/opportunities">see open opportunities</Link>.</span></div>
        </div>
      )}
      <section className="grid-bg" style={{ padding: '56px 0 48px' }}>
        <div className="wrap col g20">
          <Breadcrumb items={[['Opportunities', '/opportunities'], [o.type]]} />
          <div className="row g8">
            <span className={'st st-' + s.tone}>{s.label}{s.key === 'closing' ? ` · ${s.days} day${s.days === 1 ? '' : 's'} left` : ''}</span>
            <span className="tag" style={{ minHeight: 28, fontSize: 12 }}>{o.type}</span><span className="tag" style={{ minHeight: 28, fontSize: 12 }}>{o.sector}</span>
          </div>
          <h1 className="d1" style={{ maxWidth: 1000 }}>{o.title}</h1>
          <p className="lead" style={{ maxWidth: 720 }}>Offered by <strong style={{ color: 'var(--ink)' }}>{o.provider}</strong>. Listed by the SCCN Opportunity Desk from the provider’s official source.</p>
        </div>
      </section>

      <section style={{ padding: '16px 0 96px' }}>
        <div className="wrap layout-side" style={{ gap: 40 }}>
          <div className="content col g40">
            <dl className="metric-grid" style={{ margin: 0, gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))' }}>
              {[['Deadline', o.deadline ? fmtDeadline(o).split(' · ')[0] : 'Rolling', o.deadline ? fmtDeadline(o).split(' · ')[1] + ' (UTC+1)' : 'No fixed deadline'], ['Award / benefit', o.benefit || '[Confirmed]', o.benefit ? 'As stated by provider' : 'Shown only once confirmed'], ['Location', o.location.split(' · ')[0], o.location.split(' · ')[1] || ''], ['Last verified', fmtDate(o.verified), 'by SCCN Opportunity Desk']].map(([k, v, sm]) => (
                <div key={k} className="col g6" style={{ padding: 20 }}><dt className="small">{k}</dt><dd style={{ margin: 0, font: '700 20px/1.2 var(--f-d)' }}>{v}</dd><dd className="small" style={{ margin: 0 }}>{sm}</dd></div>
              ))}
            </dl>
            <div className="col g14"><h2 className="d3">About this opportunity</h2><p>{o.desc}</p></div>
            <div className="ag" style={{ '--min': '280px', '--gap': '16px' }}>
              <div className="card col g10"><span className="kicker">Target group</span><p>{o.target}</p></div>
              <div className="card col g10"><span className="kicker">Eligibility</span><p>{o.elig} Check the provider’s full criteria.</p></div>
              <div className="card col g10"><span className="kicker">Documents</span><p>{o.docs}</p></div>
              <div className="card col g10"><span className="kicker">Source</span><p><a href="#" rel="noopener">Provider’s official call page</a> — opens in a new tab.</p></div>
            </div>

            {!closed && (
              <div className="panel-d col g20" style={{ padding: 40 }}>
                <div className="row between end g16"><div className="col g10"><span className="kicker">Readiness check</span><h2 className="d3">Are you ready to apply?</h2></div><span style={{ font: '700 34px/1 var(--f-d)', color: 'var(--sky)' }}>{done.length}/{ITEMS.length}</span></div>
                <div className="progress" style={{ background: 'var(--line-d)' }} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Readiness"><i style={{ width: pct + '%' }} /></div>
                <p style={{ color: 'var(--muted-d)', fontSize: 14 }}>A private self-check saved on this device. It isn’t shared and doesn’t affect eligibility.</p>
                <div className="col">
                  {ITEMS.map(([t, h], i) => (
                    <label key={t} className="row g14" style={{ padding: '16px 0', borderTop: '1px solid var(--line-d)', cursor: 'pointer', alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                      <input type="checkbox" checked={done.includes(i)} onChange={() => toggle(i)} style={{ width: 22, height: 22, accentColor: 'var(--blue)', flex: 'none', marginTop: 1 }} />
                      <span className="col g4"><span className="fw6">{t}</span><span style={{ fontSize: 13, color: 'var(--muted-d)' }}>{h}</span></span>
                    </label>
                  ))}
                </div>
                <div className="row g10"><Link className="btn btn-primary" to="/portal/enterprise?tab=clinics">Book a readiness clinic</Link><Link className="btn btn-ghost-d" to="/news?t=Guide">Pitch deck &amp; budget guides</Link></div>
              </div>
            )}
          </div>

          <aside className="aside col g16" style={{ flexBasis: 320 }}>
            <div className="card col g16" style={{ padding: 28, boxShadow: '0 20px 50px rgba(12,16,21,.08)' }}>
              <span className="small">Applications are made directly to the provider.</span>
              {closed ? <button type="button" className="btn btn-line" disabled>Applications closed</button> : <a className="btn btn-primary" href="#" target="_blank" rel="noopener">Apply on provider’s site <ArrowUR size={18} /></a>}
              <button type="button" className="btn btn-line" onClick={() => setSaved(!saved)} aria-pressed={saved}>{saved ? 'Saved to your list ✓' : 'Save opportunity'}</button>
              {icsHref && !closed && <a className="btn btn-text btn-sm" href={icsHref} download={o.slug + '-deadline.ics'} style={{ alignSelf: 'center' }}>Add deadline to calendar</a>}
            </div>
            <Note>SCCN prepares and connects founders; it does not control selection. The provider applies its own eligibility, due diligence and selection criteria.</Note>
            <div className="card-p col g10" style={{ padding: 22 }}>
              <span className="lbl">Applied through SCCN guidance?</span>
              <p className="small">Tell us your outcome (with consent) so we can improve support for future founders.</p>
              <Link to="/portal/enterprise?tab=opps" className="fw6" style={{ fontSize: 14 }}>Record my application</Link>
            </div>
            <Link to="/contact?t=listing" className="small" style={{ textAlign: 'center' }}>Report an error in this listing</Link>
          </aside>
        </div>
      </section>
    </>
  );
}

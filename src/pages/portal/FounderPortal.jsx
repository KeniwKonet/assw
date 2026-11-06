import { useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { Bell, Check } from '../../components/Icons.jsx';
import { Brand } from '../../components/Brand.jsx';
import { Note, Placeholder } from '../../components/UI.jsx';
import { UserChip } from '../../components/Shells.jsx';
import { OPPORTUNITIES, oppStatus, fmtDeadline } from '../../data/opportunities.js';
import { EVENTS } from '../../data/programmes.js';
import { setPublished, signOut, updateApp, useDraft, useMyApp, useSession } from '../../lib/store.js';
import Seo from '../../seo/Seo.jsx';

const TABS = [['overview', 'Overview'], ['listing', 'Catalogue listing'], ['opps', 'Opportunities'], ['clinics', 'Clinics & resources'], ['consent', 'Consent & privacy']];
const fmt = (iso) => (iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '');

export default function FounderPortal() {
  const session = useSession();
  const app = useMyApp();
  const draft = useDraft();
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || 'overview';
  const setTab = (t) => setParams(t === 'overview' ? {} : { tab: t }, { replace: true });
  const [consent, setConsent] = useState(!!app?.consentCatalogue);
  const [booked, setBooked] = useState([EVENTS[0].t]);
  if (!session) return <Navigate to="/auth?next=enterprise" replace />;

  const paid = app?.payment?.status === 'verified';
  const approved = app?.status === 'approved';
  const timeline = app ? [
    ['Application received', fmt(app.submittedAt), true],
    ['Payment verified', paid ? `${fmt(app.payment.at)} · ${app.payment.ref}` : app.payment.status === 'pending' ? 'Waiting for provider confirmation' : 'Payment needed', paid],
    [app.status === 'correction' ? 'Correction requested' : app.status === 'declined' ? 'Declined' : 'Review', approved ? 'Completed' : app.status === 'correction' ? 'Waiting for your update' : app.status === 'declined' ? 'See reason below' : paid ? 'In progress — usually [X] working days' : 'Starts after payment', approved],
    ['Approved · number issued', approved ? app.no : 'After review', approved],
    ['Confirm listing preview', approved ? (app.published ? 'Confirmed' : 'Action needed') : '—', app.published],
    ['Published in catalogue', app.published ? 'Live' : '—', app.published],
  ] : [];
  const nowIdx = timeline.findIndex((t) => !t[2]);
  const matched = OPPORTUNITIES.filter((o) => oppStatus(o).key !== 'closed' && (o.stage.length === 0 || o.stage.includes(app?.stage))).slice(0, 3);

  return (
    <div className="app">
      <Seo title="Enterprise Portal" path="/portal/enterprise" noindex />
      <nav className="side" aria-label="Enterprise Portal">
        <div style={{ padding: '4px 10px 18px' }}><Brand dark sub="Enterprise" compact /></div>
        {TABS.map(([k, t]) => <button key={k} type="button" className={'nl' + (tab === k ? ' on' : '')} onClick={() => setTab(k)} aria-current={tab === k ? 'page' : undefined} style={{ background: tab === k ? undefined : 'none', border: 0, cursor: 'pointer', textAlign: 'left', font: '500 14px/1 var(--f)', minHeight: 44, padding: '0 14px', borderRadius: 12, color: tab === k ? '#fff' : '#C3CBD6' }}>{t}</button>)}
        {approved && <Link className="nl" to={'/certificate/' + app.no}>Certificate</Link>}
        <Link className="nl" to="/opportunities">Opportunity board</Link>
        <div className="row g12" style={{ marginTop: 'auto', padding: '16px 10px 0', borderTop: '1px solid var(--line-d)', flexWrap: 'nowrap' }}>
          <span className="avatar">{session.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</span>
          <div className="col g4" style={{ minWidth: 0 }}><span className="fw6" style={{ fontSize: 14 }}>{session.name}</span><Link to="/" onClick={() => signOut()} style={{ color: 'var(--muted-d)', fontSize: 13 }}>Sign out</Link></div>
        </div>
      </nav>

      <main className="main col g24" id="main">
        <div className="bar">
          <div className="col g6"><span className="small">{app ? `${app.business} · ${app.id}` : 'No application yet'}</span><h1 className="d3">{TABS.find((t) => t[0] === tab)[1]}</h1></div>
          <div className="row g10"><button className="icon-btn" type="button" aria-label="Notifications"><Bell /></button><Link className="btn btn-primary btn-sm" to="/opportunities">Find Opportunities</Link></div>
        </div>

        {!app && (
          <div className="panel-d col g16 start" style={{ padding: 40 }}>
            <span className="kicker">Get started</span>
            <h2 className="d2">{draft ? 'Finish your application' : 'You haven’t applied yet'}</h2>
            <p style={{ color: 'var(--muted-d)', maxWidth: 560 }}>{draft ? `Your draft was saved ${fmt(draft.savedAt)}. Pick up where you left off.` : 'Apply for SCCN enterprise membership to get a catalogue profile, membership number and structured support.'}</p>
            <Link className="btn btn-primary" to="/apply">{draft ? 'Resume application' : 'Start application'}</Link>
          </div>
        )}

        {app && tab === 'overview' && (
          <div className="col g20">
            {app.payment.status !== 'verified' && app.payment.status !== 'pending' && <Note kind="warn">Your contribution hasn’t been paid yet, so review hasn’t started. <Link to={'/payment?app=' + app.id}>Pay now</Link></Note>}
            {app.status === 'correction' && (
              <div className="note note-red" role="alert" style={{ padding: '22px 24px' }}><Bell /><div className="col g8"><strong>Correction requested by your reviewer</strong><span>“{app.reason}”</span><Link className="btn btn-red btn-sm self-start" to="/apply">Update application</Link></div></div>
            )}
            {app.status === 'declined' && <Note kind="red">Your application was declined: “{app.reason}”. <Link to="/contact?t=complaint">Ask a question or appeal</Link>.</Note>}
            {approved && (
              <div className="panel-d row between g24" style={{ padding: 32, borderRadius: 28 }}>
                <div className="col g10"><span className="kicker">Approved · {fmt(app.issuedAt)}</span><h2 className="d3">Welcome, SCCN Enterprise Member</h2><span style={{ font: '700 24px/1 var(--f-d)', color: 'var(--sky)', letterSpacing: '.04em' }}>{app.no}</span></div>
                <div className="row g10">{!app.published && <button type="button" className="btn btn-primary" onClick={() => setTab('listing')}>Review &amp; publish listing</button>}<Link className="btn btn-ghost-d" to={'/certificate/' + app.no}>View certificate</Link></div>
              </div>
            )}
            <div className="ag start" style={{ '--min': '420px', '--gap': '20px' }}>
              <div className="box col g18">
                <h2 className="d4">Application status</h2>
                <ol className="tl" style={{ listStyle: 'none' }}>
                  {timeline.map(([t, d, done], i) => (
                    <li key={t} className={'tl-i' + (done ? ' done' : i === nowIdx ? ' now' : '')}><span className="tl-dot">{done && <Check size={12} />}</span><div className="col g4"><span className="fw6">{t}</span><span className="small">{d}</span></div></li>
                  ))}
                </ol>
              </div>
              <div className="col g20">
                <div className="ag" style={{ '--min': '180px', '--gap': '14px' }}>
                  <div className="kpi"><span className="small">Matched opportunities</span><span className="v">{matched.length}</span><span className="small">Based on your stage</span></div>
                  <div className="kpi"><span className="small">Clinics booked</span><span className="v">{booked.length}</span><span className="small">Upcoming</span></div>
                </div>
                <div className="box col g14">
                  <div className="row between"><h2 className="d4">Next clinic</h2><span className="st st-info">Booked</span></div>
                  <div className="row g14"><div className="col center" style={{ width: 64, height: 64, borderRadius: 18, background: 'var(--blue)', color: '#fff', justifyContent: 'center', flex: 'none' }}><span style={{ font: '700 24px/1 var(--f-d)' }}>14</span><span style={{ fontSize: 11, textTransform: 'uppercase' }}>Nov</span></div><div className="col g4"><span className="fw6">{EVENTS[0].t}</span><span className="small">{EVENTS[0].where} · {EVENTS[0].time}</span></div></div>
                  <button type="button" className="btn btn-line btn-sm self-start" onClick={() => setTab('clinics')}>All clinics &amp; resources</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {app && tab === 'listing' && (
          !approved ? <Note>Your listing preview becomes available once your application is approved.</Note> : (
            <div className="layout-side" style={{ gap: 24 }}>
              <div className="content col g14">
                <div className="bar"><span className={'st ' + (app.published ? 'st-open' : 'st-closing')}>{app.published ? 'Published' : 'Preview — not yet public'}</span><span className="small">This is exactly what the public will see.</span></div>
                <div className="box col g16" style={{ padding: 14 }}>
                  <Placeholder label="Cover photo" style={{ height: 220, borderRadius: '16px 16px 16px 80px' }} />
                  <div className="col g10" style={{ padding: '0 14px 14px' }}>
                    <div className="row g6"><span className="pill">SCCN Enterprise Member</span></div>
                    <h2 className="d3">{app.business}</h2>
                    <span className="small">{app.sector} · {app.state}</span>
                    <p>{app.description}</p>
                  </div>
                </div>
              </div>
              <div className="aside col g14">
                <div className="box col g14">
                  <h2 className="d4">Publication consent</h2>
                  <p className="small">Only the fields shown in the preview will be public. Your phone, private email, address, student ID and evidence stay private.</p>
                  <label className="check"><input type="checkbox" checked={consent || app.published} onChange={(e) => setConsent(e.target.checked)} disabled={app.published} />I consent to publishing this profile in the SCCN catalogue.</label>
                  {app.published ? <button type="button" className="btn btn-line" onClick={() => { setPublished(app.id, false); setConsent(false); }}>Unpublish listing</button>
                    : <button type="button" className="btn btn-primary" disabled={!consent} onClick={() => { updateApp(app.id, { consentCatalogue: true }); setPublished(app.id, true); }}>Publish listing</button>}
                </div>
                <Note style={{ background: '#fff' }}>Changing your name, category or description may trigger a quick re-review before the update goes live.</Note>
              </div>
            </div>
          )
        )}

        {app && tab === 'opps' && (
          <div className="col g20">
            <div className="box col g6"><h2 className="d4">Matched for you</h2><p className="small">Based on your stage and interests. Matching is guidance only — check each provider’s criteria.</p></div>
            <div className="ag" style={{ '--min': '280px', '--gap': '14px' }}>
              {matched.map((o) => { const s = oppStatus(o); return <Link key={o.slug} to={'/opportunities/' + o.slug} className="box card-link col g10"><span className={'st st-' + s.tone + ' self-start'}>{s.label}</span><span style={{ font: '700 19px/1.25 var(--f-d)' }}>{o.title}</span><span className="small">Deadline {fmtDeadline(o)}</span></Link>; })}
            </div>
            <h2 className="d4">My applications &amp; referrals</h2>
            <div className="tbl-box"><table className="tbl"><thead><tr><th>Opportunity</th><th>Provider</th><th>Referred by SCCN</th><th>Status</th><th>Updated</th></tr></thead><tbody>
              <tr><td className="fw6">Youth enterprise micro-grant</td><td>[Provider]</td><td>{app.consentReferral ? 'Yes · consent given' : 'No'}</td><td><span className="st st-info">Outcome pending</span></td><td>2 Oct 2026</td></tr>
            </tbody></table></div>
          </div>
        )}

        {app && tab === 'clinics' && (
          <div className="ag" style={{ '--min': '300px', '--gap': '14px' }}>
            {EVENTS.filter((e) => e.status !== 'Past').map((e) => {
              const on = booked.includes(e.t);
              return <div key={e.t} className="box col g10"><span className="small">{fmt(e.date)} · {e.where}</span><span style={{ font: '700 19px/1.25 var(--f-d)' }}>{e.t}</span><span className="small">{e.time}</span><button type="button" className={'btn btn-sm self-start ' + (on ? 'btn-line' : 'btn-primary')} onClick={() => setBooked(on ? booked.filter((x) => x !== e.t) : booked.concat(e.t))}>{on ? 'Booked ✓ — cancel' : 'Book a place'}</button></div>;
            })}
            <div className="box col g10"><span className="small">On demand</span><span style={{ font: '700 19px/1.25 var(--f-d)' }}>Budget template for applications</span><Link className="btn btn-line btn-sm self-start" to="/news?t=Guide">Open resources</Link></div>
          </div>
        )}

        {app && tab === 'consent' && (
          <div className="box col" style={{ padding: '8px 24px' }}>
            {[
              ['Account administration', 'Needed to run your account and application.', 'Required', 'st-dark', null],
              ['Public catalogue listing', 'Publish your approved profile. Withdraw any time.', app.published ? 'Given' : 'Not given', app.published ? 'st-open' : 'st-closed', approved ? () => setPublished(app.id, !app.published) : null],
              ['Third-party referrals', 'SCCN may refer you to providers; you’re asked before each identifiable share.', app.consentReferral ? 'Given' : 'Not given', app.consentReferral ? 'st-open' : 'st-closed', () => updateApp(app.id, { consentReferral: !app.consentReferral }, app.consentReferral ? 'Founder withdrew referral consent' : 'Founder gave referral consent', 'Founder')],
            ].map(([t, d, s, cls, act]) => (
              <div key={t} className="row between g16" style={{ padding: '18px 0', borderBottom: '1px solid var(--line)' }}>
                <div className="col g4" style={{ maxWidth: 620 }}><span className="fw6">{t}</span><span className="small">{d}</span></div>
                <div className="row g10"><span className={'st ' + cls}>{s}</span>{act && <button type="button" className="btn btn-line btn-sm" onClick={act}>{s === 'Given' ? 'Withdraw' : 'Give consent'}</button>}</div>
              </div>
            ))}
            <div className="row g10" style={{ padding: '18px 0' }}><button type="button" className="btn btn-line btn-sm" onClick={() => { const blob = new Blob([JSON.stringify(app, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = app.id + '-my-data.json'; a.click(); }}>Download my data</button><Link className="btn btn-text btn-sm" to="/contact?t=data">Make a data rights request</Link></div>
          </div>
        )}
      </main>
    </div>
  );
}

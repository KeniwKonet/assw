import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUR } from '../../components/Icons.jsx';
import { Breadcrumb, Flag, Placeholder } from '../../components/UI.jsx';
import { AREAS } from '../../data/programmes.js';
import Seo from '../../seo/Seo.jsx';
import { breadcrumbs } from '../../seo/schema.js';

export default function WhatWeDo() {
  const [i, setI] = useState(1);
  const cur = AREAS[i];
  return (
    <>
      <Seo title="What We Do" description="Student welfare, enterprise, employability, leadership and mentorship, financial intelligence, youth development and civic engagement programmes by ASSW Nigeria." path="/what-we-do" jsonLd={[breadcrumbs([['Home', '/'], ['What We Do', '/what-we-do']])]} />
      <section className="grid-bg" style={{ padding: '80px 0 56px' }}>
        <div className="wrap col center g24">
          <Breadcrumb items={[['Home', '/'], ['What We Do']]} />
          <h1 className="d1" style={{ maxWidth: 1040 }}>Seven areas. One <span className="hl">student</span> journey.</h1>
          <p className="lead" style={{ maxWidth: 680 }}>From welfare and financial intelligence to enterprise and civic engagement — each area follows the same template so you can see what we do, who it is for and how to take part.</p>
        </div>
      </section>

      <section style={{ padding: '16px 0 40px' }}>
        <div className="wrap">
          <div className="panel-d col g32">
            <div className="row between end g16"><h2 className="d4" style={{ fontSize: 28 }}>Choose an area</h2><p className="small" style={{ maxWidth: 380 }}>Select an area to see its programme summary below.</p></div>
            <hr className="rule" />
            <div className="ag" style={{ '--min': '280px', '--gap': '14px' }}>
              {AREAS.map((a, k) => {
                const sel = k === i;
                return (
                  <button key={a.t} type="button" aria-pressed={sel} onClick={() => setI(k)} className="col g16 start"
                    style={{ padding: 24, borderRadius: 24, border: 0, cursor: 'pointer', fontFamily: 'var(--f)', minHeight: 180, color: '#fff', background: sel ? 'var(--blue)' : 'var(--ink-3)' }}>
                    <span className="row between start g12 w-full" style={{ flexWrap: 'nowrap' }}>
                      <span style={{ font: '700 24px/1.1 var(--f-d)', letterSpacing: '-.02em', textAlign: 'left', color: sel ? '#fff' : 'var(--sky)' }}>{a.t}</span>
                      <span className="arrow-c" style={{ width: 44, height: 44, background: sel ? 'var(--red)' : undefined }}><ArrowUR size={18} /></span>
                    </span>
                    <span style={{ fontSize: 14, lineHeight: 1.55, textAlign: 'left', opacity: 0.8 }}>{a.s}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="sec-s" aria-live="polite">
        <div className="wrap col g32">
          <div className="row between end g20">
            <div className="col g14" style={{ maxWidth: 760 }}><span className="kicker">Programme summary</span><h2 className="d2">{cur.t}</h2></div>
            <div className="row g8"><span className="st st-open">Active</span><Flag>Content pending approval</Flag></div>
          </div>
          <div className="ag" style={{ '--min': '320px', '--gap': '16px' }}>
            <div className="card col g10"><span className="kicker" style={{ color: 'var(--red)' }}>Problem addressed</span><p>{cur.problem}</p></div>
            <div className="card col g10"><span className="kicker">Target group</span><p>{cur.target}</p></div>
            <div className="card col g10"><span className="kicker">Activities</span><p>{cur.activities}</p></div>
            <div className="card col g10"><span className="kicker">Delivery partners</span><p className="muted">[Approved partner names and relationship wording]</p></div>
            <div className="card col g10"><span className="kicker">Expected outcomes</span><p>{cur.outcomes}</p></div>
            <div className="card-blue col g14" style={{ padding: 28 }}>
              <span className="kicker" style={{ color: '#fff' }}>How to take part</span>
              <p>{cur.route}</p>
              <Link className="btn btn-white self-start mt-auto" to={cur.href}>{cur.cta}</Link>
            </div>
          </div>
          <div className="card-p col g18">
            <div className="row between g12"><h3 className="d4">Evidence &amp; updates</h3><Link className="btn btn-text" to="/impact">Reports &amp; stories</Link></div>
            <div className="ag" style={{ '--min': '260px', '--gap': '16px' }}>
              <Placeholder tone="" label="Update photo · consented" style={{ height: 160 }} />
              <div className="col g8"><span className="small">[Date]</span><span style={{ font: '600 18px/1.3 var(--f-d)' }}>[Latest update headline]</span><p className="small">Short summary of the update with a link to the full story or report.</p></div>
              <div className="col g8"><span className="small">[Date]</span><span style={{ font: '600 18px/1.3 var(--f-d)' }}>[Programme brief or case study]</span><p className="small">Downloadable brief with outputs, outcomes and period.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-s" style={{ background: 'var(--paper)' }}>
        <div className="wrap col g24">
          <div className="row between end g16"><h2 className="d3">Completed projects</h2><span className="small">Kept separate from active programmes</span></div>
          <div className="tbl-box">
            <table className="tbl">
              <thead><tr><th>Project</th><th>Area</th><th>Period</th><th>Partners</th><th>Status</th><th><span className="sr">Link</span></th></tr></thead>
              <tbody>
                {['Enterprise', 'Student welfare', 'Career readiness'].map((a) => (
                  <tr key={a}><td className="fw6">[Project name]</td><td>{a}</td><td>[Start – end]</td><td>[Approved partner]</td><td><span className="st st-closed">Completed</span></td><td><Link to="/impact">Read brief</Link></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

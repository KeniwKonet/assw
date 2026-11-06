import { Link } from 'react-router-dom';
import { Check, Doc } from '../../components/Icons.jsx';
import { Breadcrumb, Flag, Note, Placeholder } from '../../components/UI.jsx';

const MILESTONES = [
  ['2017', 'ASSW begins work at Adeyemi College of Education, Ondo.', true],
  ['[Year]', 'Supports establishment of a Directorate of Entrepreneurship and Vocational Development at what is now Adeyemi Federal University of Education.', true],
  ['2019', 'Entrepreneurship exposure becomes compulsory for students.', true],
  ['[Year]', 'Students Chamber of Commerce Nigeria (SCCN) launched as ASSW’s flagship enterprise initiative.', true],
  ['2026', 'National enterprise catalogue and Opportunity Desk in development.', false],
];
const VALUES = ['Student-centred service', 'Integrity & accountability', 'Inclusion', 'Innovation & enterprise', 'Collaboration', 'Measurable impact', 'Responsible data stewardship'];
const APPROACH = [['Support', 'Respond to real welfare and economic pressures with practical help and community.'], ['Skill', 'Build financial intelligence, leadership, employability and enterprise skills.'], ['Connect', 'Link students to mentors, markets, institutions and opportunity providers — with consent.'], ['Systematise', 'Work with institutions and partners on structures that outlast any single programme.']];
const LEADERS = ['Founder / Executive Director', 'Chair, Board of Trustees', 'Programme Director, SCCN', 'Head of Partnerships'];
const DOCS = [['Annual report [Year]', 'Approved outputs & outcomes'], ['Metrics register & definitions', 'How each published figure is calculated'], ['Governance & safeguarding policy', 'Board-approved · [date]'], ['Privacy Notice', 'How we collect, use and protect data', '/policies/privacy'], ['Complaints & feedback procedure', 'How to raise a concern and what happens next', '/contact?t=complaint']];

export default function About() {
  return (
    <>
      <section className="grid-bg" style={{ padding: '80px 0 64px' }}>
        <div className="wrap col g28">
          <Breadcrumb items={[['Home', '/'], ['About ASSW']]} />
          <div className="ag end" style={{ '--min': '480px', '--gap': '40px' }}>
            <h1 className="d1">Practical care for <span className="hl">students</span>, since 2017.</h1>
            <div className="col g20">
              <p className="lead">The Association for Students’ Social Welfare Nigeria connects student welfare with skills, enterprise, mentorship, leadership and practical readiness — and builds the systems that make those connections last.</p>
              <div className="row g8">
                {[['story', 'Our story'], ['mission', 'Mission, vision & values'], ['approach', 'Our approach'], ['leadership', 'Leadership & governance'], ['accountability', 'Accountability']].map(([h, t]) => <a key={h} className="tag" href={'#' + h}>{t}</a>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="sec-s">
        <div className="wrap ag" style={{ '--min': '460px', '--gap': '56px' }}>
          <div className="col g24">
            <span className="kicker">Our story</span>
            <h2 className="d2">It started with a simple question: how are students really coping?</h2>
            <p className="lead">ASSW began its work at Adeyemi College of Education, Ondo, responding to the welfare and economic pressures students faced every day. Support for immediate needs soon pointed to something deeper — students needed skills, agency and real routes to income and opportunity.</p>
            <p className="muted">That evolution shaped everything that followed: entrepreneurship exposure on campus, mentorship and leadership programmes, and eventually the Students Chamber of Commerce Nigeria — a national ecosystem for student-owned businesses.</p>
            <Placeholder label="Archive photo: early ASSW activity, Ondo (consent required)" style={{ height: 280, borderRadius: '28px 28px 28px 110px' }} />
          </div>
          <div className="card col g24" style={{ padding: 36 }}>
            <div className="row between g12"><h3 className="d4">Documented milestones</h3><Flag>Validate dates &amp; evidence</Flag></div>
            <ol className="tl" style={{ listStyle: 'none' }}>
              {MILESTONES.map(([y, t, done], i) => (
                <li key={i} className={'tl-i ' + (done ? 'done' : 'now')}>
                  <span className="tl-dot">{done && <Check size={12} />}</span>
                  <div className="col g4"><span style={{ font: '700 22px/1 var(--f-d)' }}>{y}</span><p className="muted" style={{ fontSize: 15 }}>{t}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="mission" className="sec-s">
        <div className="wrap">
          <div className="panel-d col g40">
            <div className="row between g16"><h2 className="d4" style={{ fontSize: 28 }}>Mission, vision &amp; values</h2><span className="tag tag-d" style={{ cursor: 'default' }}>Working copy — for Board approval</span></div>
            <div className="ag" style={{ '--min': '380px', '--gap': '20px' }}>
              <div className="card-d col g16" style={{ padding: 32 }}><span className="kicker">Vision</span><p style={{ font: '600 clamp(22px, 2.2vw, 28px)/1.3 var(--f-d)' }}>A society where every student and young person can access the support, skills, networks and opportunities needed to thrive and contribute to sustainable development.</p></div>
              <div className="card-blue col g16" style={{ padding: 32 }}><span className="kicker" style={{ color: '#fff' }}>Mission</span><p style={{ font: '600 clamp(22px, 2.2vw, 28px)/1.3 var(--f-d)' }}>To advance student welfare and youth development by building practical systems for enterprise, employability, leadership, mentorship, opportunity access and institutional collaboration.</p></div>
            </div>
            <hr className="rule" />
            <ul className="ag" style={{ '--min': '230px', '--gap': '12px', listStyle: 'none' }}>
              {VALUES.map((v, i) => (
                <li key={v} className="row g14" style={{ border: '1px solid var(--line-d)', borderRadius: 18, padding: 20, flexWrap: 'nowrap' }}>
                  <span style={{ font: '700 14px/1 var(--f-d)', color: 'var(--sky)' }}>0{i + 1}</span><span className="fw6">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="approach" className="sec">
        <div className="wrap col g40">
          <div className="ag end" style={{ '--min': '420px', '--gap': '32px' }}>
            <div className="col g16"><span className="kicker">Our approach</span><h2 className="d2">Welfare is where it starts — not where it ends.</h2></div>
            <p className="lead">We meet students where they are, then build the skills, networks and systems that move them towards learning, work and economic participation.</p>
          </div>
          <div className="ag" style={{ '--min': '260px', '--gap': '16px' }}>
            {APPROACH.map(([t, d], i) => {
              const dark = i === 3;
              return (
                <div key={t} className="card col g14" style={dark ? { background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' } : undefined}>
                  <span style={{ font: '700 44px/1 var(--f-d)', color: dark ? 'var(--sky)' : 'var(--blue)' }}>0{i + 1}</span>
                  <h3 className="d4">{t}</h3>
                  <p className="small" style={dark ? { color: 'var(--muted-d)' } : undefined}>{d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="leadership" className="sec-s" style={{ background: 'var(--paper)' }}>
        <div className="wrap col g32">
          <div className="row between end g16"><div className="col g14"><span className="kicker">Leadership &amp; governance</span><h2 className="d2">The people accountable for ASSW</h2></div><Flag>Approved names, titles, bios &amp; photos required</Flag></div>
          <div className="ag" style={{ '--min': '260px', '--gap': '20px' }}>
            {LEADERS.map((l) => (
              <div key={l} className="col g14"><Placeholder tone="gray" label="Portrait (consented)" style={{ height: 300, borderRadius: 22 }} /><div className="col g4"><span style={{ font: '700 20px/1.2 var(--f-d)' }}>[Full name]</span><span className="small">{l}</span></div></div>
            ))}
          </div>
          <div className="ag" style={{ '--min': '300px', '--gap': '16px' }}>
            {[['Board of Trustees', 'Sets strategy, approves policies, metrics and fee arrangements, and oversees accountability.'], ['Executive Secretariat', 'Runs day-to-day operations, programmes, partnerships and communications.'], ['SCCN Programme Office', 'Manages enterprise membership, the catalogue, clinics and the Opportunity Desk.']].map(([t, d]) => (
              <div key={t} className="card"><h3 className="d4" style={{ marginBottom: 10 }}>{t}</h3><p className="small">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="accountability" className="sec">
        <div className="wrap ag" style={{ '--min': '460px', '--gap': '40px' }}>
          <div className="col g20">
            <span className="kicker">Accountability &amp; impact</span>
            <h2 className="d2">Every figure has a source, a period and a definition.</h2>
            <p className="lead">We publish only approved metrics, separate outputs from outcomes, and use aggregated data so no founder or student is identifiable without consent.</p>
            <div className="row g10"><Link className="btn btn-primary" to="/impact">Impact dashboard</Link><Link className="btn btn-line" to="/contact?t=complaint">Raise a concern</Link></div>
            <Note>ASSW and SCCN work within a wider ecosystem of organisations. Related organisations are named only where a formal relationship is approved, and faith-based outreach is kept separate from ASSW’s non-partisan institutional work.</Note>
          </div>
          <div className="col g12">
            {DOCS.map(([t, m, to]) => (
              <Link key={t} to={to || '/impact'} className="card card-link row g16" style={{ padding: '20px 24px', flexWrap: 'nowrap' }}>
                <span style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--blue-10)', color: 'var(--blue)', display: 'grid', placeItems: 'center', flex: 'none' }}><Doc /></span>
                <div className="col g4 grow"><span className="fw6">{t}</span><span className="small">{m}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

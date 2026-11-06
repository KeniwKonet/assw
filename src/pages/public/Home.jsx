import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUR, ArrowDown, ArrowLeft, Sparkle, Search } from '../../components/Icons.jsx';
import { Sticker } from '../../components/Brand.jsx';
import { Flag, Placeholder } from '../../components/UI.jsx';
import { BizCard, OppRowDark } from '../../components/Cards.jsx';
import { BUSINESSES } from '../../data/businesses.js';
import { OPPORTUNITIES, oppStatus } from '../../data/opportunities.js';
import { PROGRAMMES } from '../../data/programmes.js';
import { SITE, naira } from '../../data/site.js';

const PIPE = ['Identify', 'Catalogue', 'Assess', 'Develop', 'Prepare', 'Match', 'Connect', 'Track'];
const METRICS = [
  ['20,000+', 'Students impacted', 'Period: [2017–20XX] · definition & source pending'],
  ['10+', 'States with activity', 'States list & evidence pending'],
  ['300+', 'Tertiary institutions engaged', 'Clarify reached vs registered'],
];

export default function Home() {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const open = OPPORTUNITIES.filter((o) => oppStatus(o).key !== 'closed').slice(0, 4);

  return (
    <>
      {/* 1 Hero */}
      <section className="grid-bg" style={{ position: 'relative', overflow: 'hidden', padding: '56px 0 72px' }}>
        <div className="wrap row g32" style={{ alignItems: 'stretch', flexWrap: 'nowrap' }}>
          <div className="hide-lg hero-side col between g40" style={{ paddingTop: 8 }}>
            <div style={{ position: 'relative' }}>
              <Sparkle size={30} style={{ position: 'absolute', left: -14, top: -14, zIndex: 2 }} />
              <Placeholder label="Photo: student founder with product (consented)" className="hero-ph-1" />
            </div>
            <div className="col g14">
              <div className="ph" style={{ width: 52, height: 52, minHeight: 52, borderRadius: '50%', padding: 0, border: '3px solid #fff', boxShadow: '0 0 0 2px var(--blue)' }} aria-hidden="true" />
              <p style={{ fontSize: 14, color: 'var(--muted)' }}>Through SCCN, we are building a national ecosystem that identifies and supports student-owned businesses.</p>
            </div>
          </div>

          <div className="col center g28 grow" style={{ padding: '24px 0 8px' }}>
            <p className="eyebrow">Association for Students’ Social Welfare Nigeria · since 2017</p>
            <h1 className="d1" style={{ maxWidth: 980 }}>
              Empowering{' '}
              <span aria-hidden="true" style={{ display: 'inline-grid', placeItems: 'center', width: '.9em', height: '.9em', borderRadius: '50%', background: '#fff', border: '.05em solid var(--blue)', verticalAlign: '-.1em', overflow: 'hidden' }}>
                <img src="/brand/assw-mark.png" alt="" style={{ width: '72%', height: 'auto' }} />
              </span>{' '}
              Students. Building the <span className="hl">Future.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 720 }}>ASSW Nigeria advances student welfare and youth development through enterprise, employability, mentorship, leadership and access to practical opportunities.</p>
            <div className="row g12" style={{ justifyContent: 'center' }}>
              <Link className="btn btn-primary" to="/auth?mode=join">Join ASSW <ArrowRight /></Link>
              <Link className="btn btn-outline" to="/register-business">Register Your Business</Link>
              <Link className="btn btn-text" to="/sccn">Explore SCCN <ArrowUR size={18} /></Link>
            </div>
            <a href="#intro" className="row g10" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, marginTop: 12 }}>Scroll down <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'grid', placeItems: 'center' }}><ArrowDown /></span></a>
          </div>

          <div className="hide-lg hero-side col between g40" style={{ alignItems: 'flex-end', paddingTop: 8 }}>
            <div className="col g6" style={{ alignItems: 'flex-end' }}>
              <span className="pill">{SITE.address[0]}</span>
              <span className="pill">Maitama, Abuja</span>
            </div>
            <div style={{ position: 'relative', width: '100%' }}>
              <Sparkle size={32} color="var(--red)" style={{ position: 'absolute', right: -10, top: -18, zIndex: 2 }} />
              <Placeholder label="Photo: SCCN business clinic session" style={{ height: 220, borderRadius: '90px 28px 28px 28px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* 2 Intro */}
      <section id="intro" className="sec-s">
        <div className="wrap ag end" style={{ '--min': '420px', '--gap': '48px' }}>
          <div className="col g20">
            <span className="kicker">Who we are</span>
            <h2 className="d3" style={{ fontWeight: 600, lineHeight: 1.15 }}>{SITE.shortDescription}</h2>
          </div>
          <div className="col g20">
            <p className="lead">ASSW began in 2017 at Adeyemi College of Education, Ondo, in response to the welfare and economic pressures students face. That practical concern has grown into systems for skills, enterprise, agency and opportunity — including the Students Chamber of Commerce Nigeria (SCCN), our flagship enterprise initiative.</p>
            <div className="row g12">
              <Link className="btn btn-line" to="/about#story">Our story</Link>
              <Link className="btn btn-text" to="/about#mission">Mission, vision &amp; values <ArrowUR size={18} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <div className="panel-d col g32">
            <div className="row between end g20">
              <h2 className="d4" style={{ fontSize: 28 }}>Our pillars</h2>
              <p className="small" style={{ maxWidth: 360 }}>Three connected areas of work — from day-to-day student welfare to the systems that create lasting opportunity.</p>
            </div>
            <hr className="rule" />
            <div className="ag" style={{ '--min': '300px', '--gap': '20px' }}>
              <Link className="card-d card-link col g18" to="/what-we-do" style={{ color: '#fff' }}>
                <div className="row between start g16" style={{ flexWrap: 'nowrap' }}><h3 style={{ fontSize: 30, color: 'var(--sky)' }}>Student Welfare &amp; Development</h3><span className="arrow-c"><ArrowUR /></span></div>
                <hr className="rule" />
                <p className="small" style={{ color: 'var(--muted-d)' }}>Welfare support, mentorship, financial intelligence, leadership and career readiness for students and young people.</p>
                <Placeholder tone="d gray" label="Photo: peer mentorship circle" className="mt-auto" style={{ height: 190 }} />
              </Link>
              <Link className="card-blue card-link col g18" to="/sccn" style={{ color: '#fff' }}>
                <h3 style={{ fontSize: 30 }}>Enterprise &amp; Economic Opportunity</h3>
                <hr className="rule" style={{ background: 'rgba(255,255,255,.3)' }} />
                <p className="small">Through SCCN: business visibility, clinics, mentoring, market access and preparation for grants, pitches and competitions.</p>
                <div className="mt-auto" style={{ position: 'relative' }}>
                  <Placeholder tone="d" label="Photo: founders at SCCN showcase" style={{ height: 190, borderRadius: '14px 14px 14px 60px' }} />
                  <span className="arrow-c red lg" style={{ position: 'absolute', left: -10, bottom: -10, border: '6px solid var(--blue)' }}><ArrowUR size={26} /></span>
                </div>
              </Link>
              <Link className="card-d card-link col g18" to="/get-involved" style={{ color: '#fff' }}>
                <div className="row between start g16" style={{ flexWrap: 'nowrap' }}><h3 style={{ fontSize: 30, color: 'var(--sky)' }}>Partnerships &amp; Systems Change</h3><span className="arrow-c"><ArrowUR /></span></div>
                <hr className="rule" />
                <p className="small" style={{ color: 'var(--muted-d)' }}>Working with institutions, employers and development partners to build structures that outlast any single programme.</p>
                <Placeholder tone="d gray" label="Photo: institutional partners meeting" className="mt-auto" style={{ height: 190 }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 SCCN */}
      <section className="sec-s">
        <div className="wrap ag" style={{ '--min': '460px' }}>
          <div className="panel-d col g28" style={{ position: 'relative', overflow: 'hidden' }}>
            <span className="kicker">Flagship initiative · SCCN</span>
            <h2 style={{ fontSize: 'clamp(34px, 4.2vw, 58px)', textTransform: 'uppercase', lineHeight: 0.98, maxWidth: 560 }}>Where student businesses become visible, connected &amp; opportunity-ready!</h2>
            <p style={{ color: 'var(--muted-d)', maxWidth: 440 }}>The Students Chamber of Commerce Nigeria is ASSW’s student enterprise and economic opportunity ecosystem.</p>
            <hr className="rule" />
            <div className="row g8">{PIPE.map((p) => <span key={p} className="tag tag-d" style={{ cursor: 'default' }}>{p}</span>)}</div>
            <Sticker text="REGISTER · YOUR BUSINESS · SCCN ·" to="/register-business" label="Register your business" className="hide-sm" style={{ position: 'absolute', right: 40, top: 40 }} />
          </div>
          <div className="col g24">
            <div className="card col g14" style={{ flex: 1 }}>
              <div className="row between g12"><span className="st st-open">Free</span><span className="small">For students &amp; young people</span></div>
              <h3 style={{ fontSize: 30 }}>SCCN community membership</h3>
              <p className="muted">Community access, programme updates, learning and engagement for anyone interested in enterprise.</p>
              <Link className="btn btn-line self-start mt-auto" to="/auth?mode=join">Join the community</Link>
            </div>
            <div className="card col g14" style={{ flex: 1, borderColor: 'var(--blue)', boxShadow: '0 0 0 1px var(--blue)' }}>
              <div className="row between g12"><span className="st st-info">Enterprise participation</span><span className="small">For student business owners</span></div>
              <h3 style={{ fontSize: 30 }}>Enterprise catalogue participation</h3>
              <p className="muted">A reviewed catalogue profile, SCCN membership number, certificate, clinics and opportunity guidance. Contribution: <strong style={{ color: 'var(--ink)' }}>{naira(SITE.contribution)}</strong> <Flag>Pending confirmation</Flag></p>
              <Link className="btn btn-primary self-start mt-auto" to="/register-business">Register Your Business</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Impact */}
      <section className="sec-s">
        <div className="wrap col g32">
          <div className="row between end g20">
            <div className="col g14" style={{ maxWidth: 640 }}><span className="kicker">Impact snapshot</span><h2 className="d2">Evidence, not just numbers.</h2></div>
            <div className="col g10" style={{ alignItems: 'flex-end' }}><Flag>Figures awaiting metrics-register approval</Flag><Link className="btn btn-text" to="/impact">View impact dashboard <ArrowUR size={18} /></Link></div>
          </div>
          <div className="metric-grid">
            {METRICS.map(([v, t, d]) => (
              <div key={t} className="col g10"><span className="bold-num">{v}</span><span className="fw6">{t}</span><span className="small">{d}</span></div>
            ))}
            <div className="col g10" style={{ background: 'var(--blue)', color: '#fff' }}><span className="bold-num">{BUSINESSES.length}</span><span className="fw6">Businesses in the SCCN catalogue</span><span style={{ fontSize: 13, color: '#DCE7F6' }}>Live count from the registry</span></div>
          </div>
        </div>
      </section>

      {/* 6 Programmes + opportunities */}
      <section className="sec-s" style={{ background: 'var(--paper)' }}>
        <div className="wrap ag" style={{ '--min': '480px', '--gap': '40px' }}>
          <div className="col g24">
            <div className="row between end g16"><h2 className="d3">Current programmes</h2><Link className="btn btn-text" to="/programmes">All programmes</Link></div>
            {PROGRAMMES.filter((p) => ['BoostHer', 'GenNext Micro Business School', 'Different Votes. One Nigeria. One Future.'].includes(p.t)).map((p) => (
              <Link key={p.t} className="card card-link row g20" to="/programmes">
                <Placeholder label="Image" style={{ width: 120, height: 120, minHeight: 120, flex: 'none' }} />
                <div className="col g8 grow" style={{ minWidth: 220 }}>
                  <div className="row g8"><span className={'st ' + (p.status === 'Active' ? 'st-open' : 'st-info')}>{p.status}</span><span className="tag" style={{ minHeight: 26, fontSize: 12 }}>{p.partner}</span></div>
                  <h3 className="d4">{p.t}</h3>
                  <p className="small">{p.d}</p>
                </div>
              </Link>
            ))}
            <Flag style={{ alignSelf: 'flex-start' }}>Programme facts &amp; partner wording to be confirmed</Flag>
          </div>
          <div className="panel-d col g20" style={{ padding: 40 }}>
            <div className="row between end g16">
              <div className="col g10"><span className="kicker">SCCN Opportunity Desk</span><h2 className="d3">Open opportunities</h2></div>
              <Link className="btn btn-ghost-d btn-sm" to="/opportunities">Find Opportunities</Link>
            </div>
            <div className="col">{open.map((o) => <OppRowDark key={o.slug} o={o} />)}</div>
            <p style={{ fontSize: 12, color: '#8D97A4' }}>Each provider applies its own eligibility and selection.</p>
          </div>
        </div>
      </section>

      {/* 7 Catalogue preview */}
      <section className="sec">
        <div className="wrap col g32">
          <div className="col center g16">
            <span className="kicker">Student Enterprise Catalogue</span>
            <h2 className="d2" style={{ maxWidth: 820 }}>Discover businesses built by <span className="hl">students</span></h2>
            <p className="lead" style={{ maxWidth: 620 }}>Across institutions, sectors and communities. Search by name, product, category, institution or state.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); nav('/catalogue?q=' + encodeURIComponent(q)); }} className="row g10 w-full" style={{ maxWidth: 820, margin: '0 auto' }}>
            <label className="search grow" style={{ minWidth: 240 }}><Search /><span className="sr">Search businesses</span>
              <input className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try “catering” or “branding”" style={{ borderRadius: 999, minHeight: 56 }} />
            </label>
            <button className="btn btn-primary" type="submit" style={{ minHeight: 56 }}>Explore the Catalogue</button>
          </form>
          <div className="row g8" style={{ justifyContent: 'center' }}>
            {['Food & catering', 'Fashion & clothing', 'Technology & software', 'Agriculture & agribusiness', 'Beauty & cosmetics', 'Graphics, branding & printing', 'Photography & media'].map((c) => (
              <Link key={c} className="tag" to={'/catalogue?cat=' + encodeURIComponent(c)}>{c}</Link>
            ))}
          </div>
          <div className="ag" style={{ '--min': '280px' }}>{BUSINESSES.slice(0, 4).map((b) => <BizCard key={b.slug} b={b} compact />)}</div>
        </div>
      </section>

      {/* 8 Stories */}
      <section className="sec-s">
        <div className="wrap ag" style={{ '--min': '420px', alignItems: 'stretch' }}>
          <Placeholder label="Photo: featured founder story (consent & release on file)" style={{ minHeight: 420, borderRadius: 32 }} />
          <div className="card-p col between g24" style={{ padding: 44 }}>
            <span className="kicker">Stories</span>
            <blockquote style={{ margin: 0, font: '600 clamp(24px, 2.6vw, 34px)/1.25 var(--f-d)', letterSpacing: '-.02em' }}>“[Consented founder quote — what changed for their business after joining SCCN, in their own words.]”</blockquote>
            <div className="row g14"><span className="avatar" aria-hidden="true">FN</span><div className="col g4"><span className="fw6">[Founder name]</span><span className="small">[Business] · [Institution]</span></div></div>
            <div className="row g10">
              <Link className="btn btn-dark" to="/news">Read success stories</Link>
              <button className="icon-btn" type="button" aria-label="Previous story"><ArrowLeft /></button>
              <button className="icon-btn" type="button" aria-label="Next story"><ArrowRight /></button>
            </div>
          </div>
        </div>
      </section>

      {/* 9 Partners */}
      <section className="sec-s">
        <div className="wrap col g28">
          <div className="row between g12"><h2 className="d4">Working with</h2><span className="small">Logos shown only with permission and accurate relationship wording.</span></div>
          <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(190px, 100%), 1fr))' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="col center g8" style={{ padding: 28 }}><span style={{ font: '700 22px/1.1 var(--f-d)', color: '#8A93A0' }}>Partner logo</span><span style={{ fontSize: 12, color: 'var(--muted)' }}>Permission pending</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Conversion */}
      <section style={{ padding: '40px 0 96px' }}>
        <div className="wrap">
          <div className="panel-d row between g40" style={{ backgroundImage: 'linear-gradient(#1A2028 1px, transparent 1px), linear-gradient(90deg, #1A2028 1px, transparent 1px)', backgroundSize: '120px 120px' }}>
            <div className="col g20" style={{ maxWidth: 720 }}>
              <h2 className="d2" style={{ textTransform: 'uppercase' }}>Ready to build what comes <span className="hl hl-red">next?</span></h2>
              <p className="lead">Join the ASSW community, put your student business on the map, or partner with us to widen access to opportunity.</p>
              <div className="row g10">
                <Link className="btn btn-primary" to="/auth?mode=join">Join ASSW</Link>
                <Link className="btn btn-white" to="/register-business">Register Your Business</Link>
                <Link className="btn btn-ghost-d" to="/get-involved">Partner with ASSW</Link>
              </div>
            </div>
            <Sticker size={168} to="/auth?mode=join" label="Let’s get started — join ASSW" />
          </div>
        </div>
      </section>
    </>
  );
}

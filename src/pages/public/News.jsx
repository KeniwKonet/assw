import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUR } from '../../components/Icons.jsx';
import { Breadcrumb, Placeholder } from '../../components/UI.jsx';
import { NEWS } from '../../data/programmes.js';
import { SITE } from '../../data/site.js';
import Seo from '../../seo/Seo.jsx';
import { breadcrumbs } from '../../seo/schema.js';

const T = [['All', 'All'], ['News', 'News'], ['Event', 'Events'], ['Guide', 'Guides & toolkits'], ['Opportunity notice', 'Opportunity notices'], ['Media', 'Media / press']];

export default function News() {
  const [params, setParams] = useSearchParams();
  const cur = params.get('t') || 'All';
  const items = NEWS.filter((n) => cur === 'All' || n.type === cur);
  return (
    <>
      <Seo title="News & Resources" description="News, events, guides and toolkits for student founders, opportunity notices and media resources from ASSW Nigeria and SCCN." path="/news" jsonLd={[breadcrumbs([['Home', '/'], ['News & Resources', '/news']])]} />
      <section className="grid-bg" style={{ padding: '72px 0 40px' }}>
        <div className="wrap col g24">
          <Breadcrumb items={[['Home', '/'], ['News & Resources']]} />
          <h1 className="d1">News <span className="hl">&amp;</span> resources</h1>
          <div className="row g8">
            {T.map(([k, t]) => <button key={k} type="button" className={'tag' + (k === cur ? ' on' : '')} aria-pressed={k === cur} onClick={() => setParams(k === 'All' ? {} : { t: k }, { replace: true })} style={{ minHeight: 40, padding: '0 18px' }}>{t}</button>)}
          </div>
        </div>
      </section>

      <section style={{ padding: '16px 0 64px' }}>
        <div className="wrap col g32">
          {(cur === 'All' || cur === 'News') && (
            <article className="ag" style={{ '--min': '440px', '--gap': '0px', borderRadius: 32, overflow: 'hidden', background: 'var(--ink)', color: '#fff' }}>
              <Placeholder tone="d" label="Feature photo · consented" style={{ minHeight: 380, borderRadius: 0 }} />
              <div className="col g18" style={{ padding: 48, justifyContent: 'center' }}>
                <div className="row g8"><span className="pill">News</span><span className="tag tag-d" style={{ minHeight: 30, cursor: 'default' }}>[Date]</span></div>
                <h2 className="d3">ASSW and She Leads Africa partner on BoostHer for young Nigerian women</h2>
                <p style={{ color: 'var(--muted-d)' }}>[Approved summary.] A six-month mobilisation and delivery collaboration supporting young women entrepreneurs and job-seekers.</p>
                <Link to="/programmes" className="row g10 fw6" style={{ color: 'var(--sky)' }}>Read the story <ArrowUR size={18} /></Link>
              </div>
            </article>
          )}
          {items.length ? (
            <div className="af" style={{ '--min': '300px' }}>
              {items.map((n) => (
                <article key={n.t} className="col g14">
                  <Placeholder tone={n.type === 'Guide' || n.type === 'Opportunity notice' ? 'b' : ''} label={n.type + ' image'} style={{ height: 200, borderRadius: '20px 20px 20px 64px' }} />
                  <div className="row g8"><span className="st st-info">{n.type}</span><span className="small">{n.date}</span></div>
                  <h3 style={{ fontSize: 22, lineHeight: 1.2 }}><Link to={n.type === 'Opportunity notice' ? '/opportunities' : n.type === 'Event' ? '/programmes?tab=events' : '#'} style={{ color: 'inherit', textDecoration: 'none' }}>{n.t}</Link></h3>
                  <p className="small">{n.d}</p>
                </article>
              ))}
            </div>
          ) : <div className="card-p" style={{ padding: 48, textAlign: 'center' }}><h3 className="d4">Nothing here yet</h3><p className="muted" style={{ marginTop: 8 }}>New items appear as soon as they’re approved and published.</p></div>}
        </div>
      </section>

      <section className="sec-s" style={{ paddingBottom: 112 }}>
        <div className="wrap">
          <div className="panel-d ag" style={{ '--min': '380px', '--gap': '40px', alignItems: 'center' }}>
            <div className="col g16">
              <span className="kicker">Media / press</span>
              <h2 className="d2">Writing about ASSW or SCCN?</h2>
              <p style={{ color: 'var(--muted-d)' }}>Download the logo and approved boilerplate. Leadership bios and photos are available on request.</p>
              <div className="row g10"><a className="btn btn-primary" href="/brand/assw-logo-full.png" download>Download logo (PNG)</a><Link className="btn btn-ghost-d" to="/contact">Media enquiries</Link></div>
            </div>
            <div className="col g10">
              <div className="col g6" style={{ background: 'var(--ink-3)', borderRadius: 18, padding: 20 }}><span className="kicker" style={{ fontSize: 12 }}>ASSW boilerplate</span><p style={{ fontSize: 14, color: '#D5DBE3' }}>ASSW Nigeria works to improve the student experience by connecting welfare with skills, enterprise, mentorship, leadership and access to opportunity.</p></div>
              <div className="col g6" style={{ background: 'var(--ink-3)', borderRadius: 18, padding: 20 }}><span className="kicker" style={{ fontSize: 12 }}>SCCN boilerplate</span><p style={{ fontSize: 14, color: '#D5DBE3' }}>{SITE.sccnDescription} SCCN is an ASSW initiative.</p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

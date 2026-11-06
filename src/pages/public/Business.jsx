import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Share } from '../../components/Icons.jsx';
import { Breadcrumb, Field, Placeholder, useToast } from '../../components/UI.jsx';
import { getBusiness } from '../../data/businesses.js';
import { recordEnquiry } from '../../lib/store.js';
import NotFound from './NotFound.jsx';
import Seo from '../../seo/Seo.jsx';
import { localBusiness, breadcrumbs } from '../../seo/schema.js';

const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);

export default function Business() {
  const { slug } = useParams();
  const b = getBusiness(slug);
  const [f, setF] = useState({ name: '', email: '', msg: '', agree: false });
  const [tried, setTried] = useState(false);
  const [ref, setRef] = useState('');
  const [toast, say] = useToast();
  if (!b) return <NotFound />;

  const err = tried ? { name: !f.name.trim() && 'Enter your name', email: !emailOk(f.email) && 'Enter a valid email address', msg: !f.msg.trim() && 'Write a short message', agree: !f.agree && 'Please agree so we can pass your message on' } : {};
  const send = (e) => {
    e.preventDefault();
    if (!f.name.trim() || !emailOk(f.email) || !f.msg.trim() || !f.agree) { setTried(true); return; }
    setRef(recordEnquiry('enquiry', { business: b.slug, ...f }));
  };
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); say('Link copied'); } catch { say('Copy the link from your address bar'); }
  };

  return (
    <>
      <Seo title={`${b.name} — ${b.cat} in ${b.city === b.state ? b.city + ' State' : b.city + ', ' + b.state}`} description={`${b.desc} Student-owned business from ${b.inst}, listed in the SCCN Student Enterprise Catalogue.`} path={'/catalogue/' + b.slug} type="profile" jsonLd={[localBusiness(b), breadcrumbs([['Home', '/'], ['Catalogue', '/catalogue'], [b.name, '/catalogue/' + b.slug]])]} />
      {toast}
      <section style={{ padding: '32px 0 0' }}>
        <div className="wrap col g20">
          <Breadcrumb items={[['Catalogue', '/catalogue'], [b.cat, '/catalogue?cat=' + encodeURIComponent(b.cat)], [b.name]]} />
          <div style={{ position: 'relative' }}>
            <Placeholder label="Cover photo supplied by founder" style={{ height: 360, borderRadius: '32px 32px 32px 140px' }} />
            <div className="row g6" style={{ position: 'absolute', right: 24, top: 24, justifyContent: 'flex-end' }}>
              <span className="pill">SCCN Enterprise Member</span>
              {b.reviewed && <span className="pill" style={{ background: 'var(--ink)' }}>Profile Reviewed</span>}
              {b.featured && <span className="pill pill-red">Featured Business</span>}
            </div>
          </div>
          <div className="row between end g24" style={{ marginTop: -72, padding: '0 32px', position: 'relative' }}>
            <div className="row end g20">
              <div style={{ width: 132, height: 132, borderRadius: 32, background: '#fff', border: '6px solid #fff', boxShadow: '0 10px 30px rgba(12,16,21,.12)', display: 'grid', placeItems: 'center', font: '700 40px/1 var(--f-d)', color: 'var(--blue)' }} aria-hidden="true">{b.initials}</div>
              <div className="col g8" style={{ paddingBottom: 6 }}>
                <h1 className="d2">{b.name}</h1>
                <div className="row g14" style={{ fontSize: 14, color: 'var(--muted)' }}><span>{b.cat}</span><span>·</span><span>{b.city}, {b.state}</span><span>·</span><span>Since {b.since}</span></div>
              </div>
            </div>
            <div className="row g10" style={{ paddingBottom: 6 }}>
              <a className="btn btn-primary" href="#enquire">Send an enquiry</a>
              <button className="icon-btn" type="button" aria-label="Copy link to this listing" onClick={share}><Share /></button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '56px 0 96px' }}>
        <div className="wrap layout-side" style={{ gap: 40 }}>
          <div className="content col g48">
            <div className="col g16"><span className="kicker">About the business</span><p style={{ font: '500 clamp(20px, 2vw, 26px)/1.4 var(--f-d)' }}>{b.desc}</p></div>
            <div className="card-p row g24" style={{ padding: 32, alignItems: 'flex-start' }}>
              <Placeholder tone="gray" label="Founder" style={{ width: 140, height: 160, minHeight: 160, flex: 'none', borderRadius: 20 }} />
              <div className="col g12 grow" style={{ minWidth: 240 }}>
                <span className="kicker">Founder story</span>
                <p>[Founder-approved story: why they started, what they’ve learned, and where the business is heading. Written or approved by the founder before publication.]</p>
                <span className="small">[Founder first name] · Student, {b.inst}</span>
              </div>
            </div>
            <div className="col g20">
              <h2 className="d3">Products &amp; services</h2>
              <div className="ag" style={{ '--min': '240px', '--gap': '16px' }}>{b.products.map(([t, d]) => <div key={t} className="card col g8"><h3 className="d4">{t}</h3><p className="small">{d}</p></div>)}</div>
            </div>
            <div className="col g20">
              <h2 className="d3">Gallery</h2>
              <div className="ag" style={{ '--min': '200px', '--gap': '12px' }}>{['Product photo', 'Product photo', 'In action', 'Behind the scenes'].map((l, i) => <Placeholder key={i} label={l} style={{ height: 200 }} />)}</div>
            </div>

            <div id="enquire" className="panel-d col g20" style={{ padding: 44 }}>
              <div className="col g10"><span className="kicker">Business enquiry</span><h2 className="d3">Contact {b.name}</h2><p style={{ color: 'var(--muted-d)', fontSize: 15 }}>Your message goes to the founder’s approved business inbox. Their personal contact details are not shared.</p></div>
              {ref ? (
                <div className="row g14" style={{ background: 'var(--ink-3)', borderRadius: 18, padding: 24, alignItems: 'flex-start', flexWrap: 'nowrap' }} role="status">
                  <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ok)', display: 'grid', placeItems: 'center', flex: 'none' }}><Check size={18} color="#fff" /></span>
                  <div className="col g4"><span className="fw6">Enquiry sent</span><span style={{ color: 'var(--muted-d)', fontSize: 14 }}>The founder will reply to {f.email}. Reference {ref}.</span></div>
                </div>
              ) : (
                <form onSubmit={send} noValidate className="ag" style={{ '--min': '260px', '--gap': '16px' }}>
                  <Field id="en" label={<span style={{ color: '#fff' }}>Your name</span>} error={err.name}><input id="en" className={'input' + (err.name ? ' is-err' : '')} autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
                  <Field id="ee" label={<span style={{ color: '#fff' }}>Email</span>} error={err.email}><input id="ee" type="email" className={'input' + (err.email ? ' is-err' : '')} autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
                  <Field id="em" className="span-all" label={<span style={{ color: '#fff' }}>Message</span>} error={err.msg}><textarea id="em" className={'input' + (err.msg ? ' is-err' : '')} placeholder="Dates, quantities, location…" value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} /></Field>
                  <div className="span-all col g6">
                    <label className="check" style={{ color: '#C9D1DB' }}><input type="checkbox" checked={f.agree} onChange={(e) => setF({ ...f, agree: e.target.checked })} />I agree my details are shared with this business only to answer my enquiry.</label>
                    {err.agree && <span className="err" style={{ color: '#FF9DAE' }}>{err.agree}</span>}
                  </div>
                  <div className="span-all"><button className="btn btn-primary" type="submit">Send enquiry</button></div>
                </form>
              )}
            </div>
          </div>

          <aside className="aside col g16" style={{ flexBasis: 320 }}>
            <div className="card col g18">
              <h2 className="d4">At a glance</h2>
              <dl className="col g14" style={{ margin: 0, fontSize: 14 }}>
                {[['Service area', b.area], ['Institution', b.inst], ['Delivery', b.delivery]].map(([k, v]) => (
                  <div key={k} className="row between g12" style={{ borderBottom: '1px solid var(--line)', paddingBottom: 12 }}><dt className="muted">{k}</dt><dd className="fw6" style={{ margin: 0, textAlign: 'right' }}>{v}</dd></div>
                ))}
                <div className="row between g12"><dt className="muted">SCCN no.</dt><dd style={{ margin: 0 }}><Link className="fw6" to={'/verify?no=' + b.no}>{b.no}</Link></dd></div>
              </dl>
            </div>
            <div className="card col g14">
              <h2 className="d4">Approved channels</h2>
              {b.channels.map((c) => <a key={c} className="btn btn-line" href={c === 'Enquiry form' ? '#enquire' : '#'} style={{ justifyContent: 'flex-start' }}>{c}</a>)}
              <span className="small">Shown because the founder consented to publish these channels.</span>
            </div>
            <div className="card-p col g12" style={{ padding: 22 }}>
              <p className="small">Catalogue inclusion is not an endorsement, guarantee of quality, investment recommendation or procurement approval. “Profile Reviewed” means specified information was reviewed — not a blanket guarantee.</p>
              <Link to={'/contact?t=listing&b=' + b.slug} className="fw6" style={{ fontSize: 14 }}>Report this listing / request a correction</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUR, Check, Search } from '../components/Icons.jsx';
import { Sticker } from '../components/Brand.jsx';
import { Field, Flag, Note, Tabs } from '../components/UI.jsx';
import Seo from '../seo/Seo.jsx';

const COLORS = [['ASSW Blue', '#044593', 'Primary · links · highlights (from logo)'], ['Blue Deep', '#03346F', 'Hover · dark charts'], ['Sky', '#8EC2FF', 'Accents on dark only'], ['Blue Tint', '#E7EEF8', 'Selected · focus ring'], ['ASSW Crimson', '#BB2344', 'Sparing accent · errors (from logo)'], ['Ink', '#0C1015', 'Text · dark panels'], ['Ink 3', '#20262E', 'Cards on dark'], ['Muted', '#56606E', 'Secondary text'], ['Line', '#E2E6EB', 'Borders · grid'], ['Paper', '#F4F6F8', 'App background']];
const STATES = ['empty', 'loading', 'success', 'validation', 'error', 'pending', 'closed'];

export default function StyleGuide() {
  const [st, setSt] = useState('empty');
  return (
    <main id="main" style={{ padding: '64px 0 96px' }}>
      <Seo title="UI style guide" path="/style-guide" noindex />
      <div className="wrap col g56">
        <div className="row between end g24">
          <div className="col g14"><Link to="/" className="small">← Back to site</Link><span className="kicker">Brand / UI style tile</span><h1 className="d1">ASSW <span className="hl">UI kit</span></h1></div>
          <img src="/brand/assw-logo-full.png" alt="ASSW Nigeria logo" style={{ height: 150, width: 'auto' }} />
        </div>
        <section className="ag" style={{ '--min': '380px', '--gap': '20px' }}>
          <div className="card col g16"><h2 className="d4">Logo</h2><div className="row g24"><img src="/brand/assw-mark.png" alt="ASSW mark" style={{ height: 80 }} /><div style={{ background: 'var(--ink)', padding: 16, borderRadius: 16 }}><img src="/brand/assw-logo-full-white.png" alt="ASSW logo on dark" style={{ height: 90 }} /></div></div><span className="small">Mark on white tile on dark surfaces. Don’t recolour or stretch.</span></div>
          <div className="card col g14"><h2 className="d4">Type</h2><span style={{ font: '700 56px/1 var(--f-d)', letterSpacing: '-.04em' }}>Space Grotesk</span><span className="small">Display &amp; headings · 700</span><span style={{ font: '500 22px/1.3 var(--f)' }}>Inter for body, UI and forms</span></div>
        </section>
        <section className="col g16"><h2 className="d3">Colour</h2>
          <div className="ag" style={{ '--min': '170px', '--gap': '12px' }}>{COLORS.map(([n, h, u]) => <div key={n} style={{ border: '1px solid var(--line)', borderRadius: 20, overflow: 'hidden' }}><div style={{ height: 96, background: h }} /><div className="col g4" style={{ padding: '12px 14px' }}><span className="fw6" style={{ fontSize: 14 }}>{n}</span><code style={{ fontSize: 12 }}>{h}</code><span className="small">{u}</span></div></div>)}</div>
        </section>
        <section className="ag" style={{ '--min': '460px', '--gap': '20px' }}>
          <div className="card col g18"><h2 className="d4">Buttons</h2>
            <div className="row g10"><button className="btn btn-primary">Primary</button><button className="btn btn-outline">Outline</button><button className="btn btn-line">Line</button><button className="btn btn-dark">Dark</button><button className="btn btn-red">Destructive</button><button className="btn btn-primary" disabled>Disabled</button></div>
            <div className="row g10"><button className="btn btn-primary btn-sm">Small</button><button className="btn btn-text">Text →</button><span className="arrow-c blue"><ArrowUR /></span><span className="arrow-c red"><ArrowUR /></span></div>
            <div className="row g10" style={{ background: 'var(--ink)', padding: 18, borderRadius: 18 }}><button className="btn btn-primary">On dark</button><button className="btn btn-white">White</button><button className="btn btn-ghost-d">Ghost</button></div>
          </div>
          <div className="card col g18"><h2 className="d4">Tags &amp; status</h2>
            <div className="row g8"><span className="pill">Pill</span><span className="pill pill-red">Accent</span><span className="tag">Tag</span><span className="tag on">Selected</span></div>
            <div className="row g8"><span className="st st-open">Open</span><span className="st st-closing">Closing</span><span className="st st-closed">Closed</span><span className="st st-info">In review</span><span className="st st-red">Error</span><span className="st st-dark">Restricted</span></div>
            <Flag style={{ alignSelf: 'flex-start' }}>Content pending approval</Flag>
          </div>
        </section>
        <section className="card ag" style={{ '--min': '240px', '--gap': '18px' }}>
          <h2 className="d4 span-all">Form states</h2>
          <Field id="x1" label="Default"><input id="x1" className="input" placeholder="Business name" /></Field>
          <Field id="x3" label="Error" error="Enter a complete email address"><input id="x3" className="input is-err" defaultValue="adaeze@" /></Field>
          <Field id="x4" label="Disabled"><input id="x4" className="input" defaultValue="SCCN-26-00148" disabled /></Field>
          <Field id="x6" label="Optional" optional hint="Hint text explains why we ask."><input id="x6" className="input" /></Field>
          <label className="search"><Search /><span className="sr">Search</span><input className="input" placeholder="Search" /></label>
          <label className="check"><input type="checkbox" defaultChecked />Checked consent</label>
        </section>
        <section className="col g16">
          <div className="bar"><h2 className="d3">System states</h2><Tabs label="States" items={STATES} value={st} onChange={setSt} /></div>
          <div className="ag" style={{ '--min': '380px', '--gap': '16px' }}>
            <div className="card-p col g14" style={{ padding: 28, minHeight: 240, justifyContent: 'center' }}>
              {st === 'empty' && <div className="col center g10"><span style={{ font: '700 20px var(--f-d)' }}>Nothing here yet</span><span className="small">Explain why, then offer one next step.</span><button className="btn btn-line btn-sm">Clear filters</button></div>}
              {st === 'loading' && <div className="col g12" aria-busy="true"><div className="sk" style={{ height: 140 }} /><div className="sk" style={{ height: 18, width: '70%' }} /><div className="sk" style={{ height: 14, width: '45%' }} /></div>}
              {st === 'success' && <div className="note" style={{ background: 'var(--ok-10)', color: '#0B4A2C' }}><Check size={20} color="var(--ok)" /><span><strong>Saved.</strong> Your changes are live.</span></div>}
              {st === 'validation' && <Note kind="red" role="alert"><strong>2 fields need attention.</strong> Errors appear beside each field.</Note>}
              {st === 'error' && <div className="col center g10"><span className="st st-red">Something went wrong</span><span className="small">We couldn’t load this page. Your draft is safe.</span><button className="btn btn-dark btn-sm">Try again</button></div>}
              {st === 'pending' && <Note kind="warn"><strong>Pending.</strong> We’re confirming with the provider.</Note>}
              {st === 'closed' && <div className="row g12"><span className="st st-closed">Closed</span><span style={{ fontSize: 14 }}>This call has closed and is kept for reference.</span></div>}
            </div>
            <div className="panel-d row g24" style={{ padding: 32, borderRadius: 28 }}><Sticker to="/style-guide" /><div className="col g8 grow" style={{ minWidth: 200 }}><span style={{ font: '700 22px var(--f-d)' }}>Sticker &amp; sparkles</span><span style={{ color: 'var(--muted-d)', fontSize: 14 }}>Spinning sticker for primary CTAs (stops for reduced motion).</span></div></div>
          </div>
        </section>
      </div>
    </main>
  );
}

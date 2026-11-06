import { useState } from 'react';
import { Breadcrumb, Flag, Placeholder, Tabs } from '../../components/UI.jsx';
import { Download } from '../../components/Icons.jsx';
import { BUSINESSES } from '../../data/businesses.js';
import Seo from '../../seo/Seo.jsx';
import { breadcrumbs } from '../../seo/schema.js';

const LEVELS = {
  outputs: { t: 'Outputs', blurb: 'What we delivered — activities, sessions and listings. Counts of things done, not changes in people’s lives.', metrics: [
    ['30,000+', 'Youth & students reached', '[Dates]', 'Clarify reach vs attendance vs unique people', '[Programme records]'],
    ['300+', 'Tertiary institutions engaged', '[Dates]', 'Clarify reached, represented or registered', '[Institution list]'],
    ['[—]', 'SCCN clinics delivered', '2026', 'Sessions held with attendance recorded', 'Portal event records'],
    ['[—]', 'Verified opportunities published', '2026', 'Listings verified from official sources', 'Opportunity Desk'],
  ] },
  outcomes: { t: 'Outcomes', blurb: 'Changes for participants we can evidence — for example ventures formalised or applications submitted with SCCN support.', metrics: [
    ['20,000+', 'Students impacted', '[Dates]', '“Impacted” to be defined; deduplicated across programmes', '[Programme sources]'],
    ['[—]', 'Ventures formalised after clinics', '2026', 'CAC registration evidenced after attending', 'Registry, with consent'],
    ['[—]', 'Applications submitted', '2026', 'Founder-reported, consented', 'Referral tracking'],
  ] },
  impact: { t: 'Long-term impact', blurb: 'Lasting change, assessed through evaluations and case studies over time — reported only with a stated methodology.', metrics: [
    ['2019', 'Entrepreneurship exposure made compulsory', 'Since 2019', 'Institutional policy change at AFUED (to be validated)', '[Institutional evidence]'],
    ['[—]', 'Founders selected by providers', '[Dates]', 'Independent provider selections, founder-consented', 'Outcome tracking'],
  ] },
};
const SDGS = [['4', 'Quality education', 'Skills, mentorship and practical readiness'], ['5', 'Gender equality', 'Women-focused enterprise programmes'], ['8', 'Decent work & growth', 'Student enterprise and employability'], ['1', 'No poverty', 'Student welfare and income pathways'], ['16', 'Peace & institutions', 'Non-partisan youth peacebuilding'], ['17', 'Partnerships', 'Institutional and partner collaboration']];
const REPORTS = [['ASSW annual report [Year]', 'Approved · [size]'], ['SCCN catalogue & registry snapshot', 'Aggregated, anonymised · quarterly'], ['Programme brief: BoostHer', 'Pending approval'], ['Case study: [Founder story]', 'Consent on file']];

export default function Impact() {
  const [lv, setLv] = useState('outputs');
  const cur = LEVELS[lv];
  const bySector = Object.entries(BUSINESSES.reduce((m, b) => ({ ...m, [b.cat]: (m[b.cat] || 0) + 1 }), {})).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...bySector.map((x) => x[1]));
  const states = [...new Set(BUSINESSES.map((b) => b.state))];

  return (
    <>
      <Seo title="Impact & Insights" description="How ASSW reports impact: outputs, outcomes and long-term change, each with a reporting period, definition and source. Reports, briefs and SDG alignment." path="/impact" jsonLd={[breadcrumbs([['Home', '/'], ['Impact & Insights', '/impact']])]} />
      <section className="grid-bg" style={{ padding: '72px 0 48px' }}>
        <div className="wrap col g24">
          <Breadcrumb items={[['Home', '/'], ['Impact & Insights']]} />
          <div className="ag end" style={{ '--min': '480px', '--gap': '32px' }}>
            <h1 className="d1">Impact you can <span className="hl">check.</span></h1>
            <p className="lead">Every figure on this page has a reporting period, a definition and a source. Outputs, outcomes and long-term impact are reported separately.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '16px 0 64px' }}>
        <div className="wrap">
          <div className="panel-d col g28">
            <div className="row between g16">
              <Tabs dark label="Result level" items={Object.entries(LEVELS).map(([k, v]) => [k, v.t])} value={lv} onChange={setLv} />
              <div className="row g10"><label htmlFor="per" style={{ fontSize: 14, color: 'var(--muted-d)' }}>Period</label><select id="per" className="input" style={{ width: 'auto', minHeight: 44 }}><option>2017 – to date</option><option>2026</option><option>2025</option></select><Flag>Awaiting metrics-register approval</Flag></div>
            </div>
            <p style={{ color: 'var(--muted-d)', maxWidth: 720 }}>{cur.blurb}</p>
            <div className="ag" style={{ '--min': '270px', '--gap': '14px' }}>
              {cur.metrics.map(([v, t, p, d, s]) => (
                <div key={t} className="col g12" style={{ background: 'var(--ink-3)', borderRadius: 22, padding: 24 }}>
                  <span style={{ font: '700 52px/1 var(--f-d)', letterSpacing: '-.04em', color: 'var(--sky)' }}>{v}</span>
                  <span className="fw6" style={{ fontSize: 17 }}>{t}</span>
                  <hr className="rule" />
                  <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 12px', fontSize: 12, color: 'var(--muted-d)' }}>
                    <dt>Period</dt><dd style={{ margin: 0, color: '#D5DBE3' }}>{p}</dd><dt>Definition</dt><dd style={{ margin: 0, color: '#D5DBE3' }}>{d}</dd><dt>Source</dt><dd style={{ margin: 0, color: '#D5DBE3' }}>{s}</dd>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec-s">
        <div className="wrap ag" style={{ '--min': '460px' }}>
          <figure className="card col g20" style={{ padding: 32, margin: 0 }}>
            <div className="row between g12"><h2 className="d4">SCCN businesses by sector</h2><span className="small">Sample registry data</span></div>
            <div className="col g12" role="img" aria-label={'Bar chart: ' + bySector.map(([k, v]) => `${k} ${v}`).join(', ')}>
              {bySector.map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 190px) 1fr 24px', gap: 12, alignItems: 'center', fontSize: 13 }}>
                  <span>{k}</span><div style={{ height: 14, borderRadius: 99, background: 'var(--paper)' }}><div style={{ height: '100%', width: (v / max) * 100 + '%', borderRadius: 99, background: 'var(--blue)' }} /></div><span className="fw6">{v}</span>
                </div>
              ))}
            </div>
            <figcaption className="small">Period: live · Definition: approved, published catalogue listings · Source: SCCN registry (aggregated)</figcaption>
          </figure>
          <div className="card col g20" style={{ padding: 32 }}>
            <div className="row between g12"><h2 className="d4">Institutional reach</h2><span className="small">States &amp; institutions with evidence</span></div>
            <Placeholder label="Map of Nigeria — states with verified activity highlighted" style={{ height: 260, borderRadius: 18 }} />
            <div className="row g6">{states.map((s) => <span key={s} className="tag" style={{ minHeight: 28, fontSize: 12, cursor: 'default' }}>{s}</span>)}<span className="tag" style={{ minHeight: 28, fontSize: 12, cursor: 'default' }}>+ list pending evidence</span></div>
          </div>
        </div>
      </section>

      <section className="sec-s">
        <div className="wrap col g28">
          <div className="col g14"><span className="kicker">SDG / ESG alignment</span><h2 className="d2">Where our work contributes</h2></div>
          <div className="ag" style={{ '--min': '200px', '--gap': '12px' }}>
            {SDGS.map(([n, t, d]) => <div key={n} className="col g10" style={{ border: '1px solid var(--line)', borderRadius: 20, padding: 22 }}><span style={{ font: '700 34px/1 var(--f-d)', color: 'var(--blue)' }}>SDG {n}</span><span className="fw6">{t}</span><span className="small">{d}</span></div>)}
          </div>
        </div>
      </section>

      <section className="sec-s" style={{ background: 'var(--paper)', paddingBottom: 112 }}>
        <div className="wrap ag" style={{ '--min': '460px', '--gap': '40px' }}>
          <div className="col g18"><span className="kicker">Reports</span><h2 className="d2">Reports, briefs &amp; case studies</h2><p className="muted">Download approved reports and programme briefs. Case studies and photos appear only with consent.</p></div>
          <div className="col g10">
            {REPORTS.map(([t, m]) => (
              <a key={t} href="#" className="card card-link row g16" style={{ padding: '18px 22px', flexWrap: 'nowrap' }} aria-disabled="true" onClick={(e) => e.preventDefault()}>
                <span style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--ink)', color: '#fff', display: 'grid', placeItems: 'center', flex: 'none', font: '700 11px/1 var(--f)' }}>PDF</span>
                <div className="col g4 grow"><span className="fw6">{t}</span><span className="small">{m}</span></div>
                <Download />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

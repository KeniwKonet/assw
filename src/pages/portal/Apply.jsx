import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Check, Info, Warn } from '../../components/Icons.jsx';
import { Field, Note } from '../../components/UI.jsx';
import { FlowHeader } from '../../components/Shells.jsx';
import { CATEGORIES, INTERESTS, NEEDS, STAGES, STATES, SITE } from '../../data/site.js';
import { saveDraft, submitApplication, useDraft, useSession } from '../../lib/store.js';
import Seo from '../../seo/Seo.jsx';

const STEPS = [
  ['Applicant', 'About you', 'We use this to confirm eligibility. Contact details stay private.'],
  ['Business identity', 'Your business', 'This forms the core of your public catalogue profile.'],
  ['Classification', 'What you do', 'Helps people find you and helps us match relevant opportunities.'],
  ['Stage', 'Where is your business today?', 'There’s no wrong answer — it helps us offer the right support.'],
  ['Formalisation', 'Registration & formalisation', 'Answer what applies. Not being registered won’t stop your application.'],
  ['Traction', 'Traction so far', 'Optional figures are restricted to reviewers and never published.'],
  ['Needs', 'Support needs', 'Tell us where you need the most help.'],
  ['Opportunity interests', 'Opportunity interests', 'Choose the kinds of opportunities you want to hear about.'],
  ['Uploads', 'Uploads', 'Logo and photos appear on your listing. Evidence files stay private.'],
  ['Declarations', 'Declarations & consent', 'Each consent is separate. Optional consents can be changed later in your portal.'],
  ['Review & submit', 'Review your application', 'Check each section before you submit.'],
];
const BLANK = {
  fullName: '', email: '', phone: '', status: 'Current student', institution: '', faculty: '', course: '', level: '', state: '',
  bizName: '', year: '', description: '', socials: '', channels: 'Enquiry form + Instagram', location: '', area: 'City-wide',
  sector: '', sector2: '', products: '', segment: '', model: '', delivery: '',
  stage: '', cac: '', cacNo: '', bank: '', licences: '', tax: '',
  customers: '', revenue: 'Prefer not to say', team: '', repeat: '', evidence: '',
  needs: [], interests: [], files: {},
  dAccuracy: false, dAuthority: false, cCatalogue: false, dPrivacy: false, cMarketing: false, cReferral: false,
};
const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);
const MAX = 10 * 1024 * 1024;

function stepErrors(i, d) {
  const e = {};
  if (i === 0) { if (!d.fullName.trim()) e.fullName = 'Enter your full name'; if (!emailOk(d.email)) e.email = 'Enter a complete email address, like name@example.com'; if (!d.institution.trim()) e.institution = 'Enter your institution'; if (!d.state) e.state = 'Choose your state'; }
  if (i === 1) { if (!d.bizName.trim()) e.bizName = 'Enter your business name'; if (d.description.trim().length < 20) e.description = 'Describe your business in at least 20 characters'; if (!d.location.trim()) e.location = 'Enter your location'; }
  if (i === 2) { if (!d.sector) e.sector = 'Choose a primary sector'; if (!d.products.trim()) e.products = 'List at least one product or service'; }
  if (i === 3) { if (!d.stage) e.stage = 'Choose the stage closest to where you are'; }
  if (i === 9) { if (!d.dAccuracy) e.dAccuracy = 'Required'; if (!d.dAuthority) e.dAuthority = 'Required'; if (!d.dPrivacy) e.dPrivacy = 'Required'; }
  return e;
}

export default function Apply() {
  const session = useSession();
  const saved = useDraft();
  const nav = useNavigate();
  const [d, setD] = useState(() => ({ ...BLANK, email: session?.email || '', fullName: session?.name || '', ...(saved?.data || {}) }));
  const [i, setI] = useState(saved?.step || 0);
  const [errs, setErrs] = useState({});
  const [savedAt, setSavedAt] = useState(saved?.savedAt || null);
  const headRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => { saveDraft({ data: d, step: i }); setSavedAt(new Date().toISOString()); }, 600); return () => clearTimeout(t); }, [d, i]);
  useEffect(() => { headRef.current?.focus(); }, [i]);

  if (!session) return <Navigate to="/auth?mode=join&path=founder&next=apply" replace />;

  const up = (k) => (e) => { const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value; setD((x) => ({ ...x, [k]: v })); if (errs[k]) setErrs((x) => ({ ...x, [k]: undefined })); };
  const toggle = (k, v) => setD((x) => ({ ...x, [k]: x[k].includes(v) ? x[k].filter((y) => y !== v) : x[k].concat(v) }));
  const onFile = (k) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setD((x) => ({ ...x, files: { ...x.files, [k]: file.size > MAX ? { error: 'File too large — maximum 10 MB', name: file.name } : { name: file.name, size: Math.round(file.size / 1024) + ' KB' } } }));
  };
  const next = () => { const e = stepErrors(i, d); setErrs(e); if (Object.keys(e).length === 0) setI(Math.min(STEPS.length - 1, i + 1)); };
  const firstInvalid = STEPS.findIndex((_, k) => Object.keys(stepErrors(k, d)).length > 0);
  const submit = () => {
    if (firstInvalid !== -1 && firstInvalid < STEPS.length - 1) { setI(firstInvalid); setErrs(stepErrors(firstInvalid, d)); return; }
    const id = submitApplication(d);
    nav('/payment?app=' + id);
  };
  const ic = (k) => 'input' + (errs[k] ? ' is-err' : '');
  const F = ({ k, label, optional, hint, type = 'text', className, ...rest }) => (
    <Field id={'f-' + k} label={label} optional={optional} hint={hint} error={errs[k]} className={className}>
      <input id={'f-' + k} type={type} className={ic(k)} value={d[k]} onChange={up(k)} aria-invalid={!!errs[k]} aria-describedby={errs[k] ? 'f-' + k + '-err' : undefined} {...rest} />
    </Field>
  );
  const S = ({ k, label, options, optional, hint, className }) => (
    <Field id={'f-' + k} label={label} optional={optional} hint={hint} error={errs[k]} className={className}>
      <select id={'f-' + k} className={ic(k)} value={d[k]} onChange={up(k)} aria-invalid={!!errs[k]}><option value="">Select…</option>{options.map((o) => <option key={o}>{o}</option>)}</select>
    </Field>
  );
  const Up = ({ k, label, note }) => {
    const v = d.files[k];
    return (
      <div className="upload" style={v?.error ? { borderColor: 'var(--red)', background: 'var(--red-10)' } : undefined}>
        <div className="col g4 grow"><span className="fw6">{label} <span className="opt">{note}</span></span>
          {v?.error ? <span className="err">{v.error}</span> : <span className="small">{v ? `${v.name} · ${v.size} · ready` : 'PDF, JPG or PNG, up to 10 MB'}</span>}
        </div>
        <label className="btn btn-line btn-sm" style={{ cursor: 'pointer' }}>{v ? 'Replace' : 'Choose file'}<input type="file" className="sr" accept=".pdf,.png,.jpg,.jpeg,.webp" onChange={onFile(k)} /></label>
      </div>
    );
  };
  const chip = (k, v) => <button key={v} type="button" aria-pressed={d[k].includes(v)} className={'tag' + (d[k].includes(v) ? ' on' : '')} style={{ minHeight: 42, padding: '0 18px' }} onClick={() => toggle(k, v)}>{v}</button>;
  const pct = Math.round((i / (STEPS.length - 1)) * 100);
  const errList = Object.entries(errs).filter(([, v]) => v);

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <Seo title="Enterprise application" path="/apply" noindex />
      <FlowHeader title="SCCN enterprise application" right={<>
        <span className="small row g6" aria-live="polite">{savedAt && <><Check size={14} color="var(--ok)" />Draft saved</>}</span>
        <Link className="btn btn-line btn-sm" to="/portal/enterprise">Save &amp; exit</Link>
      </>} />
      <div className="wrap layout-side" style={{ gap: 28, paddingTop: 32, paddingBottom: 64 }}>
        <nav aria-label="Application steps" className="aside col g16" style={{ flexBasis: 260 }}>
          <div className="box col g12" style={{ padding: 18 }}>
            <div className="row between" style={{ fontSize: 13 }}><span className="fw6">{pct}% complete</span><span className="muted">Step {i + 1} of {STEPS.length}</span></div>
            <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Application progress"><i style={{ width: pct + '%' }} /></div>
          </div>
          <ol className="box steps" style={{ padding: 10, listStyle: 'none' }}>
            {STEPS.map((s, k) => (
              <li key={s[0]}><button type="button" className={'step' + (k === i ? ' on' : k < i ? ' done' : '')} aria-current={k === i ? 'step' : undefined} onClick={() => { setErrs({}); setI(k); }}>
                <span className="n">{k < i ? <Check size={12} /> : k + 1}</span>{s[0]}
              </button></li>
            ))}
          </ol>
        </nav>

        <div className="content col g18">
          <div className="box col g24" style={{ padding: 36 }}>
            <div className="col g8"><span className="kicker">Step {i + 1} · {STEPS[i][0]}</span><h1 className="d3" tabIndex={-1} ref={headRef} style={{ outline: 'none' }}>{STEPS[i][1]}</h1><p className="muted" style={{ fontSize: 15 }}>{STEPS[i][2]}</p></div>
            {errList.length > 0 && <Note kind="red" role="alert">Please fix {errList.length} field{errList.length > 1 ? 's' : ''} before continuing.</Note>}

            {i === 0 && <div className="ag" style={{ '--min': '250px', '--gap': '18px' }}>
              {F({ k: 'fullName', label: 'Full name', autoComplete: 'name' })}
              {F({ k: 'email', label: 'Email', type: 'email', autoComplete: 'email' })}
              {F({ k: 'phone', label: 'Phone', type: 'tel', optional: true, hint: 'Private — never published.', autoComplete: 'tel' })}
              {S({ k: 'status', label: 'Status', options: ['Current student', 'Recent graduate'] })}
              {F({ k: 'institution', label: 'Institution' })}
              {F({ k: 'faculty', label: 'Faculty / department', optional: true })}
              {F({ k: 'course', label: 'Course', optional: true })}
              {S({ k: 'level', label: 'Level', optional: true, options: ['100', '200', '300', '400', '500+', 'Graduated'] })}
              {S({ k: 'state', label: 'State', options: STATES })}
            </div>}

            {i === 1 && <div className="ag" style={{ '--min': '250px', '--gap': '18px' }}>
              {F({ k: 'bizName', label: 'Registered or trading name' })}
              {F({ k: 'year', label: 'Year started', optional: true, inputMode: 'numeric' })}
              <Field id="f-description" label="Short description" hint={`Shown on your public listing · ${d.description.length} / 240`} error={errs.description} className="span-all">
                <textarea id="f-description" className={ic('description')} maxLength={240} value={d.description} onChange={up('description')} aria-invalid={!!errs.description} />
              </Field>
              {F({ k: 'socials', label: 'Website or social handles', optional: true })}
              {S({ k: 'channels', label: 'Public enquiry channels', options: ['Enquiry form only', 'Enquiry form + Instagram', 'Enquiry form + business WhatsApp', 'Enquiry form + website'] })}
              {F({ k: 'location', label: 'Location (town, state)' })}
              {S({ k: 'area', label: 'Service area', options: ['Campus only', 'City-wide', 'State-wide', 'Nationwide / online'] })}
            </div>}

            {i === 2 && <div className="ag" style={{ '--min': '250px', '--gap': '18px' }}>
              {S({ k: 'sector', label: 'Primary sector', options: CATEGORIES })}
              {S({ k: 'sector2', label: 'Secondary sector', optional: true, options: CATEGORIES })}
              {F({ k: 'products', label: 'Products / services', className: 'span-all', placeholder: 'e.g. event trays, weekly meal packs' })}
              {S({ k: 'segment', label: 'Customer segment', optional: true, options: ['Students & societies', 'Households', 'Businesses', 'Government / institutions'] })}
              {S({ k: 'model', label: 'Business model', optional: true, options: ['Direct sales', 'Subscription', 'Service fees', 'Commission', 'Other'] })}
              {S({ k: 'delivery', label: 'Delivery channel', optional: true, options: ['In person', 'Delivery', 'In person + delivery', 'Online'] })}
            </div>}

            {i === 3 && <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="sr">Business stage</legend>
              {errs.stage && <span className="err" style={{ marginBottom: 10 }}>{errs.stage}</span>}
              <div role="radiogroup" aria-label="Business stage" className="ag" style={{ '--min': '220px', '--gap': '10px' }}>
                {STAGES.map(([t, desc]) => {
                  const on = d.stage === t;
                  return <button key={t} type="button" role="radio" aria-checked={on} onClick={() => { setD({ ...d, stage: t }); setErrs({}); }} className="col g6 start" style={{ textAlign: 'left', padding: 18, borderRadius: 16, cursor: 'pointer', fontFamily: 'var(--f)', minHeight: 88, background: on ? 'var(--blue)' : '#fff', color: on ? '#fff' : 'var(--ink)', border: '1.5px solid ' + (on ? 'var(--blue)' : 'var(--line)') }}><span style={{ font: '700 17px/1.2 var(--f-d)' }}>{t}</span><span style={{ fontSize: 13, opacity: 0.8 }}>{desc}</span></button>;
                })}
              </div>
            </fieldset>}

            {i === 4 && <div className="ag" style={{ '--min': '250px', '--gap': '18px' }}>
              {S({ k: 'cac', label: 'CAC status', options: ['Registered — business name', 'Registered — limited company', 'In progress', 'Not registered'] })}
              {F({ k: 'cacNo', label: 'CAC number', optional: true, hint: 'Restricted — reviewers only.' })}
              {S({ k: 'bank', label: 'Business bank account', optional: true, options: ['Yes', 'No', 'Prefer not to say'] })}
              {F({ k: 'licences', label: 'Licences / permits', optional: true, placeholder: 'e.g. food handler’s certificate' })}
              {S({ k: 'tax', label: 'Tax status', optional: true, options: ['Not yet registered', 'TIN obtained'] })}
            </div>}

            {i === 5 && <div className="ag" style={{ '--min': '250px', '--gap': '18px' }}>
              {S({ k: 'customers', label: 'Customers / users so far', optional: true, options: ['0', '1–20', '21–100', '100+'] })}
              {S({ k: 'revenue', label: 'Sales / revenue range', optional: true, hint: 'Restricted to reviewers.', options: ['Prefer not to say', 'Under ₦100k / month', '₦100k–₦500k / month', 'Over ₦500k / month'] })}
              {F({ k: 'team', label: 'Team size', optional: true, inputMode: 'numeric' })}
              {S({ k: 'repeat', label: 'Repeat customers?', optional: true, options: ['Yes', 'No', 'Not sure'] })}
              <Field id="f-evidence" label="Pilots, partnerships or other evidence" optional className="span-all"><textarea id="f-evidence" className="input" value={d.evidence} onChange={up('evidence')} /></Field>
            </div>}

            {i === 6 && <div className="col g14"><span className="lbl">What support would help most? Choose any.</span><div className="row g8">{NEEDS.map((v) => chip('needs', v))}</div></div>}
            {i === 7 && <div className="col g14"><span className="lbl">Which opportunities interest you?</span><div className="row g8">{INTERESTS.map((v) => chip('interests', v))}</div><p className="hint">Used to match you to relevant notices. It doesn’t affect your application.</p></div>}

            {i === 8 && <div className="ag" style={{ '--min': '280px', '--gap': '14px' }}>
              {Up({ k: 'logo', label: 'Logo', note: '(public)' })}{Up({ k: 'photos', label: 'Product images', note: '(public)' })}{Up({ k: 'deck', label: 'Pitch deck', note: '(optional · restricted)' })}
              {Up({ k: 'cacDoc', label: 'CAC evidence', note: '(restricted)' })}{Up({ k: 'poc', label: 'Proof-of-concept evidence', note: '(optional)' })}{Up({ k: 'certs', label: 'Certificates', note: '(optional)' })}
            </div>}

            {i === 9 && <div className="col g12">
              <fieldset className="col g12" style={{ padding: 18, border: '1px solid var(--line)', borderRadius: 16, margin: 0 }}>
                <legend className="kicker" style={{ padding: '0 6px' }}>Required</legend>
                {[['dAccuracy', 'The information I have given is accurate and complete.'], ['dAuthority', 'I have authority to submit this business.'], ['dPrivacy', <>I have read the <Link to="/policies/privacy">Privacy Notice</Link> and accept the <Link to="/policies/terms">Terms</Link> and <Link to="/policies/listing-terms">Catalogue Listing Terms</Link>.</>]].map(([k, t]) => (
                  <label key={k} className="check"><input type="checkbox" checked={d[k]} onChange={up(k)} aria-invalid={!!errs[k]} />{t}{errs[k] && <span className="err" style={{ marginLeft: 6 }}>Required</span>}</label>
                ))}
              </fieldset>
              <fieldset className="col g12" style={{ padding: 18, border: '1px solid var(--line)', borderRadius: 16, margin: 0 }}>
                <legend className="kicker" style={{ padding: '0 6px', color: 'var(--muted)' }}>Optional — change any time</legend>
                <label className="check"><input type="checkbox" checked={d.cCatalogue} onChange={up('cCatalogue')} />I consent to my approved profile being published in the public catalogue. (You’ll also confirm the preview before it goes live.)</label>
                <label className="check"><input type="checkbox" checked={d.cMarketing} onChange={up('cMarketing')} />Send me SCCN updates and opportunity notices by email.</label>
                <label className="check"><input type="checkbox" checked={d.cReferral} onChange={up('cReferral')} />SCCN may refer my business to relevant mentors, partners or opportunity providers. I’ll be asked before identifiable details are shared for a specific referral.</label>
              </fieldset>
              <Note kind="warn">{SITE.disclaimer}</Note>
            </div>}

            {i === 10 && <div className="col g10">
              {STEPS.slice(0, 10).map(([t], k) => {
                const bad = Object.keys(stepErrors(k, d)).length > 0;
                return (
                  <div key={t} className="row between g12" style={{ padding: '16px 18px', border: '1px solid var(--line)', borderRadius: 14 }}>
                    <div className="row g12"><span className={'st ' + (bad ? 'st-red' : 'st-open')}>{bad ? 'Needs attention' : 'Complete'}</span><span className="fw6">{t}</span></div>
                    <button type="button" className="btn btn-text btn-sm" style={{ color: 'var(--blue)' }} onClick={() => { setErrs(stepErrors(k, d)); setI(k); }}>Edit</button>
                  </div>
                );
              })}
              <Note>Next, pay the ₦5,000 enterprise participation contribution. Your application is recorded either way; review starts once payment is verified.</Note>
            </div>}

            <hr className="rule" />
            <div className="row between g12">
              <button type="button" className="btn btn-line" onClick={() => { setErrs({}); setI(Math.max(0, i - 1)); }} disabled={i === 0}>Back</button>
              <div className="row g10">
                <Link className="btn btn-text" to="/portal/enterprise">Save &amp; finish later</Link>
                {i < STEPS.length - 1 ? <button type="button" className="btn btn-primary" onClick={next}>Save &amp; continue</button> : <button type="button" className="btn btn-primary" onClick={submit}>Submit &amp; continue to payment</button>}
              </div>
            </div>
          </div>
          <p className="small" style={{ textAlign: 'center' }}>Fields marked “restricted” are visible only to authorised SCCN reviewers. Need help? <Link to="/contact">Contact the SCCN team</Link>.</p>
        </div>
      </div>
    </div>
  );
}

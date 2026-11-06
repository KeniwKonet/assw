import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Sticker } from '../../components/Brand.jsx';
import { Check, Mail } from '../../components/Icons.jsx';
import { Field, Note } from '../../components/UI.jsx';
import { signIn, signUp } from '../../lib/store.js';

const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);

export default function Auth() {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const next = params.get('next');
  const [mode, setMode] = useState(params.get('mode') === 'join' ? 'join' : 'signin');
  const [path, setPath] = useState(params.get('path') === 'founder' || next === 'apply' ? 'founder' : 'member');
  const [f, setF] = useState({ email: '', password: '', first: '', last: '', status: 'Current student', age: false, updates: false });
  const [tried, setTried] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const up = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const go = (m) => { setMode(m); setTried(false); setResetSent(false); };

  const errIn = tried && mode === 'signin' ? { email: !emailOk(f.email) && 'Enter your email address', password: !f.password && 'Enter your password' } : {};
  const errUp = tried && mode === 'join' ? { first: !f.first.trim() && 'Enter your first name', last: !f.last.trim() && 'Enter your last name', email: !emailOk(f.email) && 'Enter a valid email address', password: f.password.length < 10 && 'Use at least 10 characters', age: !f.age && 'You must agree to continue' } : {};

  const doSignIn = (e) => {
    e.preventDefault();
    if (!emailOk(f.email) || !f.password) return setTried(true);
    const role = signIn(f.email.trim());
    if (role === 'admin') return nav('/admin');
    if (next === 'apply') return nav('/apply');
    nav(role === 'founder' || next === 'enterprise' ? '/portal/enterprise' : '/portal/member');
  };
  const doJoin = (e) => {
    e.preventDefault();
    if (Object.values({ a: f.first.trim(), b: f.last.trim(), c: emailOk(f.email), d: f.password.length >= 10, e: f.age }).some((v) => !v)) return setTried(true);
    signUp({ first: f.first.trim(), last: f.last.trim(), email: f.email.trim(), path });
    go('verify');
  };
  const doVerify = (e) => { e.preventDefault(); nav(path === 'founder' ? '/apply' : '/portal/member'); };
  const setDigit = (i, v) => {
    const d = v.replace(/\D/g, '').slice(-1);
    const n = code.slice(); n[i] = d; setCode(n);
    if (d && i < 5) document.getElementById('d' + (i + 1))?.focus();
  };
  const card = (on) => ({ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start', textAlign: 'left', padding: 16, borderRadius: 16, cursor: 'pointer', fontFamily: 'var(--f)', minHeight: 84, background: on ? 'var(--blue)' : '#fff', color: on ? '#fff' : 'var(--ink)', border: '1.5px solid ' + (on ? 'var(--blue)' : 'var(--line)') });
  const ic = (err, k) => 'input' + (err[k] ? ' is-err' : '');

  return (
    <div className="row" style={{ minHeight: '100vh', alignItems: 'stretch' }}>
      <div className="dark col between g48" style={{ flex: '1 1 480px', backgroundImage: 'linear-gradient(#171D24 1px, transparent 1px), linear-gradient(90deg, #171D24 1px, transparent 1px)', backgroundSize: '120px 120px', padding: '40px 48px', position: 'relative', overflow: 'hidden' }}>
        <Link to="/" aria-label="ASSW Nigeria home"><img src="/brand/assw-logo-full-white.png" alt="Association for Students’ Social Welfare Nigeria" style={{ height: 110, width: 'auto' }} /></Link>
        <div className="col g20" style={{ maxWidth: 520 }}>
          <h1 style={{ fontSize: 'clamp(40px, 4.6vw, 68px)', lineHeight: 0.98, letterSpacing: '-.04em', textTransform: 'uppercase' }}>One account. <span style={{ color: 'var(--sky)' }}>Two</span> <span className="hl hl-red">pathways.</span></h1>
          <p style={{ color: 'var(--muted-d)', fontSize: 17 }}>Join ASSW free as a general member, or register as a founder to apply for SCCN enterprise membership. You can do both from the same account.</p>
        </div>
        <span className="small">Protected by encryption and rate limiting. Admin accounts require multi-factor authentication.</span>
        <Sticker text="WELCOME · TO · ASSW · NIGERIA ·" to="/" className="hide-sm" style={{ position: 'absolute', right: 40, top: 40 }} label="Back to the ASSW home page" />
      </div>

      <main id="main" className="row" style={{ flex: '1 1 480px', justifyContent: 'center', padding: '48px 24px' }}>
        <div className="col g24 w-full" style={{ maxWidth: 480 }}>
          {(mode === 'signin' || mode === 'join') && (
            <div className="tabs" role="tablist" aria-label="Account">
              <button type="button" role="tab" aria-selected={mode === 'signin'} className={'tab' + (mode === 'signin' ? ' on' : '')} onClick={() => go('signin')}>Sign in</button>
              <button type="button" role="tab" aria-selected={mode === 'join'} className={'tab' + (mode === 'join' ? ' on' : '')} onClick={() => go('join')}>Create account</button>
            </div>
          )}

          {mode === 'signin' && (
            <form className="col g18" onSubmit={doSignIn} noValidate>
              <div className="col g8"><h2 className="d3">Welcome back</h2><p className="muted" style={{ fontSize: 15 }}>Sign in to your Member or Enterprise Portal.</p></div>
              <Field id="s1" label="Email" error={errIn.email}><input id="s1" type="email" className={ic(errIn, 'email')} autoComplete="email" value={f.email} onChange={up('email')} /></Field>
              <Field id="s2" label="Password" error={errIn.password}><input id="s2" type="password" className={ic(errIn, 'password')} autoComplete="current-password" value={f.password} onChange={up('password')} /></Field>
              <div className="row between g8"><label className="check"><input type="checkbox" />Keep me signed in</label><button type="button" className="btn btn-text btn-sm" style={{ color: 'var(--blue)' }} onClick={() => go('reset')}>Forgot password?</button></div>
              <button type="submit" className="btn btn-primary">Sign in</button>
              <Note>Demo: <strong>founder@example.com</strong> opens the Enterprise Portal, <strong>admin@assw.ng</strong> opens Admin, any other email opens the Member Portal. Any password works.</Note>
            </form>
          )}

          {mode === 'join' && (
            <form className="col g18" onSubmit={doJoin} noValidate>
              <div className="col g8"><h2 className="d3">Create your account</h2><p className="muted" style={{ fontSize: 15 }}>What brings you to ASSW?</p></div>
              <div role="radiogroup" aria-label="Account pathway" className="ag" style={{ '--min': '200px', '--gap': '10px' }}>
                <button type="button" role="radio" aria-checked={path === 'member'} onClick={() => setPath('member')} style={card(path === 'member')}><span style={{ font: '700 17px/1.2 var(--f-d)' }}>Join ASSW</span><span style={{ fontSize: 13, opacity: 0.8 }}>Free general membership</span></button>
                <button type="button" role="radio" aria-checked={path === 'founder'} onClick={() => setPath('founder')} style={card(path === 'founder')}><span style={{ font: '700 17px/1.2 var(--f-d)' }}>I run a business</span><span style={{ fontSize: 13, opacity: 0.8 }}>Then apply to SCCN</span></button>
              </div>
              <div className="ag" style={{ '--min': '180px', '--gap': '12px' }}>
                <Field id="j1" label="First name" error={errUp.first}><input id="j1" className={ic(errUp, 'first')} autoComplete="given-name" value={f.first} onChange={up('first')} /></Field>
                <Field id="j2" label="Last name" error={errUp.last}><input id="j2" className={ic(errUp, 'last')} autoComplete="family-name" value={f.last} onChange={up('last')} /></Field>
              </div>
              <Field id="j3" label="Email" error={errUp.email}><input id="j3" type="email" className={ic(errUp, 'email')} autoComplete="email" value={f.email} onChange={up('email')} /></Field>
              <Field id="j4" label="Password" hint="At least 10 characters." error={errUp.password}><input id="j4" type="password" className={ic(errUp, 'password')} autoComplete="new-password" value={f.password} onChange={up('password')} /></Field>
              <Field id="j5" label="Status"><select id="j5" className="input" value={f.status} onChange={up('status')}><option>Current student</option><option>Recent graduate</option><option>Other young person</option></select></Field>
              <div className="col g10" style={{ padding: 16, background: 'var(--paper)', borderRadius: 16 }}>
                <label className="check"><input type="checkbox" checked={f.age} onChange={up('age')} />I am 18 or older and agree to the <Link to="/policies/terms">Terms of Use</Link> and <Link to="/policies/privacy">Privacy Notice</Link>.</label>
                {errUp.age && <span className="err">{errUp.age}</span>}
                <label className="check"><input type="checkbox" checked={f.updates} onChange={up('updates')} />Send me programme updates and opportunity notices <span className="opt">(optional)</span></label>
              </div>
              <button type="submit" className="btn btn-primary">{path === 'founder' ? 'Create account & continue to application' : 'Create free account'}</button>
            </form>
          )}

          {mode === 'reset' && (
            <form className="col g18" onSubmit={(e) => { e.preventDefault(); setResetSent(true); }}>
              <div className="col g8"><h2 className="d3">Reset your password</h2><p className="muted" style={{ fontSize: 15 }}>We’ll email you a secure link that expires in 30 minutes.</p></div>
              {resetSent && <div className="note" role="status" style={{ background: 'var(--ok-10)', color: '#0B4A2C' }}><Check size={20} color="var(--ok)" /><span>If an account exists for that email, a reset link is on its way. Check your spam folder too.</span></div>}
              <Field id="r1" label="Email"><input id="r1" type="email" className="input" autoComplete="email" value={f.email} onChange={up('email')} required /></Field>
              <button type="submit" className="btn btn-primary">Send reset link</button>
              <button type="button" className="btn btn-text" onClick={() => go('signin')}>Back to sign in</button>
            </form>
          )}

          {mode === 'verify' && (
            <form className="col g18" onSubmit={doVerify}>
              <span style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--blue-10)', color: 'var(--blue)', display: 'grid', placeItems: 'center' }}><Mail /></span>
              <div className="col g8"><h2 className="d3">Verify your email</h2><p className="muted" style={{ fontSize: 15 }}>Enter the 6-digit code we sent to {f.email || 'your email'}. (Demo: any digits.)</p></div>
              <div role="group" aria-label="Verification code" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 8 }}>
                {code.map((d, i) => <input key={i} id={'d' + i} className="input" aria-label={'Digit ' + (i + 1)} inputMode="numeric" maxLength={1} value={d} onChange={(e) => setDigit(i, e.target.value)} style={{ textAlign: 'center', font: '700 22px var(--f-d)', padding: 0, minHeight: 60 }} />)}
              </div>
              <button type="submit" className="btn btn-primary" disabled={code.some((d) => !d)}>Verify and continue</button>
              <span className="small" style={{ textAlign: 'center' }}>Didn’t get it? <button type="button" className="btn btn-text btn-sm" style={{ color: 'var(--blue)', minHeight: 0, padding: 0 }}>Resend code</button></span>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

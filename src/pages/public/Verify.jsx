import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check } from '../../components/Icons.jsx';
import { verifyNumber } from '../../lib/store.js';

export default function Verify() {
  const [params, setParams] = useSearchParams();
  const initial = params.get('no') || '';
  const [num, setNum] = useState(initial);
  const [res, setRes] = useState(() => (initial ? verifyNumber(initial) : null));
  const check = (e) => { e.preventDefault(); if (!num.trim()) return; setRes(verifyNumber(num)); setParams({ no: num.trim().toUpperCase() }, { replace: true }); };

  return (
    <section className="grid-bg" style={{ padding: '80px 0 112px' }}>
      <div className="wrap-n col center g28">
        <span className="pill">Certificate verification</span>
        <h1 className="d2">Verify an SCCN enterprise <span className="hl">membership</span></h1>
        <p className="lead" style={{ maxWidth: 600 }}>Enter the membership number printed on the certificate, or scan its QR code. We show only the public status — never private details.</p>
        <form onSubmit={check} className="row g10 w-full" style={{ maxWidth: 640 }}>
          <label style={{ flex: '1 1 280px', textAlign: 'left' }}><span className="sr">Membership number</span>
            <input className="input" value={num} onChange={(e) => { setNum(e.target.value); setRes(null); }} placeholder="SCCN-26-00148" style={{ minHeight: 56, borderRadius: 999, font: '600 17px/1 var(--f-d)', letterSpacing: '.04em', textTransform: 'uppercase' }} />
          </label>
          <button type="submit" className="btn btn-primary" style={{ minHeight: 56 }}>Verify</button>
        </form>
        <span className="small">Try SCCN-26-00148 (active) or SCCN-25-00031 (expired)</span>

        <div aria-live="polite" className="w-full" style={{ maxWidth: 640 }}>
          {res?.status === 'active' && (
            <div className="card col g18" style={{ textAlign: 'left', padding: 32, borderColor: 'var(--ok)', boxShadow: '0 0 0 1px var(--ok)' }}>
              <div className="row g14" style={{ flexWrap: 'nowrap' }}><span style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--ok-10)', color: 'var(--ok)', display: 'grid', placeItems: 'center', flex: 'none' }}><Check size={24} w={2.6} /></span><div className="col g4"><span style={{ font: '700 22px/1.1 var(--f-d)' }}>Valid membership</span><span className="small">Verified just now</span></div></div>
              <hr className="rule" />
              <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, fontSize: 15 }}>
                <dt className="muted">Business</dt><dd className="fw6" style={{ margin: 0 }}>{res.business}</dd>
                <dt className="muted">Number</dt><dd className="fw6" style={{ margin: 0 }}>{res.no}</dd>
                <dt className="muted">Status</dt><dd style={{ margin: 0 }}><span className="st st-open">SCCN Enterprise Member</span></dd>
                <dt className="muted">Issued</dt><dd style={{ margin: 0 }}>{res.issued}</dd>
              </dl>
              {res.slug && <Link className="btn btn-line self-start" to={'/catalogue/' + res.slug}>View catalogue profile</Link>}
            </div>
          )}
          {res?.status === 'expired' && (
            <div className="card col g14" style={{ textAlign: 'left', padding: 32, borderColor: 'var(--warn)', boxShadow: '0 0 0 1px var(--warn)' }}>
              <div className="row g14"><span className="st st-closing">Expired</span><span style={{ font: '700 20px/1.1 var(--f-d)' }}>{res.no}</span></div>
              <p className="muted">This membership for {res.business} has expired and has not been renewed.</p>
            </div>
          )}
          {res?.status === 'none' && (
            <div className="card col g14" role="alert" style={{ textAlign: 'left', padding: 32, borderColor: 'var(--red)', boxShadow: '0 0 0 1px var(--red)' }}>
              <div className="row g14"><span className="st st-red">Not found</span><span style={{ font: '700 20px/1.1 var(--f-d)' }}>{res.no}</span></div>
              <p className="muted">We couldn’t find a membership with that number. Check for typos — numbers look like SCCN-26-00148. If you think a certificate is fraudulent, <Link to="/contact?t=complaint">tell us</Link>.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { Check, Close, Info, Lock, Spinner } from '../../components/Icons.jsx';
import { Flag, Note } from '../../components/UI.jsx';
import { FlowHeader } from '../../components/Shells.jsx';
import { SITE, naira } from '../../data/site.js';
import { confirmPayment, startPayment, useApps, useMyApp } from '../../lib/store.js';

export default function Payment() {
  const [params] = useSearchParams();
  const apps = useApps();
  const mine = useMyApp();
  const app = apps.find((a) => a.id === params.get('app')) || mine;
  const [gateway, setGateway] = useState('Paystack');
  const [ack, setAck] = useState(false);
  const [simulate, setSimulate] = useState('verified');
  const [dup, setDup] = useState(null);
  const status = app?.payment?.status;

  useEffect(() => {
    if (status !== 'pending' || !app) return undefined;
    const t = setTimeout(() => confirmPayment(app.id, simulate), 2200); // stands in for the gateway webhook
    return () => clearTimeout(t);
  }, [status, app, simulate]);

  if (!app) return <Navigate to="/register-business" replace />;
  const pay = () => { const r = startPayment(app.id, gateway); if (r.duplicate) setDup(r.ref); };
  const card = (on) => ({ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start', textAlign: 'left', padding: 18, borderRadius: 16, cursor: 'pointer', fontFamily: 'var(--f)', background: on ? 'var(--blue-10)' : '#fff', color: 'var(--ink)', border: '2px solid ' + (on ? 'var(--blue)' : 'var(--line)') });
  const when = app.payment.at ? new Date(app.payment.at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '';

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <FlowHeader title="Secure payment" right={<Link className="btn btn-line btn-sm" to="/portal/enterprise">Back to portal</Link>} />
      <div className="wrap layout-side" style={{ gap: 28, paddingTop: 40, paddingBottom: 64 }}>
        <main id="main" className="content" aria-live="polite">
          {dup ? (
            <div className="box col g18" style={{ padding: 40 }}>
              <div className="row g12"><span className="st st-closing">Already paid</span><h1 className="d3">You’ve already paid for this application</h1></div>
              <p className="muted">We found a verified payment for {app.id} ({dup}). We’ve stopped this second payment so you won’t be charged twice.</p>
              <div className="row g10"><Link className="btn btn-primary" to="/portal/enterprise">View application status</Link><Link className="btn btn-line" to="/contact?t=complaint">Report a problem</Link></div>
            </div>
          ) : status === 'pending' ? (
            <div className="box col center g18" style={{ padding: 48 }} role="status">
              <Spinner />
              <h1 className="d3">Confirming your payment…</h1>
              <p className="muted" style={{ maxWidth: 460 }}>We’re verifying the transaction directly with {app.payment.gateway}. This usually takes a few seconds. Please don’t pay again.</p>
              <span className="small">Reference {app.payment.ref}</span>
              <span className="small">Bank transfers can take longer. We’ll email you when it’s confirmed — you can safely close this page.</span>
            </div>
          ) : status === 'verified' ? (
            <div className="box col g20" style={{ padding: 40 }}>
              <div className="row g16" style={{ flexWrap: 'nowrap' }}><span style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--ok)', display: 'grid', placeItems: 'center', flex: 'none' }}><Check size={26} color="#fff" /></span><div><h1 className="d3">Payment confirmed</h1><p className="muted" style={{ fontSize: 15 }}>Verified with the provider · receipt emailed</p></div></div>
              <dl className="ag" style={{ '--min': '200px', '--gap': '14px', border: '1px dashed #C3CAD3', borderRadius: 18, padding: 22, fontSize: 14, margin: 0 }}>
                {[['Amount', naira(SITE.contribution) + '.00'], ['Reference', app.payment.ref], ['Date', when], ['Application', app.id]].map(([k, v]) => <div key={k} className="col g4"><dt className="muted">{k}</dt><dd className="fw6" style={{ margin: 0 }}>{v}</dd></div>)}
              </dl>
              <Note>Status: <strong>{app.status === 'approved' ? 'SCCN Enterprise Member' : 'Application Received'}</strong>. {app.status === 'approved' ? 'Your membership is active.' : 'Your application is now in the review queue. You’ll get your SCCN number and certificate if approved.'}</Note>
              <div className="row g10"><Link className="btn btn-primary" to="/portal/enterprise">Go to your portal</Link><button type="button" className="btn btn-line" onClick={() => window.print()}>Print receipt</button></div>
            </div>
          ) : (
            <div className="box col g20" style={{ padding: 36 }}>
              {status === 'failed' && (
                <div className="note note-red" role="alert"><Close size={20} /><span><strong>Payment didn’t go through.</strong> The provider declined the transaction ({app.payment.ref}). You haven’t been charged — try again or use another method.</span></div>
              )}
              <div className="col g8"><span className="kicker">Final step</span><h1 className="d3">Pay your enterprise participation contribution</h1><p className="muted" style={{ fontSize: 15 }}>You’ll complete payment on the provider’s secure page. ASSW never sees or stores your card details.</p></div>
              <div role="radiogroup" aria-label="Payment provider" className="ag" style={{ '--min': '220px', '--gap': '10px' }}>
                {['Paystack', 'Flutterwave'].map((g) => <button key={g} type="button" role="radio" aria-checked={gateway === g} onClick={() => setGateway(g)} style={card(gateway === g)}><span style={{ font: '700 18px var(--f-d)' }}>{g}</span><span style={{ fontSize: 13, opacity: 0.8 }}>Card · bank transfer · USSD</span></button>)}
              </div>
              <Flag style={{ alignSelf: 'flex-start' }}>Gateway selection pending merchant onboarding</Flag>
              <label className="check"><input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />I understand this contribution covers defined SCCN services and does not guarantee funding or selection. <Link to="/policies/terms">Refund policy [TBC]</Link></label>
              <fieldset className="row g10" style={{ border: '1px dashed var(--line)', borderRadius: 12, padding: '10px 14px', margin: 0 }}>
                <legend className="small" style={{ padding: '0 6px' }}>Demo only — gateway response</legend>
                <label className="check"><input type="radio" name="sim" checked={simulate === 'verified'} onChange={() => setSimulate('verified')} />Success</label>
                <label className="check"><input type="radio" name="sim" checked={simulate === 'failed'} onChange={() => setSimulate('failed')} />Failure</label>
              </fieldset>
              <button type="button" className="btn btn-primary self-start" onClick={pay} disabled={!ack}>Pay {naira(SITE.contribution)} securely</button>
            </div>
          )}
        </main>

        <aside className="aside col g14" style={{ flexBasis: 320 }}>
          <div className="panel-d col g16" style={{ padding: 28, borderRadius: 24 }}>
            <span className="kicker">Summary</span>
            <div className="row between g12"><span>Enterprise participation</span><span className="fw6">{naira(SITE.contribution)}</span></div>
            <div className="row between g12" style={{ color: 'var(--muted-d)', fontSize: 14 }}><span>Validity</span><span>[TBC]</span></div>
            <div className="row between g12" style={{ color: 'var(--muted-d)', fontSize: 14 }}><span>Processing fee</span><span>[If applicable]</span></div>
            <hr className="rule" />
            <div className="row between g12" style={{ alignItems: 'baseline' }}><span className="fw6">Total</span><span style={{ font: '700 34px/1 var(--f-d)' }}>{naira(SITE.contribution)}</span></div>
            <span className="small">Application {app.id} · {app.business}</span>
          </div>
          <Note icon={Lock} style={{ background: '#fff' }}>Payment status is confirmed server-side with the provider, never just from this page. Each payment has a unique reference.</Note>
        </aside>
      </div>
    </div>
  );
}

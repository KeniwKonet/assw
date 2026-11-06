import { Link, useParams } from 'react-router-dom';
import { Sparkle } from '../../components/Icons.jsx';
import { verifyNumber, useApps } from '../../lib/store.js';
import { SITE } from '../../data/site.js';

export default function Certificate() {
  const { no } = useParams();
  const apps = useApps();
  const app = apps.find((a) => a.no === no);
  const v = verifyNumber(no);
  const business = app?.business || v.business;
  const founder = app?.founder || '[Founder name]';
  const issued = app?.issuedAt || v.issued;
  const until = issued ? new Date(new Date(issued).getTime() + 364 * 864e5).toISOString().slice(0, 10) : '';
  const fmt = (d) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');

  if (v.status === 'none') return <div className="wrap-n col center g16" style={{ padding: '120px 16px' }}><h1 className="d3">Certificate not found</h1><Link className="btn btn-primary" to="/verify">Verify a number</Link></div>;

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', padding: '32px 16px' }}>
      <style>{'@media print{.no-print{display:none!important}body{background:#fff}@page{size:A4 landscape;margin:0}.cert-wrap{padding:0!important}}'}</style>
      <div className="no-print row between g12" style={{ maxWidth: 1123, margin: '0 auto 20px' }}>
        <Link to="/portal/enterprise" className="btn btn-line btn-sm">← Back to portal</Link>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => window.print()}>Download / print PDF</button>
      </div>
      <div className="cert-wrap" style={{ overflowX: 'auto' }}>
        <article aria-label="SCCN enterprise membership certificate" style={{ width: 1123, height: 794, margin: '0 auto', boxSizing: 'border-box', padding: 28, background: 'var(--blue)' }}>
          <div className="col between" style={{ width: '100%', height: '100%', background: '#fff', borderRadius: 28, padding: '44px 56px', position: 'relative', overflow: 'hidden', backgroundImage: 'linear-gradient(#EEF2F6 1px, transparent 1px), linear-gradient(90deg, #EEF2F6 1px, transparent 1px)', backgroundSize: '96px 96px' }}>
            <Sparkle size={40} color="var(--red)" style={{ position: 'absolute', right: 64, top: 160 }} />
            <Sparkle size={26} style={{ position: 'absolute', left: 44, bottom: 210 }} />
            <div className="row between">
              <div className="row g14"><img src="/brand/assw-mark.png" alt="" style={{ height: 56 }} /><div className="col g4"><span style={{ font: '700 20px/1 var(--f-d)' }}>Students Chamber of Commerce Nigeria</span><span className="small">An initiative of the {SITE.name}</span></div></div>
              <span className={'st ' + (v.status === 'expired' ? 'st-closing' : 'st-open')} style={{ minHeight: 30, padding: '0 14px', fontSize: 13 }}>{v.status === 'expired' ? 'Expired' : 'Active'}</span>
            </div>
            <div className="col center g14">
              <span style={{ font: '600 13px/1 var(--f)', textTransform: 'uppercase', letterSpacing: '.2em', color: 'var(--blue)' }}>Certificate of</span>
              <h1 style={{ font: '700 64px/1 var(--f-d)', letterSpacing: '-.04em' }}>Enterprise <span className="hl">Membership</span></h1>
              <span style={{ fontSize: 16, color: 'var(--muted)', marginTop: 10 }}>This certifies that</span>
              <span style={{ font: '700 46px/1.05 var(--f-d)', letterSpacing: '-.03em', color: 'var(--blue)' }}>{business}</span>
              <span style={{ fontSize: 16, color: '#2E3540', maxWidth: 720, lineHeight: 1.6 }}>founded by <strong>{founder}</strong>, has completed SCCN enterprise membership requirements and is recognised as an <strong>SCCN Enterprise Member</strong>.</span>
            </div>
            <div className="row between end g32" style={{ flexWrap: 'nowrap' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '8px 36px', fontSize: 13 }}>
                <span className="muted">Membership no.</span><span className="muted">Issued</span><span className="muted">Valid until</span>
                <span style={{ font: '700 18px/1 var(--f-d)', letterSpacing: '.03em' }}>{no}</span><span style={{ font: '700 18px/1 var(--f-d)' }}>{fmt(issued)}</span><span style={{ font: '700 18px/1 var(--f-d)' }}>{fmt(until)}</span>
              </div>
              <div className="row end g40" style={{ flexWrap: 'nowrap' }}>
                <div className="col g6" style={{ width: 180 }}><span style={{ font: 'italic 500 22px/1 var(--f-d)', color: '#8A93A0' }}>[Signature]</span><span style={{ height: 1, background: 'var(--ink)' }} /><span style={{ fontSize: 12, color: 'var(--muted)' }}>[Name], Programme Director, SCCN</span></div>
                <div className="col center g6">
                  <div style={{ width: 104, height: 104, border: '1.5px dashed #9AA3AF', borderRadius: 12, display: 'grid', placeItems: 'center', textAlign: 'center', font: '600 11px/1.3 var(--f)', color: 'var(--muted)', padding: 8 }}>QR code →<br />verification URL</div>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{window.location.host}/verify?no={no}</span>
                </div>
              </div>
            </div>
            <span style={{ position: 'absolute', left: 56, right: 56, bottom: 16, fontSize: 10, color: '#6A7380', textAlign: 'center' }}>Membership does not guarantee funding, grants, loans, customers, procurement, investment, employment or selection for any third-party programme.</span>
          </div>
        </article>
      </div>
    </div>
  );
}

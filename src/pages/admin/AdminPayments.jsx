import { useState } from 'react';
import { AdminShell } from '../../components/Shells.jsx';
import { Note, Tabs, useToast } from '../../components/UI.jsx';
import { Lock, Search } from '../../components/Icons.jsx';
import { confirmPayment, updateApp, useApps } from '../../lib/store.js';
import { PAY, fmtDT } from '../../lib/admin.js';
import { SITE, naira } from '../../data/site.js';

const GROUPS = { All: () => true, Verified: (s) => s === 'verified', Pending: (s) => s === 'pending', Failed: (s) => s === 'failed' || s === 'unpaid', Refunds: (s) => s === 'refunded' };

export default function AdminPayments() {
  const apps = useApps();
  const [g, setG] = useState('All');
  const [q, setQ] = useState('');
  const [toast, say] = useToast();
  const rows = apps.filter((a) => a.payment.ref).filter((a) => GROUPS[g](a.payment.status) && (!q || (a.payment.ref + a.id + a.business).toLowerCase().includes(q.toLowerCase())));
  const count = (s) => apps.filter((a) => a.payment.status === s).length;
  const csv = () => {
    const lines = ['reference,application,business,amount,gateway,status,at', ...apps.filter((a) => a.payment.ref).map((a) => [a.payment.ref, a.id, `"${a.business}"`, SITE.contribution, a.payment.gateway, a.payment.status, a.payment.at || ''].join(','))];
    const el = document.createElement('a'); el.href = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv' })); el.download = 'sccn-reconciliation.csv'; el.click();
  };

  return (
    <AdminShell role="Finance Administrator">
      {toast}
      <div className="bar">
        <div className="col g6"><span className="small">Server-side verified via gateway webhooks · no card data stored</span><h1 className="d3">Payments &amp; reconciliation</h1></div>
        <button type="button" className="btn btn-dark btn-sm" onClick={csv}>Reconciliation report (CSV)</button>
      </div>
      <div className="ag" style={{ '--min': '190px', '--gap': '14px' }}>
        <div className="kpi"><span className="small">Verified</span><span className="v">{naira(count('verified') * SITE.contribution)}</span><span className="small">{count('verified')} payments</span></div>
        <div className="kpi"><span className="small">Pending webhook</span><span className="v" style={{ color: 'var(--warn)' }}>{count('pending')}</span><span className="small">Re-query after 15 min</span></div>
        <div className="kpi"><span className="small">Failed</span><span className="v">{count('failed')}</span><span className="small">No charge made</span></div>
        <div className="kpi"><span className="small">Refunded</span><span className="v">{count('refunded')}</span><span className="small">Per refund policy</span></div>
      </div>
      <div className="bar">
        <Tabs label="Payment status" items={Object.keys(GROUPS)} value={g} onChange={setG} />
        <label className="search" style={{ flex: '0 1 320px' }}><Search /><span className="sr">Search transactions</span><input className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Reference or application" style={{ minHeight: 44 }} /></label>
      </div>
      <div className="tbl-box">
        <table className="tbl" style={{ minWidth: 980 }}>
          <thead><tr><th>Reference</th><th>Application</th><th>Payer</th><th>Amount</th><th>Gateway</th><th>Status</th><th>Webhook</th><th><span className="sr">Action</span></th></tr></thead>
          <tbody>
            {rows.map((a) => {
              const s = a.payment.status;
              return (
                <tr key={a.payment.ref}>
                  <td style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>{a.payment.ref}</td><td>{a.id}</td><td>{a.founder}</td><td className="fw6">{naira(SITE.contribution)}</td><td>{a.payment.gateway}</td>
                  <td><span className={'st st-' + PAY[s][1]}>{PAY[s][0]}</span></td><td className="small">{s === 'pending' ? 'Not received' : fmtDT(a.payment.at)}</td>
                  <td>
                    {s === 'pending' && <button type="button" className="btn btn-line btn-sm" onClick={() => { confirmPayment(a.id, 'verified'); say('Gateway re-queried — payment verified'); }}>Re-query gateway</button>}
                    {s === 'verified' && <button type="button" className="btn btn-line btn-sm" onClick={() => say('Receipt re-sent to ' + a.email)}>Resend receipt</button>}
                    {s === 'failed' && <span className="small">Awaiting retry</span>}
                    {s === 'verified' && a.status === 'declined' && <button type="button" className="btn btn-text btn-sm" onClick={() => { updateApp(a.id, { payment: { ...a.payment, status: 'refunded' } }, 'Refund recorded', 'Finance'); say('Refund recorded'); }}>Record refund</button>}
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && <tr><td colSpan={8} className="muted" style={{ textAlign: 'center', padding: 40 }}>No transactions in this view.</td></tr>}
          </tbody>
        </table>
      </div>
      <Note icon={Lock} style={{ background: '#fff' }}>Finance role: payment and receipt data only. Business evidence, pitch decks and identity documents are not visible to this role. All actions are logged.</Note>
    </AdminShell>
  );
}

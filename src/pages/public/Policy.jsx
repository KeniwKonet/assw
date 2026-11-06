import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Note } from '../../components/UI.jsx';
import NotFound from './NotFound.jsx';
import Seo from '../../seo/Seo.jsx';

const POLICIES = {
  privacy: ['Privacy Notice', ['Who we are (data controller) and how to contact us', 'What we collect and why (purposes and lawful basis)', 'Separate consents: account, public listing, marketing and third-party referrals', 'Who we share data with, and when', 'How long we keep data (retention)', 'Your rights: access, correction, deletion and withdrawing consent', 'Additional protections for under-18s (if applicable)', 'How to complain']],
  terms: ['Terms of Use', ['Using the website and portals', 'Accounts and security', 'Acceptable use', 'Intellectual property', 'Limitation of liability', 'Changes to these terms']],
  'listing-terms': ['Catalogue Listing Terms', ['Eligibility and accuracy of information', 'What is published and what stays private', 'Status labels: SCCN Enterprise Member, Profile Reviewed, Featured Business', 'Catalogue inclusion is not an endorsement or guarantee', 'Corrections, reports and removal', 'Renewal, suspension and expiry']],
  cookies: ['Cookie notice', ['Essential cookies and local storage', 'Analytics (only with consent, ASSW-owned accounts)', 'Managing your preferences']],
};

export default function Policy() {
  const { key } = useParams();
  const p = POLICIES[key];
  if (!p) return <NotFound />;
  return (
    <>
      <Seo title={p[0]} path={'/policies/' + key} noindex />
      <section className="sec-s" style={{ paddingBottom: 112 }}>
        <div className="wrap-n col g24">
          <Breadcrumb items={[['Home', '/'], [p[0]]]} />
          <h1 className="d2">{p[0]}</h1>
          <Note kind="warn">Draft structure only. Final wording requires legal and data-protection review and Board approval before launch, in line with applicable Nigerian data protection requirements.</Note>
          <ol className="col g12" style={{ paddingLeft: 22 }}>{p[1].map((s) => <li key={s} style={{ lineHeight: 1.6 }}><strong>{s}</strong><p className="muted">[Approved text]</p></li>)}</ol>
          <p className="small">Questions? <Link to="/contact?t=data">Make a data rights request</Link> or email asswnigeria@gmail.com.</p>
        </div>
      </section>
    </>
  );
}

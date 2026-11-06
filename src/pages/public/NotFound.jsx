import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="grid-bg" style={{ padding: '120px 0' }}>
      <div className="wrap-n col center g20">
        <span className="pill pill-red">404</span>
        <h1 className="d2">We couldn’t find that page.</h1>
        <p className="lead">It may have moved, or the link may be wrong.</p>
        <div className="row g10" style={{ justifyContent: 'center' }}><Link className="btn btn-primary" to="/">Go home</Link><Link className="btn btn-line" to="/catalogue">Explore the Catalogue</Link></div>
      </div>
    </section>
  );
}

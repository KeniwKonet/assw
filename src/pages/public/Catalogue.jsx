import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from '../../components/Icons.jsx';
import { Breadcrumb, Chips, Note } from '../../components/UI.jsx';
import { BizCard } from '../../components/Cards.jsx';
import { BUSINESSES } from '../../data/businesses.js';
import { CATEGORIES } from '../../data/site.js';

const PER_PAGE = 6;

export default function Catalogue() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const cat = params.get('cat') || '';
  const st = params.get('state') || '';
  const inst = params.get('inst') || '';
  const [onlyReviewed, setOnlyReviewed] = useState(false);
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(1);

  const setP = (k, v) => { const n = new URLSearchParams(params); if (v) n.set(k, v); else n.delete(k); setParams(n, { replace: true }); setPage(1); };
  const states = [...new Set(BUSINESSES.map((b) => b.state))].sort();
  const insts = [...new Set(BUSINESSES.map((b) => b.inst))].sort();

  const rows = useMemo(() => {
    const ql = q.trim().toLowerCase();
    let r = BUSINESSES.filter((b) => (!ql || (b.name + ' ' + b.cat + ' ' + b.desc + ' ' + b.city + ' ' + b.products.map((p) => p[0]).join(' ')).toLowerCase().includes(ql))
      && (!cat || b.cat === cat) && (!st || b.state === st) && (!inst || b.inst === inst) && (!onlyReviewed || b.reviewed) && (!onlyFeatured || b.featured));
    if (sort === 'az') r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'featured') r = [...r].sort((a, b) => Number(b.featured) - Number(a.featured));
    return r;
  }, [q, cat, st, inst, onlyReviewed, onlyFeatured, sort]);
  const pages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
  const view = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const reset = () => { setParams({}, { replace: true }); setOnlyReviewed(false); setOnlyFeatured(false); setPage(1); };

  return (
    <>
      <section className="grid-bg" style={{ padding: '64px 0 40px' }}>
        <div className="wrap col g24">
          <Breadcrumb items={[['Home', '/'], ['SCCN', '/sccn'], ['Catalogue']]} />
          <div className="row between end g24">
            <h1 className="d1" style={{ maxWidth: 900 }}>Student Enterprise <span className="hl">Catalogue</span></h1>
            <p className="lead" style={{ maxWidth: 400 }}>Discover businesses built by students across institutions, sectors and communities.</p>
          </div>
          <form role="search" onSubmit={(e) => e.preventDefault()} className="row g10" style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 28, padding: 8, boxShadow: '0 10px 30px rgba(12,16,21,.06)' }}>
            <label className="search" style={{ flex: '1 1 300px' }}><Search /><span className="sr">Search by business name, product or keyword</span>
              <input className="input" type="search" value={q} onChange={(e) => setP('q', e.target.value)} placeholder="Business name, product, service or keyword" style={{ border: 0, borderRadius: 999, minHeight: 52 }} />
            </label>
            <label style={{ flex: '0 1 220px' }}><span className="sr">State</span>
              <select className="input" value={st} onChange={(e) => setP('state', e.target.value)} style={{ borderRadius: 999, minHeight: 52, background: 'var(--paper)', borderColor: 'var(--paper)' }}>
                <option value="">All states</option>{states.map((s) => <option key={s} value={s}>{s === 'FCT' ? 'FCT Abuja' : s}</option>)}
              </select>
            </label>
            <button className="btn btn-primary" type="submit" style={{ minHeight: 52 }}>Search</button>
          </form>
        </div>
      </section>

      <section style={{ padding: '24px 0 96px' }}>
        <div className="wrap layout-side">
          <aside className="aside col g24" aria-label="Filters" style={{ flexBasis: 260 }}>
            <div className="row between"><h2 className="d4">Filters</h2><button type="button" className="btn btn-text btn-sm" onClick={reset} style={{ color: 'var(--blue)' }}>Clear all</button></div>
            <div className="col g12">
              <span className="lbl">Category</span>
              <div className="row g8"><Chips items={CATEGORIES.slice(0, 14)} value={cat} onChange={(v) => setP('cat', v)} /></div>
            </div>
            <div className="field"><label htmlFor="inst">Institution</label>
              <select id="inst" className="input" value={inst} onChange={(e) => setP('inst', e.target.value)}><option value="">All institutions</option>{insts.map((i) => <option key={i}>{i}</option>)}</select>
            </div>
            <fieldset className="col g10" style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="lbl" style={{ marginBottom: 10 }}>Show only</legend>
              <label className="check"><input type="checkbox" checked={onlyReviewed} onChange={(e) => { setOnlyReviewed(e.target.checked); setPage(1); }} />Profile Reviewed</label>
              <label className="check"><input type="checkbox" checked={onlyFeatured} onChange={(e) => { setOnlyFeatured(e.target.checked); setPage(1); }} />Featured Business</label>
            </fieldset>
            <Note style={{ fontSize: 13 }}>Catalogue inclusion is not an endorsement, guarantee of quality, investment recommendation or procurement approval.</Note>
          </aside>

          <div className="content col g20">
            <div className="bar">
              <span className="fw6" aria-live="polite">{rows.length} {rows.length === 1 ? 'business' : 'businesses'}</span>
              <div className="row g10"><label htmlFor="sort" className="small">Sort</label><select id="sort" className="input" value={sort} onChange={(e) => setSort(e.target.value)} style={{ minHeight: 40, width: 'auto' }}><option value="recent">Recently added</option><option value="az">A–Z</option><option value="featured">Featured first</option></select></div>
            </div>
            {rows.length > 0 ? (
              <div className="af" style={{ '--min': '260px' }}>{view.map((b) => <BizCard key={b.slug} b={b} />)}</div>
            ) : (
              <div className="card-p col center g16" style={{ padding: '56px 32px' }}>
                <span style={{ width: 64, height: 64, borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', color: 'var(--blue)' }}><Search size={28} /></span>
                <h3 className="d4">No businesses match those filters yet</h3>
                <p className="muted" style={{ maxWidth: 440 }}>Try a broader keyword, another state or fewer filters. Run a student business that should be here?</p>
                <div className="row g10" style={{ justifyContent: 'center' }}><button type="button" className="btn btn-line" onClick={reset}>Clear filters</button><Link className="btn btn-primary" to="/register-business">Register Your Business</Link></div>
              </div>
            )}
            <div className="row between g16" style={{ borderTop: '1px solid var(--line)', paddingTop: 20 }}>
              <nav aria-label="Pagination" className="row g6">
                {Array.from({ length: pages }).map((_, i) => (
                  <button key={i} className="icon-btn" type="button" aria-current={page === i + 1 ? 'page' : undefined} onClick={() => setPage(i + 1)}
                    style={page === i + 1 ? { background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' } : undefined}>{i + 1}</button>
                ))}
              </nav>
              <span className="small">Spotted a problem with a listing? <Link to="/contact?t=listing">Report a listing or request a correction</Link></span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

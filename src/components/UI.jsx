import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, Warn } from './Icons.jsx';

export function Note({ kind = '', children, icon, style, role }) {
  const Ico = icon || (kind === 'red' || kind === 'warn' ? Warn : Info);
  return (
    <div className={'note' + (kind ? ' note-' + kind : '')} style={style} role={role}>
      <Ico />
      <span>{children}</span>
    </div>
  );
}

export const Flag = ({ children, style }) => <span className="review-flag" style={style}>{children}</span>;

export function Status({ tone = 'info', children, style }) {
  return <span className={'st st-' + tone} style={style}>{children}</span>;
}

export function Field({ id, label, optional, hint, error, children, className = '', style }) {
  return (
    <div className={'field ' + className} style={style}>
      <label htmlFor={id}>{label}{optional && <span className="opt"> (optional)</span>}</label>
      {children}
      {hint && !error && <span className="hint">{hint}</span>}
      {error && <span className="err" id={id + '-err'} role="alert"><Info size={14} />{error}</span>}
    </div>
  );
}

export function Placeholder({ label, className = '', style, tone = 'b' }) {
  return <div className={'ph ' + tone + ' ' + className} style={style} role="img" aria-label={label}><span>{label}</span></div>;
}

export function Tabs({ items, value, onChange, label, dark }) {
  return (
    <div className="tabs" role="tablist" aria-label={label} style={dark ? { background: 'var(--ink-3)' } : undefined}>
      {items.map((it) => {
        const [k, t] = Array.isArray(it) ? it : [it, it];
        const on = k === value;
        return (
          <button key={k} type="button" role="tab" aria-selected={on} className={'tab' + (on ? ' on' : '')}
            style={dark ? (on ? { background: 'var(--blue)', color: '#fff' } : { color: 'var(--muted-d)' }) : undefined}
            onClick={() => onChange(k)}>{t}</button>
        );
      })}
    </div>
  );
}

export function Chips({ items, value, onChange, multi = false, className = 'tag', onCls = 'on', style }) {
  const isOn = (k) => (multi ? value.includes(k) : value === k);
  return items.map((it) => {
    const [k, t] = Array.isArray(it) ? it : [it, it];
    return (
      <button key={k} type="button" aria-pressed={isOn(k)} className={className + (isOn(k) ? ' ' + onCls : '')} style={style}
        onClick={() => onChange(multi ? (value.includes(k) ? value.filter((x) => x !== k) : value.concat(k)) : (value === k ? '' : k))}>{t}</button>
    );
  });
}

export function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return undefined;
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [message, onDone]);
  if (!message) return null;
  return <div className="toast" role="status">{message}</div>;
}

export function useToast() {
  const [msg, setMsg] = useState('');
  return [<Toast key="toast" message={msg} onDone={() => setMsg('')} />, setMsg];
}

export function Breadcrumb({ items, dark }) {
  return (
    <nav aria-label="Breadcrumb" className="small" style={dark ? { color: 'var(--muted-d)' } : undefined}>
      {items.map((it, i) => (
        <span key={i}>
          {i > 0 && ' / '}
          {it[1] ? <Link to={it[1]} style={{ color: dark ? 'var(--muted-d)' : 'var(--muted)' }}>{it[0]}</Link> : it[0]}
        </span>
      ))}
    </nav>
  );
}

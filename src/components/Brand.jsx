import { Link } from 'react-router-dom';
import { Sparkle } from './Icons.jsx';

/** Logo mark (Nigeria outline + open book). `tile` puts it on white for dark surfaces. */
export function Mark({ height = 40, tile = false }) {
  const img = <img src="/brand/assw-mark.png" alt="" style={{ height, width: 'auto' }} />;
  return tile ? <span className="logo-tile">{img}</span> : img;
}

export function Brand({ dark = false, sub = 'Nigeria', to = '/', compact = false }) {
  return (
    <Link className="brand" to={to} aria-label="ASSW Nigeria home" style={dark ? { color: '#fff' } : undefined}>
      <Mark height={compact ? 32 : 40} tile={dark} />
      <span>
        ASSW{sub && <span className={compact ? '' : 'hide-sm'} style={{ fontWeight: 500, color: dark ? '#A9B2BE' : 'var(--muted)' }}> {sub}</span>}
      </span>
    </Link>
  );
}

export function Sticker({ text = 'LET’S GET STARTED · LET’S GET STARTED ·', to = '/auth', size = 128, label, style, className = '' }) {
  const id = 'st-' + text.replace(/[^A-Z]/gi, '').slice(0, 12) + size;
  return (
    <Link className={'sticker ' + className} to={to} aria-label={label || text} style={{ width: size, height: size, textDecoration: 'none', ...style }}>
      <svg className="ring" viewBox="0 0 128 128" width={size} height={size} aria-hidden="true">
        <defs><path id={id} d="M64,64 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
        <text fill="#fff" style={{ font: '700 12px Inter, sans-serif', letterSpacing: 3 }}><textPath href={'#' + id}>{text}</textPath></text>
      </svg>
      <Sparkle size={size * 0.28} color="#fff" />
    </Link>
  );
}

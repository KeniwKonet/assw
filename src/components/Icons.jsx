const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const ArrowRight = ({ size = 18, w = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={w} {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = ({ size = 18, w = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={w} {...base}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
);
export const ArrowUR = ({ size = 20, w = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={w} {...base}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const ArrowDown = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={3} {...base}><path d="M12 5v14M6 13l6 6 6-6" /></svg>
);
export const Check = ({ size = 14, w = 3, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={w} {...base} stroke={color || 'currentColor'}><path d="m5 12 5 5 9-10" /></svg>
);
export const Close = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2.4} {...base}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Search = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2.2} {...base}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const Menu = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2.2} {...base}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const Pin = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base}><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const Info = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base}><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
);
export const Warn = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base}><path d="M12 3 2 21h20L12 3Z" /><path d="M12 10v4M12 17h.01" /></svg>
);
export const Lock = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
);
export const Doc = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M12 12v6M9 15l3 3 3-3" /></svg>
);
export const Bell = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
);
export const Mail = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const Download = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base}><path d="M12 4v12M6 10l6 6 6-6M5 20h14" /></svg>
);
export const Share = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></svg>
);
export const Sparkle = ({ size = 28, color = 'var(--blue)', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={style}>
    <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0Z" fill={color} />
  </svg>
);
export const Spinner = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" aria-hidden="true">
    <circle cx="25" cy="25" r="20" fill="none" stroke="#E2E6EB" strokeWidth="5" />
    <circle cx="25" cy="25" r="20" fill="none" stroke="var(--blue)" strokeWidth="5" strokeLinecap="round" strokeDasharray="40 200">
      <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
    </circle>
  </svg>
);

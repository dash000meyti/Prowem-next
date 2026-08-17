import type { SVGProps } from "react";

export type FlagGlyphProps = SVGProps<SVGSVGElement>;

export function FlagEn(props: FlagGlyphProps) {
  return (
    <svg viewBox="15 0 30 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="10" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#c8102e" strokeWidth="6" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="16" />
      <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="10" />
    </svg>
  );
}

export function FlagDe(props: FlagGlyphProps) {
  return (
    <svg viewBox="1 0 3 3" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <rect width="5" height="1" fill="#000" />
      <rect y="1" width="5" height="1" fill="#d00" />
      <rect y="2" width="5" height="1" fill="#ffce00" />
    </svg>
  );
}

export function FlagPt(props: FlagGlyphProps) {
  return (
    <svg viewBox="9 5 30 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <rect width="60" height="40" fill="#ff0000" />
      <rect width="24" height="40" fill="#006600" />
      <circle cx="24" cy="20" r="7.5" fill="#ffd700" />
      <circle cx="24" cy="20" r="3.5" fill="#c00" />
    </svg>
  );
}

export function FlagEs(props: FlagGlyphProps) {
  return (
    <svg viewBox="1 0 4 4" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <rect width="6" height="4" fill="#aa151b" />
      <rect y="1" width="6" height="2" fill="#f1bf00" />
    </svg>
  );
}

export function FlagAr(props: FlagGlyphProps) {
  return (
    <svg viewBox="15 5 30 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <rect width="60" height="40" fill="#165d31" />
      <path fill="none" stroke="#fff" strokeWidth="1.75" d="M10 17c10-9 30-9 40 0" />
      <path fill="#fff" d="M12 24h36l-3 3H15z" />
    </svg>
  );
}

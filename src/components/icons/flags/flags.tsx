import type { SVGProps } from "react";

export type FlagGlyphProps = SVGProps<SVGSVGElement>;

export function FlagEn(props: FlagGlyphProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      preserveAspectRatio="xMidYMid slice"
      overflow="hidden"
      aria-hidden="true"
      {...props}
    >
      <rect width="32" height="32" fill="#35307E" />
      <rect
        x="12.78"
        y="15.76"
        width="2.5"
        height="16.32"
        transform="rotate(60 12.78 15.76)"
        fill="#E9E8E9"
      />
      <rect
        x="14.03"
        y="14.07"
        width="2.5"
        height="16.25"
        transform="rotate(120 14.03 14.07)"
        fill="#E9E8E9"
      />
      <rect
        width="2.5"
        height="16.32"
        transform="matrix(-0.5 0.866 0.866 0.5 19.14 15.76)"
        fill="#E9E8E9"
      />
      <rect
        width="2.5"
        height="16.25"
        transform="matrix(0.5 0.866 0.866 -0.5 17.89 14.07)"
        fill="#E9E8E9"
      />
      <rect
        x="13.14"
        y="16.66"
        width="1.06"
        height="16.32"
        transform="rotate(60 13.14 16.66)"
        fill="#D4412E"
      />
      <rect
        x="13.67"
        y="14.97"
        width="1.05"
        height="16.25"
        transform="rotate(120 13.67 14.97)"
        fill="#D4412E"
      />
      <rect
        width="1.07"
        height="16.32"
        transform="matrix(-0.5 0.866 0.866 0.5 18.79 16.11)"
        fill="#D4412E"
      />
      <rect
        width="1.06"
        height="16.25"
        transform="matrix(0.5 0.866 0.866 -0.5 18.25 14.43)"
        fill="#D4412E"
      />
      <rect x="14.04" width="3.85" height="32" fill="#E9E8E9" />
      <rect y="14.08" width="32" height="3.85" fill="#E9E8E9" />
      <rect x="14.72" width="2.5" height="32" fill="#D4412E" />
      <rect y="14.75" width="32" height="2.5" fill="#D4412E" />
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
    </svg>
  );
}

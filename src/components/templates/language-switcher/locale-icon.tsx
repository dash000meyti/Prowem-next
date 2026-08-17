import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

export type LocaleIconProps = {
  locale: Locale;
  className?: string;
};

function FlagEn() {
  return (
    <svg viewBox="0 0 60 30" className="size-full" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="10" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#c8102e" strokeWidth="6" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="16" />
      <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="10" />
    </svg>
  );
}

function FlagDe() {
  return (
    <svg viewBox="0 0 5 3" className="size-full" preserveAspectRatio="xMidYMid slice">
      <rect width="5" height="1" fill="#000" />
      <rect y="1" width="5" height="1" fill="#d00" />
      <rect y="2" width="5" height="1" fill="#ffce00" />
    </svg>
  );
}

function FlagPt() {
  return (
    <svg viewBox="0 0 60 40" className="size-full" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="40" fill="#ff0000" />
      <rect width="24" height="40" fill="#006600" />
      <circle cx="24" cy="20" r="7.5" fill="#ffd700" />
      <circle cx="24" cy="20" r="3.5" fill="#c00" />
    </svg>
  );
}

function FlagEs() {
  return (
    <svg viewBox="0 0 6 4" className="size-full" preserveAspectRatio="xMidYMid slice">
      <rect width="6" height="4" fill="#aa151b" />
      <rect y="1" width="6" height="2" fill="#f1bf00" />
    </svg>
  );
}

function FlagAr() {
  return (
    <svg viewBox="0 0 60 40" className="size-full" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="40" fill="#165d31" />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="1.75"
        d="M10 17c10-9 30-9 40 0"
      />
      <path fill="#fff" d="M12 24h36l-3 3H15z" />
    </svg>
  );
}

const flags: Record<Locale, () => ReactNode> = {
  en: FlagEn,
  de: FlagDe,
  pt: FlagPt,
  es: FlagEs,
  ar: FlagAr,
};

export function LocaleIcon({ locale, className }: LocaleIconProps) {
  const Flag = flags[locale];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-6 shrink-0 overflow-hidden rounded-full border border-sm border-border",
        className,
      )}
    >
      <Flag />
    </span>
  );
}

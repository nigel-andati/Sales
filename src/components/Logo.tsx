import { siteConfig } from "@/config/site";

/**
 * Temporary brand mark: two linked arcs (China and Kenya) joined by a bridge
 * line — "Daraja" means "bridge" in Swahili. Replace with your final logo.
 */
export function LogoMark({ className = "size-8", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2556e8" />
          <stop offset="1" stopColor="#27c4e8" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={tone === "light" ? "white" : "url(#logo-g)"} />
      <path d="M8 26.5c3.2-7.5 7.2-11 12-11s8.8 3.5 12 11" fill="none" stroke={tone === "light" ? "#1a5cff" : "white"} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M8 29.5h24" stroke={tone === "light" ? "#1a5cff" : "white"} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="8" cy="26.5" r="2.4" fill={tone === "light" ? "#1a5cff" : "white"} />
      <circle cx="32" cy="26.5" r="2.4" fill={tone === "light" ? "#1a5cff" : "white"} />
    </svg>
  );
}

export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-8 shrink-0" tone={tone} />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className={`font-display text-[1.15rem] font-semibold tracking-[-0.03em] ${tone === "light" ? "text-white" : "text-navy"}`}>
          {siteConfig.shortName}
        </span>
        <span className={`mt-1 hidden text-[0.6rem] sm:block font-semibold tracking-[0.18em] uppercase ${tone === "light" ? "text-white/70" : "text-steel"}`}>
          Sourcing · China → Kenya
        </span>
      </span>
    </span>
  );
}

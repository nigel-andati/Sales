import { useId } from "react";
import { siteConfig } from "@/config/site";

/**
 * Final brand mark for Logis Sourcing.
 *
 * Concept: a bold "L" drawn as a sourcing route — an origin dot (the factory
 * in China), a vertical stem and a forward foot that resolves into an arrow
 * (delivery to Kenya). The rounded-square tile uses the brand cobalt → cyan
 * gradient; the glyph is white on dark surfaces and cobalt on light ones.
 */
export function LogoMark({ className = "size-8", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradientId = `logis-g-${uid}`;
  const glyph = tone === "light" ? "#1a5cff" : "#ffffff";

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false" role="presentation">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1a5cff" />
          <stop offset="1" stopColor="#27c4e8" />
        </linearGradient>
      </defs>
      <rect
        width="40"
        height="40"
        rx="11"
        fill={tone === "light" ? "#ffffff" : `url(#${gradientId})`}
        stroke={tone === "light" ? "#d7dfe9" : "none"}
        strokeWidth={tone === "light" ? 1.5 : 0}
      />
      {/* Origin dot — the supplier */}
      <circle cx="14.5" cy="9.8" r="2.5" fill={glyph} />
      {/* Stem of the L */}
      <path d="M14.5 14.8V27.2" fill="none" stroke={glyph} strokeWidth="4.4" strokeLinecap="round" />
      {/* Foot of the L — the route forward */}
      <path d="M14.5 27.2H24.6" fill="none" stroke={glyph} strokeWidth="4.4" strokeLinecap="round" />
      {/* Arrowhead — delivery */}
      <path
        d="M22.6 23.1L27.9 27.2L22.6 31.3"
        fill="none"
        stroke={glyph}
        strokeWidth="3.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

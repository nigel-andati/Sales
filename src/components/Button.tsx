"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type ConversionEvent } from "@/lib/analytics";
import { WhatsAppGlyph, Icon } from "@/components/Icon";
import { whatsappHref, hasWhatsApp } from "@/config/site";
import { buttonClass, type Variant, type Size } from "@/lib/button-styles";
import { useQuote, type QuotePrefill } from "@/components/quote/QuoteProvider";

export { buttonClass };

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  event?: ConversionEvent;
  eventLabel?: string;
};

/** An anchor that fires a conversion event on click. */
export function TrackedLink({ event, eventLabel, onClick, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        if (event) track(event, eventLabel ? { location: eventLabel } : {});
        onClick?.(e);
      }}
    />
  );
}

/**
 * Opens the quote modal (falls back to the /quote page without JavaScript).
 * Pass `prefill` to seed the form, e.g. from a category card or the estimator.
 */
export function QuoteButton({
  children = "Get a Free Quote",
  variant = "primary",
  size = "md",
  location,
  prefill,
  className = "",
  unstyled = false,
  "aria-label": ariaLabel,
}: {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  location: string;
  prefill?: QuotePrefill;
  className?: string;
  /** Render without button styling (for whole-card links). */
  unstyled?: boolean;
  "aria-label"?: string;
}) {
  const { open } = useQuote();
  return (
    <a
      href="/quote"
      aria-label={ariaLabel}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        track("quote_cta_click", { location });
        open(prefill);
      }}
      className={unstyled ? className : buttonClass(variant, size, className)}
    >
      {children}
      {!unstyled && (
        <Icon name="arrowRight" className="size-[1.1em] transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </a>
  );
}

export function WhatsAppButton({
  children = "Chat on WhatsApp",
  message,
  variant = "whatsapp",
  size = "md",
  location,
  className = "",
}: {
  children?: ReactNode;
  message?: string;
  variant?: Variant;
  size?: Size;
  location: string;
  className?: string;
}) {
  return (
    <TrackedLink
      href={whatsappHref(message)}
      event="whatsapp_click"
      eventLabel={location}
      {...(hasWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={buttonClass(variant, size, className)}
    >
      <WhatsAppGlyph className="size-[1.25em]" />
      {children}
      {hasWhatsApp && <span className="sr-only"> (opens WhatsApp)</span>}
    </TrackedLink>
  );
}

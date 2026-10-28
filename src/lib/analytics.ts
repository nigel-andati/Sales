"use client";

/**
 * Thin wrapper around GA4 (gtag) and Meta Pixel (fbq). Both are no-ops until
 * their IDs are configured, so components can call these freely.
 */
type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
    dataLayer?: unknown[];
  }
}

export type ConversionEvent = "whatsapp_click" | "quote_cta_click" | "quote_submitted";

const metaEventMap: Record<ConversionEvent, { name: string; custom: boolean }> = {
  whatsapp_click: { name: "Contact", custom: false },
  quote_cta_click: { name: "QuoteCTAClick", custom: true },
  quote_submitted: { name: "Lead", custom: false },
};

export function track(event: ConversionEvent, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event === "quote_submitted" ? "generate_lead" : event, params);
  const meta = metaEventMap[event];
  window.fbq?.(meta.custom ? "trackCustom" : "track", meta.name, params);
}

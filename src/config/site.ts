/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  BUSINESS CONFIGURATION — the single place to edit company details.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Every value below can be set with an environment variable (recommended, so
 *  you can change details in the Netlify dashboard without touching code), or
 *  you can replace the fallback directly in this file.
 *
 *  Anything left empty is treated as "not configured yet": the related link is
 *  hidden or falls back gracefully, so the site never shows fake details.
 *  See `.env.example` for the full list of variables.
 */

const env = (value: string | undefined, fallback = "") => (value && value.trim()) || fallback;

export const siteConfig = {
  /** Brand name. Check availability (eCitizen BRS, KIPI) before registering. */
  name: env(process.env.NEXT_PUBLIC_COMPANY_NAME, "Logis Sourcing"),
  /** Short wordmark text shown in the logo. */
  shortName: env(process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME, "Logis"),
  tagline: "China-to-Kenya sourcing & import",
  description:
    "Send us a product photo, link or description. We find and compare suppliers in China, coordinate quality checks, consolidate your goods and arrange shipping to Kenya.",

  /** Public URL of the site. Netlify sets URL automatically at build time. */
  url: env(process.env.NEXT_PUBLIC_SITE_URL, env(process.env.URL, "http://localhost:3000")),

  contact: {
    /**
     * WhatsApp number in international format, digits only — e.g. 2547XXXXXXXX.
     * PLACEHOLDER: set NEXT_PUBLIC_WHATSAPP_NUMBER.
     */
    whatsappNumber: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER).replace(/\D/g, ""),
    /** Human-friendly version of the number, e.g. "+254 7XX XXX XXX". PLACEHOLDER. */
    whatsappDisplay: env(process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY),
    /** PLACEHOLDER: set NEXT_PUBLIC_CONTACT_EMAIL. */
    email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    /** Office or service area, e.g. "Nairobi, Kenya". PLACEHOLDER. */
    location: env(process.env.NEXT_PUBLIC_BUSINESS_LOCATION),
    /** Business hours shown in the contact block, e.g. "Mon–Sat, 8am–6pm EAT". PLACEHOLDER. */
    hours: env(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
  },

  social: {
    /** Full profile URLs. PLACEHOLDERS — links are hidden until set. */
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    facebook: env(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    tiktok: env(process.env.NEXT_PUBLIC_TIKTOK_URL),
  },

  /** Default messages pre-filled when someone opens WhatsApp from the site. */
  whatsappMessages: {
    general: "Hi! I'd like help sourcing a product from China.",
    photo: "Hi! I'd like to source this product from China. I'm sending a photo/link now:",
    quote: "Hi! I'd like a free quote for sourcing a product from China.",
  },

  /** Kenyan towns suggested in the quote form's destination field. */
  destinations: [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Eldoret",
    "Thika",
    "Machakos",
    "Nyeri",
    "Meru",
    "Kitale",
    "Malindi",
    "Kakamega",
  ],

  /** Budget ranges offered in the quote form. */
  budgets: [
    "Under KES 50,000",
    "KES 50,000 – 200,000",
    "KES 200,000 – 500,000",
    "KES 500,000 – 1,000,000",
    "Above KES 1,000,000",
    "Not sure yet",
  ],

  analytics: {
    /** Google Analytics 4 measurement ID, e.g. G-XXXXXXX. Leave empty to disable. */
    gaMeasurementId: env(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
    /** Meta (Facebook) Pixel ID. Leave empty to disable. */
    metaPixelId: env(process.env.NEXT_PUBLIC_META_PIXEL_ID),
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const hasWhatsApp = siteConfig.contact.whatsappNumber.length >= 9;

/**
 * Builds a WhatsApp click-to-chat link. If no number is configured yet, falls
 * back to the quote form so the button still leads somewhere useful.
 */
export function whatsappHref(message: string = siteConfig.whatsappMessages.general) {
  if (!hasWhatsApp) return "/quote";
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Quote request submission.
 *
 * V1 sends requests to Netlify Forms (see `public/__forms.html`), which stores
 * submissions, filters spam and can email or Slack you on every new lead.
 *
 * To move to your own backend later (CRM, database, email service), replace
 * the body of `submitQuoteRequest` — the form UI only depends on this function
 * and on the field names below.
 */

export const QUOTE_FORM_NAME = "quote-request";

export const quoteFields = {
  name: "name",
  whatsapp: "whatsapp",
  email: "email",
  product: "product",
  productUrl: "product-url",
  quantity: "quantity",
  budget: "budget",
  destination: "destination",
  image: "product-image",
  notes: "notes",
} as const;

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export type QuoteResult = { ok: true } | { ok: false; message: string };

export async function submitQuoteRequest(data: FormData): Promise<QuoteResult> {
  data.set("form-name", QUOTE_FORM_NAME);
  try {
    // Do not set Content-Type: the browser adds the multipart boundary for the image upload.
    const res = await fetch("/__forms.html", { method: "POST", body: data });
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return { ok: true };
  } catch (err) {
    console.error("Quote submission failed", err);
    return {
      ok: false,
      message: "We couldn't send your request. Please check your connection and try again, or message us on WhatsApp.",
    };
  }
}

export type QuoteErrors = Partial<Record<keyof typeof quoteFields, string>>;

/** Client-side validation. Returns an error message per invalid field. */
export function validateQuote(data: FormData): QuoteErrors {
  const get = (k: keyof typeof quoteFields) => String(data.get(quoteFields[k]) ?? "").trim();
  const errors: QuoteErrors = {};

  if (!get("name")) errors.name = "Please tell us your name.";

  const digits = get("whatsapp").replace(/\D/g, "");
  if (!digits) errors.whatsapp = "We need a WhatsApp number to send your quote.";
  else if (!/^[+\d\s()-]+$/.test(get("whatsapp")) || digits.length < 9 || digits.length > 15)
    errors.whatsapp = "Enter a valid number, e.g. 0712 345 678 or +254 712 345 678.";

  const email = get("email");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "That email address doesn't look right.";

  if (!get("product")) errors.product = "Describe the product you're looking for.";

  const url = get("productUrl");
  if (url && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(url)) errors.productUrl = "Paste a full link, e.g. https://…";

  if (!get("quantity")) errors.quantity = "Roughly how many do you need?";
  if (!get("destination")) errors.destination = "Where in Kenya should we deliver?";

  const file = data.get(quoteFields.image);
  if (file instanceof File && file.size > 0) {
    if (!file.type.startsWith("image/")) errors.image = "Please upload an image file (JPG, PNG, WEBP or HEIC).";
    else if (file.size > MAX_IMAGE_BYTES) errors.image = "Image is too large. Please use one under 5 MB.";
  }

  return errors;
}

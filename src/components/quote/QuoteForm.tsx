"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig, hasWhatsApp } from "@/config/site";
import { Icon } from "@/components/Icon";
import { WhatsAppButton } from "@/components/Button";
import { buttonClass } from "@/lib/button-styles";
import { track } from "@/lib/analytics";
import {
  QUOTE_FORM_NAME,
  MAX_IMAGE_BYTES,
  quoteFields as F,
  submitQuoteRequest,
  validateQuote,
  type QuoteErrors,
} from "@/lib/quote";
import type { QuotePrefill } from "@/components/quote/QuoteProvider";

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteForm({ prefill = {}, compact = false }: { prefill?: QuotePrefill; compact?: boolean }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [serverError, setServerError] = useState("");
  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null);
  const [submittedProduct, setSubmittedProduct] = useState("");

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview.url); }, [preview]);

  const onFile = (file: File | undefined) => {
    setErrors((prev) => ({ ...prev, image: undefined }));
    if (!file) return setPreview(null);
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please upload an image file (JPG, PNG, WEBP or HEIC)." }));
    } else if (file.size > MAX_IMAGE_BYTES) {
      setErrors((prev) => ({ ...prev, image: "Image is too large. Please use one under 5 MB." }));
    }
    setPreview({ url: URL.createObjectURL(file), name: file.name });
  };

  const clearFile = () => {
    if (fileRef.current) fileRef.current.value = "";
    setPreview(null);
    setErrors((prev) => ({ ...prev, image: undefined }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validateQuote(data);
    setErrors(found);
    setServerError("");
    const firstInvalid = Object.keys(found)[0] as keyof typeof F | undefined;
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${F[firstInvalid]}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    const result = await submitQuoteRequest(data);
    if (result.ok) {
      track("quote_submitted", { destination: String(data.get(F.destination) ?? "") });
      setSubmittedProduct(String(data.get(F.product) ?? "").slice(0, 120));
      setStatus("success");
      form.reset();
      setPreview(null);
      requestAnimationFrame(() => document.getElementById("quote-success")?.focus());
    } else {
      setServerError(result.message);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        id="quote-success"
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[1.375rem] bg-mist p-7 outline-none sm:p-9"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-cobalt text-white">
          <Icon name="check" className="size-6" />
        </span>
        <h3 className="mt-5 text-[1.6rem] font-semibold text-navy">Request received</h3>
        <p className="mt-2 max-w-md text-[0.98rem] leading-relaxed text-steel">
          Thank you. We&rsquo;ll review your request and contact you on WhatsApp to confirm the details before preparing
          your quote.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {hasWhatsApp && (
            <WhatsAppButton
              size="md"
              location="quote-success"
              message={`Hi! I just sent a quote request${submittedProduct ? ` for: ${submittedProduct}` : ""}.`}
            >
              Message us on WhatsApp
            </WhatsAppButton>
          )}
          <button type="button" onClick={() => setStatus("idle")} className={buttonClass("light", "md", "ring-1 ring-line")}>
            Send another request
          </button>
        </div>
      </motion.div>
    );
  }

  const submitting = status === "submitting";
  const grid = compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-5 sm:grid-cols-2";

  return (
    <form
      name={QUOTE_FORM_NAME}
      method="POST"
      encType="multipart/form-data"
      data-netlify="true"
      netlify-honeypot="bot-field"
      noValidate
      onSubmit={onSubmit}
      aria-describedby="quote-required-note"
    >
      <input type="hidden" name="form-name" value={QUOTE_FORM_NAME} />
      <input type="hidden" name="subject" value={`New quote request — ${siteConfig.name}`} />
      <p className="hidden">
        <label>
          Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className={grid}>
        <Field label="Your name" name={F.name} required error={errors.name}>
          {(p) => <input {...p} type="text" autoComplete="name" placeholder="e.g. Wanjiru Kamau" className="field" />}
        </Field>
        <Field label="WhatsApp number" name={F.whatsapp} required error={errors.whatsapp} hint="We'll send your quote here.">
          {(p) => <input {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 0712 345 678" className="field" />}
        </Field>

        <Field
          label="What product do you need?"
          name={F.product}
          required
          error={errors.product}
          hint="Material, size, colour, branding — anything you know."
          className="sm:col-span-2"
        >
          {(p) => (
            <textarea
              {...p}
              rows={3}
              defaultValue={prefill.product}
              placeholder="e.g. Stainless steel water bottles, 500 ml, with our logo printed"
              className="field resize-y"
            />
          )}
        </Field>

        <Field label="Product link" name={F.productUrl} optional error={errors.productUrl} hint="Alibaba, 1688, TikTok, Instagram — any site.">
          {(p) => <input {...p} type="text" inputMode="url" autoComplete="url" placeholder="https://" className="field" />}
        </Field>
        <Field label="Email" name={F.email} optional error={errors.email}>
          {(p) => <input {...p} type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" className="field" />}
        </Field>

        <Field label="Quantity" name={F.quantity} required error={errors.quantity}>
          {(p) => <input {...p} type="text" defaultValue={prefill.quantity} placeholder="e.g. 100 pieces" className="field" />}
        </Field>
        <Field label="Approximate budget" name={F.budget} optional>
          {(p) => (
            <div className="relative">
              <select {...p} defaultValue="" className="field appearance-none pr-10">
                <option value="">Select a range</option>
                {siteConfig.budgets.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <Icon name="arrowRight" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rotate-90 text-steel" />
            </div>
          )}
        </Field>

        <Field label="Delivery destination in Kenya" name={F.destination} required error={errors.destination} className="sm:col-span-2">
          {(p) => (
            <>
              <input {...p} type="text" list="kenya-destinations" autoComplete="address-level2" placeholder="e.g. Nairobi" className="field" />
              <datalist id="kenya-destinations">
                {siteConfig.destinations.map((d) => (
                  <option key={d} value={d} />
                ))}
              </datalist>
            </>
          )}
        </Field>

        <Field label="Product image" name={F.image} optional error={errors.image} hint="A photo or screenshot, up to 5 MB." className="sm:col-span-2">
          {(p) => (
            <div>
              <label
                htmlFor={p.id}
                className={`flex cursor-pointer items-center gap-4 rounded-[0.9rem] border-[1.5px] border-dashed bg-mist px-4 py-3.5 transition-colors hover:border-cobalt hover:bg-ice ${errors.image ? "border-[#d9453a]" : "border-line"}`}
              >
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview.url} alt="" className="size-12 shrink-0 rounded-lg object-cover" />
                ) : (
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white text-cobalt">
                    <Icon name="upload" className="size-5" />
                  </span>
                )}
                <span className="min-w-0 text-sm">
                  <span className="block truncate font-semibold text-navy">{preview ? preview.name : "Upload a photo"}</span>
                  <span className="text-steel">{preview ? "Tap to change" : "Tap to choose from your phone or computer"}</span>
                </span>
              </label>
              <input {...p} ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
              {preview && (
                <button type="button" onClick={clearFile} className="mt-2 inline-flex items-center gap-1.5 text-sm text-steel hover:text-navy">
                  <Icon name="close" className="size-4" /> Remove image
                </button>
              )}
            </div>
          )}
        </Field>

        <Field label="Additional notes" name={F.notes} optional className="sm:col-span-2">
          {(p) => (
            <textarea
              {...p}
              rows={compact ? 2 : 3}
              defaultValue={prefill.notes}
              placeholder="Deadline, sea or air, samples, branding…"
              className="field resize-y"
            />
          )}
        </Field>
      </div>

      <AnimatePresence>
        {serverError && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 flex items-start gap-2.5 rounded-xl bg-[#fdeeed] p-4 text-sm text-[#a3291f]"
          >
            <Icon name="alert" className="mt-0.5 size-4 shrink-0" />
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p id="quote-required-note" className="order-2 text-xs leading-relaxed text-steel sm:order-1 sm:max-w-xs">
          <span className="text-cobalt">*</span> Required. Free and no obligation. We only use your details to respond — see
          our{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-navy">Privacy Policy</a>.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className={buttonClass("primary", "lg", "order-1 sm:order-2 disabled:cursor-wait disabled:opacity-70")}
        >
          {submitting ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Request My Free Quote
              <Icon name="arrowRight" className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

type FieldControlProps = {
  id: string;
  name: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
};

function Field({
  label,
  name,
  required,
  optional,
  error,
  hint,
  className = "",
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: (props: FieldControlProps) => ReactNode;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-2 text-[0.86rem] font-semibold text-navy">
        <span>
          {label}
          {required && <span className="ml-0.5 text-cobalt" aria-hidden="true">*</span>}
        </span>
        {optional && <span className="text-[0.75rem] font-medium text-steel">Optional</span>}
      </label>
      {children({
        id,
        name,
        "aria-required": required || undefined,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": errorId ?? hintId,
      })}
      {error ? (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-[0.82rem] text-[#b3362b]">
          <Icon name="alert" className="size-4 shrink-0" />
          {error}
        </p>
      ) : (
        hint && <p id={hintId} className="mt-1.5 text-[0.8rem] text-steel">{hint}</p>
      )}
    </div>
  );
}

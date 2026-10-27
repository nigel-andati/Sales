"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Icon } from "@/components/Icon";
import type { QuotePrefill } from "@/components/quote/QuoteProvider";

export function QuoteModal({
  isOpen,
  onClose,
  prefill,
  formKey,
}: {
  isOpen: boolean;
  onClose: () => void;
  prefill: QuotePrefill;
  formKey: number;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    lastFocus.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), select, textarea',
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>("input:not([type=hidden]):not([tabindex='-1'])")?.focus(), 250);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      lastFocus.current?.focus?.();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close quote form"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            className="relative flex max-h-[94svh] w-full max-w-[56rem] flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-[0_40px_120px_-40px_rgba(10,23,51,0.8)] sm:rounded-[1.75rem]"
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-[17rem_1fr]">
              <aside className="relative hidden overflow-hidden bg-navy p-7 text-white md:block">
                <div className="absolute -top-24 -right-24 size-64 rounded-full bg-cobalt/40 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-20 -left-16 size-56 rounded-full bg-cyan/25 blur-3xl" aria-hidden="true" />
                <div className="relative">
                  <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-cyan uppercase">Free quote</p>
                  <p className="mt-3 font-display text-[1.5rem] leading-tight font-semibold tracking-tight">
                    Tell us what you need. We&rsquo;ll do the legwork.
                  </p>
                  <ol className="mt-8 space-y-5 text-[0.88rem] text-white/75">
                    {[
                      "We research suppliers for your product.",
                      "We confirm details with you on WhatsApp.",
                      "You get a written quote to compare.",
                      "Nothing is purchased until you approve.",
                    ].map((t, i) => (
                      <li key={t} className="flex gap-3">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[0.72rem] font-bold text-cyan">
                          {i + 1}
                        </span>
                        {t}
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
              <div className="p-5 sm:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 id="quote-modal-title" className="font-display text-[1.6rem] leading-tight font-semibold text-navy">
                      Get a free quote
                    </h2>
                    <p className="mt-1.5 text-[0.92rem] text-steel">Takes about two minutes. No obligation.</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mist text-navy transition-colors hover:bg-ice"
                  >
                    <Icon name="close" className="size-5" />
                  </button>
                </div>
                <QuoteForm key={formKey} prefill={prefill} compact />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

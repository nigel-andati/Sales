"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { QuoteModal } from "@/components/quote/QuoteModal";

export type QuotePrefill = { product?: string; notes?: string; quantity?: string };

type QuoteContextValue = { open: (prefill?: QuotePrefill) => void; close: () => void };

const QuoteContext = createContext<QuoteContextValue>({ open: () => {}, close: () => {} });

export const useQuote = () => useContext(QuoteContext);

/**
 * Owns the quote modal. Any link to `/quote` or `#quote` opens the modal
 * instead of navigating, so plain anchors in server components work too.
 */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ isOpen: boolean; prefill: QuotePrefill; key: number }>({
    isOpen: false,
    prefill: {},
    key: 0,
  });

  const open = useCallback((prefill: QuotePrefill = {}) => {
    setState((s) => ({ isOpen: true, prefill, key: s.key + 1 }));
  }, []);
  const close = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
    if (window.location.hash === "#quote") history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    if (window.location.hash === "#quote") open();
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href === "/quote" || href.endsWith("#quote")) {
        if (window.location.pathname === "/quote") return;
        e.preventDefault();
        open();
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <QuoteContext.Provider value={{ open, close }}>
      {children}
      <QuoteModal isOpen={state.isOpen} onClose={close} prefill={state.prefill} formKey={state.key} />
    </QuoteContext.Provider>
  );
}

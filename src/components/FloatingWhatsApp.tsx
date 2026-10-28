"use client";

import { useEffect, useState } from "react";
import { TrackedLink } from "@/components/Button";
import { WhatsAppGlyph } from "@/components/Icon";
import { whatsappHref, hasWhatsApp } from "@/config/site";

/** Appears once the visitor scrolls past the hero, which has its own WhatsApp button. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <TrackedLink
      href={whatsappHref()}
      event="whatsapp_click"
      eventLabel="floating"
      {...(hasWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label="Chat with us on WhatsApp"
      aria-hidden={!visible || undefined}
      tabIndex={visible ? undefined : -1}
      className={`fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-whatsapp p-3.5 text-white shadow-[0_16px_34px_-12px_rgba(16,90,45,0.7)] transition-[background-color,transform,opacity] duration-300 hover:-translate-y-0.5 hover:bg-whatsapp-dark sm:right-6 sm:bottom-6 sm:py-3 sm:pr-5 sm:pl-4 ${visible ? "" : "pointer-events-none translate-y-4 opacity-0"}`}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <WhatsAppGlyph className="size-7 sm:size-6" />
      <span className="hidden text-[0.95rem] font-semibold sm:inline">Chat on WhatsApp</span>
    </TrackedLink>
  );
}

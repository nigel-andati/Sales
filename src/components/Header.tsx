"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Icon, WhatsAppGlyph } from "@/components/Icon";
import { QuoteButton, TrackedLink, WhatsAppButton } from "@/components/Button";
import { whatsappHref, hasWhatsApp } from "@/config/site";
import { navItems } from "@/config/nav";


/**
 * Fixed header made of three floating pills. Over the hero it is transparent;
 * once the page scrolls it gains a frosted navy bar behind the pills.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Pages without a photo hero always show the solid bar.
  const solid = usePathname() !== "/" || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const waProps = hasWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto transition-[padding] duration-500 ease-out-expo ${solid && !open ? "px-0 pt-0 md:px-3 md:pt-2" : "px-3 pt-3 md:px-[2.25rem] md:pt-[2.25rem]"}`}
      >
        <div
          className={`flex items-center justify-between gap-3 rounded-b-[1.75rem] transition-[background-color,padding,border-radius,backdrop-filter] duration-500 ease-out-expo md:rounded-full ${
            solid && !open ? "bg-navy/75 px-3 py-3 backdrop-blur-xl md:px-3" : "bg-transparent p-0"
          }`}
        >
          <Link
            href="/"
            onClick={close}
            aria-label="Home"
            className="flex h-12 items-center rounded-full bg-cobalt px-5 text-white transition-colors hover:bg-cobalt-dark md:h-[3.75rem] md:min-w-[13.5rem] md:justify-center"
          >
            <Logo tone="light" />
          </Link>

          <nav aria-label="Main" className="hidden flex-1 xl:block">
            <ul className="mx-auto flex h-[3.75rem] max-w-[44.5rem] items-center justify-between rounded-full bg-white/22 px-7 ring-1 ring-white/15 backdrop-blur-md">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="block py-2 text-[0.95rem] font-medium text-white transition-opacity hover:opacity-70">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <TrackedLink
              href={whatsappHref()}
              event="whatsapp_click"
              eventLabel="header"
              {...waProps}
              aria-label="Chat on WhatsApp"
              className="flex size-12 items-center justify-center rounded-full bg-whatsapp text-white transition-colors hover:bg-whatsapp-dark md:size-[3.75rem]"
            >
              <WhatsAppGlyph className="size-6" />
            </TrackedLink>
            <span className="hidden sm:block">
              <QuoteButton location="header" size="lg" className="!h-[3.75rem] !min-w-0 md:!min-w-[15rem]">
                Get a Free Quote
              </QuoteButton>
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-12 items-center justify-center rounded-full bg-cobalt text-white transition-colors hover:bg-cobalt-dark md:size-[3.75rem] xl:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-navy px-5 pt-28 pb-10 text-white xl:hidden"
            initial={{ clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)" }}
            animate={{ clipPath: "inset(0 0 0% 0 round 0 0 0rem 0rem)" }}
            exit={{ clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-cobalt/40 blur-3xl" aria-hidden="true" />
            <motion.ul
              className="relative"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
            >
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-white/10"
                >
                  <a href={item.href} onClick={close} className="flex items-center justify-between py-4 font-display text-[1.7rem] font-semibold tracking-tight">
                    {item.label}
                    <span className="text-[0.8rem] font-medium text-cyan">{String(i + 1).padStart(2, "0")}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="relative mt-auto flex flex-col gap-3 pt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <span onClick={close}>
                <QuoteButton location="mobile-menu" size="lg" className="w-full" />
              </span>
              <WhatsAppButton location="mobile-menu" size="lg" className="w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { Icon } from "@/components/Icon";
import { Reveal, SectionHead } from "@/components/motion";
import { faqs } from "@/content/home";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-16 md:pb-20">
      <div className="shell">
        <SectionHead id="faq-title" title={<>Frequently asked<br /> questions</>} />
        <Reveal className="mt-6 space-y-3 md:px-1.5">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const panel = `${base}-panel-${i}`;
            const button = `${base}-button-${i}`;
            return (
              <div key={f.q} className="rounded-[1.25rem] bg-white">
                <h3>
                  <button
                    id={button}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-[1.05rem] font-semibold text-[#0e1526] sm:px-9 sm:py-6 sm:text-[1.25rem]"
                  >
                    {f.q}
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-out-expo sm:size-10 ${isOpen ? "rotate-[135deg] bg-[#eceff3] text-[#0e1526]" : "bg-cobalt text-white hover:bg-cobalt-dark"}`}
                    >
                      <Icon name="plus" className="size-5" strokeWidth={1.5} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panel}
                      role="region"
                      aria-labelledby={button}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-4xl px-5 pb-6 text-[0.95rem] leading-relaxed text-[#0e1526]/80 sm:px-9">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

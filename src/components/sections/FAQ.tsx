"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { Icon } from "@/components/Icon";
import { QuoteButton, WhatsAppButton } from "@/components/Button";
import { Reveal, SectionHead } from "@/components/motion";
import { faqs } from "@/content/home";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-20 md:pb-28">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              id="faq-title"
              title="Frequently asked questions"
              intro="Shipping times, costs and requirements depend on your product and shipping method — your quote gives the specifics."
            />
            <Reveal className="card mt-8 p-6">
              <p className="font-display text-[1.1rem] font-semibold text-navy">Didn&rsquo;t find your answer?</p>
              <p className="mt-1.5 text-[0.9rem] text-steel">Ask us directly — we reply on WhatsApp.</p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <WhatsAppButton location="faq" size="sm" />
                <QuoteButton location="faq" size="sm" variant="ghost" />
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal className="space-y-2.5 lg:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const panel = `${base}-panel-${i}`;
            const button = `${base}-button-${i}`;
            return (
              <div key={f.q} className={`rounded-[1.25rem] bg-white transition-shadow duration-300 ${isOpen ? "shadow-[0_20px_50px_-30px_rgba(10,23,51,0.45)]" : ""}`}>
                <h3>
                  <button
                    id={button}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left font-display text-[1rem] font-semibold text-navy transition-colors hover:text-cobalt sm:px-7 sm:text-[1.12rem]"
                  >
                    {f.q}
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-out-expo ${isOpen ? "rotate-[135deg] bg-mist text-navy" : "bg-cobalt text-white"}`}
                    >
                      <Icon name="plus" className="size-4" />
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
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl px-5 pb-6 text-[0.95rem] leading-relaxed text-steel sm:px-7">{f.a}</p>
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

"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/Icon";
import { CarouselArrows } from "@/components/CarouselArrows";
import { useCarousel } from "@/lib/useCarousel";
import { QuoteButton, WhatsAppButton } from "@/components/Button";
import { Reveal, SectionHead } from "@/components/motion";
import { steps } from "@/content/home";

/**
 * Process storytelling: a horizontally scrolling route of eight stages.
 * Snap scrolling + arrow buttons + drag on desktop; a progress line fills as
 * the visitor moves along the route.
 */
export function Process() {
  const { ref: track, edges, step, progress, dragHandlers } = useCarousel<HTMLOListElement>();

  return (
    <section id="process" aria-labelledby="process-title" className="overflow-hidden pb-20 md:pb-28">
      <div className="shell">
        <SectionHead
          id="process-title"
          title={<>From the factory floor <span className="text-cobalt">to your door</span></>}
          intro="Every stage of your order, handled and explained — eight steps, one point of contact."
          action={<CarouselArrows onStep={step} edges={edges} controls="process-track" label="steps" />}
        />
      </div>

      <Reveal className="relative mt-10">
        <ol
          id="process-track"
          ref={track}
          {...dragHandlers}
          className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 scroll-px-4 md:px-[max(1.75rem,calc((100vw-84rem)/2+1.75rem))] md:scroll-px-[max(1.75rem,calc((100vw-84rem)/2+1.75rem))] select-none active:cursor-grabbing"
          aria-label="Our process, step by step"
        >
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="group relative w-[82vw] max-w-[19rem] shrink-0 snap-start sm:w-[19rem]"
            >
              <article className="card flex h-full flex-col p-6 transition-[transform,box-shadow] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:shadow-[0_28px_60px_-30px_rgba(10,23,51,0.45)]">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-[0.8rem] bg-navy font-display text-[1rem] font-semibold text-white transition-colors duration-300 group-hover:bg-cobalt">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon name={s.icon} className="size-6 text-cobalt/70 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <p className="mt-7 text-[0.72rem] font-bold tracking-[0.14em] text-cobalt uppercase">{s.stage}</p>
                <h3 className="mt-1.5 text-[1.15rem] font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-steel">{s.body}</p>
              </article>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="shell mt-6">
        <div className="relative h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <motion.div className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-cyan to-cobalt" style={{ scaleX: progress }} />
        </div>
        <div className="mt-2 flex justify-between text-[0.75rem] font-semibold text-steel" aria-hidden="true">
          <span>China</span>
          <span>Kenya</span>
        </div>
        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <QuoteButton location="process" size="lg" className="w-full sm:w-auto" />
          <WhatsAppButton location="process" size="lg" className="w-full sm:w-auto" />
        </Reveal>
      </div>
    </section>
  );
}

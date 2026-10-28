"use client";

import { Icon } from "@/components/Icon";
import { CarouselArrows } from "@/components/CarouselArrows";
import { useCarousel } from "@/lib/useCarousel";
import { QuoteButton } from "@/components/Button";
import { Reveal, SectionHead } from "@/components/motion";
import { steps } from "@/content/home";

/**
 * Process storytelling: a horizontally scrolling route of eight stages.
 * Snap scrolling + arrow buttons + drag on desktop; a progress line fills as
 * the visitor moves along the route.
 */
export function Process() {
  const { ref: track, edges, step, dragHandlers } = useCarousel<HTMLOListElement>();

  return (
    <section id="process" aria-labelledby="process-title" className="overflow-hidden pb-16 md:pb-24">
      <div className="shell">
        <SectionHead
          id="process-title"
          title={<>From the factory floor<br /> to your door</>}
          intro="Every stage handled and explained"
          action={<CarouselArrows onStep={step} edges={edges} controls="process-track" label="steps" />}
        />
      </div>

      <Reveal className="relative mt-6">
        <ol
          id="process-track"
          ref={track}
          {...dragHandlers}
          className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-3 pb-2 scroll-px-3 md:px-[max(1.5rem,calc((100vw-90rem)/2+1.5rem))] md:scroll-px-[max(1.5rem,calc((100vw-90rem)/2+1.5rem))] select-none active:cursor-grabbing"
          aria-label="Our process, step by step"
        >
          {steps.map((s, i) => (
            <li key={s.title} className="group w-[85vw] max-w-[27rem] shrink-0 snap-start sm:w-[27rem]">
              <article className="card flex h-full min-h-[13.5rem] flex-col p-6 transition-colors duration-300 group-hover:bg-ice">
                <span className="flex size-9 items-center justify-center rounded-[0.45rem] bg-navy text-[0.95rem] font-semibold text-white transition-colors duration-300 group-hover:bg-cobalt">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-base font-semibold text-[#0e1526]">{s.title}</h3>
                <p className="mt-1 text-[0.95rem] leading-snug text-[#0e1526]/80">{s.body}</p>
                <p className="mt-auto flex items-center gap-2 pt-5 text-[0.78rem] font-semibold tracking-[0.06em] text-cobalt uppercase">
                  <Icon name={s.icon} className="size-4" />
                  {s.stage}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="shell mt-6">
        <Reveal className="flex justify-center">
          <QuoteButton location="process" size="lg" className="w-full sm:w-[27rem]" />
        </Reveal>
      </div>
    </section>
  );
}

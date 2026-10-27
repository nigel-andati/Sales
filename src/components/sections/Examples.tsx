"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CarouselArrows } from "@/components/CarouselArrows";
import { QuoteButton } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal, SectionHead } from "@/components/motion";
import { examples } from "@/content/home";
import { useCarousel } from "@/lib/useCarousel";

/** Mixed text/photo carousel of illustrative requests. */
export function Examples() {
  const { ref, edges, step, progress, dragHandlers } = useCarousel<HTMLUListElement>();
  return (
    <section aria-labelledby="examples-title" className="overflow-hidden pb-20 md:pb-28">
      <div className="shell">
        <SectionHead
          id="examples-title"
          title="Example sourcing requests"
          intro={
            <>
              The kind of requests we help with. These are <strong className="font-semibold text-navy">illustrative examples</strong>,
              not completed customer orders.
            </>
          }
          action={<CarouselArrows onStep={step} edges={edges} controls="examples-track" label="examples" />}
        />
      </div>
      <Reveal className="mt-10">
        <ul
          id="examples-track"
          ref={ref}
          {...dragHandlers}
          className="no-scrollbar flex cursor-grab snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-smooth px-4 pb-4 scroll-px-4 select-none active:cursor-grabbing md:px-[max(1.75rem,calc((100vw-84rem)/2+1.75rem))] md:scroll-px-[max(1.75rem,calc((100vw-84rem)/2+1.75rem))]"
        >
          {examples.map((ex) => (
            <li key={ex.title} className="w-[78vw] max-w-[18.5rem] shrink-0 snap-start sm:w-[18.5rem]">
              {ex.kind === "image" ? (
                <article className="group relative isolate flex h-[25rem] flex-col justify-end overflow-hidden rounded-[1.375rem] bg-navy p-5 text-white">
                  <Image
                    src={ex.image.src}
                    alt={ex.image.alt}
                    fill
                    quality={65}
                    sizes="300px"
                    draggable={false}
                    className="-z-10 object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                  <p className="absolute top-5 left-5 rounded-full bg-white/15 px-2.5 py-1 text-[0.68rem] font-bold tracking-[0.1em] uppercase ring-1 ring-white/25 backdrop-blur">
                    Example
                  </p>
                  <h3 className="text-[1.3rem] leading-snug font-semibold">{ex.title}</h3>
                  <p className="mt-1.5 text-[0.88rem] leading-relaxed text-white/75">{ex.detail}</p>
                </article>
              ) : (
                <article
                  className={`flex h-[25rem] flex-col rounded-[1.375rem] p-6 ${ex.tone === "cobalt" ? "bg-gradient-to-br from-cobalt to-[#1b45c6] text-white" : "card text-navy"}`}
                >
                  <p
                    className={`w-fit rounded-full px-2.5 py-1 text-[0.68rem] font-bold tracking-[0.1em] uppercase ${ex.tone === "cobalt" ? "bg-white/15 text-white" : "bg-ice text-cobalt"}`}
                  >
                    Example request
                  </p>
                  <h3 className="mt-6 text-[1.5rem] leading-[1.15] font-semibold">{ex.title}</h3>
                  <p className={`mt-3 text-[0.92rem] leading-relaxed ${ex.tone === "cobalt" ? "text-white/75" : "text-steel"}`}>{ex.detail}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {ex.tags.map((t) => (
                      <li
                        key={t}
                        className={`rounded-full px-2.5 py-1 text-[0.75rem] font-medium ${ex.tone === "cobalt" ? "bg-white/12 text-white/90" : "bg-mist text-navy"}`}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <QuoteButton
                    location={`example-${ex.title}`}
                    prefill={{ product: `Something similar to: ${ex.title} — ` }}
                    unstyled
                    className={`group mt-auto inline-flex items-center gap-2 text-[0.92rem] font-semibold ${ex.tone === "cobalt" ? "text-white" : "text-cobalt"}`}
                  >
                    Request something similar
                    <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </QuoteButton>
                </article>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
      <div className="shell mt-6">
        <div className="relative h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <motion.div className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-navy" style={{ scaleX: progress }} />
        </div>
      </div>
    </section>
  );
}

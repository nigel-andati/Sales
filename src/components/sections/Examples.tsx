"use client";

import Image from "next/image";
import { CarouselArrows } from "@/components/CarouselArrows";
import { QuoteButton } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal, SectionHead } from "@/components/motion";
import { examples } from "@/content/home";
import { useCarousel } from "@/lib/useCarousel";

/** Mixed text/photo carousel of illustrative requests. */
export function Examples() {
  const { ref, edges, step, dragHandlers } = useCarousel<HTMLUListElement>();
  return (
    <section aria-labelledby="examples-title" className="overflow-hidden pb-16 md:pb-24">
      <div className="shell">
        <SectionHead
          id="examples-title"
          title="Example sourcing requests"
          intro={<>Illustrative examples of what we help with — not completed customer orders</>}
          action={<CarouselArrows onStep={step} edges={edges} controls="examples-track" label="examples" />}
        />
      </div>
      <Reveal className="mt-6">
        <ul
          id="examples-track"
          ref={ref}
          {...dragHandlers}
          className="no-scrollbar flex cursor-grab snap-x snap-mandatory items-end gap-6 overflow-x-auto scroll-smooth px-3 pb-2 scroll-px-3 select-none active:cursor-grabbing md:px-[max(1.5rem,calc((100vw-90rem)/2+1.5rem))] md:scroll-px-[max(1.5rem,calc((100vw-90rem)/2+1.5rem))]"
        >
          {examples.map((ex) => (
            <li key={ex.title} className="w-[78vw] max-w-[20rem] shrink-0 snap-start sm:w-[20rem]">
              {ex.kind === "image" ? (
                <article className="group relative isolate flex h-[28.5rem] flex-col justify-end overflow-hidden rounded-[1.25rem] bg-navy p-5 text-white">
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
                  className={`flex h-[24rem] flex-col rounded-[1.25rem] p-6 ${ex.tone === "cobalt" ? "bg-cobalt text-white" : "card text-[#0e1526]"}`}
                >
                  <p
                    className={`w-fit rounded-full px-2.5 py-1 text-[0.68rem] font-bold tracking-[0.1em] uppercase ${ex.tone === "cobalt" ? "bg-white/15 text-white" : "bg-ice text-cobalt"}`}
                  >
                    Example request
                  </p>
                  <h3 className="mt-5 text-[1.3rem] leading-[1.2] font-semibold">{ex.title}</h3>
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
    </section>
  );
}

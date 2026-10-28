"use client";

import Image from "next/image";
import { Icon } from "@/components/Icon";
import { QuoteButton } from "@/components/Button";
import { SectionHead, Stagger, StaggerItem } from "@/components/motion";
import { categories } from "@/content/home";

export function Categories() {
  return (
    <section id="categories" aria-labelledby="categories-title" className="pb-16 md:pb-24">
      <div className="shell">
        <SectionHead
          id="categories-title"
          title="What we can source"
                  />
        <Stagger className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {categories.map((c) => (
            <StaggerItem key={c.title}>
              <QuoteButton
                location={`category-${c.title}`}
                prefill={{ product: `${c.title}: ` }}
                unstyled
                aria-label={`Get a quote for ${c.title}`}
                className="group relative isolate block aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-navy lg:aspect-[330/192]"
              >
                <Image
                  src={c.image.src}
                  alt=""
                  fill
                  quality={65}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="-z-10 object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 -z-10 bg-navy/20 transition-colors duration-500 group-hover:bg-navy/45" />
                <span className="absolute top-3 left-3 flex size-9 items-center justify-center rounded-[0.55rem] bg-cobalt text-white transition-transform duration-500 ease-out-expo group-hover:-rotate-6 sm:top-4 sm:left-4">
                  <Icon name={c.icon} className="size-5" />
                </span>
                <span className="absolute top-3 right-3 flex size-9 translate-y-1 items-center justify-center rounded-full bg-white text-navy opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 sm:top-4 sm:right-4">
                  <Icon name="arrowUpRight" className="size-4" />
                </span>
                <span className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                  <span className="block max-h-0 overflow-hidden text-[0.82rem] leading-snug text-white/85 opacity-0 transition-all duration-500 ease-out-expo group-hover:mb-2 group-hover:max-h-12 group-hover:opacity-100">
                    {c.examples}
                  </span>
                  <span className="inline-flex rounded-full bg-white px-4 py-2 text-[0.9rem] text-[#0e1526]">
                    {c.title}
                  </span>
                </span>
              </QuoteButton>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

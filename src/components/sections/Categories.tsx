"use client";

import Image from "next/image";
import { Icon } from "@/components/Icon";
import { QuoteButton, WhatsAppButton } from "@/components/Button";
import { SectionHead, Stagger, StaggerItem } from "@/components/motion";
import { categories } from "@/content/home";
import { siteConfig } from "@/config/site";

export function Categories() {
  return (
    <section id="categories" aria-labelledby="categories-title" className="pb-20 md:pb-28">
      <div className="shell">
        <SectionHead
          id="categories-title"
          title="What we can source"
          intro="A few of the categories we're asked about most. Tap one to start a quote."
          action={
            <WhatsAppButton location="categories" size="md" variant="light" className="ring-1 ring-line" message={siteConfig.whatsappMessages.photo}>
              Something else? Send a photo
            </WhatsAppButton>
          }
        />
        <Stagger className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {categories.map((c) => (
            <StaggerItem key={c.title}>
              <QuoteButton
                location={`category-${c.title}`}
                prefill={{ product: `${c.title}: ` }}
                unstyled
                aria-label={`Get a quote for ${c.title}`}
                className="group relative isolate block aspect-[4/5] overflow-hidden rounded-[1.375rem] bg-navy sm:aspect-[4/3]"
              >
                <Image
                  src={c.image.src}
                  alt=""
                  fill
                  quality={65}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="-z-10 object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/85 via-navy/10 to-navy/30 transition-opacity duration-500 group-hover:opacity-90" />
                <span className="absolute top-3 left-3 flex size-10 items-center justify-center rounded-[0.8rem] bg-cobalt text-white shadow-[0_8px_20px_-8px_rgba(37,86,232,0.9)] transition-transform duration-500 ease-out-expo group-hover:-rotate-6 sm:top-4 sm:left-4">
                  <Icon name={c.icon} className="size-5" />
                </span>
                <span className="absolute top-3 right-3 flex size-9 translate-y-1 items-center justify-center rounded-full bg-white text-navy opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 sm:top-4 sm:right-4">
                  <Icon name="arrowUpRight" className="size-4" />
                </span>
                <span className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                  <span className="block max-h-0 overflow-hidden text-[0.82rem] leading-snug text-white/85 opacity-0 transition-all duration-500 ease-out-expo group-hover:mb-2 group-hover:max-h-12 group-hover:opacity-100">
                    {c.examples}
                  </span>
                  <span className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-[0.82rem] font-semibold text-navy sm:text-[0.9rem]">
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

"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Icon, WhatsAppGlyph } from "@/components/Icon";
import { QuoteButton, TrackedLink } from "@/components/Button";
import { RouteGraphic } from "@/components/RouteGraphic";
import { images } from "@/content/home";
import { siteConfig, whatsappHref, hasWhatsApp } from "@/config/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section ref={ref} aria-labelledby="hero-title" className="p-2 md:p-3">
      <div className="relative isolate flex min-h-[calc(100svh-1rem)] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-navy md:min-h-[min(calc(100svh-1.5rem),60rem)] md:rounded-[2.25rem]">
        <motion.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
          <Image
            src={images.factoryFloor.src}
            alt={images.factoryFloor.alt}
            fill
            preload
            quality={70}
            sizes="100vw"
            className="animate-drift object-cover"
          />
        </motion.div>
        {/* Cool navy grade for legibility, strongest bottom-left where the text sits. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/55 to-navy/20" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/80 via-navy/20 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 mix-blend-color bg-midnight/35" aria-hidden="true" />

        <div className="grid gap-8 px-5 pt-32 pb-5 md:px-10 md:pb-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="text-white lg:col-span-7">
            <motion.p
              {...fade(0.1)}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[0.78rem] font-semibold ring-1 ring-white/20 backdrop-blur"
            >
              <span className="size-1.5 rounded-full bg-cyan" />
              China → Kenya sourcing &amp; import
            </motion.p>
            <motion.h1
              id="hero-title"
              {...fade(0.2)}
              className="mt-5 text-[clamp(2.3rem,5.4vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
            >
              Source From China. <span className="text-cyan">We Handle the Rest.</span>
            </motion.h1>
            <motion.p {...fade(0.32)} className="mt-5 max-w-xl text-[1rem] leading-relaxed text-white/75 md:text-[1.1rem]">
              Send us a product photo, link or description. We find and compare suppliers in China, negotiate, coordinate
              quality checks, consolidate your goods and arrange delivery to you in Kenya.
            </motion.p>
            <motion.ul {...fade(0.42)} className="mt-6 flex flex-wrap gap-2 text-[0.82rem] text-white/80" aria-label="What you can send">
              {[
                { icon: "camera" as const, label: "A photo" },
                { icon: "arrowUpRight" as const, label: "A link" },
                { icon: "chat" as const, label: "A description" },
              ].map((c) => (
                <li key={c.label} className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 ring-1 ring-white/15">
                  <Icon name={c.icon} className="size-3.5 text-cyan" />
                  {c.label}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
            <motion.div {...fade(0.5)}>
              <QuoteButton
                location="hero-card"
                unstyled
                aria-label="Get a free quote"
                className="group relative flex h-full min-h-[11.5rem] flex-col overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cobalt to-[#1c46c9] p-5 text-white shadow-[0_24px_50px_-24px_rgba(37,86,232,0.9)] transition-transform duration-500 ease-out-expo hover:-translate-y-1"
              >
                <span className="absolute -right-10 -bottom-12 size-40 rounded-full bg-cyan/30 blur-2xl transition-transform duration-700 group-hover:scale-125" aria-hidden="true" />
                <span className="font-display text-[1.3rem] leading-tight font-semibold">Get a Free Quote</span>
                <span className="mt-2 max-w-[15rem] text-[0.88rem] leading-snug text-white/75">
                  Tell us what you need. We compare suppliers and send a clear quote.
                </span>
                <span className="mt-auto flex size-10 items-center justify-center self-start rounded-full bg-white text-cobalt transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                  <Icon name="arrowRight" className="size-5" />
                </span>
              </QuoteButton>
            </motion.div>
            <motion.div {...fade(0.6)}>
              <TrackedLink
                href={whatsappHref(siteConfig.whatsappMessages.photo)}
                event="whatsapp_click"
                eventLabel="hero-card"
                {...(hasWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative flex h-full min-h-[11.5rem] flex-col overflow-hidden rounded-[1.5rem] bg-white p-5 text-navy transition-transform duration-500 ease-out-expo hover:-translate-y-1"
              >
                <span className="font-display text-[1.3rem] leading-tight font-semibold">Chat on WhatsApp</span>
                <span className="mt-2 max-w-[12rem] text-[0.88rem] leading-snug text-steel">Send a product photo and we&rsquo;ll look for it.</span>
                <RouteGraphic className="pointer-events-none absolute right-0 bottom-0 w-[64%] opacity-90" />
                <span className="relative mt-auto flex size-10 items-center justify-center self-start rounded-full bg-whatsapp text-white transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                  <WhatsAppGlyph className="size-5" />
                </span>
              </TrackedLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

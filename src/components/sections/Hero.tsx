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
    <section ref={ref} aria-labelledby="hero-title" className="p-3 md:p-6">
      <div className="relative isolate flex min-h-[calc(100svh-1.5rem)] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-navy md:h-[48.75rem] md:min-h-0 md:rounded-[1.875rem]">
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
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/10" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/70 via-transparent to-transparent" aria-hidden="true" />

        <div className="flex flex-col gap-5 p-4 pt-28 md:flex-row md:items-end md:justify-between md:gap-8 md:p-6 md:pl-12">
          <div className="max-w-[38rem] pb-1 text-white md:pb-5">
            <motion.h1
              id="hero-title"
              {...fade(0.15)}
              className="text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.18] font-semibold tracking-[-0.015em] text-balance"
            >
              Source from China. We handle the rest.
            </motion.h1>
            <motion.p {...fade(0.28)} className="mt-4 max-w-[34rem] text-[0.95rem] leading-snug text-white/90 md:text-base">
              Send us a product photo, link or description. We find and compare suppliers in China, coordinate quality
              checks, consolidate your goods and arrange delivery to you in Kenya.
            </motion.p>
          </div>

          <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6">
            <motion.div {...fade(0.4)}>
              <QuoteButton
                location="hero-card"
                unstyled
                aria-label="Get a free quote"
                className="group relative flex h-[8.5rem] flex-col overflow-hidden rounded-[1.25rem] bg-cobalt p-5 text-white transition-colors duration-300 hover:bg-cobalt-dark md:h-[11.6rem] md:w-[16.5rem]"
              >
                <span className="text-[1.35rem] leading-[1.15] font-semibold md:text-[1.5rem]">Get a Free Quote</span>
                <span className="mt-2 max-w-[13rem] text-[0.9rem] leading-snug text-white/85">Tell us what you need and get a clear quote</span>
                <span className="mt-auto flex h-7 w-12 items-center justify-center rounded-full bg-white/25 transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                  <Icon name="arrowRight" className="size-4" />
                </span>
              </QuoteButton>
            </motion.div>
            <motion.div {...fade(0.5)}>
              <TrackedLink
                href={whatsappHref(siteConfig.whatsappMessages.photo)}
                event="whatsapp_click"
                eventLabel="hero-card"
                {...(hasWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative flex h-[8.5rem] flex-col overflow-hidden rounded-[1.25rem] bg-white p-5 transition-colors duration-300 hover:bg-ice md:h-[11.6rem] md:w-[16.5rem]"
              >
                <span className="relative z-10 text-[1.35rem] leading-[1.15] font-semibold text-cobalt md:text-[1.5rem]">
                  Chat on
                  <br />
                  WhatsApp
                </span>
                <RouteGraphic className="pointer-events-none absolute right-0 bottom-0 w-[70%]" />
                <span className="relative mt-auto flex h-7 w-12 items-center justify-center rounded-full bg-whatsapp/15 text-whatsapp transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                  <WhatsAppGlyph className="size-4" />
                </span>
              </TrackedLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

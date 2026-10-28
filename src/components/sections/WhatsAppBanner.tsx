"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { WhatsAppButton } from "@/components/Button";
import { Icon, WhatsAppGlyph } from "@/components/Icon";
import { images } from "@/content/home";
import { siteConfig } from "@/config/site";

const bubble = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
};

/** "Send us a picture" banner with an illustrative WhatsApp conversation. */
export function WhatsAppBanner() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="wa-title" className="pb-16 md:pb-24">
      <div className="shell">
        <div className="relative isolate grid overflow-hidden rounded-[1.25rem] bg-cobalt text-white lg:h-[24rem] lg:grid-cols-12">
                    <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]"
            aria-hidden="true"
          />
          <motion.div
            className="flex flex-col p-6 sm:p-10 lg:col-span-6 lg:p-12"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[0.75rem] font-semibold">
              <WhatsAppGlyph className="size-4 text-[#5ee59a]" />
              WhatsApp sourcing
            </p>
            <h2 id="wa-title" className="mt-4 text-[clamp(1.6rem,2.45vw,2.2rem)] leading-[1.2] font-semibold text-balance">
              See something you want? Send us a picture.
            </h2>
            <p className="mt-3 max-w-md text-[0.95rem] leading-snug text-white/90">
              No product name or supplier link needed. A photo or screenshot is enough for us to start identifying sourcing
              options in China.
            </p>
            <WhatsAppButton location="whatsapp-banner" size="lg" variant="navy" message={siteConfig.whatsappMessages.photo} className="mt-8 w-full sm:w-[27rem] lg:mt-auto">
              Send Product on WhatsApp
            </WhatsAppButton>
          </motion.div>

          {/* Illustrative phone — not a real conversation. */}
          <div className="relative flex h-[22rem] items-start justify-center overflow-hidden px-6 pt-2 lg:col-span-6 lg:h-auto lg:pt-10" aria-hidden="true">
            <motion.div
              className="relative w-full max-w-[18rem] translate-y-0 rounded-t-[2.6rem] border-[7px] border-b-0 border-navy bg-navy shadow-[0_40px_90px_-30px_rgba(5,12,30,0.9)]"
              initial={reduce ? false : { y: 80, rotate: 4 }}
              whileInView={{ y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="overflow-hidden rounded-t-[2.1rem] bg-[#eef3f8]">
                <div className="flex items-center gap-3 bg-midnight px-4 pt-7 pb-3.5 text-white">
                  <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-cobalt to-cyan">
                    <WhatsAppGlyph className="size-5" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[0.85rem] font-semibold">{siteConfig.shortName} Sourcing</p>
                    <p className="text-[0.68rem] text-white/60">Illustration</p>
                  </div>
                </div>
                <motion.div
                  className="space-y-2.5 px-3.5 pt-5 pb-8 text-[0.8rem] text-charcoal"
                  initial={reduce ? false : "hidden"}
                  whileInView="show"
                  viewport={{ once: true, margin: "-15%" }}
                  variants={{ show: { transition: { staggerChildren: 0.55, delayChildren: 0.6 } } }}
                >
                  <motion.div variants={bubble} className="ml-auto w-[76%] rounded-2xl rounded-tr-md bg-[#d6f5e1] p-1.5 shadow-sm">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image src={images.yiwuGoods.src} alt="" fill sizes="220px" quality={60} className="object-cover" />
                    </div>
                    <p className="px-1.5 pt-1.5 pb-0.5">Can you find mugs like these? 300 pcs, delivered to Kisumu.</p>
                  </motion.div>
                  <motion.div variants={bubble} className="w-[80%] rounded-2xl rounded-tl-md bg-white p-2.5 shadow-sm">
                    Got it. Do you need your logo printed on them? We&rsquo;ll compare suppliers and send a quote.
                  </motion.div>
                  <motion.div variants={bubble} className="ml-auto w-fit rounded-2xl rounded-tr-md bg-[#d6f5e1] px-3 py-2 shadow-sm">
                    Yes, one colour logo please.
                  </motion.div>
                  <motion.div variants={bubble} className="flex w-fit items-center gap-2 rounded-2xl rounded-tl-md bg-white px-3 py-2 text-steel shadow-sm">
                    <Icon name="clipboard" className="size-4 text-cobalt" />
                    Preparing supplier options…
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

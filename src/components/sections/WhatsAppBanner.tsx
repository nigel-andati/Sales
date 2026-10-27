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
    <section aria-labelledby="wa-title" className="pb-20 md:pb-28">
      <div className="shell">
        <div className="relative isolate grid overflow-hidden rounded-[2rem] bg-gradient-to-br from-cobalt via-[#1f4bd6] to-midnight text-white lg:grid-cols-12">
          <div className="pointer-events-none absolute -top-32 -left-24 -z-10 size-[28rem] rounded-full bg-cyan/25 blur-3xl" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]"
            aria-hidden="true"
          />
          <motion.div
            className="p-7 sm:p-10 lg:col-span-6 lg:p-14"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-[0.75rem] font-semibold ring-1 ring-white/20">
              <WhatsAppGlyph className="size-4 text-[#5ee59a]" />
              WhatsApp sourcing
            </p>
            <h2 id="wa-title" className="mt-5 text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.05] font-semibold text-balance">
              See something you want? Send us a picture.
            </h2>
            <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-white/75">
              No product name or supplier link needed. A photo or screenshot is enough for us to start identifying sourcing
              options in China.
            </p>
            <ol className="mt-7 space-y-3 text-[0.92rem]">
              {["Screenshot or snap it — TikTok, Instagram, a shop, anywhere", "Send it with the quantity and your town", "We come back with options and a quote"].map(
                (t, i) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/12 text-[0.75rem] font-bold text-cyan">{i + 1}</span>
                    <span className="text-white/85">{t}</span>
                  </li>
                ),
              )}
            </ol>
            <WhatsAppButton location="whatsapp-banner" size="lg" message={siteConfig.whatsappMessages.photo} className="mt-9 w-full sm:w-auto">
              Send Product on WhatsApp
            </WhatsAppButton>
          </motion.div>

          {/* Illustrative phone — not a real conversation. */}
          <div className="relative flex items-end justify-center px-6 pt-2 lg:col-span-6 lg:pt-12" aria-hidden="true">
            <motion.div
              className="relative w-full max-w-[19.5rem] rounded-t-[2.6rem] border-[7px] border-b-0 border-navy bg-navy shadow-[0_40px_90px_-30px_rgba(5,12,30,0.9)]"
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

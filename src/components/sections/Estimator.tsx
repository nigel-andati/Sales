"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useId, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { QuoteButton, WhatsAppButton } from "@/components/Button";
import { Reveal } from "@/components/motion";
import { images } from "@/content/home";
import { siteConfig } from "@/config/site";

/** Common air-freight volumetric divisor (cm³ per kg). */
const AIR_DIVISOR = 6000;
const ORIGINS = ["Guangzhou", "Shenzhen", "Yiwu", "Foshan", "Ningbo", "Not sure yet"];

function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => v.toLocaleString("en-KE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));
  useEffect(() => {
    if (reduce) return mv.set(value);
    const c = animate(mv, value, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [value, mv, reduce]);
  return <motion.span>{text}</motion.span>;
}

function NumberField({
  label,
  value,
  onChange,
  unit,
  min = 0,
  step = 1,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit: string;
  min?: number;
  step?: number;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label} ({unit})
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          className="field !px-4 tabular-nums sm:!pr-11 sm:!pl-5"
        />
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[0.8rem] text-steel">{unit}</span>
      </div>
    </div>
  );
}

export function Estimator() {
  const [l, setL] = useState("50");
  const [w, setW] = useState("40");
  const [h, setH] = useState("30");
  const [kg, setKg] = useState("12");
  const [count, setCount] = useState(10);
  const [origin, setOrigin] = useState(ORIGINS[0]);
  const [dest, setDest] = useState("Nairobi");
  const originId = useId();
  const destId = useId();

  const r = useMemo(() => {
    const n = (s: string) => Math.max(0, Number.parseFloat(s) || 0);
    const cm3 = n(l) * n(w) * n(h) * count;
    const cbm = cm3 / 1_000_000;
    const gross = n(kg) * count;
    const volumetric = cm3 / AIR_DIVISOR;
    const chargeable = Math.max(gross, volumetric);
    let advice: { title: string; body: string; icon: "plane" | "ship" | "cube" };
    if (cbm === 0) advice = { title: "Enter your carton details", body: "Add size, weight and number of cartons to see the estimate.", icon: "cube" };
    else if (cbm >= 15)
      advice = {
        title: "Ask about a full container",
        body: "At this volume a full container (FCL) is often worth comparing with a shared one. A 20 ft container typically holds around 25–30 m³ of cartons.",
        icon: "ship",
      };
    else if (cbm >= 1 || chargeable >= 300)
      advice = {
        title: "Sea freight is usually more economical",
        body: "Shared-container (LCL) sea freight is generally priced by volume, which tends to suit shipments of this size.",
        icon: "ship",
      };
    else
      advice = {
        title: "Air freight is often practical",
        body: "For small, light shipments air can make sense — sea may still cost less if you're not in a hurry.",
        icon: "plane",
      };
    return { cbm, gross, volumetric, chargeable, advice, volHeavier: volumetric > gross };
  }, [l, w, h, kg, count]);

  const summary =
    `Shipment estimate: ${count} carton(s) of ${l}×${w}×${h} cm, ${kg} kg each — ` +
    `${r.cbm.toFixed(2)} m³, ${Math.round(r.gross)} kg gross, ${Math.round(r.chargeable)} kg air chargeable. ` +
    `From ${origin} to ${dest || "Kenya"}.`;
  return (
    <section id="estimator" aria-labelledby="estimator-title" className="pb-16 md:pb-24">
      <div className="shell">
        <div className="relative isolate grid gap-8 overflow-hidden rounded-[1.25rem] bg-navy p-5 text-white sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-6 lg:pl-12">
          <Image src={images.airCargo.src} alt="" fill quality={55} sizes="100vw" className="-z-20 object-cover opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/90 to-navy/60" aria-hidden="true" />

          <Reveal className="flex flex-col lg:col-span-6 lg:py-6">
            <h2 id="estimator-title" className="text-[clamp(1.6rem,2.45vw,2.2rem)] leading-[1.2] font-semibold text-balance">
              Shipment size calculator
            </h2>
            <p className="mt-3 max-w-[32rem] text-[0.95rem] leading-snug text-white/90">
              Freight is priced on volume and weight. Enter your cartons to see the numbers a forwarder works from — air
              chargeable weight uses the standard cm³ ÷ 6,000 rule — then send them with your quote request.
            </p>
            <div className="mt-8 flex flex-col gap-3 lg:mt-auto">
              <QuoteButton location="estimator" size="lg" className="w-full sm:w-[27rem]" prefill={{ notes: summary, quantity: `${count} cartons` }}>
                Get a quote with these numbers
              </QuoteButton>
              <WhatsAppButton location="estimator" size="md" variant="glass" className="w-full sm:w-[27rem]" message={`${siteConfig.whatsappMessages.quote} ${summary}`}>
                Discuss on WhatsApp
              </WhatsAppButton>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-6 lg:justify-self-end">
            <div className="w-full rounded-[1.25rem] bg-white p-5 text-[#0e1526] sm:p-9 lg:w-[39rem]">
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="sr-only">Shipping from (China)</span>
                    <select id={originId} value={origin} onChange={(e) => setOrigin(e.target.value)} className="field appearance-none">
                      {ORIGINS.map((o) => (
                        <option key={o} value={o}>
                          From: {o}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="sr-only">Delivering to (Kenya)</span>
                    <input id={destId} list="estimator-towns" value={dest} onChange={(e) => setDest(e.target.value)} placeholder="Delivery town in Kenya" className="field" />
                    <datalist id="estimator-towns">
                      {siteConfig.destinations.map((d) => (
                        <option key={d} value={d} />
                      ))}
                    </datalist>
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <NumberField label="Length" unit="cm" value={l} onChange={setL} />
                  <NumberField label="Width" unit="cm" value={w} onChange={setW} />
                  <NumberField label="Height" unit="cm" value={h} onChange={setH} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <NumberField label="Weight per carton" unit="kg" value={kg} onChange={setKg} step={0.5} />
                  <div className="flex items-center gap-1 rounded-full bg-[#f3f5f7] p-1" role="group" aria-label="Number of cartons">
                    <button
                      type="button"
                      onClick={() => setCount((c) => Math.max(1, c - 1))}
                      aria-label="Fewer cartons"
                      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0e1526] transition-colors hover:bg-ice"
                    >
                      <span className="h-0.5 w-3.5 rounded bg-current" />
                    </button>
                    <label className="flex flex-1 items-baseline justify-center gap-1.5">
                      <input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        aria-label="Number of cartons"
                        value={count}
                        onChange={(e) => setCount(Math.max(1, Math.round(Number(e.target.value) || 1)))}
                        className="w-14 bg-transparent text-right text-base tabular-nums outline-none"
                      />
                      <span className="text-[0.85rem] text-steel">cartons</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setCount((c) => c + 1)}
                      aria-label="More cartons"
                      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0e1526] transition-colors hover:bg-ice"
                    >
                      <Icon name="plus" className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6" aria-live="polite">
                <p className="text-base font-semibold">Shipment volume:</p>
                <p className="mt-1 text-[2.4rem] leading-none font-medium text-cobalt tabular-nums">
                  <AnimatedNumber value={r.cbm} decimals={2} /> m³
                </p>
                <p className="mt-3 text-[0.85rem] text-[#0e1526]/80">
                  Gross weight <strong className="tabular-nums"><AnimatedNumber value={r.gross} /> kg</strong> · Air chargeable{" "}
                  <strong className="tabular-nums"><AnimatedNumber value={r.chargeable} /> kg</strong>
                  {r.volHeavier && <span className="text-cobalt"> (volume-based)</span>}
                </p>
                <p className="mt-3 flex items-start gap-2 text-[0.8rem] leading-snug text-steel">
                  <Icon name={r.advice.icon} className="mt-0.5 size-4 shrink-0 text-cobalt" />
                  <span>
                    <strong className="font-semibold text-[#0e1526]">{r.advice.title}.</strong> {r.advice.body} Planning estimate
                    only — your quote confirms cost, method and timeline.
                  </span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

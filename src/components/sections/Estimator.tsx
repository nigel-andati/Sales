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
      <label htmlFor={id} className="mb-1.5 block text-[0.78rem] font-semibold text-steel">
        {label} <span className="font-normal sm:hidden">({unit})</span>
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
          className="field !px-3 tabular-nums sm:!pr-11 sm:!pl-4"
        />
        <span className="pointer-events-none absolute top-1/2 right-3.5 hidden -translate-y-1/2 text-[0.8rem] font-semibold text-steel sm:block">{unit}</span>
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
  const max = Math.max(r.gross, r.volumetric, 1);

  return (
    <section id="estimator" aria-labelledby="estimator-title" className="pb-20 md:pb-28">
      <div className="shell">
        <div className="relative isolate grid gap-8 overflow-hidden rounded-[2rem] bg-navy p-5 text-white sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-12">
          <Image src={images.airCargo.src} alt="" fill quality={55} sizes="100vw" className="-z-20 object-cover opacity-30 mix-blend-luminosity" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy/92 to-midnight/80" aria-hidden="true" />

          <Reveal className="flex flex-col lg:col-span-5">
            <p className="text-[0.75rem] font-bold tracking-[0.16em] text-cyan uppercase">Shipment estimator</p>
            <h2 id="estimator-title" className="mt-3 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.06] font-semibold text-balance">
              How big is your shipment?
            </h2>
            <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-white/70">
              Freight is priced on volume and weight. Enter your cartons to see the numbers a forwarder looks at — then send
              them with your quote request.
            </p>
            <dl className="mt-8 space-y-4 text-[0.88rem]">
              {[
                ["Volume (m³)", "Length × width × height × cartons. Sea freight is usually priced on this."],
                ["Air chargeable weight", "The greater of actual weight and volumetric weight (cm³ ÷ 6,000)."],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-3">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan" />
                  <div>
                    <dt className="font-semibold">{t}</dt>
                    <dd className="text-white/60">{d}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row lg:flex-col lg:items-start">
              <QuoteButton location="estimator" size="lg" className="w-full sm:w-auto" prefill={{ notes: summary, quantity: `${count} cartons` }}>
                <span className="sm:hidden">Quote with these numbers</span>
                <span className="hidden sm:inline">
Get a quote with these numbers</span>
              </QuoteButton>
              <WhatsAppButton location="estimator" size="lg" className="w-full sm:w-auto" message={`${siteConfig.whatsappMessages.quote} ${summary}`}>
                Discuss on WhatsApp
              </WhatsAppButton>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="rounded-[1.5rem] bg-white p-5 text-charcoal shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] sm:p-7">
              <fieldset>
                <legend className="text-[0.92rem] font-semibold text-navy">Carton size</legend>
                <div className="mt-3 grid grid-cols-3 gap-2.5">
                  <NumberField label="Length" unit="cm" value={l} onChange={setL} />
                  <NumberField label="Width" unit="cm" value={w} onChange={setW} />
                  <NumberField label="Height" unit="cm" value={h} onChange={setH} />
                </div>
              </fieldset>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <NumberField label="Weight per carton" unit="kg" value={kg} onChange={setKg} step={0.5} />
                <div>
                  <p className="mb-1.5 text-[0.78rem] font-semibold text-steel" id="cartons-label">
                    Number of cartons
                  </p>
                  <div className="flex items-center gap-2" role="group" aria-labelledby="cartons-label">
                    <button
                      type="button"
                      onClick={() => setCount((c) => Math.max(1, c - 1))}
                      aria-label="Fewer cartons"
                      className="flex size-12 shrink-0 items-center justify-center rounded-[0.9rem] bg-mist text-navy transition-colors hover:bg-ice"
                    >
                      <span className="h-0.5 w-3.5 rounded bg-current" />
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      aria-labelledby="cartons-label"
                      value={count}
                      onChange={(e) => setCount(Math.max(1, Math.round(Number(e.target.value) || 1)))}
                      className="field text-center tabular-nums"
                    />
                    <button
                      type="button"
                      onClick={() => setCount((c) => c + 1)}
                      aria-label="More cartons"
                      className="flex size-12 shrink-0 items-center justify-center rounded-[0.9rem] bg-mist text-navy transition-colors hover:bg-ice"
                    >
                      <Icon name="plus" className="size-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor={originId} className="mb-1.5 block text-[0.78rem] font-semibold text-steel">
                    Shipping from (China)
                  </label>
                  <select id={originId} value={origin} onChange={(e) => setOrigin(e.target.value)} className="field">
                    {ORIGINS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={destId} className="mb-1.5 block text-[0.78rem] font-semibold text-steel">
                    Delivering to (Kenya)
                  </label>
                  <input id={destId} list="estimator-towns" value={dest} onChange={(e) => setDest(e.target.value)} className="field" />
                  <datalist id="estimator-towns">
                    {siteConfig.destinations.map((d) => (
                      <option key={d} value={d} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="mt-6 rounded-[1.25rem] bg-mist p-5" aria-live="polite">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Volume", value: r.cbm, unit: "m³", decimals: 2 },
                    { label: "Gross weight", value: r.gross, unit: "kg", decimals: 0 },
                    { label: "Air chargeable", value: r.chargeable, unit: "kg", decimals: 0 },
                  ].map((m) => (
                    <div key={m.label}>
                      <p className="text-[0.75rem] font-semibold text-steel">{m.label}</p>
                      <p className="mt-1 font-display text-[clamp(1.3rem,2.6vw,1.9rem)] leading-none font-semibold text-cobalt tabular-nums">
                        <AnimatedNumber value={m.value} decimals={m.decimals} />
                        <span className="ml-1 text-[0.55em] text-navy">{m.unit}</span>
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-2" aria-hidden="true">
                  {[
                    { label: "Actual", v: r.gross, c: "bg-navy" },
                    { label: "Volumetric", v: r.volumetric, c: "bg-cyan" },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-3 text-[0.72rem] font-semibold text-steel">
                      <span className="w-[4.5rem] shrink-0">{b.label}</span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-white">
                        <motion.span
                          className={`block h-full rounded-full ${b.c}`}
                          animate={{ width: `${(b.v / max) * 100}%` }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </span>
                      <span className="w-14 shrink-0 text-right tabular-nums">{Math.round(b.v)} kg</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex gap-3 border-t border-line pt-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-cobalt">
                    <Icon name={r.advice.icon} className="size-5" />
                  </span>
                  <div>
                    <p className="text-[0.92rem] font-semibold text-navy">{r.advice.title}</p>
                    <p className="mt-0.5 text-[0.82rem] leading-relaxed text-steel">{r.advice.body}</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[0.72rem] leading-relaxed text-steel">
                Planning estimate only. It doesn&rsquo;t include prices — your quote confirms the actual cost, method and timeline.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { QuoteButton, WhatsAppButton } from "@/components/Button";
import { Reveal } from "@/components/motion";

/** Mid-page CTA band with a moving chevron texture (direction of travel: China → Kenya). */
export function ContactBand() {
  return (
    <section aria-labelledby="band-title" className="pb-20 md:pb-28">
      <div className="shell">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-cobalt px-6 py-16 text-center text-white sm:px-10 md:py-20">
          <div className="chevrons absolute inset-0 -z-10 animate-chevrons motion-reduce:animate-none" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(16,37,82,0.55)_100%)]" aria-hidden="true" />
          <Reveal>
            <h2 id="band-title" className="mx-auto max-w-3xl text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.06] font-semibold text-balance">
              One contact from first message to delivery
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-relaxed text-white/80">
              No chasing suppliers, forwarders and couriers separately. Ask us anything about your order on WhatsApp.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <QuoteButton location="contact-band" variant="navy" size="lg" className="w-full sm:w-auto" />
              <WhatsAppButton location="contact-band" size="lg" className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { WhatsAppButton } from "@/components/Button";
import { Reveal } from "@/components/motion";

/** Mid-page CTA band with a moving chevron texture (direction of travel: China → Kenya). */
export function ContactBand() {
  return (
    <section aria-labelledby="band-title" className="pb-16 md:pb-24">
      <div className="shell">
        <div className="relative isolate overflow-hidden rounded-[1.25rem] bg-cobalt px-6 pt-14 pb-24 text-center text-white sm:px-10 md:pt-20 md:pb-28">
          <div className="chevrons absolute inset-x-0 bottom-0 -z-10 h-28 animate-chevrons [mask-image:linear-gradient(to_top,black,transparent)] motion-reduce:animate-none" aria-hidden="true" />
          <Reveal>
            <h2 id="band-title" className="mx-auto max-w-3xl text-[clamp(1.6rem,2.45vw,2.2rem)] leading-[1.2] font-semibold text-balance">
              One contact from first message to delivery
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[0.95rem] leading-snug text-white/90">
              No chasing suppliers, forwarders and couriers separately. Ask us anything about your order on WhatsApp.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton location="contact-band" variant="navy" size="lg" className="w-full sm:w-[27rem]">
                Message us on WhatsApp
              </WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

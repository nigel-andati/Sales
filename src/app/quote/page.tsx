import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { WhatsAppButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Tell us what you'd like to source from China. We compare suppliers and send you a free, no-obligation quote with delivery to Kenya.",
  alternates: { canonical: "/quote" },
};

/** Standalone quote page — for ad links and visitors without JavaScript. */
export default function QuotePage() {
  return (
    <section className="shell pt-28 pb-20 md:pt-36">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[0.75rem] font-bold tracking-[0.16em] text-cobalt uppercase">Free quote</p>
          <h1 className="h-section mt-3">Tell us what you need</h1>
          <p className="mt-4 max-w-sm text-[0.98rem] leading-relaxed text-steel">
            Takes about two minutes. We&rsquo;ll confirm the details with you on WhatsApp, then send a written quote.
            Nothing is purchased until you approve it.
          </p>
          <div className="mt-6">
            <WhatsAppButton location="quote-page" />
          </div>
        </div>
        <div className="card p-5 sm:p-8 lg:col-span-8">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}

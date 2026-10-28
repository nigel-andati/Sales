import Image from "next/image";
import type { ReactNode } from "react";
import type { IconName } from "@/components/Icon";
import { SectionHead, Stagger, StaggerItem } from "@/components/motion";
import { images, type SiteImage } from "@/content/home";

type Tone = "white" | "cobalt" | "navy" | "ice";

const tones: Record<Tone, string> = {
  white: "bg-white text-navy",
  cobalt: "bg-gradient-to-br from-cobalt to-[#1b45c6] text-white",
  navy: "bg-navy text-white",
  ice: "bg-ice text-navy",
};

function TextTile({ tone, title, body, className = "" }: { tone: Tone; icon: IconName; title: ReactNode; body: string; className?: string }) {
  const dark = tone === "cobalt" || tone === "navy";
  return (
    <StaggerItem className={className}>
      <article
        className={`group flex h-full min-h-[12rem] flex-col rounded-[1.25rem] p-5 lg:min-h-[15.75rem] transition-transform duration-500 ease-out-expo hover:-translate-y-1 ${tones[tone]}`}
      >
        <h3 className="order-first text-[1.2rem] leading-[1.2] font-semibold">{title}</h3>
        <p className={`mt-auto pt-6 text-[0.92rem] leading-snug ${dark ? "text-white/85" : "text-[#0e1526]/85"}`}>{body}</p>
      </article>
    </StaggerItem>
  );
}

function ImageTile({ image, title, body, className = "", sizes }: { image: SiteImage; title: string; body: string; className?: string; sizes: string }) {
  return (
    <StaggerItem className={className}>
      <article className="group relative isolate flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-[1.25rem] bg-navy p-5 text-white lg:min-h-[15.75rem]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          quality={70}
          sizes={sizes}
          className="-z-10 object-cover transition-transform duration-[1.6s] ease-out-expo group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/55 via-navy/10 to-navy/70" aria-hidden="true" />
        <h3 className="max-w-md text-[1.3rem] leading-[1.2] font-semibold">{title}</h3>
        <p className="mt-6 max-w-md text-[0.92rem] leading-snug text-white/90">{body}</p>
      </article>
    </StaggerItem>
  );
}

/** Bento grid of reasons — mixed text, colour and photo tiles. */
export function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="pb-16 md:pb-24">
      <div className="shell">
        <SectionHead id="why-title" title="Why work with us"  />
        <Stagger className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-x-6 lg:gap-y-6">
          <TextTile tone="white" icon="user" title="One point of contact" body="One person handles your order from first message to delivery." />
          <TextTile tone="cobalt" icon="check" title="Nothing bought without your OK" body="You approve a written quote before any purchase." />
          <ImageTile
            className="col-span-2 lg:row-span-2"
            image={images.yiwuGoods}
            sizes="(min-width: 1024px) 32vw, 100vw"
            title="Direct access to China's wholesale markets"
            body="Yiwu, Guangzhou, Shenzhen, Foshan — we search beyond the first listing you find online."
          />
          <ImageTile
            className="col-span-2"
            image={images.qcInspection}
            sizes="(min-width: 1024px) 32vw, 100vw"
            title="Checks before it ships"
            body="Photos, videos or inspections arranged before goods leave China."
          />
          <TextTile
            className="col-span-2"
            tone="white"
            icon="camera"
            title="Start with a photo, link or idea"
            body="A screenshot, a link from Alibaba, 1688, TikTok or Instagram — or just a description."
          />
          <TextTile className="col-span-2" tone="navy" icon="plane" title="Sea or air — your call" body="We explain the trade-off in cost and time for your order, so you choose." />
          <TextTile
            className="col-span-2 lg:col-span-3"
            tone="cobalt"
            icon="layers"
            title="Many suppliers, one shipment"
            body="We consolidate goods from different suppliers so you ship — and receive — once."
          />
          <ImageTile
            className="col-span-2 lg:col-span-3"
            image={images.sgrViaduct}
            sizes="(min-width: 1024px) 50vw, 100vw"
            title="Built around Kenya"
            body="We arrange delivery to Nairobi, Mombasa and towns across Kenya, and keep you updated on the way."
          />
        </Stagger>
      </div>
    </section>
  );
}

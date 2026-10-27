import Image from "next/image";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { SectionHead, Stagger, StaggerItem } from "@/components/motion";
import { images, type SiteImage } from "@/content/home";

type Tone = "white" | "cobalt" | "navy" | "ice";

const tones: Record<Tone, string> = {
  white: "bg-white text-navy",
  cobalt: "bg-gradient-to-br from-cobalt to-[#1b45c6] text-white",
  navy: "bg-navy text-white",
  ice: "bg-ice text-navy",
};

function TextTile({ tone, icon, title, body, className = "" }: { tone: Tone; icon: IconName; title: ReactNode; body: string; className?: string }) {
  const dark = tone === "cobalt" || tone === "navy";
  return (
    <StaggerItem className={className}>
      <article
        className={`group flex h-full min-h-[12.5rem] flex-col rounded-[1.375rem] p-6 transition-transform duration-500 ease-out-expo hover:-translate-y-1 ${tones[tone]}`}
      >
        <span
          className={`flex size-10 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-[-8deg] ${dark ? "bg-white/12 text-cyan" : "bg-white text-cobalt"} ${tone === "white" ? "!bg-ice" : ""}`}
        >
          <Icon name={icon} className="size-5" />
        </span>
        <h3 className="mt-auto pt-8 text-[1.2rem] leading-snug font-semibold">{title}</h3>
        <p className={`mt-2 text-[0.9rem] leading-relaxed ${dark ? "text-white/70" : "text-steel"}`}>{body}</p>
      </article>
    </StaggerItem>
  );
}

function ImageTile({ image, title, body, className = "", sizes }: { image: SiteImage; title: string; body: string; className?: string; sizes: string }) {
  return (
    <StaggerItem className={className}>
      <article className="group relative isolate flex h-full min-h-[15rem] flex-col justify-end overflow-hidden rounded-[1.375rem] bg-navy p-6 text-white">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          quality={70}
          sizes={sizes}
          className="-z-10 object-cover transition-transform duration-[1.6s] ease-out-expo group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/45 to-navy/5" aria-hidden="true" />
        <h3 className="max-w-md text-[1.25rem] leading-snug font-semibold">{title}</h3>
        <p className="mt-2 max-w-md text-[0.9rem] leading-relaxed text-white/75">{body}</p>
      </article>
    </StaggerItem>
  );
}

/** Bento grid of reasons — mixed text, colour and photo tiles. */
export function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="pb-20 md:pb-28">
      <div className="shell">
        <SectionHead id="why-title" title="Why work with us" intro="What you get when one team handles the whole journey from China to Kenya." />
        <Stagger className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto] lg:gap-4">
          <TextTile className="lg:col-span-2" tone="white" icon="user" title="One point of contact" body="One person handles your order from first message to delivery." />
          <TextTile className="lg:col-span-2" tone="cobalt" icon="check" title="Nothing bought without your OK" body="You approve a written quote before any purchase is made." />
          <ImageTile
            className="sm:row-span-2 lg:col-span-4 lg:row-span-2"
            image={images.yiwuGoods}
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
            title="Direct access to China's wholesale markets"
            body="Yiwu, Guangzhou, Shenzhen, Foshan — we search beyond the first listing you find online."
          />
          <ImageTile
            className="lg:col-span-4"
            image={images.qcInspection}
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
            title="Checks before it ships"
            body="Photos, videos or inspections arranged before goods leave China."
          />
          <TextTile
            className="lg:col-span-4"
            tone="ice"
            icon="camera"
            title="Start with a photo, link or idea"
            body="A screenshot, a link from Alibaba, 1688, TikTok or Instagram — or just a description."
          />
          <TextTile className="lg:col-span-4" tone="navy" icon="plane" title="Sea or air — your call" body="We explain the trade-off in cost and time for your order, so you choose." />
          <TextTile
            className="lg:col-span-5"
            tone="cobalt"
            icon="layers"
            title="Many suppliers, one shipment"
            body="We consolidate goods from different suppliers so you ship — and receive — once."
          />
          <ImageTile
            className="sm:col-span-2 lg:col-span-7"
            image={images.sgrViaduct}
            sizes="(min-width: 1024px) 58vw, 100vw"
            title="Built around Kenya"
            body="We arrange delivery to Nairobi, Mombasa and towns across Kenya, and keep you updated on the way."
          />
        </Stagger>
      </div>
    </section>
  );
}

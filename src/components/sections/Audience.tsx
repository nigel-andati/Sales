import { SectionHead } from "@/components/motion";
import { audiences } from "@/content/home";

function Row({ items, reverse }: { items: readonly string[]; reverse?: boolean }) {
  const pills = (hidden: boolean) =>
    items.map((t) => (
      <li
        key={`${t}-${hidden}`}
        aria-hidden={hidden || undefined}
        className="flex shrink-0 items-center gap-2.5 rounded-full bg-transparent py-2.5 pr-5 pl-2.5 text-[0.95rem] text-[#0e1526] ring-1 ring-[#b9c3cc] transition-colors hover:bg-white"
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-cobalt"><span className="size-1.5 rotate-45 rounded-[1px] bg-white" /></span>
        {t}
      </li>
    ));
  return (
    <ul className={`flex w-max gap-3 hover:[animation-play-state:paused] ${reverse ? "animate-marquee-reverse" : "animate-marquee"} motion-reduce:animate-none`}>
      {pills(false)}
      {pills(true)}
    </ul>
  );
}

export function Audience() {
  return (
    <section aria-labelledby="audience-title" className="pb-16 md:pb-24">
      <div className="shell">
        <SectionHead
          id="audience-title"
          title="Who we help"
          intro="One item or a full container — the process is the same"
        />
      </div>
      <div className="mt-6 space-y-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <Row items={audiences[0]} />
        <Row items={audiences[1]} reverse />
      </div>
    </section>
  );
}

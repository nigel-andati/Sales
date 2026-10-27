import { SectionHead } from "@/components/motion";
import { audiences } from "@/content/home";

function Row({ items, reverse }: { items: readonly string[]; reverse?: boolean }) {
  const pills = (hidden: boolean) =>
    items.map((t) => (
      <li
        key={`${t}-${hidden}`}
        aria-hidden={hidden || undefined}
        className="flex shrink-0 items-center gap-2.5 rounded-full bg-white py-2 pr-5 pl-2 text-[0.92rem] font-medium text-navy shadow-[0_1px_0_rgba(10,23,51,0.05)] ring-1 ring-line transition-colors hover:bg-navy hover:text-white"
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-ice"><span className="size-2 rotate-45 rounded-[2px] bg-cobalt" /></span>
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
    <section aria-labelledby="audience-title" className="pb-20 md:pb-28">
      <div className="shell">
        <SectionHead
          id="audience-title"
          title="Who we help"
          intro="Individuals and businesses of every size — the process is the same whether you need one item or a container."
        />
      </div>
      <div className="mt-10 space-y-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <Row items={audiences[0]} />
        <Row items={audiences[1]} reverse />
      </div>
    </section>
  );
}

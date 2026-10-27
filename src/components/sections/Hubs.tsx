import { SectionHead, Stagger, StaggerItem } from "@/components/motion";
import { hubs } from "@/content/home";

/** Typographic wall of China's manufacturing clusters — where products are made. */
export function Hubs() {
  return (
    <section aria-labelledby="hubs-title" className="pb-20 md:pb-28">
      <div className="shell">
        <SectionHead
          id="hubs-title"
          title="We look where it's made"
          intro="Different products come from different regions of China. These are the manufacturing hubs we search, depending on what you need."
        />
        <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:gap-4">
          {hubs.map((h) => (
            <StaggerItem key={h.city}>
              <div className="group relative flex h-32 flex-col justify-between overflow-hidden rounded-[1.125rem] bg-white p-4 ring-1 ring-line transition-colors duration-500 hover:bg-navy sm:h-36 sm:p-5">
                <span
                  className="font-display text-[1.9rem] leading-none font-semibold text-navy transition-[color,transform] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:text-cyan sm:text-[2.2rem]"
                  lang="zh-Hans"
                >
                  {h.zh}
                </span>
                <span>
                  <span className="block text-[0.95rem] font-semibold text-navy transition-colors duration-500 group-hover:text-white">{h.city}</span>
                  <span className="block text-[0.8rem] leading-snug text-steel transition-colors duration-500 group-hover:text-white/70">{h.known}</span>
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

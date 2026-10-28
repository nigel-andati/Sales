import { SectionHead, Stagger, StaggerItem } from "@/components/motion";
import { hubs } from "@/content/home";

/** Typographic wall of China's manufacturing clusters — where products are made. */
export function Hubs() {
  return (
    <section aria-labelledby="hubs-title" className="pb-16 md:pb-24">
      <div className="shell">
        <SectionHead
          id="hubs-title"
          title="We look where it's made"
          intro="The manufacturing hubs we search, depending on your product"
        />
        <Stagger className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:gap-6">
          {hubs.map((h) => (
            <StaggerItem key={h.city}>
              <div className="group relative flex h-28 flex-col items-center justify-center gap-2 overflow-hidden rounded-[1.25rem] bg-white px-3 text-center sm:h-24 sm:flex-row sm:gap-3 sm:px-4 sm:text-left transition-colors duration-500 hover:bg-navy lg:h-[6.75rem]">
                <span
                  className="shrink-0 whitespace-nowrap font-display text-[1.7rem] leading-none font-semibold text-[#0e1526] transition-colors duration-500 group-hover:text-cyan lg:text-[2rem]"
                  lang="zh-Hans"
                >
                  {h.zh}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.95rem] font-semibold tracking-[0.04em] text-[#0e1526] uppercase transition-colors duration-500 group-hover:text-white">{h.city}</span>
                  <span className="block truncate text-[0.75rem] text-steel transition-colors duration-500 group-hover:text-white/70">{h.known}</span>
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

import { IsoScene } from "@/components/IsoScene";
import { Icon } from "@/components/Icon";
import { SectionHead, Stagger, StaggerItem } from "@/components/motion";
import { services } from "@/content/home";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-20">
      <IsoScene className="pointer-events-none absolute top-0 -right-24 hidden w-[60rem] text-[#c9d3dc] opacity-80 lg:block" />
      <div className="shell relative">
        <SectionHead
          id="services-title"
          title={<>We source products in China<br className="hidden md:block" /> and deliver them to Kenya</>}
          intro="Sourcing, checks and shipping — coordinated by one team"
        />
        <Stagger className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-6 lg:grid-cols-3 lg:gap-12">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <article className="card group flex h-full flex-col p-6 transition-transform duration-500 ease-out-expo hover:-translate-y-1 lg:min-h-[11.25rem]">
                <span className="flex size-9 items-center justify-center rounded-[0.55rem] bg-cobalt text-white transition-transform duration-500 ease-out-expo group-hover:-rotate-6">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-[#0e1526]">{s.title}</h3>
                <p className="mt-1 text-[0.95rem] leading-snug text-[#0e1526]/80">{s.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

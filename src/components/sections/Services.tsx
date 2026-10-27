import { IsoScene } from "@/components/IsoScene";
import { Icon } from "@/components/Icon";
import { SectionHead, Stagger, StaggerItem } from "@/components/motion";
import { services } from "@/content/home";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative overflow-hidden py-20 md:py-28">
      <IsoScene className="pointer-events-none absolute top-6 -right-40 hidden w-[58rem] text-[#c3cfdd] opacity-70 lg:block" />
      <div className="shell relative">
        <SectionHead
          id="services-title"
          title={<>We source products in China <span className="text-cobalt">and deliver them to Kenya</span></>}
          intro="Sourcing, checking, consolidating and shipping — coordinated by one team, from your first message to delivery."
        />
        <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:max-w-[64rem] lg:grid-cols-3 lg:gap-4">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <article className="card group flex h-full flex-col p-6 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(10,23,51,0.45)] md:p-7">
                <span className="flex size-11 items-center justify-center rounded-[0.85rem] bg-gradient-to-br from-cobalt to-cyan text-white shadow-[0_10px_20px_-10px_rgba(37,86,232,0.9)] transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-105">
                  <Icon name={s.icon} className="size-[1.3rem]" />
                </span>
                <h3 className="mt-6 text-[1.12rem] font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-steel">{s.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Icon, WhatsAppGlyph, type IconName } from "@/components/Icon";
import { QuoteButton, TrackedLink } from "@/components/Button";
import { navItems } from "@/config/nav";
import { siteConfig, whatsappHref, hasWhatsApp } from "@/config/site";

export function Footer() {
  const { contact, social } = siteConfig;
  const waProps = hasWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const socials = (
    [
      { label: "Instagram", href: social.instagram, icon: "instagram" },
      { label: "Facebook", href: social.facebook, icon: "facebook" },
      { label: "TikTok", href: social.tiktok, icon: "tiktok" },
    ] as { label: string; href: string; icon: IconName }[]
  ).filter((s) => s.href);

  return (
    <footer className="px-2 md:px-3">
      <div className="rounded-t-[2rem] bg-white pb-28 sm:pb-10 md:rounded-t-[2.5rem]">
        <div className="shell pt-12 md:pt-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Logo />
              <div className="mt-6 flex gap-2">
                <TrackedLink
                  href={whatsappHref()}
                  event="whatsapp_click"
                  eventLabel="footer-icon"
                  {...waProps}
                  aria-label="WhatsApp"
                  className="flex size-11 items-center justify-center rounded-[0.8rem] bg-navy text-white transition-colors hover:bg-whatsapp"
                >
                  <WhatsAppGlyph className="size-5" />
                </TrackedLink>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-11 items-center justify-center rounded-[0.8rem] bg-navy text-white transition-colors hover:bg-cobalt"
                  >
                    <Icon name={s.icon} className="size-5" />
                  </a>
                ))}
              </div>
              <p className="mt-6 max-w-sm text-[0.88rem] leading-relaxed text-steel">
                {siteConfig.name} helps individuals and businesses in Kenya source products from China — supplier search,
                comparison, negotiation, quality checks, consolidation and shipping.
              </p>
              {contact.location && <p className="mt-3 text-[0.85rem] text-steel">{contact.location}</p>}
              {contact.hours && <p className="mt-1 text-[0.85rem] text-steel">{contact.hours}</p>}
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4">
              <div>
                <h2 className="text-[0.75rem] font-bold tracking-[0.14em] text-steel uppercase">Contact</h2>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <TrackedLink href={whatsappHref()} event="whatsapp_click" eventLabel="footer" {...waProps} className="font-display text-[1.05rem] font-semibold text-navy hover:text-cobalt">
                      {contact.whatsappDisplay || "Chat on WhatsApp"}
                    </TrackedLink>
                  </li>
                  {contact.email && (
                    <li>
                      <a href={`mailto:${contact.email}`} className="text-[0.95rem] break-all text-cobalt hover:underline">
                        {contact.email}
                      </a>
                    </li>
                  )}
                  <li>
                    <a href="/quote" className="text-[0.95rem] text-cobalt hover:underline">Request a quote</a>
                  </li>
                </ul>
              </div>
              <nav aria-label="Footer">
                <h2 className="text-[0.75rem] font-bold tracking-[0.14em] text-steel uppercase">Explore</h2>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.92rem] sm:grid-cols-1">
                  {navItems.map((n) => (
                    <li key={n.href}>
                      <a href={n.href} className="text-navy/80 transition-colors hover:text-cobalt">{n.label}</a>
                    </li>
                  ))}
                  <li><a href="/#contact" className="text-navy/80 transition-colors hover:text-cobalt">Contact</a></li>
                </ul>
              </nav>
            </div>

            <div id="contact" className="lg:col-span-4">
              <div className="rounded-[1.5rem] p-6 ring-[1.5px] ring-cobalt/40 sm:p-7">
                <p className="font-display text-[1.45rem] leading-tight font-semibold text-navy">Still have questions? Talk to us.</p>
                <p className="mt-2 text-[0.9rem] text-steel">Tell us what you&rsquo;re looking for — we&rsquo;ll reply with options.</p>
                <QuoteButton
                  location="footer-card"
                  unstyled
                  className="group relative mt-6 flex h-28 flex-col justify-end overflow-hidden rounded-[1.1rem] bg-gradient-to-br from-cobalt to-[#1b45c6] p-4 text-white"
                >
                  <Icon
                    name="arrowUpRight"
                    className="absolute top-4 right-4 size-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                  <span className="font-semibold">Get a Free Quote</span>
                </QuoteButton>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[0.8rem] text-steel sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {siteConfig.name}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li><Link href="/privacy" className="hover:text-navy">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-navy">Terms</Link></li>
              <li><Link href="/credits" className="hover:text-navy">Photo credits</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

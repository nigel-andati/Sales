import { siteConfig } from "@/config/site";
import { faqs } from "@/content/home";

export function JsonLd() {
  const { contact, social } = siteConfig;
  const sameAs = [social.instagram, social.facebook, social.tiktok].filter(Boolean);
  const business: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    areaServed: { "@type": "Country", name: "Kenya" },
    serviceType: "Product sourcing and import from China",
  };
  if (contact.email) business.email = contact.email;
  if (contact.whatsappNumber) business.telephone = `+${contact.whatsappNumber}`;
  if (sameAs.length) business.sameAs = sameAs;

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([business, faqPage]).replace(/</g, "\\u003c") }}
    />
  );
}

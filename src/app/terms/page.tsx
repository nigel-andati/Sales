import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { ContactMethods } from "@/components/ContactMethods";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using the ${siteConfig.name} website and requesting sourcing quotes.`,
  alternates: { canonical: "/terms" },
};

// NOTE: This is a starting template. Replace or extend it with your actual
// service agreement (fees, payment stages, refunds, liability) before launch.
export default function TermsPage() {
  const name = siteConfig.name;
  return (
    <LegalPage title="Terms of Use" updated="October 2026">
      <p>By using this website you agree to these terms. Please read them carefully.</p>
      <h2>Our service</h2>
      <p>
        {name} helps customers in Kenya find suppliers in China, compare options, coordinate quality checks,
        consolidate goods and arrange shipping. Submitting a quote request is free and does not commit you to any
        purchase.
      </p>
      <h2>Quotes</h2>
      <p>
        Quotes are based on information available at the time from suppliers and logistics providers. Prices, minimum
        order quantities, production times and shipping times can change, and may depend on the product, supplier,
        shipping method and customs clearance. Each quote will state what is included and how long it is valid.
      </p>
      <h2>Orders and payment</h2>
      <p>
        No order is placed until you approve a written quote. The specific payment stages, fees and conditions for your
        order will be set out in that quote or in a separate agreement.
      </p>
      <h2>Restricted goods</h2>
      <p>
        We do not source or ship illegal, counterfeit or prohibited goods. Some items have shipping restrictions or
        require additional documentation; we will tell you if this applies to your request.
      </p>
      <h2>Website content</h2>
      <p>
        Content on this website is for general information. Example requests shown on the site are illustrations of the
        kind of products we can help with, not records of completed orders. Photographs are credited on our{" "}
        <a href="/credits">photo credits</a> page.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms? Contact us <ContactMethods />.
      </p>
    </LegalPage>
  );
}

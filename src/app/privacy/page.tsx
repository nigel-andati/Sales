import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { ContactMethods } from "@/components/ContactMethods";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects the information you share with us.`,
  alternates: { canonical: "/privacy" },
};

// NOTE: This is a starting template. Have it reviewed against the Kenya Data
// Protection Act, 2019 and your actual practices before relying on it.
export default function PrivacyPage() {
  const name = siteConfig.name;
  return (
    <LegalPage title="Privacy Policy" updated="October 2026">
      <p>
        This policy explains what information {name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects when you use this
        website or contact us, and how we use it.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Details you submit in our quote form: your name, WhatsApp number, email address, product details, links, images, quantity, budget, delivery town and notes.</li>
        <li>Messages and files you send us on WhatsApp, email or social media.</li>
        <li>Basic usage data, such as pages visited and device type, collected through analytics and advertising tools if they are enabled on this site.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry and prepare a sourcing quote.</li>
        <li>To communicate with suppliers, logistics partners and inspection providers on your behalf — sharing only what is needed for your order.</li>
        <li>To improve our website and measure the performance of our advertising.</li>
      </ul>
      <p>We do not sell your personal information.</p>
      <h2>Cookies and analytics</h2>
      <p>
        This site may use Google Analytics and the Meta Pixel to understand how visitors use the site and to measure
        advertising. These tools may set cookies in your browser. You can block or delete cookies in your browser
        settings.
      </p>
      <h2>Storage and retention</h2>
      <p>
        Quote requests are stored with our website hosting provider and in our business messaging tools. We keep
        information only as long as needed to handle your request, complete your order and meet legal obligations.
      </p>
      <h2>Your rights</h2>
      <p>
        Under the Kenya Data Protection Act, 2019 you may ask to access, correct or delete the personal information we
        hold about you, or object to its use. To make a request, contact us <ContactMethods />.
      </p>
      <h2>Changes</h2>
      <p>We may update this policy from time to time. The latest version will always be on this page.</p>
    </LegalPage>
  );
}

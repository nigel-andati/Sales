import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Audience } from "@/components/sections/Audience";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Categories } from "@/components/sections/Categories";
import { WhatsAppBanner } from "@/components/sections/WhatsAppBanner";
import { Hubs } from "@/components/sections/Hubs";
import { ContactBand } from "@/components/sections/ContactBand";
import { Estimator } from "@/components/sections/Estimator";
import { Examples } from "@/components/sections/Examples";
import { FAQ } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Services />
      <Audience />
      <WhyUs />
      <Process />
      <Categories />
      <WhatsAppBanner />
      <Hubs />
      <ContactBand />
      <Estimator />
      <Examples />
      <FAQ />
    </>
  );
}

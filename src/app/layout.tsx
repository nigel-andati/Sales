import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Sans_SC, Sora } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Analytics } from "@/components/Analytics";
import { QuoteProvider } from "@/components/quote/QuoteProvider";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-sora", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
// Only used for the Chinese city names; the browser downloads just the glyphs it needs.
const notoSC = Noto_Sans_SC({ weight: ["600"], variable: "--font-cjk", display: "swap", preload: false });

const title = `${siteConfig.name} — Source Products From China, Delivered to Kenya`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "import from China to Kenya",
    "China sourcing agent Kenya",
    "source products from China",
    "shipping from China to Kenya",
    "Guangzhou sourcing",
    "Yiwu sourcing agent",
    "Alibaba 1688 buying agent Kenya",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "/",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title, description: siteConfig.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a1733",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE" className={`${sora.variable} ${manrope.variable} ${notoSC.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[90] rounded-full bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <QuoteProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </QuoteProvider>
        <Analytics />
      </body>
    </html>
  );
}

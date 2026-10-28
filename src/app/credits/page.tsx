import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { images } from "@/content/home";

export const metadata: Metadata = {
  title: "Photo Credits",
  description: "Credits and licences for photographs used on this website.",
  alternates: { canonical: "/credits" },
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <LegalPage title="Photo Credits">
      <p>Photographs on this site are sourced from Wikimedia Commons and used under the licences below.</p>
      <ul>
        {Object.values(images).map((c) => (
          <li key={c.src}>
            <strong>{c.caption}</strong> — {c.author}, {c.license}.{" "}
            <a href={c.source} target="_blank" rel="noopener noreferrer">View source</a>
          </li>
        ))}
      </ul>
      <p>Images have been resized and cropped for display.</p>
    </LegalPage>
  );
}

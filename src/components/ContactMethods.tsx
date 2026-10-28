import type { ReactNode } from "react";
import { siteConfig, whatsappHref, hasWhatsApp } from "@/config/site";

/** "Contact us …" phrase built only from the contact details that are configured. */
export function ContactMethods() {
  const { email } = siteConfig.contact;
  const parts: ReactNode[] = [];
  if (email) parts.push(<>by email at <a href={`mailto:${email}`}>{email}</a></>);
  if (hasWhatsApp) parts.push(<>on <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">WhatsApp</a></>);
  if (!parts.length) parts.push(<>using the <a href="/#quote">request form</a> on our homepage</>);
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>{i > 0 && " or "}{p}</span>
      ))}
    </>
  );
}

import Script from "next/script";
import { siteConfig } from "@/config/site";

/**
 * Google Analytics 4 and Meta Pixel. Each loads only when its ID is set via
 * NEXT_PUBLIC_GA_MEASUREMENT_ID / NEXT_PUBLIC_META_PIXEL_ID.
 * Conversion events are sent from `src/lib/analytics.ts`.
 */
export function Analytics() {
  const { gaMeasurementId, metaPixelId } = siteConfig.analytics;
  const safe = (id: string) => id.replace(/[^A-Za-z0-9-]/g, "");

  return (
    <>
      {gaMeasurementId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${safe(gaMeasurementId)}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${safe(gaMeasurementId)}');`}
          </Script>
        </>
      )}
      {metaPixelId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${safe(metaPixelId)}');fbq('track','PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${safe(metaPixelId)}&ev=PageView&noscript=1`} />
          </noscript>
        </>
      )}
    </>
  );
}

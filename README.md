# China → Kenya Sourcing — Lead-generation website

Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Netlify.

## Business details

Edit **`src/config/site.ts`**, or set the environment variables in `.env.example` in the Netlify dashboard. These include company name, WhatsApp number, email, location, hours, social links, and the Google Analytics / Meta Pixel IDs. If a detail is left empty, the related link is hidden. If no WhatsApp number is set, WhatsApp buttons go to the quote form instead.

The brand name "Portiva Logistics" and the logo are temporary placeholders.

## Content

All page copy (services, process steps, categories, sourcing hubs, examples, FAQs, photo credits) lives in `src/content/home.ts`. Navigation links are in `src/config/nav.ts`.

## Quote requests

Every "Get a Free Quote" button opens a modal form (a standalone version lives at `/quote`). Category cards, example cards and the shipment estimator pre-fill it.

The quote form submits to **Netlify Forms**. Submissions appear in the Netlify dashboard under *Forms → quote-request*, where you can also add email or Slack notifications. To use a different backend later, replace `submitQuoteRequest` in `src/lib/quote.ts`. If you rename fields, keep `public/__forms.html` in sync.

## Analytics

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and/or `NEXT_PUBLIC_META_PIXEL_ID`. The site tracks these events:

- WhatsApp clicks: `whatsapp_click` / Meta `Contact`
- Quote button clicks: `quote_cta_click`
- Form submissions: `generate_lead` / Meta `Lead`

## Development

```bash
npm install
netlify dev   # Netlify Forms and Image CDN emulation
```

Photos are from Wikimedia Commons. Their credits are listed at `/credits`.

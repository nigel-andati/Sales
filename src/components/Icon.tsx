import type { SVGProps } from "react";

/** Original 24px line icons used across the site. */
const paths = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  menu: <path d="M4 8h16M4 16h16" />,
  upload: <path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.2v.3" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5M8 10.5h5M10.5 8v5" />
    </>
  ),
  compare: <path d="M12 4v16M5 8h5l-2.5 6L5 8zM14 8h5l-2.5 6L14 8zM4 14.5a3 2 0 0 0 7 0M13 14.5a3 2 0 0 0 7 0M8 20h8" />,
  handshake: <path d="m3 11 4-4 3 1 3-2 4 1 4 4M3 11l5 5 1.5-1.5M21 11l-6 6-2-2M8 16l2 2 1.5-1.5M10.5 13.5l2.5 2.5M13 8l-3 3 1.5 1.5 3-2" />,
  shieldCheck: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 3 7.7 7 9.5 4-1.8 7-5.2 7-9.5V6z" />
      <path d="m8.8 12 2.3 2.3L15.5 10" />
    </>
  ),
  layers: <path d="m12 3 9 5-9 5-9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5" />,
  ship: (
    <>
      <path d="M3 14h18l-2.6 5.5H5.6z" />
      <path d="M6 14V9h4.5v5M10.5 11H15v3M15 11.5h3.5V14M8 9V6" />
    </>
  ),
  plane: <path d="M10.5 13.5 3 11l1.5-1.5 7 .5 4.5-5c.8-.8 2.2-.8 3 0s.8 2.2 0 3l-5 4.5.5 7L13 21l-2.5-7.5-3.5 3V19l-1.5 1-1-3-3-1 1-1.5H5l3-3" />,
  truck: (
    <>
      <path d="M3 6h11v10H3zM14 9.5h4l3 3.5v3h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4zM8 9.5h8M8 12.5h5" />,
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  clipboard: (
    <>
      <path d="M8 4h8v3H8zM6 5.5H5v15h14v-15h-1" />
      <path d="M8.5 12h7M8.5 15.5h4.5" />
    </>
  ),
  cube: (
    <>
      <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </>
  ),
  scale: (
    <>
      <path d="M5 20h14l-1.5-11h-11z" />
      <circle cx="12" cy="6" r="2.5" />
    </>
  ),
  shirt: <path d="M8 4 4 7l2 4 2-1v10h8V10l2 1 2-4-4-3c-.5 1.5-2 2.5-4 2.5S8.5 5.5 8 4z" />,
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </>
  ),
  chair: <path d="M7 3h10v9H7zM5 12h14M7 12v9M17 12v9M7 17h10" />,
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
    </>
  ),
  box: (
    <>
      <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" />
      <path d="M3 7.5 12 12l9-4.5M12 12v9M7.5 5.3l9 4.5" />
    </>
  ),
  sparkle: <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7zM18.5 16.5c.2 1.4.9 2.1 2.5 2.5-1.6.4-2.3 1.1-2.5 2.5-.2-1.4-.9-2.1-2.5-2.5 1.6-.4 2.3-1.1 2.5-2.5z" />,
  pot: <path d="M4 10h16v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6zM2 10h2M20 10h2M9 6c0-1 1-1.5 1-2.5M13 6c0-1 1-1.5 1-2.5" />,
  crates: <path d="M3 12h8v8H3zM13 12h8v8h-8zM8 4h8v8H8zM7 12v3M17 12v3M12 4v3" />,
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.6 7.4v.1" />
    </>
  ),
  facebook: <path d="M14 8h2.5V4.5H14c-2.2 0-4 1.8-4 4V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V8.8c0-.4.3-.8.5-.8z" />,
  tiktok: <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.3 2.6 2.1 4.4 5 4.6" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className ?? "size-5"}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className ?? "size-5"} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  );
}

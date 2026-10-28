import type { ReactNode } from "react";
import Link from "next/link";

export function LegalPage({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <article className="shell pt-28 pb-20 md:pt-36">
      <div className="card mx-auto max-w-3xl p-6 sm:p-10 md:p-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-cobalt hover:underline">
          ← Back to home
        </Link>
        <h1 className="h-section mt-6">{title}</h1>
        {updated && <p className="mt-3 text-[0.85rem] text-steel">Last updated · {updated}</p>}
        <div className="mt-10 space-y-5 text-[0.97rem] leading-relaxed text-charcoal/80 [&_a]:text-cobalt [&_a]:underline [&_a]:underline-offset-4 [&_h2]:pt-5 [&_h2]:text-[1.2rem] [&_h2]:font-semibold [&_h2]:text-navy [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </div>
      </div>
    </article>
  );
}

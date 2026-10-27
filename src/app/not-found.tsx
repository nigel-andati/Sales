import Link from "next/link";
import { buttonClass } from "@/lib/button-styles";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80vh] flex-col items-start justify-center pt-28 pb-20">
      <p className="text-[0.8rem] font-bold tracking-[0.16em] text-cobalt uppercase">404 · Lost in transit</p>
      <h1 className="h-section mt-4">This page didn&rsquo;t ship.</h1>
      <p className="mt-3 max-w-md text-[0.98rem] text-steel">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
      <Link href="/" className={buttonClass("primary", "md", "mt-8")}>Back to home</Link>
    </section>
  );
}

"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts content into place the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" } & Omit<
  HTMLMotionProps<"div">,
  "children"
>) {
  const reduce = useReducedMotion();
  const Comp = as === "li" ? motion.li : as === "section" ? motion.section : motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...(rest as object)}
    >
      {children}
    </Comp>
  );
}

const group: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: EASE } },
};

/** A grid/list whose children (`StaggerItem`) cascade in one after another. */
export function Stagger({ children, className, as = "ul" }: { children: ReactNode; className?: string; as?: "ul" | "div" | "ol" }) {
  const reduce = useReducedMotion();
  const Comp = as === "div" ? motion.div : as === "ol" ? motion.ol : motion.ul;
  return (
    <Comp
      className={className}
      variants={group}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className, as = "li" }: { children: ReactNode; className?: string; as?: "li" | "div" }) {
  const Comp = as === "div" ? motion.div : motion.li;
  return (
    <Comp className={className} variants={item}>
      {children}
    </Comp>
  );
}

/** Section heading: large title, short supporting line, optional action on the right. */
export function SectionHead({
  title,
  intro,
  id,
  action,
  className = "",
  tone = "dark",
}: {
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  action?: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Reveal className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        <h2 id={id} className={`h-section text-balance ${tone === "light" ? "!text-white" : ""}`}>
          {title}
        </h2>
        {intro && (
          <p className={`mt-3 max-w-xl text-[0.98rem] leading-relaxed ${tone === "light" ? "text-white/70" : "text-steel"}`}>{intro}</p>
        )}
      </div>
      {action}
    </Reveal>
  );
}

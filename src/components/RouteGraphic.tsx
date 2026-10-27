"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Original route graphic: a dot-matrix field with an arc from China to Kenya
 * that draws itself, and a parcel marker that travels along it.
 */
export function RouteGraphic({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const arc = "M26 92 C 70 20, 150 6, 196 40";
  const dots: [number, number][] = [];
  for (let x = 8; x <= 216; x += 10) for (let y = 8; y <= 112; y += 10) dots.push([x, y]);

  return (
    <svg viewBox="0 0 224 120" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="rg-fade" cx="50%" cy="55%" r="60%">
          <stop offset="0" stopColor="#2556e8" stopOpacity="0.32" />
          <stop offset="1" stopColor="#2556e8" stopOpacity="0.06" />
        </radialGradient>
        <linearGradient id="rg-arc" x1="0" x2="1">
          <stop offset="0" stopColor="#27c4e8" />
          <stop offset="1" stopColor="#2556e8" />
        </linearGradient>
      </defs>
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" fill="url(#rg-fade)" />
      ))}
      <path d={arc} fill="none" stroke="#2556e8" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="3 5" />
      <motion.path
        d={arc}
        fill="none"
        stroke="url(#rg-arc)"
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.9, ease: [0.65, 0, 0.35, 1] }}
      />
      {!reduce && (
        <circle r="4" fill="#ffffff" stroke="#2556e8" strokeWidth="2">
          <animateMotion dur="5.5s" begin="2.7s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.55 1" path={arc} />
        </circle>
      )}
      <g>
        <circle cx="196" cy="40" r="9" fill="#2556e8" fillOpacity="0.14" />
        <circle cx="196" cy="40" r="4" fill="#2556e8" />
        <text x="196" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0a1733">CN</text>
      </g>
      <g>
        <circle cx="26" cy="92" r="9" fill="#27c4e8" fillOpacity="0.2" />
        <circle cx="26" cy="92" r="4" fill="#27c4e8" />
        <text x="26" y="114" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0a1733">KE</text>
      </g>
    </svg>
  );
}

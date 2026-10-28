"use client";

import { useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Horizontal snap-scroll carousel behaviour: arrow stepping, edge detection,
 * mouse drag-to-scroll (touch scrolls natively) and a springy progress value.
 */
export function useCarousel<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const { scrollXProgress } = useScroll({ container: ref });
  const progress = useSpring(scrollXProgress, { stiffness: 160, damping: 30 });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    const item = el?.firstElementChild as HTMLElement | null;
    if (!el || !item) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
    el.scrollBy({ left: dir * (item.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  const drag = useRef<{ x: number; left: number } | null>(null);
  const dragHandlers = {
    onPointerDown: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse" || !ref.current) return;
      drag.current = { x: e.clientX, left: ref.current.scrollLeft };
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (!drag.current || !ref.current) return;
      ref.current.style.scrollSnapType = "none";
      ref.current.style.scrollBehavior = "auto";
      ref.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
    },
    onPointerUp: () => end(),
    onPointerLeave: () => end(),
  };
  function end() {
    if (ref.current) {
      ref.current.style.scrollSnapType = "";
      ref.current.style.scrollBehavior = "";
    }
    drag.current = null;
  }

  return { ref, edges, step, progress, dragHandlers };
}

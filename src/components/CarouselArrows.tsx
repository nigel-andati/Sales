"use client";

import { Icon } from "@/components/Icon";

export function CarouselArrows({
  onStep,
  edges,
  controls,
  label,
}: {
  onStep: (dir: 1 | -1) => void;
  edges: { start: boolean; end: boolean };
  controls: string;
  label: string;
}) {
  return (
    <div className="flex gap-2">
      {([-1, 1] as const).map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => onStep(d)}
          disabled={d === -1 ? edges.start : edges.end}
          aria-label={`${d === -1 ? "Previous" : "Next"} ${label}`}
          aria-controls={controls}
          className="flex size-12 items-center justify-center rounded-full bg-white text-navy ring-1 ring-line transition-all duration-300 hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-35"
        >
          <Icon name={d === -1 ? "arrowLeft" : "arrowRight"} className="size-5" />
        </button>
      ))}
    </div>
  );
}

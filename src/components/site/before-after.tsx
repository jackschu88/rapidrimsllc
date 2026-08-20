"use client";

import { useCallback, useId, useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

type PairProps = {
  before: string;
  after: string;
  alt?: string;
  className?: string;
};

export function BeforeAfterSlider({
  before,
  after,
  alt = "curb rash repair Las Vegas",
  className,
}: PairProps) {
  const [pct, setPct] = useState(52);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const labelId = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(96, Math.max(4, next)));
  }, []);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  }
  function onPointerUp() {
    dragging.current = false;
  }

  return (
    <div
      ref={frame}
      className={cn(
        "relative isolate aspect-[4/3] overflow-hidden rounded-lg bg-surface-2 select-none touch-none",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="group"
      aria-labelledby={labelId}
    >
      <img
        src={after}
        alt={`${alt}, after`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${alt}, before`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-fg"
        style={{ left: `${pct}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-fg/40 bg-bg/80 text-fg shadow-md backdrop-blur-sm">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M6 4 L2 9 L6 14" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 4 L16 9 L12 14" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
      <span className="pointer-events-none absolute top-3 left-3 rounded-sm bg-bg/80 px-2 py-1 text-[11px] font-medium tracking-wider text-fg uppercase">
        Before
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-sm bg-bg/80 px-2 py-1 text-[11px] font-medium tracking-wider text-fg uppercase">
        After
      </span>
      <label className="sr-only" id={labelId} htmlFor={`${labelId}-range`}>
        Drag to compare before and after
      </label>
      <input
        id={`${labelId}-range`}
        type="range"
        min={4}
        max={96}
        value={pct}
        onChange={(e) => setPct(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        aria-valuetext={`${Math.round(pct)} percent before`}
      />
    </div>
  );
}

export function BeforeAfterStack({
  before,
  after,
  alt = "curb rash repair Las Vegas",
  className,
}: PairProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      <figure className="relative overflow-hidden rounded-lg bg-surface-2">
        <img
          src={before}
          alt={`${alt}, before`}
          className="aspect-[4/3] h-full w-full object-cover"
        />
        <figcaption className="absolute top-3 left-3 rounded-sm bg-bg/80 px-2 py-1 text-[11px] font-medium tracking-wider text-fg uppercase">
          Before
        </figcaption>
      </figure>
      <figure className="relative overflow-hidden rounded-lg bg-surface-2">
        <img
          src={after}
          alt={`${alt}, after`}
          className="aspect-[4/3] h-full w-full object-cover"
        />
        <figcaption className="absolute top-3 left-3 rounded-sm bg-bg/80 px-2 py-1 text-[11px] font-medium tracking-wider text-fg uppercase">
          After
        </figcaption>
      </figure>
    </div>
  );
}

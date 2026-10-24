"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export type Pin = { label: string; sub?: string; left: number; top: number; href?: string; kind: "project" | "office" | "region" };

export function MapPin({ pin, delay }: { pin: Pin; delay: number }) {
  const reduce = useReducedMotion();
  const office = pin.kind === "office";

  // Other places Drakken has worked: a quiet dot with a name on hover (the full list is
  // also written out as text beside the map, so these are decorative for screen readers).
  if (pin.kind === "region") {
    return (
      <span aria-hidden className="group absolute" style={{ left: `${pin.left}%`, top: `${pin.top}%` }}>
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[rgba(232,229,220,0.9)] px-2 py-1 text-eyebrow text-teal opacity-0 backdrop-blur-[3px] transition-opacity duration-200 group-hover:opacity-100">
          {pin.label}
        </span>
        <span className="block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/70 ring-4 ring-accent/15" />
      </span>
    );
  }
  const body = (
    <>
      <span className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center whitespace-nowrap bg-[rgba(232,229,220,0.85)] px-2.5 py-1.5 text-eyebrow text-teal opacity-0 backdrop-blur-[3px] transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100 group-focus-visible:opacity-100">
        {pin.label}
        {pin.sub && <span className="text-[10px] text-muted">{pin.sub}</span>}
      </span>
      <span className="relative block -translate-x-1/2 -translate-y-1/2">
        {/* Each pin pops in when the map arrives, staggered by its index, then the pulse starts. */}
        <motion.span
          className="relative block"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.4 + delay }}
        >
        {!reduce && !office && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 1 + delay, ease: "easeOut" }}
          />
        )}
        {office ? (
          <span className="relative grid size-5 place-items-center bg-teal">
            <span className="size-1.5 bg-accent" />
          </span>
        ) : (
          <span className="relative grid size-5 place-items-center rounded-full bg-accent shadow-[0_0_0_4px_rgba(0,160,95,0.2)]">
            <span className="size-1.5 rounded-full bg-white" />
          </span>
        )}
        </motion.span>
      </span>
    </>
  );

  const style = { left: `${pin.left}%`, top: `${pin.top}%` };
  return pin.href ? (
    <Link href={pin.href} aria-label={`${pin.label}${pin.sub ? `, ${pin.sub}` : ""}`} className="group absolute" style={style}>
      {body}
    </Link>
  ) : (
    <span className="group absolute" style={style} tabIndex={0} aria-label={`${pin.label}${pin.sub ? `, ${pin.sub}` : ""}`}>
      {body}
    </span>
  );
}

"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export type Pin = { label: string; sub?: string; left: number; top: number; href?: string; kind: "project" | "office" };

export function MapPin({ pin, delay }: { pin: Pin; delay: number }) {
  const reduce = useReducedMotion();
  const office = pin.kind === "office";
  const body = (
    <>
      <span className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center whitespace-nowrap bg-[rgba(232,229,220,0.85)] px-2.5 py-1.5 text-eyebrow text-teal opacity-0 backdrop-blur-[3px] transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100 group-focus-visible:opacity-100">
        {pin.label}
        {pin.sub && <span className="text-[10px] text-muted">{pin.sub}</span>}
      </span>
      <span className="relative block -translate-x-1/2 -translate-y-1/2">
        {!reduce && !office && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay, ease: "easeOut" }}
          />
        )}
        {office ? (
          <span className="relative grid size-5 place-items-center bg-teal">
            <span className="size-1.5 bg-lime" />
          </span>
        ) : (
          <span className="relative grid size-5 place-items-center rounded-full bg-accent shadow-[0_0_0_4px_rgba(0,160,95,0.2)]">
            <span className="size-1.5 rounded-full bg-white" />
          </span>
        )}
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

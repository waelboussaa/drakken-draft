"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Four hairline columns over a photo header; each line draws down from the top in turn. */
export function GridLines({ className = "border-white/15" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex px-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className={`flex-1 origin-top border-l last:border-r ${className}`}
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.6, delay: 0.15 * i, ease }}
        />
      ))}
    </div>
  );
}

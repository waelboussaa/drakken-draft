"use client";

import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/components/ui/Reveal";

/** Headline whose words rise out of a mask one after another when it scrolls into view. */
export function SplitText({ children, className = "", delay = 0 }: { children: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = children.split(" ");
  return (
    <motion.h2
      aria-label={children}
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
    >
      {words.map((w, i) => (
        // Padding and a matching negative margin stop the mask clipping descenders.
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.14em] align-top -mb-[0.14em]">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
            transition={{ duration: 0.9, ease: easeOut }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

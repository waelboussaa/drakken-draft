"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/components/ui/Reveal";

/** A title, or a two-tone title: [lead phrase, rest]. The rest shows at 60% of the text colour. */
export type Title = string | readonly [string, string];

export const titleText = (t: Title) => (typeof t === "string" ? t : `${t[0]} ${t[1]}`);

/**
 * Headline whose words rise out of a mask one after another when it scrolls into view.
 * Two-tone titles keep the same reveal; the muted words just sit at lower opacity,
 * which reads as soft grey on light sections and soft white on dark ones.
 */
export function SplitText({ children, className = "", delay = 0 }: { children: Title; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const [lead, rest] = typeof children === "string" ? [children, ""] : children;
  const words = [
    ...lead.split(" ").map((w) => ({ w, muted: false })),
    ...(rest ? rest.split(" ").map((w) => ({ w, muted: true })) : []),
  ];
  return (
    <motion.h2
      aria-label={titleText(children)}
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
    >
      {words.map(({ w, muted }, i) => (
        // The space sits outside the mask: trailing whitespace inside an inline-block is dropped.
        <Fragment key={i}>
          {/* Padding and a matching negative margin stop the mask clipping descenders. */}
          <span aria-hidden className={`inline-block overflow-hidden pb-[0.14em] align-top -mb-[0.14em] ${muted ? "opacity-60" : ""}`}>
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
              transition={{ duration: 0.9, ease: easeOut }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.h2>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { easeOut, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";

/**
 * Rule, numbered label and headline on the left; an optional action or note on the right.
 * `compact` uses a smaller headline and tighter spacing, for headings pinned with content.
 */
export function SectionHead({
  index,
  label,
  title,
  aside,
  compact = false,
}: {
  index?: string;
  label: string;
  title: string;
  aside?: React.ReactNode;
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      className={`relative grid pt-6 lg:grid-cols-12 lg:items-end ${compact ? "mb-8 gap-5 md:mb-10" : "mb-14 gap-8 md:mb-20"}`}
    >
      {/* The top rule draws in from the left as the section arrives. */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-current opacity-15"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.2, ease: easeOut }}
      />
      <div className={`flex flex-col items-start lg:col-span-8 ${compact ? "gap-5" : "gap-8"}`}>
        <Reveal y={16}>
          <SectionLabel index={index}>{label}</SectionLabel>
        </Reveal>
        <SplitText
          className={
            compact
              ? "text-balance text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.045em]"
              : "text-h2 text-balance"
          }
          delay={0.1}
        >
          {title}
        </SplitText>
      </div>
      {aside && (
        <Reveal delay={0.3} className="flex flex-col items-start gap-6 lg:col-span-4 lg:items-end lg:text-right">
          {aside}
        </Reveal>
      )}
    </div>
  );
}

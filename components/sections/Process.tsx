"use client";

import { motion, useScroll, useSpring, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { process } from "@/content/site";
import { SectionHead } from "@/components/ui/SectionHead";

/** One phase: its dot, number and copy light up as the line reaches it. */
function Step({ step, i, total, progress, reduce }: { step: (typeof process.steps)[number]; i: number; total: number; progress: MotionValue<number>; reduce: boolean | null }) {
  // The line reaches this step at `at`; it eases in over the stretch just before.
  const at = (i / (total - 1)) * 0.92;
  const from = Math.max(at - 0.14, 0);
  const lit = useTransform(progress, [from, at], [0, 1]);
  const copyOpacity = useTransform(lit, [0, 1], [0.3, 1]);
  const dotScale = useTransform(lit, [0, 1], [0.7, 1]);
  const dotFill = useTransform(lit, [0, 1], [0, 1]);
  const copyY = useTransform(lit, [0, 1], [10, 0]);

  return (
    <li className="relative flex gap-6 md:flex-col md:pr-6">
      <motion.span
        className="relative z-10 grid size-6 shrink-0 place-items-center rounded-full border border-accent bg-teal"
        style={reduce ? undefined : { scale: dotScale }}
      >
        <motion.span className="size-2 rounded-full bg-accent" style={reduce ? undefined : { opacity: dotFill, scale: dotFill }} />
      </motion.span>
      <motion.div className="flex flex-col gap-3" style={reduce ? undefined : { opacity: copyOpacity, y: copyY }}>
        <span className="text-display text-accent-light md:mt-4">0{i + 1}</span>
        <h3 className="text-h3">{step.title}</h3>
        <p className="text-body max-w-[260px] text-bg/70">{step.text}</p>
      </motion.div>
    </li>
  );
}

/** Five delivery phases as a line that fills as you scroll past it. */
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="bg-teal px-4 py-[120px] text-bg">
      <SectionHead index="03" label={process.label} title={process.title} />

      <ol ref={ref} className="relative grid gap-10 md:grid-cols-5 md:gap-2">
        {/* Track: vertical on mobile, horizontal from md up. */}
        <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-teal-2 md:inset-x-0 md:bottom-auto md:left-0 md:top-[11px] md:h-px md:w-auto" />
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-accent md:hidden"
          style={reduce ? undefined : { scaleY: progress }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-[11px] hidden h-px origin-left bg-accent md:block"
          style={reduce ? undefined : { scaleX: progress }}
        />
        {process.steps.map((s, i) => (
          <Step key={s.title} step={s} i={i} total={process.steps.length} progress={progress} reduce={reduce} />
        ))}
      </ol>
    </section>
  );
}

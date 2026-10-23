"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { process } from "@/content/site";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";

/** Five delivery phases as a line that fills as you scroll past it. */
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="bg-brand px-4 py-[120px] text-white">
      <Reveal className="mb-16 flex flex-col items-start gap-6">
        <Label>{process.label}</Label>
        <h2 className="text-h2 max-w-[760px]">{process.title}</h2>
      </Reveal>

      <ol ref={ref} className="relative grid gap-10 md:grid-cols-5 md:gap-2">
        {/* Track: vertical on mobile, horizontal from md up. */}
        <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-white/25 md:inset-x-0 md:bottom-auto md:left-0 md:top-[11px] md:h-px md:w-auto" />
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-white md:hidden"
          style={reduce ? undefined : { scaleY: progress }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-[11px] hidden h-px origin-left bg-white md:block"
          style={reduce ? undefined : { scaleX: progress }}
        />
        {process.steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-6 md:flex-col md:pr-6">
            <span className="relative z-10 grid size-6 shrink-0 place-items-center rounded-full border border-white bg-brand">
              <span className="size-2 rounded-full bg-white" />
            </span>
            <div className="flex flex-col gap-3">
              <span className="text-eyebrow text-white/80">0{i + 1}</span>
              <h3 className="text-[clamp(1.5rem,2.2vw,1.9rem)] font-medium tracking-[-0.04em] text-white">{s.title}</h3>
              <p className="text-body max-w-[260px] text-white">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { process } from "@/content/site";
import { SectionHead } from "@/components/ui/SectionHead";

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
          <li key={s.title} className="relative flex gap-6 md:flex-col md:pr-6">
            <span className="relative z-10 grid size-6 shrink-0 place-items-center rounded-full border border-accent bg-teal">
              <span className="size-2 rounded-full bg-accent" />
            </span>
            <div className="flex flex-col gap-3">
              <span className="text-[clamp(3rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.05em] text-accent-light md:mt-4">0{i + 1}</span>
              <h3 className="text-[clamp(1.5rem,2.2vw,1.9rem)] font-medium tracking-[-0.04em]">{s.title}</h3>
              <p className="text-body max-w-[260px] text-bg/70">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

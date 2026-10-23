"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero, offices } from "@/content/site";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ease = [0.16, 1, 0.3, 1] as const;

export function GridLines({ className = "border-white/15" }: { className?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex px-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={`flex-1 border-l last:border-r ${className}`} />
      ))}
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 32, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1, delay, ease },
  });

  return (
    <section ref={ref} className="relative flex h-svh min-h-[720px] flex-col overflow-hidden px-4 pb-6 pt-28 text-white">
      <motion.div className="absolute inset-0 -z-10 bg-teal" style={{ y }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease }}
        >
          {hero.video ? (
            <video
              className="size-full object-cover grayscale-[0.75]"
              src={hero.video}
              poster={hero.image.src}
              autoPlay={!reduce}
              muted
              loop
              playsInline
              aria-label={hero.image.alt}
            />
          ) : (
            <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="100vw" className="object-cover grayscale-[0.75]" />
          )}
        </motion.div>
        {/* Darkest at the bottom where the headline sits, lighter above so the photo reads. */}
        <div className="absolute inset-0 bg-gradient-to-t from-teal via-teal/70 to-teal/35" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-teal-2/70 to-transparent" />
      </motion.div>
      <GridLines />

      <div className="relative mt-auto grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="flex flex-col items-start gap-6 lg:col-span-8">
          <motion.div {...rise(0.1)}>
            <SectionLabel>{hero.eyebrow}</SectionLabel>
          </motion.div>
          <motion.h1
            {...rise(0.2)}
            className="text-balance text-[clamp(2.75rem,6.2vw,6rem)] font-medium leading-[0.98] tracking-[-0.045em] [text-shadow:0_2px_24px_rgba(0,0,0,0.25)]"
          >
            {hero.title}
          </motion.h1>
        </div>
        <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:pb-2">
          <motion.p
            {...rise(0.35)}
            className="max-w-[460px] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.4] tracking-[-0.02em] text-white/85"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div {...rise(0.5)} className="flex flex-wrap gap-3">
            {hero.ctas.map((c) => (
              <ArrowButton key={c.label} href={c.href} variant={c.variant}>
                {c.label}
              </ArrowButton>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative mt-10 flex items-center justify-end border-t border-white/15 pt-4 sm:justify-between text-eyebrow text-white/70"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="hidden sm:inline">{offices.map((o) => `${o.city} — ${o.role}`).join("  /  ")}</span>
        <a href="#proof" className="flex items-center gap-2 hover:text-white">
          Scroll
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
            <path d="M6 1v10M2 7l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}

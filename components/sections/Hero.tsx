"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "@/content/site";
import { ArrowButton } from "@/components/ui/ArrowButton";

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
    <section ref={ref} className="relative flex h-svh min-h-[680px] flex-col overflow-hidden px-4 pb-4 pt-8 text-white md:px-8">
      <motion.div className="absolute inset-0 -z-10 bg-teal" style={{ y }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease }}
        >
          {hero.video ? (
            <video
              className="size-full object-cover"
              src={hero.video}
              poster={hero.image.src}
              autoPlay={!reduce}
              muted
              loop
              playsInline
              aria-label={hero.image.alt}
            />
          ) : (
            <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="100vw" className="object-cover" />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-teal/70 via-teal/40 to-teal/80" />
      </motion.div>
      <GridLines />

      <div className="relative flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <motion.h1 {...rise(0.2)} className="text-hero max-w-[940px] text-balance">
          {hero.title}
        </motion.h1>
        <motion.p {...rise(0.35)} className="text-body-lg max-w-[560px] text-white/85">
          {hero.subtitle}
        </motion.p>
        <motion.div {...rise(0.5)} className="flex flex-wrap justify-center gap-3">
          {hero.ctas.map((c) => (
            <ArrowButton key={c.label} href={c.href} variant={c.variant}>
              {c.label}
            </ArrowButton>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#proof"
        className="relative self-center text-eyebrow"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Scroll Down
      </motion.a>
    </section>
  );
}

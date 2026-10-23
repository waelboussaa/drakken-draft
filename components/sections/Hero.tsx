"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "@/content/site";
import { ArrowButton } from "@/components/ui/ArrowButton";

const ease = [0.22, 1, 0.36, 1] as const;

export function GridLines({ className = "border-white/15" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex px-4">
      {/* Each column line draws down from the top, one after another. */}
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

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  // The copy drifts up and fades as the hero scrolls away, instead of being dragged along with the photo.
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, reduce ? 1 : 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0px", reduce ? "0px" : "-80px"]);

  const rise = (delay: number) => ({
    // Opacity and transform only: a blur filter repaints every frame and stutters on phones.
    initial: reduce ? false : { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease },
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
        <div className="absolute inset-0 bg-gradient-to-b from-teal/85 via-teal/65 to-teal/90" />
        {/* Extra darkening behind the headline so it stays legible over bright plant lights. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(16,34,29,0.55),transparent)]" />
      </motion.div>
      <GridLines />

      <motion.div style={{ opacity: copyOpacity, y: copyY }} className="relative flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <motion.h1
          {...rise(0.2)}
          className="text-balance text-[clamp(2.25rem,4.8vw,3.75rem)] font-medium leading-[1.1] tracking-[-0.03em] [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] lg:text-nowrap"
        >
          {hero.title[0]} <br className="hidden lg:block" />
          {hero.title[1]}
        </motion.h1>
        <motion.p
          {...rise(0.35)}
          className="max-w-[560px] text-balance text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.4] tracking-[-0.02em] text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] lg:max-w-none lg:text-nowrap"
        >
          {hero.subtitle[0]} <br className="hidden lg:block" />
          {hero.subtitle[1]}
        </motion.p>
        <motion.div {...rise(0.5)} className="flex flex-wrap justify-center gap-3">
          {hero.ctas.map((c) => (
            <ArrowButton key={c.label} href={c.href} variant={c.variant}>
              {c.label}
            </ArrowButton>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#proof"
        className="relative self-center text-eyebrow"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.2, duration: 0.8 }, y: { delay: 2, duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
      >
        Scroll Down
      </motion.a>
    </section>
  );
}

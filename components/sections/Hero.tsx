"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/content/site";
import { useScrollRow } from "@/lib/useScrollRow";
import { ArrowButton } from "@/components/ui/ArrowButton";

// Hero ported from the drakken-website build (src/components/Hero.jsx + styles.css).
// Load-in follows the reference: heading → body → buttons → featured card.

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade and rise on mount. y is the start offset in px; y = 0 fades only. */
function Appear({
  y = 16,
  delay = 0,
  duration = 0.8,
  className,
  children,
}: {
  y?: number;
  delay?: number;
  duration?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Headline whose words rise out of their own mask, one after another, on mount.
 * `parts` are runs of text with their own colour, so the headline can be two-tone.
 */
function SplitTitle({
  parts,
  className,
  delay = 0,
  stagger = 0.045,
}: {
  parts: { text: string; className?: string }[];
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = parts.flatMap((p) => p.text.split(" ").map((w) => ({ w, className: p.className })));
  return (
    <h1 aria-label={parts.map((p) => p.text).join(" ")} className={className}>
      {words.map(({ w, className: tone }, i) => (
        // The space sits outside the mask: trailing whitespace inside an inline-block is dropped.
        <Fragment key={i}>
          {/* Padding plus a matching negative margin stops the mask clipping descenders. */}
          <span aria-hidden className={`inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top ${tone ?? ""}`}>
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: delay + i * stagger, ease }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}

/** "↳" corner arrow used on every hero button. */
function CornerArrow() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" aria-hidden>
      <path d="M4 3v7h8" />
      <path d="m9.5 7.5 2.5 2.5-2.5 2.5" />
    </svg>
  );
}

function Arrow({ dir }: { dir: 1 | -1 }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="square"
      aria-hidden
      style={dir < 0 ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M2.5 8h11" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

// How long each featured project shows before the card moves on.
const SLIDE_MS = 6000;

export function Hero() {
  const [row, step] = useScrollRow<HTMLDivElement>();
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  // Bumped whenever the visible slide changes, to restart the progress bar from empty.
  const [cycle, setCycle] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused;

  // Respect reduced motion: keep the poster frame instead of playing the video.
  useEffect(() => {
    if (reduce) video.current?.pause();
  }, [reduce]);

  // Track which slide is showing, whether it got there by arrow, drag or auto-advance.
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const onScroll = () => {
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      setActive(Math.round(el.scrollLeft / (el.clientWidth + gap)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [row]);

  useEffect(() => setCycle((c) => c + 1), [active]);

  // When the bar fills: next project, or back to the first after the last.
  const advance = () => {
    if (active < hero.featured.length - 1) step(1);
    else row.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="relative h-svh min-h-[680px] overflow-hidden bg-teal-2 text-white max-[809px]:h-auto max-[809px]:min-h-svh"
    >
      <video
        ref={video}
        className="absolute inset-0 size-full object-cover"
        src={hero.video}
        poster={hero.poster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,35,30,0.55)_0%,rgba(16,35,30,0.35)_45%,rgba(16,35,30,0.75)_100%)]" />

      <div className="relative flex h-full flex-col justify-between px-4 pb-8 pt-[120px] max-[809px]:gap-12 max-[809px]:pt-[104px]">
        <SplitTitle
          parts={[{ text: hero.title.lead }, { text: hero.title.rest, className: "text-[#B3BEB7]" }]}
          delay={0.15}
          stagger={0.05}
          className="max-w-[820px] text-[64px] font-medium leading-[1.02] tracking-[-0.035em] [text-shadow:0_2px_24px_rgba(0,0,0,0.3)] max-[1199px]:text-[56px] max-[809px]:text-[40px]"
        />

        <div className="flex flex-col gap-16">
          <div className="flex items-end justify-between gap-8 max-[1199px]:flex-col max-[1199px]:items-start">
            <div className="flex w-[580px] max-w-full flex-col gap-7 max-[809px]:w-full">
              <Appear y={16} delay={0.5} duration={0.8}>
                <p className="text-[clamp(1.075rem,1.45vw,1.3rem)] leading-[1.45] tracking-[-0.02em] text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                  {hero.body}
                </p>
              </Appear>
              <Appear y={12} delay={0.62} duration={0.6} className="flex flex-wrap gap-3">
                <ArrowButton href={hero.primary.href} variant="green">
                  {hero.primary.label}
                </ArrowButton>
                <ArrowButton href={hero.secondary.href} variant="glass">
                  {hero.secondary.label}
                </ArrowButton>
              </Appear>
            </div>

            <Appear
              y={32}
              delay={0.75}
              duration={0.9}
              className="relative w-[444px] shrink-0 overflow-hidden bg-[rgba(16,35,30,0.35)] p-3 backdrop-blur-[20px] max-[809px]:w-full"
            >
              {/* Hover, keyboard focus or a drag pauses the auto-advance. */}
              <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={() => setFocused(true)}
                onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
              >
              <div
                ref={row}
                className="flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&.is-dragging]:cursor-grabbing [&::-webkit-scrollbar]:hidden"
              >
                {hero.featured.map((f) => (
                  <article key={f.href + f.text} className="flex h-[184px] flex-[0_0_100%] snap-start gap-3 max-[809px]:h-auto max-[809px]:min-h-[168px]">
                    <div className="relative w-[138px] shrink-0 overflow-hidden max-[809px]:w-[110px]">
                      <Image src={f.image} alt="" fill sizes="140px" draggable={false} className="pointer-events-none object-cover" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-2">
                      <div className="flex flex-col gap-3">
                        <p className="text-eyebrow text-[#B3BEB7]">Featured projects</p>
                        <p className="text-[16px] font-medium leading-[1.4] tracking-[-0.02em] text-white">{f.text}</p>
                      </div>
                      <Link href={f.href} className="inline-flex items-center gap-2 pb-2 text-[14px] font-medium tracking-[-0.02em]">
                        <span className="text-[#D8E0A7]">
                          <CornerArrow />
                        </span>
                        Read more
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              <div className="absolute bottom-3 right-3 flex gap-1.5 max-[809px]:static max-[809px]:mt-3 max-[809px]:justify-end">
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={() => step(-1)}
                  className="grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-[10px] transition-colors hover:bg-white/20"
                >
                  <Arrow dir={-1} />
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={() => step(1)}
                  className="grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-[10px] transition-colors hover:bg-white/20"
                >
                  <Arrow dir={1} />
                </button>
              </div>
              </div>

              {/* Progress bar: fills over SLIDE_MS, then the card moves to the next project. */}
              {!reduce && (
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
                  <div
                    key={cycle}
                    className="h-full origin-left bg-[#D8E0A7]"
                    style={{
                      animation: `hero-progress ${SLIDE_MS}ms linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                    onAnimationEnd={advance}
                  />
                </div>
              )}
            </Appear>
          </div>
        </div>
      </div>
    </section>
  );
}

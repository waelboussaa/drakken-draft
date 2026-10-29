"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { testimonials, type Testimonial } from "@/content/site";
import { ClientLogo } from "@/components/ui/ClientLogo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

// "In their words", after the drakken-website testimonial slider: one quote at a time, a
// progress bar that fills under the counter and advances the slide, hover to pause, and each
// quote's words rising in one after another. Styled with this site's type scale and colours.

const AUTOPLAY = 7000; // ms per quote
const ease = "cubic-bezier(.22,1,.36,1)";
const pad = (n: number) => String(n).padStart(2, "0");

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

/** Portrait (zooms out from 112% when the slide arrives) or the client's logo on a green tile. */
function Media({ t, active }: { t: Testimonial; active: boolean }) {
  return (
    <div className="relative h-[260px] w-[220px] overflow-hidden bg-teal max-[809px]:h-[170px] max-[809px]:w-[140px]">
      {t.image ? (
        <Image
          src={t.image.src}
          alt={t.image.alt}
          fill
          sizes="220px"
          className="object-cover transition-[scale] duration-[1400ms]"
          style={{ scale: active ? 1 : 1.12, transitionTimingFunction: ease }}
        />
      ) : t.logo ? (
        <div className="grid size-full place-items-center p-8 text-bg">
          <ClientLogo
            name={t.logo.name}
            src={t.logo.src}
            ratio={t.logo.ratio}
            // Fit inside the tile whatever the logo's shape.
            height={Math.min(96, 140 / t.logo.ratio)}
          />
        </div>
      ) : null}
    </div>
  );
}

function Slide({ t, active }: { t: Testimonial; active: boolean }) {
  const words = t.quote.split(" ");
  return (
    <div
      // Every slide sits in the same grid cell; only the active one is visible and focusable.
      className="grid content-start gap-8 [grid-area:1/1] transition-[opacity,visibility] duration-500 lg:grid-cols-3 max-[809px]:gap-6"
      style={{ opacity: active ? 1 : 0, visibility: active ? "visible" : "hidden", transitionTimingFunction: ease }}
      aria-hidden={!active}
      inert={!active}
    >
      <Media t={t} active={active} />
      <figure className="relative flex flex-col gap-12 lg:col-span-2 max-[809px]:gap-8">
        <span aria-hidden className="text-[5.5rem] leading-none text-accent xl:absolute xl:-left-12 xl:-top-3 max-xl:-mb-6 max-xl:h-14">
          “
        </span>
        <blockquote className="max-w-[860px] text-quote">
          {words.map((w, wi) => (
            // Each word rises out of its own mask; the space sits outside so it isn't trimmed.
            <Fragment key={wi}>
              <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top">
                <span
                  className="inline-block transition-transform duration-[800ms]"
                  style={{
                    transform: active ? "none" : "translateY(105%)",
                    transitionTimingFunction: ease,
                    transitionDelay: active ? `${0.15 + wi * 0.022}s` : "0s",
                  }}
                >
                  {w}
                </span>
              </span>
              {wi < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </blockquote>
        <figcaption
          className="flex flex-col gap-1 transition-[opacity,transform] duration-[600ms]"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "none" : "translateY(10px)",
            transitionTimingFunction: ease,
            transitionDelay: active ? "0.6s" : "0s",
          }}
        >
          <span className="text-eyebrow text-ink">{t.name}</span>
          {t.role && <span className="text-eyebrow text-muted">{t.role}</span>}
        </figcaption>
      </figure>
    </div>
  );
}

export function Testimonials() {
  const items = testimonials.items;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { amount: 0.3 });
  const reduce = useReducedMotion();
  const bar = useRef<HTMLSpanElement>(null);

  const go = (d: number) => setIndex((i) => (i + d + items.length) % items.length);

  // The bar is driven frame by frame, so pausing freezes it exactly where it is; a full bar
  // moves to the next quote. Off while out of view or for reduced motion.
  useEffect(() => {
    if (bar.current) bar.current.style.transform = "scaleX(0)";
    if (!inView || reduce) return;
    let raf = 0;
    let last = performance.now();
    let t = 0;
    const tick = (now: number) => {
      if (!paused) t += now - last;
      last = now;
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, t / AUTOPLAY)})`;
      if (t >= AUTOPLAY) {
        go(1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // go is stable in effect; restarting on index resets the bar for the new quote.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, inView, reduce]);

  return (
    <section ref={section} aria-roledescription="carousel" aria-label="Testimonials" className="bg-surface px-4 py-[120px] max-[809px]:py-16">
      <Reveal y={32} className="flex flex-col gap-12">
        {/* Top bar: label | counter and progress | prev / next, on the same columns as the slide. */}
        <div className="grid items-center gap-y-4 border-t border-line pt-6 lg:grid-cols-3 max-lg:grid-cols-[1fr_auto]">
          <SectionLabel index="06">{testimonials.label}</SectionLabel>
          <div className="flex items-center gap-4 max-lg:order-3 max-lg:col-span-2">
            <p className="text-eyebrow tabular-nums text-ink">
              {pad(index + 1)}
              <span className="text-muted">/{pad(items.length)}</span>
            </p>
            <span className="h-0.5 max-w-[320px] flex-1 overflow-hidden bg-line">
              <span ref={bar} className="block h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
            </span>
          </div>
          <div className="flex justify-end gap-1.5">
            <button
              type="button"
              aria-label="Previous quote"
              onClick={() => go(-1)}
              className="grid size-10 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-accent hover:text-white"
            >
              <Arrow dir={-1} />
            </button>
            <button
              type="button"
              aria-label="Next quote"
              onClick={() => go(1)}
              className="grid size-10 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-accent hover:text-white"
            >
              <Arrow dir={1} />
            </button>
          </div>
        </div>

        <div className="grid" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {items.map((t, i) => (
            <Slide key={t.name} t={t} active={i === index} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { services } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { useMediaQuery } from "@/lib/useMediaQuery";

// "What we deliver", after the drakken-website Solutions section: on desktop the heading
// and card row pin under the nav and scrolling down drives the row sideways; below 1000px
// (or with reduced motion) it is a plain swipeable row.

const spring = "cubic-bezier(.34,1.25,.64,1)";

/** "↳" corner arrow. */
function CornerArrow() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" aria-hidden>
      <path d="M4 3v7h8" />
      <path d="m9.5 7.5 2.5 2.5-2.5 2.5" />
    </svg>
  );
}

/** Corner brackets parked outside the card; they snap onto its corners on hover. */
function CardCorners() {
  const c = "absolute size-2 border-white";
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -inset-8 z-[1] transition-[inset] duration-[400ms] group-hover:inset-0"
      style={{ transitionTimingFunction: spring }}
    >
      <i className={`${c} left-4 top-4 border-l border-t`} />
      <i className={`${c} right-4 top-4 border-r border-t`} />
      <i className={`${c} bottom-4 left-4 border-b border-l`} />
      <i className={`${c} bottom-4 right-4 border-b border-r`} />
    </span>
  );
}

/** Photo 25% taller than its frame, drifting with page scroll; zooms slightly on card hover. */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "10%"]);
  return (
    <div ref={frame} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-x-0 -top-[12.5%] h-[125%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1000px) 50vw, 88vw"
          className="object-cover transition-[scale] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,35,30,0.15),rgba(16,35,30,0.45))]" />
    </div>
  );
}

function Card({ item }: { item: (typeof services.items)[number] }) {
  return (
    <a
      href={item.href}
      data-cursor="plus"
      className="group relative flex aspect-[669/502] flex-col justify-between overflow-hidden p-8 text-white max-[999px]:aspect-[4/4.4] max-[809px]:aspect-[3/4] max-[809px]:p-4"
    >
      <ParallaxImage src={item.image.src} alt={item.image.alt} />
      <CardCorners />
      <div className="relative z-[1] flex w-[min(436px,100%)] flex-col gap-6 bg-[rgba(16,35,30,0.45)] px-8 py-6 backdrop-blur-[50px] max-[809px]:p-5">
        <div className="flex flex-col items-start gap-2">
          {/* Non-breaking hyphen so "E-Houses" never splits across lines. */}
          <h3 className="text-h4">{item.title.replace("E-", "E‑")}</h3>
          <p className="text-eyebrow text-white/70">{item.subtitle}</p>
        </div>
        <p className="text-body text-white/70">{item.body}</p>
      </div>
      <div className="relative z-[1] flex justify-end">
        {/* Grows from an arrow into "Explore service" on hover. */}
        <span
          className="flex h-10 w-14 items-center gap-2 overflow-hidden rounded-full bg-white/[0.07] px-5 py-3 backdrop-blur-[10px] transition-[width,background-color] duration-[400ms] group-hover:w-[180px] group-hover:bg-accent"
          style={{ transitionTimingFunction: spring }}
        >
          <span className="size-4 shrink-0">
            <CornerArrow />
          </span>
          <span className="whitespace-nowrap text-eyebrow opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Explore service
          </span>
        </span>
      </div>
    </a>
  );
}

export function Services() {
  const desktop = useMediaQuery("(min-width: 1000px)");
  const reduce = useReducedMotion();
  const pinned = desktop && !reduce;

  const wrap = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  // Measured on resize: how far the row travels, where it pins, and the page offset where pinning starts.
  const m = useRef({ distance: 0, top: 96, start: 0 });
  const x = useMotionValue(0);
  const { scrollY } = useScroll();

  const place = (y: number) => {
    const { distance, start } = m.current;
    const p = distance > 0 ? Math.min(1, Math.max(0, (y - start) / distance)) : 0;
    x.set(-p * distance);
  };
  useMotionValueEvent(scrollY, "change", (y) => pinned && place(y));

  useEffect(() => {
    const w = wrap.current;
    const s = sticky.current;
    const t = track.current;
    if (!w || !s || !t) return;
    if (!pinned) {
      w.style.height = "";
      s.style.top = "";
      t.style.removeProperty("--card-w");
      x.set(0);
      return;
    }
    const GAP = 20;
    const RATIO = 669 / 502;
    const measure = () => {
      // Heading and cards pin together just under the nav, as on drakken-website.
      const top = 96;
      const headBlock = t.getBoundingClientRect().top - s.getBoundingClientRect().top;
      // Two cards side by side, unless the screen is too short for the whole block:
      // then the cards shrink so heading + cards still fit above the fold.
      const naturalW = (t.clientWidth - GAP) / 2;
      const roomH = window.innerHeight - top - headBlock - 24;
      const cardW = Math.max(240, Math.min(naturalW, roomH * RATIO));
      if (cardW < naturalW) t.style.setProperty("--card-w", `${cardW}px`);
      else t.style.removeProperty("--card-w");
      const cardH = cardW / RATIO;
      const count = t.children.length;
      const distance = Math.max(0, count * cardW + (count - 1) * GAP - t.clientWidth);
      w.style.height = `${headBlock + cardH + distance}px`;
      s.style.top = `${top}px`;
      const start = w.getBoundingClientRect().top + window.scrollY - top;
      m.current = { distance, top, start };
      place(window.scrollY);
    };
    measure();
    // Re-measure when anything above shifts (fonts, images) or the window resizes.
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // place/x are stable for this component's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinned]);

  return (
    <section id="services" className="overflow-x-clip px-4 pb-4 pt-[120px]">
      <div ref={wrap} className="relative">
        <div ref={sticky} className={pinned ? "sticky" : ""}>
          <SectionHead index="01" label={services.label} title={services.title} compact />
          <div
            className={
              pinned
                ? ""
                : "-mx-4 snap-x snap-mandatory scroll-px-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            }
          >
            <motion.div ref={track} className="flex gap-5" style={pinned ? { x } : undefined}>
              {services.items.map((item, i) => (
                <Reveal
                  key={item.title}
                  y={32}
                  delay={0.2 + i * 0.08}
                  className="shrink-0 basis-[var(--card-w,calc(50%_-_10px))] snap-start max-[999px]:basis-[80%] max-[809px]:basis-[88%]"
                >
                  <Card item={item} />
                </Reveal>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

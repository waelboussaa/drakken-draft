"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "@/content/site";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Logo } from "@/components/ui/Logo";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group relative py-1 text-eyebrow">
      {children}
      <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out-expo group-hover:scale-x-100" />
    </Link>
  );
}

export function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  // Every page opens on a dark hero: the bar stays clear over it and turns solid once scrolled past.
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const update = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const light = solid || mobile || open !== null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`border transition-colors duration-300 ${
          light
            ? "border-line bg-bg/95 text-ink backdrop-blur-md"
            : "border-white/15 bg-teal-2/30 text-white backdrop-blur-md"
        }`}
        onMouseLeave={() => setOpen(null)}
      >
        <div className="flex h-16 items-center justify-between gap-8 pl-4 pr-3">
          <div className="flex items-center gap-10">
            <Logo className={`h-5 ${light ? "text-logo" : "text-white"}`} />
            <ul className="hidden items-center gap-8 md:flex">
              {nav.links.map((l) =>
                l.children ? (
                  <li key={l.label} onMouseEnter={() => setOpen(l.label)}>
                    <button
                      className="group relative flex items-center gap-1 py-1 text-eyebrow"
                      aria-expanded={open === l.label}
                      onClick={() => setOpen(open === l.label ? null : l.label)}
                    >
                      {l.label}
                      <svg viewBox="0 0 12 12" className={`size-3 transition-transform ${open === l.label ? "rotate-180" : ""}`} aria-hidden>
                        <path d="M2 4.5l4 3.5 4-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                      <span className={`absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-300 ${open === l.label ? "scale-x-100" : "scale-x-0"}`} />
                    </button>
                  </li>
                ) : (
                  <li key={l.label} onMouseEnter={() => setOpen(null)}>
                    <NavLink href={l.href}>{l.label}</NavLink>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="hidden md:block">
            <ArrowButton href={nav.cta.href} variant="green">
              {nav.cta.label}
            </ArrowButton>
          </div>
          <button
            className="flex items-center gap-2 text-eyebrow md:hidden"
            aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}
          >
            {mobile ? "Close" : "Menu"}
            <svg viewBox="0 0 16 16" className="size-4 text-accent" aria-hidden>
              {mobile ? (
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" />
              ) : (
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.8" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {(open || mobile) && (
            // Desktop: the hovered item's children. Mobile: every link plus the CTA.
            <motion.div
              key={mobile ? "mobile" : open}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
              className="overflow-hidden px-4"
            >
              <ul className="flex flex-col gap-3 border-t border-line pb-5 pt-4" onClick={() => setMobile(false)}>
                {mobile
                  ? [...nav.links, nav.cta].map((c) => (
                      <li key={c.label}>
                        <NavLink href={c.href}>{c.label}</NavLink>
                      </li>
                    ))
                  : nav.links
                      .find((l) => l.label === open)
                      ?.children?.map((c) => (
                        <li key={c.label}>
                          <NavLink href={c.href}>{c.label}</NavLink>
                        </li>
                      ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

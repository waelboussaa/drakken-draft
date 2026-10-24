"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brand, contactDetails, footer, offices } from "@/content/site";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Logo } from "@/components/ui/Logo";

function Clocks() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      {offices.filter((o) => o.clock).map((o) => (
        <span key={o.city} className="tabular-nums">
          {o.city}:{" "}
          {now
            ? new Intl.DateTimeFormat("en-GB", { timeZone: o.timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(now)
            : "--:--:--"}
        </span>
      ))}
    </>
  );
}

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="group relative inline-block w-fit text-[18px] tracking-[-0.03em]">
      {children}
      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-accent transition-transform duration-300 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
    </Link>
  );
}

function Column({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    // Fixed title width keeps each column's links on one vertical line when the columns stack.
    <div className="flex items-baseline gap-6">
      <span className="w-24 shrink-0 text-eyebrow">↳ {title}</span>
      <ul className="flex flex-col gap-1">
        {items.map((i) => (
          <li key={i.label}>
            <FooterLink href={i.href}>{i.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-teal px-4 pt-14 text-bg">
      <div className="flex flex-col justify-between gap-12 md:flex-row">
        <div className="flex max-w-[280px] flex-col gap-4">
          <p className="text-[18px] leading-[1.35] tracking-[-0.03em]">{footer.blurb}</p>
          <p className="flex flex-col gap-1 text-[18px] tracking-[-0.03em]">
            <a href={`mailto:${contactDetails.email}`} className="w-fit underline decoration-bg/30 underline-offset-4 hover:decoration-accent">
              {contactDetails.email}
            </a>
            <a href={contactDetails.phoneHref} className="w-fit tabular-nums underline decoration-bg/30 underline-offset-4 hover:decoration-accent">
              {contactDetails.phone}
            </a>
          </p>
          <ArrowButton href={footer.cta.href}>{footer.cta.label}</ArrowButton>
        </div>
        <div className="flex flex-wrap gap-16">
          <Column title="Pages" items={footer.pages} />
          <Column title="Offices" items={offices.map((o) => ({ label: `${o.city} · ${o.role}`, href: "https://drakken.co/contact-us/" }))} />
          <Column title="Social" items={footer.social} />
        </div>
      </div>

      <div className="mt-20 flex flex-col justify-between gap-6 pb-4 md:flex-row md:items-end">
        <Logo className="h-[clamp(2.5rem,9vw,8rem)] text-accent" />
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-eyebrow">
          <Clocks />
          <span>
            ©{new Date().getFullYear()} {brand} — All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}

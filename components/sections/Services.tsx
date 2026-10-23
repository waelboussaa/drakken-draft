"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { services } from "@/content/site";
import { icons } from "@/components/ui/Icons";
import { Arrow } from "@/components/ui/ArrowButton";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

const ease = [0.22, 1, 0.36, 1] as const;

function Card({ item }: { item: (typeof services.items)[number] }) {
  const Icon = icons[item.icon];
  return (
    <motion.div initial="rest" whileHover="hover" whileFocus="hover" className="h-full">
      <Link
        href={item.href}
        data-cursor="plus"
        className="group relative flex aspect-[4/5] h-full flex-col justify-end overflow-hidden bg-teal p-6 text-white md:aspect-auto md:min-h-[560px] md:p-8"
      >
        <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal via-teal/40 to-teal/10" />
        <span className="absolute right-4 top-4 grid size-7 place-items-center rounded-full bg-white/25 backdrop-blur-[5px]">
          <motion.svg variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }} viewBox="0 0 12 12" className="size-3" aria-hidden>
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.2" />
          </motion.svg>
        </span>
        <div className="relative flex flex-col gap-4">
          <div className="size-12 text-accent">
            <Icon />
          </div>
          <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-tight tracking-[-0.04em]">{item.title}</h3>
          <ul className="flex flex-wrap gap-1.5">
            {item.solutions.map((s) => (
              <li key={s} className="bg-white/15 px-2 py-1 text-eyebrow backdrop-blur-[3px]">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          variants={{ rest: { clipPath: "inset(100% 0 0 0)" }, hover: { clipPath: "inset(0% 0 0 0)" } }}
          transition={{ duration: 0.7, ease }}
          className="absolute inset-0 flex flex-col justify-between bg-lime p-6 text-teal md:p-8"
        >
          <Label tone="dark" mono>
            Solutions
          </Label>
          <ul className="flex flex-col gap-1">
            {item.solutions.map((s) => (
              <li key={s} className="border-b border-teal/15 py-2 text-[clamp(1.25rem,2vw,1.6rem)] tracking-[-0.04em]">
                {s}
              </li>
            ))}
          </ul>
          <span className="flex items-center justify-between">
            <span className="text-[clamp(1.25rem,2vw,1.6rem)] font-medium tracking-[-0.04em]">{item.title}</span>
            <span className="grid size-[38px] place-items-center rounded-full bg-teal text-bg">
              <Arrow />
            </span>
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="px-4 pb-4 pt-[120px]">
      <SectionHead index="01" label={services.label} title={services.title} />
      <div className="grid gap-2 md:grid-cols-2">
        {services.items.map((item, i) => (
          <Reveal key={item.title} delay={(i % 2) * 0.1}>
            <Card item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

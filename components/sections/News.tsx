import Link from "next/link";
import { news } from "@/content/site";
import { Arrow } from "@/components/ui/ArrowButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";

const fmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

export function News() {
  return (
    <section id="news" className="px-4 py-[120px]">
      <SectionHead index="08" label={news.label} title={news.title} />
      <ul className="border-t border-line">
        {news.items.map((n, i) => (
          <Reveal key={n.title} delay={i * 0.05}>
            <li>
              <Link
                href={n.href}
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 border-b border-line py-6 transition-colors hover:bg-surface md:grid-cols-[160px_1fr_auto] md:px-2"
              >
                <time dateTime={n.date} className="text-eyebrow text-muted">
                  {fmt.format(new Date(n.date))}
                </time>
                <span className="col-span-2 row-start-2 text-h3 font-normal md:col-span-1 md:row-start-auto">
                  {n.title}
                </span>
                <span className="col-start-2 row-start-1 grid size-[38px] place-items-center rounded-full bg-surface transition-colors group-hover:bg-lime md:col-start-auto md:row-start-auto">
                  <Arrow />
                </span>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { caseStudies } from "@/content/site";
import { ProjectCard } from "@/components/ProjectCard";
import { Cta } from "@/components/sections/Cta";
import { GridLines } from "@/components/sections/Hero";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { Tbc } from "@/components/ui/Tbc";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  return c ? { title: c.title, description: `${c.summary} ${c.country} · ${c.services.join(", ")}.` } : {};
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 bg-brand px-4 py-5 md:px-6">
      <dt className="text-eyebrow text-white/80">{label}</dt>
      <dd className="text-body-lg text-white">{children}</dd>
    </div>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) notFound();

  // Same service line first, then same region, excluding this project.
  const related = caseStudies
    .filter((x) => x.slug !== c.slug)
    .map((x) => ({ x, score: (x.services.some((s) => c.services.includes(s)) ? 2 : 0) + (x.region === c.region ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.x);

  return (
    <article>
      {/* Hero */}
      <header className="relative isolate flex min-h-[80svh] flex-col justify-end overflow-hidden px-4 pb-10 pt-40 text-white">
        <Image src={c.image.src} alt={c.image.alt} fill priority sizes="100vw" className="-z-10 object-cover grayscale-[0.6]" />
        <div className="absolute inset-0 -z-10 bg-brand mix-blend-multiply" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/45 via-black/15 to-black/10" />
        <GridLines />
        <div className="relative flex max-w-[900px] flex-col items-start gap-5">
          <span className="flex flex-wrap items-center gap-2">
            <Label mono>{c.country}</Label>
            <Label tone="dark" mono>
              {c.facility}
            </Label>
          </span>
          <h1 className="text-hero">{c.title}</h1>
          <p className="text-body-lg max-w-[600px] text-white/85">
            {c.summary} <Tbc show={c.tbc} />
          </p>
        </div>
      </header>

      {/* Fixed facts, so projects can be scanned and compared */}
      <dl className="grid gap-px bg-brand-deep sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="Client / end user">{c.client}</Fact>
        <Fact label="Country · site type">
          {c.country} · {c.facility}
        </Fact>
        <Fact label="Service lines">{c.services.join(", ")}</Fact>
        <Fact label="Drakken scope">{c.scope.join(" · ")}</Fact>
      </dl>

      {/* Challenge / delivered / result */}
      <section className="grid gap-16 px-4 py-[120px] lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-14">
          <Reveal className="flex flex-col items-start gap-5">
            <Label>The Challenge</Label>
            <p className="text-lead">{c.challenge}</p>
          </Reveal>
          <Reveal className="flex flex-col items-start gap-5">
            <Label>What We Delivered</Label>
            <p className="text-body-lg max-w-[560px] text-muted">{c.delivered}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {c.equipment.map((e) => (
                <li key={e} className="bg-surface px-2.5 py-1.5 text-eyebrow">
                  {e}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal className="lg:pl-8">
          <div className="flex h-full min-h-[320px] flex-col justify-between gap-10 bg-lime p-8 text-teal lg:sticky lg:top-28 lg:h-auto lg:min-h-[420px]">
            <span className="flex items-center justify-between">
              <Label tone="dark" mono>
                Result
              </Label>
              <Tbc show={c.tbc} />
            </span>
            <div className="flex flex-col gap-3">
              <span className="text-[clamp(3.5rem,8vw,6.5rem)] font-medium leading-none tracking-[-0.05em]">{c.result.value}</span>
              <span className="text-body-lg">{c.result.label}</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Gallery */}
      {c.gallery.length > 0 && (
        <section className="grid gap-2 px-4 md:grid-cols-2">
          {c.gallery.map((g, i) => (
            <Reveal key={g.src} delay={i * 0.08} className={c.gallery.length === 1 ? "md:col-span-2" : ""}>
              <div className={`relative overflow-hidden bg-surface ${c.gallery.length === 1 ? "aspect-[21/9]" : "aspect-[4/3]"}`}>
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          ))}
        </section>
      )}

      {/* Optional testimonial */}
      {c.testimonial && (
        <section className="px-4 pt-[120px]">
          <figure className="mx-auto flex max-w-[900px] flex-col gap-6 text-center">
            <blockquote className="text-lead">“{c.testimonial.quote}”</blockquote>
            <figcaption className="text-eyebrow text-muted">
              {c.testimonial.name}, {c.testimonial.company}
            </figcaption>
          </figure>
        </section>
      )}

      {/* Related projects */}
      <section className="px-4 py-[120px]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="text-h2 !text-[clamp(2rem,3.5vw,2.75rem)]">Related projects</h2>
          <ArrowButton href="/projects" variant="dark">
            All Projects
          </ArrowButton>
        </div>
        <div className="grid gap-x-2 gap-y-10 md:grid-cols-3">
          {related.map((r) => (
            <ProjectCard key={r.slug} project={r} />
          ))}
        </div>
      </section>

      <Cta
        title="Discuss a similar project with our engineers"
        ctas={[
          { label: "Discuss a Similar Project", href: `mailto:info@drakken.co?subject=${encodeURIComponent(`Similar project: ${c.title}`)}` },
          { label: "Get the Capability Statement", href: "#" },
        ]}
      />
    </article>
  );
}

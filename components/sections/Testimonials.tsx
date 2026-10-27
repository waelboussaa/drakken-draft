import { testimonials } from "@/content/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { ClientLogo } from "@/components/ui/ClientLogo";

export function Testimonials() {
  return (
    <section className="bg-teal px-4 py-[120px] text-bg">
      <SectionHead index="06" label={testimonials.label} title={testimonials.title} />
      <div className="grid gap-2 md:grid-cols-2">
        {testimonials.items.map((t, i) => (
          <Reveal key={t.name} delay={(i % 2) * 0.08} className="h-full">
            <figure className="flex h-full flex-col justify-between gap-10 bg-white/5 p-6 md:p-8">
              <blockquote className="text-lead text-bg">
                <span aria-hidden className="mb-4 block h-10 text-display leading-[0.9] text-accent">“</span>
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center justify-between gap-6 border-t border-white/10 pt-5">
                <span className="flex flex-col gap-1">
                  <span className="text-body text-bg">{t.name}</span>
                  {t.project && <span className="text-eyebrow text-bg/60">{t.project}</span>}
                </span>
                <ClientLogo name="" src={t.logo.src} ratio={t.logo.ratio} height={44} className="text-bg/80" />
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

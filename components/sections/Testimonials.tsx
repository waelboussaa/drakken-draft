import { testimonials } from "@/content/site";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { Tbc } from "@/components/ui/Tbc";

export function Testimonials() {
  return (
    <section className="bg-teal-2 px-4 py-[120px] text-bg">
      <Reveal className="mb-14">
        <Label>{testimonials.label}</Label>
      </Reveal>
      <div className="grid gap-2 md:grid-cols-3">
        {testimonials.items.map((t, i) => (
          <Reveal key={i} delay={i * 0.08} className="h-full">
            <figure className="flex h-full flex-col justify-between gap-10 bg-teal p-6 md:p-8">
              <blockquote className="text-[clamp(1.35rem,2vw,1.6rem)] leading-snug tracking-[-0.04em] text-bg">
                <span aria-hidden className="mb-4 block text-5xl leading-none text-accent">“</span>
                {t.quote}
              </blockquote>
              <figcaption className="flex flex-col gap-1 border-t border-teal-2 pt-4">
                <span className="flex items-center gap-2 text-body text-bg">
                  {t.name}, {t.company} <Tbc show={t.tbc} />
                </span>
                <span className="text-eyebrow text-bg/50">{t.project}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

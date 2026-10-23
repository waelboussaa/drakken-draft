import { contact } from "@/content/site";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function Cta({
  title = contact.title,
  ctas = contact.ctas,
}: {
  title?: string;
  ctas?: { label: string; href: string }[];
}) {
  return (
    <section id="contact" className="plus-pattern flex min-h-[520px] flex-col items-center justify-center gap-8 bg-lime px-4 py-[120px] text-center text-teal">
      <Reveal>
        <SectionLabel>{contact.label}</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-[1100px] text-balance text-[clamp(2.75rem,6.5vw,6rem)] font-medium leading-[0.98] tracking-[-0.05em]">{title}</h2>
      </Reveal>
      <Reveal delay={0.1} className="flex flex-wrap justify-center gap-3">
        {ctas.map((c, i) => (
          <ArrowButton key={c.label} href={c.href} variant={i === 0 ? "dark" : "light"}>
            {c.label}
          </ArrowButton>
        ))}
      </Reveal>
    </section>
  );
}

import { contact } from "@/content/site";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText, type Title } from "@/components/ui/SplitText";

export function Cta({
  title = contact.title,
  ctas = contact.ctas,
}: {
  title?: Title;
  ctas?: { label: string; href: string }[];
}) {
  return (
    <section id="contact" className="plus-pattern flex min-h-[520px] flex-col items-center justify-center gap-8 bg-lime px-4 py-[120px] text-center text-teal">
      <Reveal>
        <SectionLabel>{contact.label}</SectionLabel>
      </Reveal>
      <SplitText className="max-w-[1100px] text-balance text-display" delay={0.1}>
        {title}
      </SplitText>
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

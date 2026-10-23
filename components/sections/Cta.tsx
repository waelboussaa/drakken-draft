import { contact } from "@/content/site";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";

export function Cta({
  title = contact.title,
  ctas = contact.ctas,
}: {
  title?: string;
  ctas?: { label: string; href: string }[];
}) {
  return (
    <section id="contact" className="plus-pattern flex min-h-[520px] flex-col items-center justify-center gap-6 bg-lime px-4 py-[120px] text-center text-teal">
      <Reveal>
        <Label tone="dark" mono>
          {contact.label}
        </Label>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-h2 max-w-[820px] text-balance">{title}</h2>
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

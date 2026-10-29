import { partners } from "@/content/site";
import { ClientLogo } from "@/components/ui/ClientLogo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

// Logo frame shared by the partner SVGs (233.8 × 105).
const RATIO = 233.8 / 105;

export function Partners() {
  return (
    <section id="partners" className="px-4 pb-[120px]">
      <SectionHead index="06" label={partners.label} title={partners.title} />
      <ul className="grid grid-cols-2 border-l border-t border-line md:grid-cols-5">
        {partners.items.map((p, i) => (
          <li key={p.name} className="h-full">
            <Reveal delay={i * 0.04} className="h-full">
              <div className="grid aspect-[3/2] place-items-center border-b border-r border-line text-muted transition-colors duration-300 hover:bg-surface hover:text-ink">
                <ClientLogo
                  name={p.name}
                  src={p.src}
                  ratio={p.scale ? 1 : RATIO}
                  height={p.scale ? 160 * p.scale : 72}
                  className="max-w-[80%]"
                />
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

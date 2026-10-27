import { credentials } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

export function Credentials() {
  return (
    <section id="credentials" className="px-4 pb-[120px]">
      <SectionHead index="05" label={credentials.label} title={credentials.title} />
      <div className="grid grid-cols-2 border-l border-t border-line md:grid-cols-5">
        {credentials.items.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05} className="h-full">
            {/* Top-aligned so the standard names line up across tiles whatever the description length. */}
            <div className="flex h-full flex-col gap-10 border-b border-r border-line p-5 transition-colors duration-300 hover:bg-surface md:p-6">
              <span className="text-eyebrow text-accent-strong">{c.kind}</span>
              <div className="flex flex-col gap-3">
                <span className="text-h3">{c.title}</span>
                <span className="text-body text-muted">{c.text}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

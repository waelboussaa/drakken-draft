import { credentials } from "@/content/site";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { Tbc } from "@/components/ui/Tbc";

export function Credentials() {
  return (
    <section id="credentials" className="px-4 pb-[120px]">
      <Reveal className="mb-14 flex flex-col items-start gap-6">
        <Label>{credentials.label}</Label>
        <h2 className="text-h2 max-w-[820px]">{credentials.title}</h2>
      </Reveal>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
        {credentials.items.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05} className="h-full">
            <div className="flex h-full min-h-[200px] flex-col justify-between gap-6 bg-surface p-5 transition-colors duration-300 hover:bg-lime">
              <span className="flex items-center justify-between">
                <span className="bg-teal px-1.5 py-1 text-eyebrow text-lime">{c.kind}</span>
                <Tbc show={c.tbc} />
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[clamp(1.4rem,2vw,1.75rem)] font-medium tracking-[-0.04em]">{c.title}</span>
                <span className="text-body text-muted">{c.text}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

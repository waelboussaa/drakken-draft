import { proof } from "@/content/site";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { ClientLogo } from "@/components/ui/ClientLogo";

/** Key numbers and a scrolling client strip, straight after the hero. */
export function Proof() {
  // Two identical halves (each the list twice) so the -50% loop never shows a gap.
  const strip = [...proof.clients, ...proof.clients, ...proof.clients, ...proof.clients];
  return (
    <section id="proof" className="bg-teal text-bg">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {proof.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="flex flex-col gap-3 bg-teal px-4 py-10 md:px-6 md:py-14">
            <span className="text-[clamp(2.75rem,5vw,4rem)] font-medium text-accent-light leading-none tracking-[-0.04em]">
              <Counter value={s.value} suffix={s.suffix} />
            </span>
            <span className="text-body text-bg/75">{s.label}</span>
          </Reveal>
        ))}
      </div>
      <div className="flex items-center gap-8 overflow-hidden py-6">
        <span className="shrink-0 pl-4 text-eyebrow text-bg/55">{proof.strip}</span>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="flex w-max animate-[marquee_30s_linear_infinite] motion-reduce:animate-none">
            {strip.map((c, i) => (
              <li key={i} aria-hidden={i >= proof.clients.length} className="flex shrink-0 items-center pr-20 text-bg/80">
                <ClientLogo name={c.name} src={c.logo} ratio={c.ratio} height={c.height} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

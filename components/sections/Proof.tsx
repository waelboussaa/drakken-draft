import { proof } from "@/content/site";
import { Counter } from "@/components/ui/Counter";
import { Tbc } from "@/components/ui/Tbc";

/** Key numbers and a scrolling client strip, straight after the hero. */
export function Proof() {
  // Two identical halves (each the list twice) so the -50% loop never shows a gap.
  const strip = [...proof.clients, ...proof.clients, ...proof.clients, ...proof.clients];
  return (
    <section id="proof" className="bg-teal text-bg">
      <div className="grid grid-cols-2 gap-px bg-teal-2 md:grid-cols-5">
        {proof.stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-3 bg-teal px-4 py-10 md:px-6 md:py-14">
            <span className="text-[clamp(2.75rem,5vw,4rem)] font-medium text-accent leading-none tracking-[-0.04em]">
              <Counter value={s.value} suffix={s.suffix} />
            </span>
            <span className="flex items-center gap-2 text-body text-bg/75">
              {s.label} <Tbc show={s.tbc} />
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-8 overflow-hidden border-t border-teal-2 py-6">
        <span className="shrink-0 pl-4 text-eyebrow text-bg/55">Trusted by</span>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="flex w-max animate-[marquee_30s_linear_infinite] motion-reduce:animate-none">
            {strip.map((c, i) => (
              <li key={i} aria-hidden={i >= proof.clients.length} className="whitespace-nowrap pr-16 text-2xl font-medium tracking-[-0.04em] text-bg/70">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

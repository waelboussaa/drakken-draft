import type { Metadata } from "next";
import { Suspense } from "react";
import { caseStudies, moreProjects } from "@/content/site";
import { buildPins, MapLegend, WorldMap } from "@/components/WorldMap";
import { ProjectsIndex } from "@/components/ProjectsIndex";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Cta } from "@/components/sections/Cta";

export const metadata: Metadata = {
  title: "Projects",
  description: "Drakken case studies: E-houses, SCADA, control systems and instrumentation delivered across the GCC, Iraq, Kurdistan and West Africa.",
};

export default function ProjectsPage() {
  // The map is rendered on the server and handed to the client filter as a slot.
  const map = (
    <div>
      <WorldMap pins={buildPins(caseStudies, false)} />
      <div className="mt-6">
        <MapLegend />
      </div>
    </div>
  );

  return (
    <>
      <section className="bg-teal px-4 pb-16 pt-40 text-bg">
        <div className="flex max-w-[860px] flex-col items-start gap-6">
          <SectionLabel>Case Studies</SectionLabel>
          <h1 className="text-h2">Projects delivered where it's hardest to deliver</h1>
          <p className="text-body-lg max-w-[560px] text-bg/75">
            Filter by service line, region or facility type to find a project like yours, then see exactly what Drakken delivered.
          </p>
        </div>
      </section>
      <Suspense>
        <ProjectsIndex map={map} />
      </Suspense>

      <section className="px-4 pb-[120px] pt-8">
        <h2 className="mb-8 text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-none tracking-[-0.05em]">More of our work</h2>
        <ul className="border-t border-line">
          {moreProjects.map((p) => (
            <li
              key={p.title}
              className="grid gap-x-8 gap-y-2 border-b border-line py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-[clamp(1.25rem,2vw,1.6rem)] font-medium tracking-[-0.04em]">{p.title}</h3>
                <span className="text-eyebrow text-muted">{[p.client, p.location].filter(Boolean).join(" · ")}</span>
              </div>
              <p className="text-body-lg text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <Cta title="Don't see a project like yours? Ask us." ctas={[{ label: "Speak to an Engineer", href: "/#contact" }]} />
    </>
  );
}

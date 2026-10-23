import type { Metadata } from "next";
import { Suspense } from "react";
import { caseStudies } from "@/content/site";
import { buildPins, MapLegend, WorldMap } from "@/components/WorldMap";
import { ProjectsIndex } from "@/components/ProjectsIndex";
import { Label } from "@/components/ui/Label";
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
          <Label>Case Studies</Label>
          <h1 className="text-h2">Projects delivered where it's hardest to deliver</h1>
          <p className="text-body-lg max-w-[560px] text-bg/75">
            Filter by service line, region or facility type to find a project like yours, then see exactly what Drakken delivered.
          </p>
        </div>
      </section>
      <Suspense>
        <ProjectsIndex map={map} />
      </Suspense>
      <Cta title="Don't see a project like yours? Ask us." ctas={[{ label: "Speak to an Engineer", href: "/#contact" }]} />
    </>
  );
}

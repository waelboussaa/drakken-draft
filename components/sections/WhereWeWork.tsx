import { caseStudies, workedInList } from "@/content/site";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { buildPins, MapLegend, WorldMap } from "@/components/WorldMap";

export function WhereWeWork() {
  return (
    <section className="px-4 py-[120px]">
      <SectionHead
        index="04"
        label="Where We Work"
        title="18 countries, four continents"
        aside={
          <>
            <p className="text-body-lg max-w-[320px] text-muted">Select a pin to open a featured project.</p>
            <ArrowButton href="/projects" variant="dark">
              Browse Projects
            </ArrowButton>
          </>
        }
      />

      <Reveal className="mx-auto max-w-[1040px]">
        <WorldMap pins={buildPins(caseStudies, true, true)} />
        <div className="mt-6 flex flex-col gap-4">
          <MapLegend regions />
          <p className="max-w-[760px] text-body text-muted">
            <span className="text-eyebrow text-teal">Worked in: </span>
            {workedInList.join(", ")}.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

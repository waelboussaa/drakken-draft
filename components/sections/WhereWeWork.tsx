import { ArrowButton } from "@/components/ui/ArrowButton";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { MapLegend, WorldMap } from "@/components/WorldMap";

export function WhereWeWork() {
  return (
    <section className="px-4 py-[120px]">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal className="flex max-w-[760px] flex-col items-start gap-6">
          <Label>Where We Work</Label>
          <p className="text-lead">
            18 countries, four continents. Select a pin to open the project.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ArrowButton href="/projects" variant="dark">
            Browse Projects
          </ArrowButton>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-16 max-w-[1040px]">
        <WorldMap />
        <div className="mt-6">
          <MapLegend />
        </div>
      </Reveal>
    </section>
  );
}

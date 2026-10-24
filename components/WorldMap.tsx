import { caseStudies, offices, workedIn, type CaseStudy } from "@/content/site";
import { mapSvg, project } from "@/lib/map";
import { MapPin, type Pin } from "@/components/sections/MapPin";

export function buildPins(projects: CaseStudy[] = caseStudies, withOffices = true, withRegions = false): Pin[] {
  const pins: Pin[] = [];
  for (const w of withRegions ? workedIn : []) {
    const p = project(w.lat, w.lon);
    if (p) pins.push({ ...p, label: w.name, kind: "region" });
  }
  for (const o of withOffices ? offices : []) {
    const p = project(o.lat, o.lon);
    if (p) pins.push({ ...p, label: o.city, sub: o.role, kind: "office" });
  }
  for (const c of projects) {
    const p = project(c.lat, c.lon);
    if (p) pins.push({ ...p, label: c.title, sub: c.country, href: `/projects/${c.slug}`, kind: "project" });
  }
  return pins;
}

/** Dotted world map with project, office and other-region pins. */
export function WorldMap({ pins = buildPins() }: { pins?: Pin[] }) {
  // Only project and office pins animate in, one after another; region dots are static,
  // so they must not push the pins' delays out.
  let animated = 0;
  return (
    <div className="relative">
      <div aria-hidden className="opacity-30 [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: mapSvg }} />
      {pins.map((p) => (
        <MapPin key={p.label} pin={p} delay={p.kind === "region" ? 0 : animated++ * 0.3} />
      ))}
    </div>
  );
}

export function MapLegend({ regions = false }: { regions?: boolean }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-eyebrow text-muted">
      <span className="flex items-center gap-2">
        <span className="size-3 rounded-full bg-accent" /> Featured project
      </span>
      <span className="flex items-center gap-2">
        <span className="size-3 bg-teal" /> Office
      </span>
      {regions && (
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent/70 ring-4 ring-accent/15" /> Also worked in
        </span>
      )}
    </div>
  );
}

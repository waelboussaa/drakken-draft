import { caseStudies, offices, type CaseStudy } from "@/content/site";
import { mapSvg, project } from "@/lib/map";
import { MapPin, type Pin } from "@/components/sections/MapPin";

export function buildPins(projects: CaseStudy[] = caseStudies, withOffices = true): Pin[] {
  const pins: Pin[] = [];
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

/** Dotted world map with project and office pins. */
export function WorldMap({ pins = buildPins() }: { pins?: Pin[] }) {
  return (
    <div className="relative">
      <div aria-hidden className="opacity-30 [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: mapSvg }} />
      {pins.map((p, i) => (
        <MapPin key={p.label} pin={p} delay={i * 0.3} />
      ))}
    </div>
  );
}

export function MapLegend() {
  return (
    <div className="flex gap-6 text-eyebrow text-muted">
      <span className="flex items-center gap-2">
        <span className="size-3 rounded-full bg-accent" /> Featured project
      </span>
      <span className="flex items-center gap-2">
        <span className="size-3 bg-teal" /> Office
      </span>
    </div>
  );
}

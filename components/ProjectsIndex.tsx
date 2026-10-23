"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { caseStudies, facilityTypes, regions, serviceLines } from "@/content/site";
import { ProjectCard } from "@/components/ProjectCard";

// URL keys for each filter, so a filtered view can be linked to (e.g. from a service card).
const groups = [
  { key: "service", label: "Service line", options: serviceLines },
  { key: "region", label: "Region", options: [...regions] },
  { key: "facility", label: "Facility type", options: [...facilityTypes] },
] as const;

type Key = (typeof groups)[number]["key"];

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`whitespace-nowrap rounded-[22px] px-3.5 py-2 text-[14px] tracking-[-0.02em] transition-colors ${
        active ? "bg-teal text-bg" : "bg-surface text-ink hover:bg-lime"
      }`}
    >
      {children}
    </button>
  );
}

export function ProjectsIndex({ map }: { map: React.ReactNode }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const view = params.get("view") === "map" ? "map" : "grid";
  const selected = (k: Key) => params.get(k);

  const set = (k: string, v: string | null) => {
    const next = new URLSearchParams(params);
    if (v === null) next.delete(k);
    else next.set(k, v);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const results = caseStudies.filter(
    (c) =>
      (!selected("service") || c.services.includes(selected("service")!)) &&
      (!selected("region") || c.region === selected("region")) &&
      (!selected("facility") || c.facility === selected("facility")),
  );
  const anyFilter = groups.some((g) => selected(g.key));

  return (
    <section className="px-4 py-16">
      <div className="flex flex-col gap-5 border-b border-line pb-8">
        {groups.map((g) => (
          <div key={g.key} className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <span className="w-32 shrink-0 text-eyebrow text-muted">{g.label}</span>
            <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
              <Chip active={!selected(g.key)} onClick={() => set(g.key, null)}>
                All
              </Chip>
              {g.options.map((o) => (
                <Chip key={o} active={selected(g.key) === o} onClick={() => set(g.key, selected(g.key) === o ? null : o)}>
                  {o}
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between py-6">
        <p className="text-eyebrow text-muted" aria-live="polite">
          {results.length} {results.length === 1 ? "project" : "projects"}
          {anyFilter && (
            <button
              className="ml-4 underline underline-offset-4"
              onClick={() => router.replace(view === "map" ? `${pathname}?view=map` : pathname, { scroll: false })}
            >
              Clear filters
            </button>
          )}
        </p>
        <div className="flex gap-1" role="group" aria-label="View">
          <Chip active={view === "grid"} onClick={() => set("view", null)}>
            Grid
          </Chip>
          <Chip active={view === "map"} onClick={() => set("view", "map")}>
            Map
          </Chip>
        </div>
      </div>

      {view === "map" ? (
        map
      ) : results.length ? (
        <motion.div layout className="grid gap-x-2 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <p className="py-24 text-center text-body-lg text-muted">No projects match these filters yet.</p>
      )}
    </section>
  );
}

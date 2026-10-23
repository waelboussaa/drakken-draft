import { caseStudies, featuredSlugs } from "@/content/site";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";

export function Featured() {
  const items = featuredSlugs.flatMap((s) => caseStudies.filter((c) => c.slug === s));
  return (
    <section className="px-4 py-[120px]">
      <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex flex-col items-start gap-6">
          <Label>Featured Projects</Label>
          <h2 className="text-h2">Proven in the hardest places</h2>
        </div>
        <ArrowButton href="/projects" variant="dark">
          All Projects
        </ArrowButton>
      </Reveal>
      <div className="grid gap-x-2 gap-y-10 md:grid-cols-3">
        {items.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

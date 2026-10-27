import { caseStudies, featuredSlugs } from "@/content/site";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

export function Featured() {
  const items = featuredSlugs.flatMap((s) => caseStudies.filter((c) => c.slug === s));
  return (
    <section className="px-4 py-[120px]">
      <SectionHead
        index="02"
        label="Featured Projects"
        title={["Proven", "in the hardest places"]}
        aside={
          <ArrowButton href="/projects" variant="dark">
            All Projects
          </ArrowButton>
        }
      />
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

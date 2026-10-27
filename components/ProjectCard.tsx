import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/site";
import { Arrow } from "@/components/ui/ArrowButton";

/** Case-study card: image, name, country, service line, one-line result. */
export function ProjectCard({ project, sizes = "(min-width: 768px) 33vw, 100vw" }: { project: CaseStudy; sizes?: string }) {
  return (
    <Link href={`/projects/${project.slug}`} data-cursor="plus" className="group flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-bg/90 px-2 py-1 text-eyebrow text-teal backdrop-blur-sm">
          {project.country}
        </span>
        <span className="absolute bottom-3 right-3 flex translate-y-3 items-center gap-0.5 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          <span className="rounded-[22px] bg-white/25 px-4 py-2.5 text-[15px] leading-5 tracking-[-0.02em] text-white backdrop-blur-[5px]">View Project</span>
          <span className="grid size-[38px] place-items-center rounded-full bg-white/25 text-white backdrop-blur-[5px]">
            <Arrow />
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-eyebrow text-muted">{project.services.join(" · ")}</span>
        <h3 className="text-h4">{project.title}</h3>
        <p className="text-body text-muted">{project.summary}</p>
      </div>
    </Link>
  );
}

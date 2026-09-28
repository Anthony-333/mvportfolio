import { ArrowUpRight, Code2 } from "lucide-react";
import { featuredProjects } from "@/lib/data";
import { ProjectGallery } from "./project-gallery";
import { Reveal } from "./reveal";
import { card, Section } from "./sections";

export function Projects() {
  return (
    <Section id="projects" eyebrow="Selected projects" title={<>A closer look at <span className="text-muted">recent work</span></>}>
      <ul className="grid gap-8">
        {featuredProjects.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 80} className={`${card} group p-1.5`}>
            <ProjectGallery title={p.title} images={p.images} />

            <div className="grid gap-8 p-6 sm:p-7 md:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="flex items-center gap-3 text-sm text-muted">
                  <span className="tabular-nums">0{i + 1}</span>
                  <span className="h-px w-6 bg-line" />
                  <span className="tabular-nums">{p.year}</span>
                </p>
                <h3 className="mt-4 text-2xl font-medium tracking-tight">{p.title}</h3>
                <p className="text-sm text-accent-deep dark:text-accent">{p.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{p.description}</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-between gap-8">
                <div>
                  <h4 className="text-sm text-muted">Built with</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 text-xs">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.links.live && (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-neutral-900 transition hover:bg-fg hover:text-bg"
                    >
                      Live site <ArrowUpRight className="size-4" />
                    </a>
                  )}
                  {p.links.code && (
                    <a
                      href={p.links.code}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-fg"
                    >
                      <Code2 className="size-4" /> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

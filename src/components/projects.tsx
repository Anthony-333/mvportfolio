"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, Download } from "lucide-react";
import { featuredProjects, projectCategories, type ProjectCategory } from "@/lib/data";
import { ProjectGallery } from "./project-gallery";
import { Reveal } from "./reveal";
import { card, Section } from "./sections";

type Filter = "All" | ProjectCategory;

const filters: Filter[] = ["All", ...projectCategories];

const arrowButton =
  "grid size-11 place-items-center rounded-full border border-line transition hover:border-fg disabled:pointer-events-none disabled:opacity-30";

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [edges, setEdges] = useState({ start: true, end: true });
  const trackRef = useRef<HTMLUListElement>(null);

  const projects = filter === "All" ? featuredProjects : featuredProjects.filter((p) => p.category === filter);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    updateEdges();
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, [filter, updateEdges]);

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current;
    const item = el?.firstElementChild as HTMLElement | null;
    if (!el || !item) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <Section id="projects" eyebrow="Selected projects" title={<>A closer look at <span className="text-muted">recent work</span></>}>
      <Reveal className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                filter === f ? "border-accent bg-accent font-medium text-neutral-900" : "border-line hover:border-fg"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-label="Previous project" className={arrowButton}>
            <ArrowLeft className="size-4" />
          </button>
          <button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-label="Next project" className={arrowButton}>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </Reveal>

      <ul
        ref={trackRef}
        onScroll={updateEdges}
        aria-label="Projects"
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-2"
      >
        {projects.map((p) => (
          <li key={p.title} className={`${card} group flex w-[85%] shrink-0 snap-start flex-col p-1.5 sm:w-[70%] lg:w-[48%]`}>
            <ProjectGallery title={p.title} images={p.images} />

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <p className="flex items-center gap-3 text-sm text-muted">
                <span>{p.category}</span>
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

              <ul className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <li key={t} className="rounded-full border border-line px-3 py-1 text-xs">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                {p.links.live && (
                  <a
                    href={p.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-neutral-900 transition hover:bg-fg hover:text-bg"
                  >
                    {p.category === "Email development" ? "View email" : "Live site"} <ArrowUpRight className="size-4" />
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
                {p.links.download && (
                  <a
                    href={p.links.download}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-fg"
                  >
                    <Download className="size-4" /> Download .eml
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

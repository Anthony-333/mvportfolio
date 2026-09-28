import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight, Award, FileText, GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { certificates, education, experience, profile, projects, services, skills, summary } from "@/lib/data";
import { LinkedInIcon } from "./icons";
import { Reveal } from "./reveal";

export function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-line py-24">
      <Reveal>
        <p className="text-sm text-muted">{eyebrow}</p>
        <h2 className="mt-3 max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-tight">{title}</h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}

export const card = "rounded-3xl border border-line bg-surface";

export function Services() {
  return (
    <Section id="services" eyebrow="What I do" title={<>Front-end work, <span className="text-muted">done right</span></>}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {services.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 80} className={`${card} p-7 transition hover:-translate-y-1`}>
            <span className="text-sm text-muted tabular-nums">0{i + 1}</span>
            <h3 className="mt-10 text-xl font-medium">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export function About() {
  return (
    <Section id="about" eyebrow="About" title={<>Clean pages, <span className="text-accent-deep dark:text-accent">consistent</span> everywhere</>}>
      <Reveal className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          {summary.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="flex items-center gap-2 text-base">
            <MapPin className="size-4" /> Based in the {profile.location}
          </p>
        </div>
        <div className="grid gap-4 self-start">
          <div className={`${card} p-5`}>
            <p className="flex items-center gap-2 text-sm text-muted">
              <GraduationCap className="size-4" /> Education
            </p>
            <p className="mt-3 font-medium">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">
              {education.school} · {education.date} · GPA {education.gpa}
            </p>
          </div>
          {certificates.map((c) => (
            <div key={c.title} className={`${card} p-5`}>
              <p className="flex items-center gap-2 text-sm text-muted">
                <Award className="size-4" /> Certificate
              </p>
              <p className="mt-3 font-medium">{c.title}</p>
              <p className="mt-1 text-sm text-muted">
                {c.issuer}, {c.year}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I’ve worked">
      <ol className="divide-y divide-line border-y border-line">
        {experience.map((e, i) => (
          <Reveal as="li" key={e.period} delay={i * 60} className="grid gap-4 py-8 sm:grid-cols-[11rem_1fr] sm:gap-8">
            <div className="text-sm text-muted">
              <p className="tabular-nums">{e.period}</p>
              <p className="mt-1">{e.location}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">{e.role}</h3>
              <p className="text-sm text-accent-deep dark:text-accent">{e.company}</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                {e.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function Work() {
  return (
    <Section id="work" eyebrow="What I’ve built" title={<>Building websites &amp; emails people remember</>}>
      {/* Desktop: fanned 3D stack. Mobile: horizontal scroller. */}
      <div className="relative hidden aspect-5/4 max-w-160 md:block">
        {projects.map((p, i) => (
          <a
            key={p.title}
            href="#experience"
            // Stack order lives in a CSS variable so hover/focus can override it.
            style={{ left: `${i * 14}%`, top: `${i * 13}%`, "--z": i } as CSSProperties}
            className="group absolute z-(--z) w-[38%] perspective-distant hover:z-50 focus-visible:z-50"
          >
            <div
              className={`aspect-square rounded-2xl bg-linear-to-br ${p.hue} p-5 text-white shadow-2xl ring-1 ring-white/10 transition duration-500 transform-[rotateY(-22deg)_rotateX(8deg)] group-hover:-translate-y-6 group-hover:transform-[rotateY(0)_rotateX(0)]`}
            >
              <div className="flex h-full flex-col justify-between">
                <span className="self-start rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">{p.tag}</span>
                <span className="flex items-end justify-between gap-2 text-lg font-medium leading-snug">
                  {p.title}
                  <ArrowUpRight className="size-5 shrink-0 opacity-0 transition group-hover:opacity-100" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
      <ul className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 md:hidden">
        {projects.map((p) => (
          <li key={p.title} className={`aspect-square w-64 shrink-0 snap-start rounded-2xl bg-linear-to-br ${p.hue} p-5 text-white`}>
            <div className="flex h-full flex-col justify-between">
              <span className="self-start rounded-full bg-white/15 px-3 py-1 text-xs">{p.tag}</span>
              <span className="text-lg font-medium">{p.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="My everyday stack">
      <div className="grid gap-8 sm:grid-cols-2">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 60}>
            <h3 className="text-sm text-muted">{g.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {g.items.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line bg-surface px-4 py-2 text-sm transition hover:border-accent hover:text-accent-deep dark:hover:text-accent"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Contact() {
  const links = [
    { href: profile.phoneHref, label: profile.phone, Icon: Phone },
    { href: profile.linkedin, label: "linkedin.com/in/ma-valencia", Icon: LinkedInIcon },
  ];
  return (
    <Section id="contact" eyebrow="Contact" title={<>Looking for a front-end developer? <span className="text-muted">Let&rsquo;s talk.</span></>}>
      <Reveal className="flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-3 rounded-full bg-accent py-2 pl-2 pr-6 font-medium text-neutral-900 transition hover:bg-fg hover:text-bg"
        >
          <span className="grid size-10 place-items-center rounded-full bg-neutral-900 text-accent">
            <Mail className="size-4" />
          </span>
          {profile.email}
        </a>
        <a
          href={profile.cv}
          download={profile.cvFileName}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-4 text-sm transition hover:border-fg"
        >
          <FileText className="size-4" /> Download Resume
        </a>
      </Reveal>
      <Reveal delay={100} as="ul" className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
        {links.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              {...(href.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
              className="inline-flex items-center gap-2 transition hover:text-fg"
            >
              <Icon className="size-4" /> {label}
            </a>
          </li>
        ))}
      </Reveal>
      <footer className="mt-24 flex flex-wrap justify-between gap-4 text-sm text-muted">
        <span>
          &copy; {new Date().getFullYear()} {profile.name}
        </span>
      </footer>
    </Section>
  );
}

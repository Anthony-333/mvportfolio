import Image from "next/image";
import { Orbit } from "lucide-react";
import { companies, profile, stats } from "@/lib/data";
import { ClientMark } from "./icons";
import { Reveal } from "./reveal";

function Ribbon() {
  return (
    // On desktop the tail stays solid so ScrollRibbon can carry it on down the page.
    <svg viewBox="0 0 600 300" fill="none" className="h-full w-full overflow-visible lg:[--ribbon-tail:1]" data-ribbon-anchor aria-hidden>
      <defs>
        <linearGradient id="ribbon" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="0.35" stopColor="var(--accent)" />
          <stop offset="0.8" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent)" style={{ stopOpacity: "var(--ribbon-tail, 0)" }} />
        </linearGradient>
        <linearGradient id="ribbon-shade" x1="0" y1="0" x2="0" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0.3" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <path
        className="ribbon-path"
        pathLength={1}
        d="M0 135 C 110 150, 210 80, 315 65 C 400 52, 460 90, 460 160 C 460 240, 400 280, 340 270 C 280 260, 250 215, 270 170 C 300 110, 420 90, 600 100"
        stroke="url(#ribbon)"
        strokeWidth="46"
        strokeLinecap="butt"
      />
      <path
        className="ribbon-path"
        pathLength={1}
        d="M0 135 C 110 150, 210 80, 315 65 C 400 52, 460 90, 460 160 C 460 240, 400 280, 340 270 C 280 260, 250 215, 270 170 C 300 110, 420 90, 600 100"
        stroke="url(#ribbon-shade)"
        strokeWidth="46"
        strokeLinecap="butt"
      />
    </svg>
  );
}

function Badge() {
  return (
    <div className="absolute left-[52.5%] top-[21.7%] size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-bg bg-surface text-fg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)] sm:size-34 dark:border-neutral-800 dark:bg-neutral-950">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
        </defs>
        <text fill="currentColor" fontSize="8.4" letterSpacing="1.6" fontWeight="500">
          <textPath href="#badge-circle">{profile.badge}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 40 40" className="absolute inset-0 m-auto size-1/3" fill="none" stroke="currentColor" strokeWidth="0.9" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx={14 + i * 4} cy="20" rx="7" ry="13" transform={`rotate(-12 ${14 + i * 4} 20)`} />
        ))}
      </svg>
      <span className="sr-only">Front-end developer since 2023</span>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="flex min-h-[calc(100svh-2rem)] scroll-mt-4 flex-col pt-4 lg:pt-10">
      <Reveal className="flex items-center gap-4">
        <Image src={profile.avatar} alt="" width={52} height={52} className="rounded-full border border-line bg-surface p-0.5" />
        <div>
          <p className="font-medium">{profile.name}</p>
          <p className="text-sm text-muted">{profile.role}</p>
        </div>
      </Reveal>

      <Reveal as="h1" delay={100} className="mt-12 text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[1.12] tracking-tight">
        I&rsquo;m building{" "}
        <span className="inline-block rounded-full bg-surface px-[0.3em] text-accent-deep shadow-[0_4px_20px_-8px_rgba(0,0,0,0.25)] dark:bg-linear-to-b dark:from-accent dark:to-accent-deep dark:text-white">
          websites
        </span>
        <br />
        <span className="inline-block rounded-full bg-neutral-800 px-[0.3em] text-accent dark:bg-surface-2">&amp; emails</span> that
        work
        <br />
        everywhere
      </Reveal>

      <div className="relative -mx-2 mt-2 aspect-2/1 max-w-160">
        <Ribbon />
        <Badge />
      </div>

      <Reveal delay={200} className="relative z-10 mt-4 flex gap-14 sm:-mt-24">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-5xl font-light tracking-tight sm:text-6xl">{s.value}</p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </Reveal>

      <Reveal delay={300} className="mt-auto pt-16">
        <p className="flex items-center gap-2 text-sm">
          <Orbit className="size-4" /> Where I&rsquo;ve worked (2023&ndash;26)
        </p>
        <div className="mask-fade-x mt-6 max-w-100 overflow-hidden">
          <ul className="flex w-max animate-marquee gap-12">
            {[...companies, ...companies, ...companies, ...companies].map(({ name }, i) => (
              <li key={i} aria-hidden={i >= companies.length} className="flex items-center gap-2 whitespace-nowrap text-xl font-bold tracking-tight text-muted">
                <ClientMark variant={i} className="size-6" />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

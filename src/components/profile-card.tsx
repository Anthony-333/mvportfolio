import Image from "next/image";
import { ArrowUpRight, FileText, Mail, Phone } from "lucide-react";
import { profile } from "@/lib/data";
import { LinkedInIcon, Logo } from "./icons";

const socials = [
  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  { href: profile.phoneHref, label: "Phone", Icon: Phone },
];

export function ProfileCard() {
  return (
    <aside className="relative h-[85svh] min-h-140 w-full rounded-[34px] border border-line bg-surface p-1.5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] lg:sticky lg:top-4 lg:h-[calc(100svh-2rem)] lg:w-95 lg:shrink-0 xl:w-100">
      <div className="relative h-full overflow-hidden rounded-[28px] bg-neutral-900">
        <Image
          src={profile.portrait}
          alt={`Portrait of ${profile.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 400px, 100vw"
          className="origin-bottom scale-115 object-cover transition-[filter] duration-700 dark:grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent via-45% to-black/90" />

        <Logo className="absolute left-6 top-6 size-9 text-neutral-900 dark:text-white" />

        <ul className="absolute right-5 top-5 flex flex-col gap-2.5">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
                aria-label={label}
                className="grid size-10 place-items-center rounded-full bg-white text-neutral-900 shadow-sm transition hover:scale-110 dark:bg-white/10 dark:text-white dark:backdrop-blur-md"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>

        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <h2 className="text-3xl font-light tracking-tight">Hey, I&rsquo;m {profile.shortName}</h2>
          <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/60">{profile.intro}</p>
          <div className="my-6 h-px bg-white/10" />
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              aria-label="Go to contact"
              className="grid size-10 place-items-center rounded-full bg-accent text-neutral-900 transition hover:rotate-45"
            >
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href="#contact"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-neutral-900 transition hover:bg-white"
            >
              Let&rsquo;s talk
            </a>
            <a href={profile.cv} download={profile.cvFileName} className="ml-2 flex items-center gap-2 text-sm text-white/80 transition hover:text-white">
              <FileText className="size-4" />
              Download CV
            </a>
          </div>
        </div>
      </div>

      {profile.available && (
        <div className="absolute -left-px top-1/2 hidden -translate-y-1/2 rounded-r-2xl border border-l-0 border-line bg-bg py-5 pl-1.5 pr-2.5 sm:block">
          <span className="flex rotate-180 items-center gap-2 text-xs font-medium [writing-mode:vertical-rl]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Available for Work
          </span>
        </div>
      )}
    </aside>
  );
}

"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  ArrowUp,
  Boxes,
  BriefcaseBusiness,
  FolderOpen,
  CircleUser,
  Copy,
  House,
  Moon,
  Send,
  Sparkles,
  Sun,
  type LucideIcon,
} from "lucide-react";

export const sections: { id: string; label: string; Icon: LucideIcon }[] = [
  { id: "home", label: "Home", Icon: House },
  { id: "services", label: "Services", Icon: Sparkles },
  { id: "about", label: "About", Icon: CircleUser },
  { id: "experience", label: "Experience", Icon: BriefcaseBusiness },
  { id: "work", label: "Built", Icon: Copy },
  { id: "projects", label: "Projects", Icon: FolderOpen },
  { id: "skills", label: "Skills", Icon: Boxes },
  { id: "contact", label: "Contact", Icon: Send },
];

const pill = "rounded-full border border-line bg-surface shadow-sm";

// The theme lives on <html data-theme>, set by the inline script in layout.tsx.
function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const getServerTheme = () => "light" as const;

export function SideNav() {
  const [active, setActive] = useState("home");
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A section counts as active when it crosses the middle of the viewport.
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  const ThemeIcon = theme === "dark" ? Moon : Sun;

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-4 z-50 flex items-center justify-center gap-2 lg:inset-x-auto lg:bottom-auto lg:right-4 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col"
    >
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className={`${pill} grid size-10 place-items-center text-muted transition hover:text-fg`}
      >
        <ThemeIcon className="size-4" />
      </button>

      <ul className={`${pill} flex gap-1 p-1 lg:flex-col`}>
        {sections.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <li key={id} className="group relative">
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                className={`grid size-8 place-items-center rounded-full transition ${
                  isActive ? "bg-surface-2 text-accent-deep dark:text-accent" : "text-muted hover:text-fg"
                }`}
              >
                <Icon className="size-4" />
              </a>
              <span
                className={`${pill} pointer-events-none absolute right-full top-1/2 mr-4 hidden -translate-y-1/2 whitespace-nowrap px-3 py-1 text-xs font-medium transition lg:block ${
                  isActive ? "opacity-100" : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>

      <a href="#home" aria-label="Back to top" className={`${pill} hidden sm:grid size-10 place-items-center text-muted transition hover:text-fg`}>
        <ArrowUp className="size-4" />
      </a>
    </nav>
  );
}

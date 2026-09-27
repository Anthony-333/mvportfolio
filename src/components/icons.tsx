import type { SVGProps } from "react";

// lucide-react no longer ships brand marks, so these are hand-drawn.

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13v5.43h-4v-4.82c0-1.15-.02-2.63-1.6-2.63-1.61 0-1.86 1.25-1.86 2.55v4.9h-4v-11Z" />
    </svg>
  );
}

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden {...props}>
      <path d="M20 4a16 16 0 1 1-11.3 27.3L20 20V4Z" fill="currentColor" />
      <path d="M4 22 18 36H4V22Z" fill="currentColor" opacity=".45" />
    </svg>
  );
}

export function ClientMark({ variant, ...props }: SVGProps<SVGSVGElement> & { variant: number }) {
  const marks = [
    <path key="0" d="M12 2 21 6v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4Z" />,
    <path key="1" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" fillRule="evenodd" />,
    <path key="2" d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 3.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z" />,
  ];
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      {marks[variant % marks.length]}
    </svg>
  );
}

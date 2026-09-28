"use client";

import Image from "next/image";
import { useState } from "react";

export function ProjectGallery({ title, images }: { title: string; images: string[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative aspect-8/5 overflow-hidden rounded-[20px] bg-surface-2">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${title} preview ${i + 1}`}
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          className={`object-cover transition duration-700 group-hover:scale-[1.03] ${i === current ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-3 flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Show ${title} preview ${i + 1}`}
              aria-pressed={i === current}
              className={`relative h-10 w-16 overflow-hidden rounded-lg ring-2 transition ${
                i === current ? "ring-accent" : "ring-white/30 opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

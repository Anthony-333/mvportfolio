"use client";

import { useEffect, useRef, useState } from "react";
import { sections } from "./side-nav";

type Pt = [number, number];
type Geometry = { left: string[]; right: string[]; ys: number[]; nodes: { at: Pt; index: number }[] };

// Matches the hero ribbon: 600×300 viewBox, 46-unit stroke ending at (600, 100) heading right.
const HERO_VIEWBOX = 600;
const HERO_STROKE = 46;
const BODY_WIDTH = 18;
// The trail is drawn down to this fraction of the viewport height.
const READ_LINE = 0.7;
// Sample spacing along the centreline, and the radius of the turns in and out of the lanes.
const STEP = 5;
const TURN = 70;
const CHUNK = 40;
// Curl shape: forward travel per radian relative to the curl height (smaller = rounder loop),
// and where the eye of the loop sits below the line, as a multiple of the curl height.
const CURL_PITCH = 0.22;
const CURL_EYE = 1.09;
const { PI } = Math;

// Centreline built from lines, arcs and cubics, sampled as a polyline.
class Trail {
  pts: Pt[];
  constructor(start: Pt) {
    this.pts = [start];
  }
  get end() {
    return this.pts[this.pts.length - 1];
  }
  line(to: Pt) {
    const [x, y] = this.end;
    const n = Math.ceil(Math.hypot(to[0] - x, to[1] - y) / STEP);
    for (let i = 1; i <= n; i++) this.pts.push([x + ((to[0] - x) * i) / n, y + ((to[1] - y) * i) / n]);
  }
  // Angles in radians; the radius can shrink along the way to make a spiral.
  arc(c: Pt, r: number, from: number, to: number, endRadius = r) {
    const n = Math.ceil((Math.abs(to - from) * r) / STEP);
    for (let i = 1; i <= n; i++) {
      const a = from + ((to - from) * i) / n;
      const rr = r + ((endRadius - r) * i) / n;
      this.pts.push([c[0] + rr * Math.cos(a), c[1] + rr * Math.sin(a)]);
    }
  }
  // One turn of a prolate trochoid travelling `dir` along the current line: it swings down through
  // a curl that crosses over itself, like the loop in the hero ribbon, and returns to the line.
  curl(b: number, dir: number) {
    const [x0, y] = this.end;
    const a = b * CURL_PITCH;
    const n = Math.ceil((2 * PI * (a + b) * 1.3) / STEP);
    for (let i = 1; i <= n; i++) {
      const u = -PI + (2 * PI * i) / n;
      this.pts.push([x0 + dir * (a * (u + PI) - b * Math.sin(u)), y + b + b * Math.cos(u)]);
    }
  }
  cubic(b: Pt, c: Pt, d: Pt) {
    const a = this.end;
    const n = Math.ceil(Math.hypot(d[0] - a[0], d[1] - a[1]) / STEP) * 2;
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      const k = [(1 - t) ** 3, 3 * (1 - t) ** 2 * t, 3 * (1 - t) * t ** 2, t ** 3];
      this.pts.push([0, 1].map((j) => k[0] * a[j] + k[1] * b[j] + k[2] * c[j] + k[3] * d[j]) as Pt);
    }
  }
}

function measure(wrap: HTMLElement): Geometry | null {
  const anchor = wrap.querySelector("[data-ribbon-anchor]");
  const main = wrap.parentElement;
  const aside = main?.previousElementSibling;
  if (!anchor || !main) return null;

  const box = wrap.getBoundingClientRect();
  const hero = anchor.getBoundingClientRect();
  const W = box.width;
  // Two lanes, one in each gutter: right of the content (clear of the side nav) and between it and the profile card.
  const xR = W + Math.min(Math.max((main.getBoundingClientRect().right - box.right) / 2 - 10, 30), 40);
  const xL = -(aside ? box.left - aside.getBoundingClientRect().right : 64) / 2;
  const scale = hero.width / HERO_VIEWBOX;
  // Begin a couple of pixels inside the hero ribbon so the two overlap without a hairline seam.
  const start: Pt = [hero.right - box.left - 2, hero.top + hero.height / 3 - box.top];

  // Leave the hero heading right (same tangent as the hero path), then ease down into the right lane.
  const t = new Trail(start);
  const run = xR - start[0];
  t.cubic([start[0] + run * 0.6, start[1] + run * 0.03], [xR, start[1] + 70], [xR, start[1] + 200]);

  // Each break is the empty band between one section's content and the next section's heading.
  const breaks = sections
    .filter((s) => s.id !== "home")
    .map((s) => document.getElementById(s.id))
    .filter((el): el is HTMLElement => !!el && !!el.previousElementSibling)
    .map((el) => {
      const prev = el.previousElementSibling as HTMLElement;
      const from = prev.getBoundingClientRect().bottom - parseFloat(getComputedStyle(prev).paddingBottom);
      const to = el.getBoundingClientRect().top + parseFloat(getComputedStyle(el).paddingTop);
      // Curl height that keeps the turns, the curl and the ribbon's own width inside the band.
      const b = Math.min(50, Math.max(14, (to - from) / 2 - 30));
      // Line of travel, placed so everything from the turn above it to the curl below is centred.
      return { y: (from + to) / 2 - box.top - b + 5, b };
    })
    .filter(({ y }) => y - TURN > start[1] + 200)
    .sort((a, b) => a.y - b.y);

  // At each break the ribbon sweeps across to the other gutter, curling once on the way over,
  // so it winds around the content like a spiral. The last break ends in an inward spiral.
  const nodes: Geometry["nodes"] = [];
  let side = 1; // 1 = right lane, -1 = left lane
  breaks.forEach(({ y, b }, i) => {
    const s = -side; // direction of travel across the page
    const [xa, xb] = side > 0 ? [xR, xL] : [xL, xR];
    const cx = W * (0.5 + (i % 2 ? 0.14 : -0.14));

    t.line([xa, y - TURN]);
    t.arc([xa + s * TURN, y - TURN], TURN, s < 0 ? 0 : PI, PI / 2); // down → across

    if (i === breaks.length - 1) {
      // Wind inward on a circle hanging below the line, tapering to a point.
      const r = b * 1.1;
      t.line([cx, y]);
      t.arc([cx, y + r], r, -PI / 2, -PI / 2 + s * 3 * PI, r * 0.2);
      return;
    }

    // A curl centred on cx, with a marker in its eye. Gaps too tight for a readable curl get a plain sweep.
    if (b >= 30) {
      const pitch = 2 * PI * b * CURL_PITCH;
      t.line([cx - (s * pitch) / 2, y]);
      t.curl(b, s);
      nodes.push({ at: [cx, y + b * CURL_EYE], index: t.pts.length - 1 });
    }
    t.line([xb - s * TURN, y]);
    t.arc([xb - s * TURN, y + TURN], TURN, 1.5 * PI, s < 0 ? PI : 2 * PI); // across → down
    side = -side;
  });

  // Offset the centreline on both sides to get a ribbon whose width can vary along its length.
  const { pts } = t;
  const lengths = [0];
  for (let i = 1; i < pts.length; i++) lengths.push(lengths[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = lengths[lengths.length - 1];
  const startWidth = HERO_STROKE * scale;
  const left: string[] = [];
  const right: string[] = [];
  pts.forEach((p, i) => {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(pts.length - 1, i + 1)];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const n: Pt = [-(b[1] - a[1]) / len, (b[0] - a[0]) / len];
    const s = lengths[i];
    // Starts at the hero ribbon's width, eases to a slimmer trail, tapers to a point at the end.
    const half = ((BODY_WIDTH + (startWidth - BODY_WIDTH) * Math.exp(-s / 260)) * Math.min(1, (total - s) / 220)) / 2;
    left.push(`${(p[0] + n[0] * half).toFixed(1)} ${(p[1] + n[1] * half).toFixed(1)}`);
    right.push(`${(p[0] - n[0] * half).toFixed(1)} ${(p[1] - n[1] * half).toFixed(1)}`);
  });

  return { left, right, ys: pts.map((p) => p[1]), nodes };
}

export function ScrollRibbon() {
  const svgRef = useRef<SVGSVGElement>(null);
  const trailRef = useRef<SVGGElement>(null);
  const [nodes, setNodes] = useState<Geometry["nodes"]>([]);
  const [drawn, setDrawn] = useState(0);

  useEffect(() => {
    const svg = svgRef.current;
    const trail = trailRef.current;
    const wrap = svg?.parentElement;
    if (!svg || !trail || !wrap) return;

    // The ribbon is split into short overlapping chunks so each frame only repaints the growing tip.
    let chunks: { path: SVGPathElement; drawn: number }[] = [];
    const outline = (from: number, to: number) =>
      to - from < 2 || !geo
        ? ""
        : `M${geo.left.slice(from, to).join("L")}L${geo.right.slice(from, to).reverse().join("L")}Z`;
    const setChunk = (i: number, upTo: number) => {
      const chunk = chunks[i];
      const from = i * CHUNK;
      // Full chunks reach two samples into the next one so neighbours overlap without seams.
      const to = Math.min(upTo, from + CHUNK + 2);
      if (chunk.drawn === to) return;
      chunk.drawn = to;
      chunk.path.setAttribute("d", outline(from, to));
    };

    let geo: Geometry | null = null;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Hold the trail back until the hero ribbon has finished drawing in.
    let ready = reduced;
    let shown = 0; // number of centreline samples currently drawn (eases toward the target)
    let frame = 0;

    const draw = () => {
      frame = 0;
      if (!geo) return;
      const line = innerHeight * READ_LINE - wrap.getBoundingClientRect().top;
      // Draw along the path up to the first point that dips below the reading line.
      let target = 0;
      if (ready) {
        target = geo.ys.findIndex((y) => y > line);
        // At the bottom of the page the reading line can't reach the end, so finish the trail.
        const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
        if (target < 0 || atBottom) target = geo.ys.length;
      }
      shown = reduced ? target : shown + (target - shown) * 0.12;
      if (Math.abs(target - shown) < 0.5) shown = target;

      const k = Math.floor(shown);
      chunks.forEach((_, i) => setChunk(i, k));
      setDrawn(geo.nodes.filter((n) => n.index < k).length);
      if (shown !== target) schedule();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const update = () => {
      geo = measure(wrap);
      trail.replaceChildren();
      chunks = Array.from({ length: geo ? Math.ceil(geo.ys.length / CHUNK) : 0 }, () => ({
        path: trail.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path")),
        drawn: 0,
      }));
      if (geo) shown = Math.min(shown, geo.ys.length);
      setNodes(geo?.nodes ?? []);
      schedule();
    };

    const timer = setTimeout(() => {
      ready = true;
      schedule();
    }, ready ? 0 : 2400);

    update();
    const resize = new ResizeObserver(update);
    resize.observe(wrap);
    if (wrap.parentElement) resize.observe(wrap.parentElement);
    addEventListener("scroll", schedule, { passive: true });

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      resize.disconnect();
      removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      width="1"
      height="1"
      className="pointer-events-none absolute left-0 top-0 -z-10 hidden overflow-visible lg:block"
    >
      <g ref={trailRef} fill="var(--accent)" />
      {nodes.map(({ at: [x, y] }, i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="5"
          fill="var(--bg)"
          stroke="var(--accent)"
          strokeWidth="2.5"
          className={`transition-opacity duration-500 ${i < drawn ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </svg>
  );
}

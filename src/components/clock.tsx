"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000 * 15);
  return () => clearInterval(id);
}

// Snapshot is the current minute so it stays stable between renders.
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

export function Clock() {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);

  // Nothing on the server to avoid a server/client time mismatch.
  if (minute === null) return <div className="h-10 w-24" aria-hidden />;

  const now = new Date(minute * 60_000);
  const date = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <time dateTime={now.toISOString()} className="block text-right text-sm leading-snug text-muted tabular-nums">
      {date}
      <br />
      {time}
    </time>
  );
}

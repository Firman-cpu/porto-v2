/**
 * lib/scroll/scrollTrigger.ts
 *
 * ScrollTrigger helpers.
 * Central place for refresh, kill, and shared config.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ==========================================================
// REFRESH
// Needs to be called after layout shifts or font loads.
// ==========================================================

export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

// ==========================================================
// KILL ALL
// Use during full page teardowns.
// ==========================================================

export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

// ==========================================================
// KILL BY ID
// ==========================================================

export function killScrollTriggerById(id: string): void {
  const st = ScrollTrigger.getById(id);
  if (st) st.kill();
}

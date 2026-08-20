/**
 * lib/scroll/lenis.ts
 *
 * Singleton Lenis instance.
 * This file owns the smooth scroll engine.
 *
 * Architecture:
 *   Lenis → GSAP ticker → ScrollTrigger
 */

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

// Store the ticker callback reference so we can remove it
// correctly later. gsap.ticker.remove() matches by reference —
// a new arrow function won't match the original.
let tickerCallback: ((time: number) => void) | null = null;

// ==========================================================
// INIT
// ==========================================================

export function initLenis(): Lenis {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Store reference so destroy() can remove the exact same fn.
  tickerCallback = (time) => {
    lenis?.raf(time * 1000);
  };

  // Connect Lenis to GSAP ticker so ScrollTrigger updates
  // are always in sync with the smooth scroll position.
  gsap.ticker.add(tickerCallback);

  // Prevent GSAP from adding its own lag smoothing that
  // could fight with Lenis timing.
  gsap.ticker.lagSmoothing(0);

  // Keep ScrollTrigger positions in sync with Lenis.
  lenis.on("scroll", ScrollTrigger.update);

  return lenis;
}

// ==========================================================
// DESTROY
// ==========================================================

export function destroyLenis(): void {
  if (!lenis) return;

  // Remove ticker using the exact same reference added in initLenis.
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }

  lenis.destroy();
  lenis = null;
}

// ==========================================================
// GETTER
// ==========================================================

export function getLenis(): Lenis | null {
  return lenis;
}

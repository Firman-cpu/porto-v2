/**
 * lib/scroll/index.ts
 * Barrel export for scroll utilities.
 */

export { initLenis, destroyLenis, getLenis } from "./lenis";
export {
  refreshScrollTrigger,
  killAllScrollTriggers,
  killScrollTriggerById,
} from "./scrollTrigger";

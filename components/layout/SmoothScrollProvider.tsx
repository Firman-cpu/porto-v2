"use client";

/**
 * components/layout/SmoothScrollProvider.tsx
 *
 * Boots Lenis → GSAP ticker → ScrollTrigger architecture.
 * Mount once at the app root.
 *
 * NOTE: Does NOT call ScrollTrigger.refresh() here.
 * The page that owns the triggers is responsible for calling
 * refresh() after all its ScrollTriggers are registered.
 * Calling refresh() before triggers exist is a no-op and
 * causes timing issues in React concurrent mode.
 */

import { useEffect } from "react";
import { initLenis, destroyLenis } from "@/lib/scroll";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  useEffect(() => {
    initLenis();

    return () => {
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
}

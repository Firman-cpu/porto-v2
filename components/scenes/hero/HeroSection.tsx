"use client";

/**
 * components/scenes/hero/HeroSection.tsx
 *
 * Hero — layer z-10, position:fixed (diset di page.tsx via ref).
 *
 * Flow:
 *   1. HeroLoader tampil (progress 0→100 simulasi)
 *   2. Loader selesai → Hero reveal: Canvas fade in + typography entrance
 *   3. Idle: objects float, camera parallax dari cursor
 *
 * Typography entrance: mask reveal per-line dengan stagger.
 * Canvas: lazy import supaya tidak block initial render.
 */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import HeroLoader from "./HeroLoader";

// Lazy load Canvas — tidak perlu ada di initial bundle
const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

export default function HeroSection() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaderDone, setLoaderDone] = useState(false);
  const [entranceProgress, setEntranceProgress] = useState(0);

  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLParagraphElement>(null);

  // ── Simulate loading progress ──────────────────────────
  // In production this would be tied to actual asset loading
  // (useProgress from @react-three/drei for GLTF/textures).
  useEffect(() => {
    let raf: number;
    let current = 0;

    const tick = () => {
      // Non-linear: fast start, slow finish (feels natural)
      const increment = current < 70 ? 1.8 : current < 90 ? 0.7 : 0.3;
      current = Math.min(100, current + increment);
      setLoadProgress(current);
      if (current < 100) raf = requestAnimationFrame(tick);
    };

    // Small delay before starting
    const t = setTimeout(() => { raf = requestAnimationFrame(tick); }, 400);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Hero reveal after loader ───────────────────────────
  const handleLoaderComplete = () => {
    setLoaderDone(true);

    // Animate entrance progress from 0→1 for 3D objects
    gsap.to({ val: 0 }, {
      val: 1,
      duration: 1.6,
      ease: "power3.out",
      onUpdate: function () {
        setEntranceProgress(this.targets()[0].val as number);
      },
    });

    // Canvas fade in
    if (canvasWrapRef.current) {
      gsap.fromTo(canvasWrapRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.0, ease: "power2.inOut" },
      );
    }

    // Typography — mask reveal with stagger
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
    gsap.fromTo(lines,
      { y: "110%", autoAlpha: 0 },
      {
        y: "0%",
        autoAlpha: 1,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.2,
      },
    );

    if (subRef.current) {
      gsap.fromTo(subRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.7 },
      );
    }

    if (scrollHintRef.current) {
      gsap.fromTo(scrollHintRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.6, ease: "power2.out", delay: 1.2 },
      );
    }
  };

  return (
    <>
      {/* Loading experience — unmounts only visually via autoAlpha */}
      {!loaderDone && (
        <HeroLoader
          progress={loadProgress}
          onComplete={handleLoaderComplete}
        />
      )}

      {/*
       * Canvas — absolute fill, behind typography.
       * Starts invisible, fades in after loader.
       */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0 z-0"
        style={{ visibility: "hidden" }}
        aria-hidden="true"
      >
        {loaderDone && (
          <HeroCanvas entranceProgress={entranceProgress} />
        )}
      </div>

      {/* Background dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-dot-pattern opacity-10"
        aria-hidden="true"
      />

      {/*
       * Typography — z-10, on top of Canvas.
       * All lines start invisible (GSAP sets them).
       */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">

        {/* Label */}
        <div className="overflow-hidden">
          <div ref={line1Ref} style={{ opacity: 0 }}>
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.6em] text-white/50">
              Portfolio — Firman Bintang Narendra
            </p>
          </div>
        </div>

        {/* Main heading — two lines */}
        <div className="overflow-hidden">
          <div ref={line2Ref} style={{ opacity: 0 }}>
            <h1 className="
              text-[clamp(3.5rem,11vw,9rem)]
              font-extrabold leading-[0.9]
              tracking-[-0.03em] text-white
            ">
              CREATIVE
            </h1>
          </div>
        </div>

        <div className="overflow-hidden">
          <div ref={line3Ref} style={{ opacity: 0 }}>
            <h1 className="
              text-[clamp(3.5rem,11vw,9rem)]
              font-extrabold leading-[0.9]
              tracking-[-0.03em]
              text-[var(--color-primary-300)]
            ">
              DEVELOPER
            </h1>
          </div>
        </div>

        {/* Sub */}
        <p
          ref={subRef}
          className="mt-8 text-sm text-white/50"
          style={{ opacity: 0 }}
        >
          Front-End · UI/UX · Motion · 3D
        </p>
      </div>

      {/* Scroll hint — bottom center */}
      <p
        ref={scrollHintRef}
        className="
          absolute bottom-10 left-1/2 z-10
          -translate-x-1/2
          text-xs uppercase tracking-[0.4em] text-white/30
        "
        style={{ opacity: 0 }}
      >
        Scroll ↓
      </p>
    </>
  );
}

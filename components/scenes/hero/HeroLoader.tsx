"use client";

/**
 * components/scenes/hero/HeroLoader.tsx
 *
 * Loading experience sebelum Hero reveal.
 * Spec §23: 3D object forms → scene builds → Hero reveals.
 *
 * Struktur:
 *   - Progress bar (0–100%)
 *   - Percentage counter
 *   - Geometric construction animation (CSS + GSAP)
 *   - Fade out saat complete
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroLoaderProps {
  progress: number;   // 0–100
  onComplete: () => void;
}

export default function HeroLoader({ progress, onComplete }: HeroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef       = useRef<HTMLDivElement>(null);
  const countRef     = useRef<HTMLSpanElement>(null);
  const geo1Ref      = useRef<HTMLDivElement>(null);
  const geo2Ref      = useRef<HTMLDivElement>(null);
  const geo3Ref      = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  // Animate bar + counter on progress change
  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        scaleX: progress / 100,
        duration: 0.4,
        ease: "power2.out",
      });
    }
    if (countRef.current) {
      gsap.to({ val: parseFloat(countRef.current.textContent || "0") }, {
        val: Math.round(progress),
        duration: 0.4,
        ease: "power2.out",
        onUpdate: function () {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(this.targets()[0].val));
          }
        },
      });
    }
  }, [progress]);

  // Animate geometry shapes — idle rotation while loading
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    if (geo1Ref.current) {
      gsap.to(geo1Ref.current, { rotation: 360, duration: 8, ease: "none", repeat: -1 });
    }
    if (geo2Ref.current) {
      gsap.to(geo2Ref.current, { rotation: -360, duration: 6, ease: "none", repeat: -1 });
    }
    if (geo3Ref.current) {
      gsap.to(geo3Ref.current, { rotation: 360, duration: 10, ease: "none", repeat: -1 });
    }
    return () => { tl.kill(); };
  }, []);

  // When progress hits 100, exit animation
  useEffect(() => {
    if (progress >= 100 && !completedRef.current) {
      completedRef.current = true;

      gsap.to(containerRef.current, {
        autoAlpha: 0,
        scale: 0.95,
        duration: 0.7,
        ease: "power3.inOut",
        delay: 0.3,
        onComplete,
      });
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="
        fixed inset-0 z-50
        flex flex-col items-center justify-center
        bg-[var(--color-navy)]
        overflow-hidden
      "
    >
      {/* Geometric background shapes */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {/* Outer ring */}
        <div
          ref={geo1Ref}
          className="absolute h-[380px] w-[380px] rounded-full border border-white/5"
        />
        {/* Middle hexagon-ish */}
        <div
          ref={geo2Ref}
          className="absolute h-[240px] w-[240px] rotate-45 border border-[var(--color-primary-500)]/20"
        />
        {/* Inner diamond */}
        <div
          ref={geo3Ref}
          className="absolute h-[140px] w-[140px] rotate-12 border border-[var(--color-primary-400)]/30"
        />
        {/* Center dot */}
        <div className="absolute h-2 w-2 rounded-full bg-[var(--color-primary-500)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        {/* Label */}
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/30">
          Firman Bintang Narendra
        </p>

        {/* Counter */}
        <div className="flex items-end gap-1">
          <span
            ref={countRef}
            className="
              text-[clamp(4rem,12vw,8rem)]
              font-extrabold leading-none
              tracking-tight text-white
            "
          >
            0
          </span>
          <span className="mb-3 text-2xl font-light text-white/40">%</span>
        </div>

        {/* Progress bar */}
        <div className="h-px w-64 overflow-hidden bg-white/10">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-[var(--color-primary-400)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Status */}
        <p className="text-xs text-white/20 uppercase tracking-widest">
          Building scene
        </p>
      </div>
    </div>
  );
}

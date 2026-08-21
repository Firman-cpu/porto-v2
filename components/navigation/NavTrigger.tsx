"use client";

/**
 * components/navigation/NavTrigger.tsx
 *
 * Spec §45–48:
 *   - Tiga garis dengan middle line SENGAJA di-offset (bukan hamburger biasa)
 *   - Idle: subtle micro-morph / breathing
 *   - Hover: lines shift slightly
 *   - Klik: morph ke "X" (close) saat sidebar open
 *
 * GSAP mengontrol semua line transforms.
 * Tidak ada React state untuk setiap mouse movement — pakai refs.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface NavTriggerProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function NavTrigger({ isOpen, onClick }: NavTriggerProps) {
  const btnRef    = useRef<HTMLButtonElement>(null);
  const line1Ref  = useRef<SVGLineElement>(null);
  const line2Ref  = useRef<SVGLineElement>(null);
  const line3Ref  = useRef<SVGLineElement>(null);
  const idleTlRef = useRef<gsap.core.Timeline | null>(null);

  // ── Idle animation ──────────────────────────────────────
  // Spec §47: micro morph / breathing on the icon.
  useEffect(() => {
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
    if (lines.some((l) => !l)) return;

    // Subtle idle: line2 (offset middle) drifts back and forth
    idleTlRef.current = gsap.timeline({ repeat: -1, yoyo: true })
      .to(line2Ref.current, {
        attr: { x1: 10, x2: 26 },
        duration: 2.5,
        ease: "sine.inOut",
      })
      .to(line2Ref.current, {
        attr: { x1: 14, x2: 30 },
        duration: 2.0,
        ease: "sine.inOut",
      });

    return () => {
      idleTlRef.current?.kill();
    };
  }, []);

  // ── Open/close morph ────────────────────────────────────
  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current || !line3Ref.current) return;

    idleTlRef.current?.pause();

    if (isOpen) {
      // Morph to X
      gsap.to(line1Ref.current, {
        attr: { x1: 8, y1: 8, x2: 28, y2: 28 },
        duration: 0.35,
        ease: "power3.inOut",
      });
      gsap.to(line2Ref.current, {
        attr: { x1: 18, y1: 18, x2: 18, y2: 18 }, // collapse
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(line3Ref.current, {
        attr: { x1: 8, y1: 28, x2: 28, y2: 8 },
        duration: 0.35,
        ease: "power3.inOut",
      });
    } else {
      // Morph back to asymmetric three-line
      gsap.to(line1Ref.current, {
        attr: { x1: 6, y1: 10, x2: 30, y2: 10 },
        duration: 0.35,
        ease: "power3.out",
        onComplete: () => idleTlRef.current?.play(),
      });
      gsap.to(line2Ref.current, {
        attr: { x1: 12, y1: 18, x2: 28, y2: 18 }, // offset: shorter + shifted right
        autoAlpha: 1,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(line3Ref.current, {
        attr: { x1: 6, y1: 26, x2: 30, y2: 26 },
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, [isOpen]);

  // ── Hover ───────────────────────────────────────────────
  const onEnter = () => {
    if (isOpen) return;
    gsap.to([line1Ref.current, line3Ref.current], {
      attr: { x2: 28 },
      duration: 0.25,
      ease: "power2.out",
    });
    gsap.to(line2Ref.current, {
      attr: { x1: 8 },
      duration: 0.25,
      ease: "power2.out",
    });
  };
  const onLeave = () => {
    if (isOpen) return;
    gsap.to(line1Ref.current, {
      attr: { x1: 6, x2: 30 },
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(line2Ref.current, {
      attr: { x1: 12, x2: 28 },
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(line3Ref.current, {
      attr: { x1: 6, x2: 30 },
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="
        relative flex h-11 w-11 items-center justify-center
        rounded-full
        bg-white/90 backdrop-blur-md
        shadow-md shadow-black/5
        transition-shadow duration-300
        hover:shadow-lg hover:shadow-black/10
        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-[var(--color-primary-500)]
      "
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={isOpen}
    >
      {/*
       * SVG — 36×36 viewport, lines drawn manually.
       * Line 1: top    — full width  (x1:6  → x2:30)
       * Line 2: middle — offset right (x1:12 → x2:28) ← asymmetric
       * Line 3: bottom — full width  (x1:6  → x2:30)
       */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
      >
        <line
          ref={line1Ref}
          x1="6" y1="10" x2="30" y2="10"
          stroke="var(--color-navy)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          ref={line2Ref}
          x1="12" y1="18" x2="28" y2="18"
          stroke="var(--color-primary-500)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          ref={line3Ref}
          x1="6" y1="26" x2="30" y2="26"
          stroke="var(--color-navy)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

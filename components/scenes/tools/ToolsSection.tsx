"use client";

/**
 * ToolsSection — panel kedua di horizontal track.
 * w-screen h-screen shrink-0.
 *
 * Spec §34–36: creative workspace feel, lebih spacious dari Skills,
 * floating panels, depth, parallax, ending transition ke Projects.
 */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const ToolsCanvas = dynamic(
  () => import("@/components/three/ToolsCanvas"),
  { ssr: false },
);

const DESKTOP = ["Adobe Premiere", "Adobe Illustrator", "Figma", "CorelDRAW", "GitHub"];
const MOBILE = ["Canva", "Alight Motion", "PixelLab", "Infinite Design"];

export default function ToolsSection() {
  const [entranceProgress, setEntranceProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEnteredRef.current) {
          hasEnteredRef.current = true;

          // 3D entrance
          gsap.to({ val: 0 }, {
            val: 1,
            duration: 2.0,
            ease: "power3.out",
            onUpdate: function () {
              setEntranceProgress(this.targets()[0].val as number);
            },
          });

          // Typography
          const elements = [labelRef.current, headRef.current, tagsRef.current];
          gsap.fromTo(
            elements.filter(Boolean),
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.15, delay: 0.4 },
          );
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tools"
      aria-label="Tools"
      className="
        relative flex h-screen w-screen shrink-0
        flex-col items-start justify-between
        overflow-hidden
        bg-[var(--color-primary-50)]
      "
    >
      {/* Background dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-15"
        aria-hidden="true"
      />

      {/* Subtle lavender gradient overlay — differentiates from Skills */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(196,181,253,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* 3D Canvas — full bleed */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <ToolsCanvas entranceProgress={entranceProgress} />
      </div>

      {/* Top-left label + heading */}
      <div className="relative z-10 p-10 pb-0">
        <div ref={labelRef} style={{ opacity: 0 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--color-primary-500)]">
            03 — Tools
          </p>
        </div>
        <div ref={headRef} style={{ opacity: 0 }}>
          <h2 className="
            mt-3
            text-[clamp(2.8rem,5vw,5.5rem)]
            font-extrabold leading-none
            tracking-[-0.025em]
            text-[var(--color-navy)]
          ">
            TOOLS
          </h2>
        </div>
      </div>

      {/* Bottom — two-group tag list */}
      <div ref={tagsRef} className="relative z-10 p-10 pt-0" style={{ opacity: 0 }}>
        {/* Desktop group */}
        <div className="mb-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gray-400)]">
            Desktop
          </p>
          <div className="flex flex-wrap gap-2">
            {DESKTOP.map((t) => (
              <span
                key={t}
                className="
                  rounded-full
                  border border-[var(--color-primary-200)]/60
                  bg-white/50 px-3 py-1
                  text-xs font-medium
                  text-[var(--color-navy)]/60
                  backdrop-blur-sm
                "
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile group */}
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gray-400)]">
            Mobile
          </p>
          <div className="flex flex-wrap gap-2">
            {MOBILE.map((t) => (
              <span
                key={t}
                className="
                  rounded-full
                  border border-purple-200/60
                  bg-white/50 px-3 py-1
                  text-xs font-medium
                  text-purple-700/60
                  backdrop-blur-sm
                "
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

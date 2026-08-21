"use client";

/**
 * SkillsSection — panel pertama di horizontal track.
 * w-screen h-screen shrink-0.
 *
 * Layout:
 *   - 3D ecosystem background (Canvas full-bleed)
 *   - Label + heading (top-left)
 *   - Skill list UI (bottom — visible saat mobile fallback)
 *
 * Spec §32–33: tidak ada grid biasa, 3D ecosystem.
 */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const SkillsCanvas = dynamic(
  () => import("@/components/three/SkillsCanvas"),
  { ssr: false },
);

const SKILL_NAMES = [
  "JavaScript", "TypeScript", "React", "Next.js",
  "Tailwind CSS", "Laravel", "MySQL",
  "GSAP", "Anime.js", "Framer Motion",
];

export default function SkillsSection() {
  const [entranceProgress, setEntranceProgress] = useState(0);
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const hasEnteredRef = useRef(false);

  // IntersectionObserver — trigger entrance when section is visible
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEnteredRef.current) {
          hasEnteredRef.current = true;

          // Animate 3D entrance progress
          gsap.to({ val: 0 }, {
            val: 1,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: function () {
              setEntranceProgress(this.targets()[0].val as number);
            },
          });

          // Typography entrance
          if (labelRef.current) {
            gsap.fromTo(labelRef.current,
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 },
            );
          }
          if (headRef.current) {
            gsap.fromTo(headRef.current,
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.5 },
            );
          }
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
      id="skills"
      aria-label="Skills"
      className="
        relative flex h-screen w-screen shrink-0
        flex-col items-start justify-between
        overflow-hidden
        bg-[var(--color-primary-50)]
      "
    >
      {/* Background dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-20"
        aria-hidden="true"
      />

      {/* 3D Canvas — full bleed behind text */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <SkillsCanvas entranceProgress={entranceProgress} />
      </div>

      {/* Top-left label */}
      <div className="relative z-10 p-10 pb-0">
        <div ref={labelRef} style={{ opacity: 0 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--color-primary-500)]">
            02 — Skills
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
            SKILLS
          </h2>
        </div>
      </div>

      {/* Bottom — chip list (accessible fallback + context) */}
      <div className="relative z-10 p-10 pt-0">
        <div className="flex flex-wrap gap-2">
          {SKILL_NAMES.map((name) => (
            <span
              key={name}
              className="
                rounded-full
                border border-[var(--color-primary-200)]/60
                bg-white/50 px-3 py-1
                text-xs font-medium
                text-[var(--color-navy)]/60
                backdrop-blur-sm
              "
            >
              {name}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}

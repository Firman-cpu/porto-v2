"use client";

/**
 * components/scenes/about/AboutSection.tsx
 *
 * About — layer z-20 di atas Hero.
 * Parent fixed div dihandle di page.tsx.
 *
 * Layout:
 *   Kiri  — teks (intro, role, philosophy)
 *   Kanan — 3D lanyard Canvas
 *   Bawah — paper/card transition element → Skills
 *
 * Spec §27–30.
 */

import dynamic from "next/dynamic";

const AboutCanvas = dynamic(
  () => import("@/components/three/AboutCanvas"),
  { ssr: false },
);

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About"
      className="
        relative flex h-screen w-full
        items-center justify-center
        overflow-hidden
        bg-[var(--color-off-white)]
      "
    >
      {/* Background dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-20"
        aria-hidden="true"
      />

      {/* Two-column layout */}
      <div className="relative z-10 grid h-full w-full max-w-6xl grid-cols-1 items-center gap-0 px-8 md:grid-cols-2 md:gap-16 md:px-16">

        {/* ── Left: Text ──────────────────────────────────── */}
        <div className="flex flex-col justify-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.5em] text-[var(--color-primary-500)]">
            01 — About
          </p>

          <h2 className="
            text-[clamp(2.8rem,5vw,5rem)]
            font-extrabold leading-[1.0]
            tracking-[-0.025em]
            text-[var(--color-navy)]
          ">
            Firman
            <br />
            <span className="text-[var(--color-primary-500)]">Bintang</span>
            <br />
            Narendra
          </h2>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Front-End Dev", "UI/UX Design", "Motion", "3D"].map((role) => (
              <span
                key={role}
                className="
                  rounded-full border border-[var(--color-primary-200)]
                  bg-[var(--color-primary-50)]
                  px-3 py-1
                  text-xs font-medium
                  text-[var(--color-primary-700)]
                "
              >
                {role}
              </span>
            ))}
          </div>

          <p className="mt-8 max-w-sm text-base leading-relaxed text-[var(--color-gray-600)]">
            I enjoy combining design, code, motion, and 3D to create interfaces
            that feel alive rather than static.
          </p>

          {/* Paper/card transition element — spec §30 */}
          <div className="mt-12 flex items-center gap-4">
            <div className="
              group flex cursor-default items-center gap-3
              rounded-2xl border border-[var(--color-primary-200)]
              bg-white/80 px-5 py-3
              shadow-sm backdrop-blur-sm
              transition-all duration-300
              hover:border-[var(--color-primary-400)]
              hover:shadow-md
            ">
              {/* Animated arrow */}
              <span className="
                flex h-8 w-8 items-center justify-center
                rounded-full bg-[var(--color-primary-500)]
                text-sm text-white
                transition-transform duration-300
                group-hover:translate-x-1
              ">
                →
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary-600)]">
                Skills & Tools
              </span>
            </div>
          </div>
        </div>

        {/* ── Right: 3D Lanyard ───────────────────────────── */}
        <div className="relative hidden h-full md:block" aria-hidden="true">
          {/* Canvas fills this column */}
          <AboutCanvas />
        </div>

      </div>

    </section>
  );
}

"use client";

/**
 * AboutSection — full viewport panel, z-20.
 * Parent div yang fixed/absolute dihandle oleh page.tsx.
 * Section ini hanya berisi konten.
 */
export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About"
      className="
        flex h-screen w-full
        flex-col items-center justify-center
        overflow-hidden
        bg-[var(--color-off-white)]
      "
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-30"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-2xl px-6 text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.5em] text-[var(--color-primary-500)]">
          01 — About
        </p>
        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-none tracking-tight text-[var(--color-navy)]">
          ABOUT
        </h2>
        <p className="mt-6 text-base leading-relaxed text-[var(--color-gray-600)]">
          I&apos;m Firman Bintang Narendra, a Front-End Developer, UI/UX
          Designer, and Motion Creative focused on creating interactive digital
          experiences.
        </p>
        <p className="mt-4 text-sm text-[var(--color-gray-400)]">
          (Placeholder — 3D lanyard in Phase 9)
        </p>
      </div>
    </section>
  );
}

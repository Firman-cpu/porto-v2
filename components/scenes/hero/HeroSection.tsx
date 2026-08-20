"use client";

/**
 * HeroSection — normal flow, z-0.
 * Tetap di belakang saat About naik menutupi (via GSAP pin).
 */
export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="
        relative z-0
        flex h-screen w-full
        flex-col items-center justify-center
        overflow-hidden
        bg-[var(--color-primary-500)]
      "
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-20"
        aria-hidden="true"
      />
      <div className="relative z-10 px-6 text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.5em] text-white/60">
          Portfolio — Firman Bintang Narendra
        </p>
        <h1 className="text-[clamp(3rem,10vw,8rem)] font-extrabold leading-none tracking-tight text-white">
          HERO
        </h1>
        <p className="mt-4 text-base text-white/70">
          Front-End Developer · UI/UX Designer · Motion Creative
        </p>
        <p className="mt-12 text-xs uppercase tracking-[0.4em] text-white/50">
          Scroll ↓
        </p>
      </div>
    </section>
  );
}

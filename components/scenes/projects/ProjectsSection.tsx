"use client";

/**
 * components/scenes/projects/ProjectsSection.tsx
 *
 * Phase 3 skeleton — Projects.
 *
 * Scroll behavior:
 *   - Returns to vertical scroll after horizontal world completes
 *   - Enters naturally after Tools finishes
 */

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="
        relative
        flex h-svh w-full
        flex-col items-center justify-center
        overflow-hidden
        bg-[var(--color-off-white)]
      "
    >
      {/* Background dot pattern */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-dot-pattern
          opacity-30
        "
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl px-6 text-center">
        <p
          className="
            mb-6
            text-xs font-semibold
            uppercase tracking-[0.5em]
            text-[var(--color-primary-500)]
          "
        >
          04 — Projects
        </p>

        <h2
          className="
            text-[clamp(2.5rem,8vw,6rem)]
            font-extrabold
            leading-none
            tracking-tight
            text-[var(--color-navy)]
          "
        >
          PROJECTS
        </h2>

        <p className="mt-6 text-base text-[var(--color-gray-600)]">
          Vertical scroll resumes here, after horizontal world is complete.
        </p>

        <p className="mt-4 text-sm text-[var(--color-gray-400)]">
          (Placeholder — featured project + 3D + archive in Phase 12)
        </p>
      </div>
    </section>
  );
}

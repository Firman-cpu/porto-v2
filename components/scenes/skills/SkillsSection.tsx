"use client";

/**
 * SkillsSection — panel pertama di horizontal track.
 * w-screen h-screen shrink-0.
 */
export default function SkillsSection() {
  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js",
    "Tailwind CSS", "Laravel", "MySQL",
    "GSAP", "Anime.js", "Framer Motion",
  ];

  return (
    <section
      id="skills"
      aria-label="Skills"
      className="
        relative flex h-screen w-screen shrink-0
        flex-col items-center justify-center
        bg-[var(--color-primary-100)]
      "
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-25"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-3xl px-6 text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.5em] text-[var(--color-primary-600)]">
          02 — Skills
        </p>
        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-none tracking-tight text-[var(--color-navy)]">
          SKILLS
        </h2>
        <p className="mt-4 text-sm text-[var(--color-gray-600)]">
          Masuk dari kanan →
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[var(--color-primary-300)] bg-white/60 px-4 py-2 text-sm font-medium text-[var(--color-primary-700)] backdrop-blur-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

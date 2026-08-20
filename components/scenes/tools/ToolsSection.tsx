"use client";

/**
 * ToolsSection — panel kedua di horizontal track.
 * w-screen h-screen shrink-0.
 */
export default function ToolsSection() {
  const desktopTools = ["Adobe Premiere", "Adobe Illustrator", "Figma", "CorelDRAW", "GitHub"];
  const mobileTools = ["Canva", "Alight Motion", "PixelLab", "Infinite Design"];

  return (
    <section
      id="tools"
      aria-label="Tools"
      className="
        relative flex h-screen w-screen shrink-0
        flex-col items-center justify-center
        bg-[var(--color-lavender-300)]
      "
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-20"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-3xl px-6 text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.5em] text-purple-700">
          03 — Tools
        </p>
        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-none tracking-tight text-[var(--color-navy)]">
          TOOLS
        </h2>
        <p className="mt-4 text-sm text-[var(--color-gray-600)]">Horizontal selesai ↓</p>
        <div className="mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-700/60">Desktop</p>
          <div className="flex flex-wrap justify-center gap-3">
            {desktopTools.map((t) => (
              <span key={t} className="rounded-full border border-purple-300 bg-white/50 px-4 py-2 text-sm font-medium text-purple-800 backdrop-blur-sm">{t}</span>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-700/60">Mobile</p>
          <div className="flex flex-wrap justify-center gap-3">
            {mobileTools.map((t) => (
              <span key={t} className="rounded-full border border-purple-300 bg-white/50 px-4 py-2 text-sm font-medium text-purple-800 backdrop-blur-sm">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

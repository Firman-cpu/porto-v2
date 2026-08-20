"use client";

/**
 * components/scenes/footer/FooterSection.tsx
 *
 * Phase 3 skeleton — Footer.
 */

export default function FooterSection() {
  return (
    <footer
      id="footer"
      aria-label="Footer"
      className="
        relative
        flex min-h-[40svh] w-full
        flex-col items-center justify-center
        overflow-hidden
        bg-[var(--color-navy)]
        text-white
      "
    >
      <div className="relative z-10 px-6 text-center">
        <p
          className="
            text-[clamp(1.5rem,4vw,3.5rem)]
            font-extrabold
            leading-none
            tracking-tight
            text-white
          "
        >
          KEEP CREATING.
        </p>

        <p className="mt-4 text-xs text-white/30 uppercase tracking-widest">
          Firman Bintang Narendra · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

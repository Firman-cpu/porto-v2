"use client";

/**
 * components/scenes/contact/ContactSection.tsx
 *
 * Phase 3 skeleton — Contact.
 */

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="
        relative
        flex h-svh w-full
        flex-col items-center justify-center
        overflow-hidden
        bg-[var(--color-primary-50)]
      "
    >
      {/* Background dot pattern */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-dot-pattern
          opacity-25
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
          05 — Contact
        </p>

        <h2
          className="
            text-[clamp(2rem,6vw,5rem)]
            font-extrabold
            leading-none
            tracking-tight
            text-[var(--color-navy)]
          "
        >
          WHAT WILL WE<br />CREATE NEXT?
        </h2>

        <p className="mt-6 text-base text-[var(--color-gray-600)]">
          Let&apos;s build something remarkable together.
        </p>

        <button
          className="
            mt-10
            rounded-full
            bg-[var(--color-primary-500)]
            px-8 py-3
            text-sm font-semibold
            uppercase tracking-[0.3em]
            text-white
            transition-opacity hover:opacity-80
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[var(--color-primary-600)]
          "
          aria-label="Send a message"
        >
          Let&apos;s Work Together
        </button>

        <p className="mt-8 text-xs text-[var(--color-gray-400)]">
          (Placeholder — 3D envelope / interactive scene in Phase 13)
        </p>
      </div>
    </section>
  );
}

"use client";

/**
 * ContactSection — spec §43.
 * "WHAT WILL WE CREATE NEXT?"
 * 3D envelope, CTA "LET'S WORK TOGETHER"
 * Calmer visual than Hero — more whitespace, softer palette.
 */

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactCanvas = dynamic(
  () => import("@/components/three/ContactCanvas"),
  { ssr: false },
);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      tl.fromTo([labelRef.current, headRef.current],
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 },
      )
        .fromTo(subRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4",
        )
        .fromTo(ctaRef.current,
          { autoAlpha: 0, scale: 0.92 },
          { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
          "-=0.3",
        )
        .fromTo(canvasRef.current,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 1.0, ease: "power3.out" },
          "<-0.6",
        );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact"
      className="
        relative flex min-h-screen w-full
        flex-col items-center justify-center
        overflow-hidden
        bg-[var(--color-off-white)]
        px-8 py-24
      "
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-15"
        aria-hidden="true"
      />
      {/* Soft gradient — top candy blue tint */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(59,161,242,0.08) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* 3D Envelope — top half */}
      <div
        ref={canvasRef}
        className="relative z-0 mb-10 h-64 w-full max-w-md"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <ContactCanvas />
      </div>

      {/* Text + CTA */}
      <div className="relative z-10 text-center">
        <p
          ref={labelRef}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-[var(--color-primary-500)]"
          style={{ opacity: 0 }}
        >
          05 — Contact
        </p>

        <h2
          ref={headRef}
          className="
            text-[clamp(2.2rem,5vw,4.5rem)]
            font-extrabold leading-[1.05]
            tracking-[-0.025em]
            text-[var(--color-navy)]
          "
          style={{ opacity: 0 }}
        >
          WHAT WILL WE
          <br />
          <span className="text-[var(--color-primary-500)]">CREATE NEXT?</span>
        </h2>

        <p
          ref={subRef}
          className="mt-5 text-base text-[var(--color-gray-600)] max-w-sm mx-auto"
          style={{ opacity: 0 }}
        >
          Have a project in mind? Let&apos;s build something remarkable together.
        </p>

        <button
          ref={ctaRef}
          className="
            group mt-10
            flex items-center gap-3 mx-auto
            rounded-full
            bg-[var(--color-navy)]
            px-8 py-4
            text-sm font-bold uppercase tracking-[0.25em]
            text-white
            transition-all duration-300
            hover:bg-[var(--color-primary-600)]
            hover:shadow-lg hover:shadow-[var(--color-primary-200)]
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-[var(--color-navy)]
          "
          style={{ opacity: 0 }}
          aria-label="Let's work together"
        >
          Let&apos;s Work Together
          <span className="
            inline-block transition-transform duration-300
            group-hover:translate-x-1
          ">→</span>
        </button>

        {/* Social / contact links */}
        <div className="mt-10 flex justify-center gap-6">
          {["GitHub", "LinkedIn", "Twitter", "Email"].map((link) => (
            <a
              key={link}
              href="#"
              className="
                text-xs font-medium uppercase tracking-widest
                text-[var(--color-gray-400)]
                transition-colors duration-200
                hover:text-[var(--color-primary-500)]
              "
              aria-label={link}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

/**
 * FooterSection — spec §44.
 * "KEEP CREATING."
 * Referensi visual language dari section sebelumnya — candy blue.
 * Sederhana, closure yang kuat.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      });

      // Accent line grows from center
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(textRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(subRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2",
        );
    });
    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      id="footer"
      aria-label="Footer"
      className="
        relative flex w-full flex-col
        items-center justify-center
        overflow-hidden
        bg-[var(--color-navy)]
        px-8 py-20
        text-white
      "
    >
      {/* Background dot pattern — references Hero/About visual language */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-5"
        aria-hidden="true"
      />

      {/* Candy blue glow — visual callback to primary identity */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: "600px",
          height: "200px",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(59,161,242,0.2) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Accent line */}
      <div
        ref={lineRef}
        className="mb-10 h-px w-24 origin-center bg-[var(--color-primary-400)]"
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      />

      {/* Main text */}
      <div ref={textRef} className="text-center" style={{ opacity: 0 }}>
        <p className="
          text-[clamp(2rem,6vw,5rem)]
          font-extrabold leading-none
          tracking-[-0.02em]
          text-white
        ">
          KEEP
          <br />
          <span className="text-[var(--color-primary-400)]">CREATING.</span>
        </p>
      </div>

      {/* Sub info */}
      <div ref={subRef} className="mt-12 text-center" style={{ opacity: 0 }}>
        {/* Nav links — reference all sections */}
        <nav aria-label="Footer navigation">
          <ul className="mb-8 flex flex-wrap justify-center gap-6">
            {["Hero", "About", "Skills", "Tools", "Projects", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="
                    text-xs font-medium uppercase tracking-widest
                    text-white/30
                    transition-colors duration-200
                    hover:text-white/70
                  "
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs uppercase tracking-widest text-white/20">
          Firman Bintang Narendra · {year}
        </p>
        <p className="mt-1 text-[10px] text-white/10">
          Design · Code · Motion · 3D
        </p>
      </div>
    </footer>
  );
}

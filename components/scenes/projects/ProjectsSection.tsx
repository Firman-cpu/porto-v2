"use client";

/**
 * components/scenes/projects/ProjectsSection.tsx
 *
 * Spec §37–42:
 *   - Featured project dalam 3D frame
 *   - Hover: depth, scale, perspective
 *   - CTA "EXPLORE THE WORK"
 *   - Archive: alternating layout (left/right)
 *   - Scroll-following connecting line
 */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/utils/projectsData";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjectCanvas = dynamic(
  () => import("@/components/three/FeaturedProjectCanvas"),
  { ssr: false },
);

const featured = PROJECTS.find((p) => p.featured)!;
const archiveProjects = PROJECTS.filter((p) => !p.featured);

// ==========================================================
// SCROLL LINE
// Spec §42: line that follows the project journey.
// ==========================================================

function ScrollLine() {
  const lineRef = useRef<SVGLineElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate line drawing on scroll
      if (lineRef.current) {
        const len = lineRef.current.getTotalLength?.() ?? 800;
        gsap.set(lineRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      }

      // Dots pop in
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        gsap.fromTo(dot,
          { scale: 0, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 75%",
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      <svg
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
        preserveAspectRatio="none"
        viewBox="0 0 1 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          ref={lineRef}
          x1="0.5" y1="0" x2="0.5" y2="800"
          stroke="var(--color-primary-200)"
          strokeWidth="40"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Dots at project positions */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => { dotsRef.current[i] = el; }}
          className="
            absolute left-1/2 h-3 w-3
            -translate-x-1/2 rounded-full
            bg-[var(--color-primary-400)]
            ring-4 ring-[var(--color-primary-100)]
          "
          style={{ top: `${20 + i * 30}%` }}
        />
      ))}
    </div>
  );
}

// ==========================================================
// FEATURED PROJECT
// ==========================================================

function FeaturedProject() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
      tl.fromTo(textRef.current,
        { autoAlpha: 0, x: -40 },
        { autoAlpha: 1, x: 0, duration: 0.9, ease: "power3.out" },
      )
        .fromTo(canvasRef.current,
          { autoAlpha: 0, x: 40 },
          { autoAlpha: 1, x: 0, duration: 0.9, ease: "power3.out" },
          "<0.1",
        )
        .fromTo(ctaRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative grid min-h-screen grid-cols-1 items-center gap-10 px-8 py-20 md:grid-cols-2 md:px-16"
    >
      {/* Left — text */}
      <div ref={textRef} className="flex flex-col justify-center" style={{ opacity: 0 }}>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-[var(--color-primary-500)]">
          Featured Project
        </p>
        <h3 className="
          text-[clamp(2rem,4vw,3.5rem)]
          font-extrabold leading-none
          tracking-[-0.02em]
          text-[var(--color-navy)]
        ">
          {featured.title}
        </h3>
        <p className="mt-2 text-sm font-medium text-[var(--color-primary-400)]">
          {featured.subtitle}
        </p>
        <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--color-gray-600)]">
          {featured.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {featured.tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-full border border-[var(--color-primary-200)]
                bg-[var(--color-primary-50)]
                px-3 py-1 text-xs font-medium
                text-[var(--color-primary-700)]
              "
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--color-gray-400)]">{featured.year}</p>

        {/* CTA */}
        <div ref={ctaRef} className="mt-8" style={{ opacity: 0 }}>
          <button
            className="
              group flex items-center gap-3
              rounded-full border-2 border-[var(--color-navy)]
              bg-transparent px-6 py-3
              text-sm font-bold uppercase tracking-[0.2em]
              text-[var(--color-navy)]
              transition-all duration-300
              hover:bg-[var(--color-navy)] hover:text-white
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-[var(--color-navy)]
            "
            aria-label="Explore the work"
          >
            Explore the Work
            <span className="
              inline-block transition-transform duration-300
              group-hover:translate-x-1
            ">→</span>
          </button>
        </div>
      </div>

      {/* Right — 3D canvas */}
      <div
        ref={canvasRef}
        className="relative h-[50vh] w-full md:h-[70vh]"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <FeaturedProjectCanvas
          project={featured}
          onHoverChange={setIsHovered}
        />

        {/* Hover state indicator */}
        {isHovered && (
          <div
            className="
              pointer-events-none absolute bottom-6 left-1/2
              -translate-x-1/2 rounded-full
              bg-[var(--color-navy)]/80 px-4 py-2
              text-xs font-semibold text-white/80
              backdrop-blur-sm
            "
          >
            View Project
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================================
// ARCHIVE PROJECT CARD (alternating left/right)
// ==========================================================

interface ArchiveCardProps {
  project: typeof archiveProjects[number];
  index: number;
}

function ArchiveCard({ project, index }: ArchiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        {
          autoAlpha: 0,
          x: isLeft ? -50 : 50,
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 75%",
          },
        },
      );
    });
    return () => ctx.revert();
  }, [isLeft]);

  return (
    <div
      ref={cardRef}
      className={`
        flex items-start gap-8 py-12
        ${isLeft ? "flex-row" : "flex-row-reverse"}
      `}
      style={{ opacity: 0 }}
    >
      {/* Color accent block */}
      <div
        className="flex-shrink-0 rounded-2xl"
        style={{
          width: 160,
          height: 110,
          background: `linear-gradient(135deg, ${project.color}cc, ${project.color}66)`,
          border: `1.5px solid ${project.color}40`,
        }}
      >
        <div className="flex h-full items-center justify-center">
          <span
            className="text-3xl font-black"
            style={{ color: project.accentColor, opacity: 0.7 }}
          >
            {project.number}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className={`flex flex-col ${isLeft ? "items-start" : "items-end"}`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gray-400)]">
          {project.year}
        </p>
        <h4 className="
          mt-2 text-[clamp(1.4rem,2.5vw,2rem)]
          font-extrabold leading-tight
          tracking-tight text-[var(--color-navy)]
        ">
          {project.title}
        </h4>
        <p className="mt-1 text-sm text-[var(--color-primary-500)]">
          {project.subtitle}
        </p>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-gray-600)]">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-full border border-[var(--color-gray-200)]
                bg-white/70 px-3 py-1
                text-xs text-[var(--color-gray-600)]
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================================
// MAIN SECTION
// ==========================================================

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 80%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Projects"
      className="
        relative w-full overflow-hidden
        bg-[var(--color-off-white)]
      "
    >
      {/* Background dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-20"
        aria-hidden="true"
      />

      {/* Scroll-following connecting line */}
      <ScrollLine />

      {/* Section header */}
      <div
        ref={headRef}
        className="relative z-10 px-8 pt-24 pb-4 text-center md:px-16"
        style={{ opacity: 0 }}
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-[var(--color-primary-500)]">
          04 — Projects
        </p>
        <h2 className="
          text-[clamp(3rem,7vw,6rem)]
          font-extrabold leading-none
          tracking-[-0.025em]
          text-[var(--color-navy)]
        ">
          PROJECTS
        </h2>
      </div>

      {/* Featured project */}
      <div className="relative z-10">
        <FeaturedProject />
      </div>

      {/* Archive divider */}
      <div className="relative z-10 mx-8 border-t border-[var(--color-gray-100)] md:mx-16" />

      {/* Archive projects — alternating */}
      <div className="relative z-10 mx-8 pb-24 md:mx-16">
        {archiveProjects.map((project, i) => (
          <ArchiveCard key={project.id} project={project} index={i} />
        ))}
      </div>

    </section>
  );
}

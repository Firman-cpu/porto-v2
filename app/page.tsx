"use client";

/**
 * app/page.tsx
 *
 * ================================================================
 * SCROLL ARCHITECTURE — FIXED LAYER APPROACH
 * ================================================================
 *
 * Semua section adalah position:fixed, full viewport.
 * Scroll dikontrol oleh satu tall <div id="scroll-driver">.
 * GSAP ScrollTrigger trigger = scroll-driver, scrub transform.
 *
 * Layer stack (z-index):
 *   Hero      z-10  — selalu di belakang
 *   About     z-20  — layer di atas Hero
 *   HorizWrap z-30  — layer di atas About (Skills + Tools)
 *
 * Fase scroll (scroll-driver height):
 *   0         → vh*1   Hero visible, About di bawah (yPercent:100)
 *   vh*1      → vh*2   About naik (yPercent 100→0) menutupi Hero
 *   vh*2      → vh*3   About berhenti. HorizWrap masuk dari kanan (x: 100vw→0)
 *   vh*3      → vh*3+W Horizontal scroll (track x: 0 → -W)
 *                      W = track.scrollWidth - innerWidth
 *   vh*3+W    → end    Projects, Contact, Footer (unfixed, normal)
 *
 * Setelah horizontal selesai:
 *   Semua fixed layer di-unfix (position kembali normal via class toggle)
 *   Projects dst muncul sebagai normal scroll.
 *
 * ================================================================
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import HeroSection from "@/components/scenes/hero/HeroSection";
import AboutSection from "@/components/scenes/about/AboutSection";
import SkillsSection from "@/components/scenes/skills/SkillsSection";
import ToolsSection from "@/components/scenes/tools/ToolsSection";
import ProjectsSection from "@/components/scenes/projects/ProjectsSection";
import ContactSection from "@/components/scenes/contact/ContactSection";
import FooterSection from "@/components/scenes/footer/FooterSection";

gsap.registerPlugin(ScrollTrigger);

// vh multiplier per fase
const VH_HERO = 1;    // Hero visible
const VH_ABOUT_ENTER = 1;    // About naik
const VH_ABOUT_STAY = 0.5;  // About berhenti sebelum Skills
const VH_SKILLS_ENTER = 1;   // Skills+Tools masuk dari kanan

export default function Home() {
  const driverRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const horizRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Controls whether fixed layers are active
  const [fixedDone, setFixedDone] = useState(false);

  useEffect(() => {
    const driver = driverRef.current;
    const about = aboutRef.current;
    const horiz = horizRef.current;
    const track = trackRef.current;

    if (!driver || !about || !horiz || !track) return;

    const ctx = gsap.context(() => {
      const vh = () => window.innerHeight;
      const trackW = () => track.scrollWidth - window.innerWidth;

      // ── Set driver height ──────────────────────────────────
      // Total fase fixed + 1vh buffer sebelum Projects muncul.
      const totalFixed = () =>
        (VH_HERO + VH_ABOUT_ENTER + VH_ABOUT_STAY + VH_SKILLS_ENTER) * vh() +
        trackW();

      const setDriverHeight = () => {
        driver.style.height = `${totalFixed() + vh()}px`;
      };
      setDriverHeight();

      // ── Phase offsets (dari scroll-driver top) ─────────────
      const pAboutStart = () => VH_HERO * vh();
      const pAboutEnd = () => (VH_HERO + VH_ABOUT_ENTER) * vh();
      const pSkillsStart = () => (VH_HERO + VH_ABOUT_ENTER + VH_ABOUT_STAY) * vh();
      const pSkillsEnd = () => pSkillsStart() + VH_SKILLS_ENTER * vh();
      const pHorizEnd = () => pSkillsEnd() + trackW();

      // ── Initial states ─────────────────────────────────────
      gsap.set(about, { yPercent: 100 });
      gsap.set(horiz, { x: "100vw" });

      // ── 1. About enter ─────────────────────────────────────
      gsap.to(about, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: driver,
          start: () => `top+=${pAboutStart()} top`,
          end: () => `top+=${pAboutEnd()}   top`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // ── 2. HorizWrap enter (Skills+Tools dari kanan) ───────
      gsap.to(horiz, {
        x: 0,
        ease: "none",
        scrollTrigger: {
          trigger: driver,
          start: () => `top+=${pSkillsStart()} top`,
          end: () => `top+=${pSkillsEnd()}   top`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // ── 3. Horizontal scroll (Skills → Tools) ─────────────
      gsap.to(track, {
        x: () => -trackW(),
        ease: "none",
        scrollTrigger: {
          trigger: driver,
          start: () => `top+=${pSkillsEnd()} top`,
          end: () => `top+=${pHorizEnd()}  top`,
          scrub: true,
          invalidateOnRefresh: true,
          onLeave: () => setFixedDone(true),
          onEnterBack: () => setFixedDone(false),
        },
      });

      // ── Resize ────────────────────────────────────────────
      const onResize = () => {
        setDriverHeight();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize, { passive: true });

      ScrollTrigger.refresh();

      return () => window.removeEventListener("resize", onResize);
    });

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScrollProvider>
      {/*
       * scroll-driver: satu-satunya elemen yang punya height.
       * Semua fixed layers berada di luar flow normal.
       */}
      <div ref={driverRef} className="relative w-full" />

      {/*
       * FIXED LAYERS — position:fixed, full viewport.
       * Aktif selama fixedDone = false.
       * Setelah horizontal selesai, diganti position:relative
       * agar Projects bisa scroll normal.
       *
       * Semua ada di LUAR scroll-driver supaya tidak
       * terpengaruh height driver.
       */}

      {/* HERO — z-10, always behind */}
      <section
        id="hero"
        aria-label="Hero"
        className={`
          ${fixedDone ? "relative" : "fixed inset-0"}
          z-10 flex h-screen w-full
          flex-col items-center justify-center
          overflow-hidden
          bg-[var(--color-primary-500)]
        `}
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

      {/* ABOUT — z-20, layer di atas Hero */}
      <div
        ref={aboutRef}
        className={`
          ${fixedDone ? "relative" : "fixed inset-0"}
          z-20
        `}
      >
        <AboutSection />
      </div>

      {/* HORIZ WRAP — z-30, layer di atas About */}
      <div
        ref={horizRef}
        className={`
          ${fixedDone ? "relative" : "fixed inset-0"}
          z-30 overflow-hidden
        `}
      >
        {/* Track flex — GSAP animasi x */}
        <div
          ref={trackRef}
          className="flex h-full w-max"
        >
          <SkillsSection />
          <ToolsSection />
        </div>
      </div>

      {/* NORMAL FLOW — muncul setelah horizontal selesai */}
      {fixedDone && (
        <>
          <ProjectsSection />
          <ContactSection />
          <FooterSection />
        </>
      )}

    </SmoothScrollProvider>
  );
}

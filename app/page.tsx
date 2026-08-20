"use client";

/**
 * app/page.tsx
 *
 * ================================================================
 * SCROLL ARCHITECTURE — FIXED LAYER + NORMAL FLOW
 * ================================================================
 *
 * Layer stack (position:fixed, selalu):
 *   Hero      z-10
 *   About     z-20  — GSAP: yPercent 100→0
 *   HorizWrap z-30  — GSAP: x "100vw"→0, lalu track scroll horizontal
 *
 * Scroll dikendalikan oleh scroll-driver (div dengan height eksplisit).
 * Fase scroll:
 *   [0      → 1vh]       Hero visible
 *   [1vh    → 2vh]       About naik menutupi Hero
 *   [2vh    → 2.5vh]     About berhenti (jeda)
 *   [2.5vh  → 3.5vh]     HorizWrap masuk dari kanan
 *   [3.5vh  → 3.5vh+W]   Horizontal scroll Skills→Tools
 *
 * Setelah driver habis:
 *   Fixed layers tetap ada (tidak toggle class) tapi
 *   Projects z-40 scroll normal DI BAWAH fixed layers —
 *   karena fixed layers tidak ikut flow, Projects muncul
 *   setelah driver height.
 *
 *   Namun fixed layers masih terlihat karena position:fixed.
 *   Solusi: GSAP fade out fixed layers saat driver mendekati akhir,
 *   sebelum Projects mulai masuk viewport.
 * ================================================================
 */

import { useEffect, useRef } from "react";
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

// ── Fase scroll (× vh) ────────────────────────────────────────
const VH_HERO = 1;    // Hero visible sebelum About masuk
const VH_ABOUT_ENTER = 1;    // About naik dari bawah
const VH_ABOUT_STAY = 0.5;  // Jeda sebelum Skills masuk
const VH_SKILLS_ENTER = 1;    // HorizWrap masuk dari kanan
const VH_PUSH_OUT = 1;    // Fixed layers scroll naik saat Projects masuk

export default function Home() {
  const driverRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const horizRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const driver = driverRef.current;
    const hero = heroRef.current;
    const about = aboutRef.current;
    const horiz = horizRef.current;
    const track = trackRef.current;

    if (!driver || !hero || !about || !horiz || !track) return;

    const ctx = gsap.context(() => {
      const vh = () => window.innerHeight;
      const trackW = () => track.scrollWidth - window.innerWidth;

      // ── Phase boundaries ──────────────────────────────────
      const pAboutStart = () => VH_HERO * vh();
      const pAboutEnd = () => (VH_HERO + VH_ABOUT_ENTER) * vh();
      const pSkillsStart = () => (VH_HERO + VH_ABOUT_ENTER + VH_ABOUT_STAY) * vh();
      const pSkillsEnd = () => pSkillsStart() + VH_SKILLS_ENTER * vh();
      const pHorizEnd = () => pSkillsEnd() + trackW();
      const pPushStart = () => pHorizEnd();
      const pPushEnd = () => pHorizEnd() + VH_PUSH_OUT * vh();

      // ── Driver height ─────────────────────────────────────
      // Driver selesai tepat saat fixed layers sudah naik penuh.
      // Projects muncul tepat setelah driver — tidak perlu buffer.
      const setDriverHeight = () => {
        driver.style.height = `${pPushEnd()}px`;
      };
      setDriverHeight();

      // ── Initial states ────────────────────────────────────
      gsap.set(about, { yPercent: 100 });
      gsap.set(horiz, { x: "100vw" });

      // ── 1. About enter ────────────────────────────────────
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

      // ── 2. HorizWrap enter ────────────────────────────────
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

      // ── 3. Horizontal scroll ──────────────────────────────
      gsap.to(track, {
        x: () => -trackW(),
        ease: "none",
        scrollTrigger: {
          trigger: driver,
          start: () => `top+=${pSkillsEnd()} top`,
          end: () => `top+=${pHorizEnd()}  top`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // ── 4. Fixed layers scroll naik saat Projects masuk ─────
      // Setelah horizontal selesai, semua fixed layers di-push
      // ke atas (y: 0 → -100vh) seiring Projects masuk dari bawah.
      // Efek: seperti Projects mendorong mereka naik — scroll biasa.
      gsap.to([hero, about, horiz], {
        y: "-100vh",
        ease: "none",
        scrollTrigger: {
          trigger: driver,
          start: () => `top+=${pPushStart()} top`,
          end: () => `top+=${pPushEnd()}   top`,
          scrub: true,
          invalidateOnRefresh: true,
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
       * SCROLL DRIVER — satu-satunya elemen dengan height.
       * Fixed layers trigger terhadap elemen ini.
       * Projects/Contact/Footer ada setelah driver dalam
       * normal document flow.
       */}
      <div ref={driverRef} className="relative w-full" />

      {/*
       * NORMAL FLOW — Projects, Contact, Footer.
       * Berada setelah driver, sehingga muncul setelah
       * driver selesai di-scroll.
       * z-index tidak diperlukan — mereka normal flow,
       * fixed layers di atasnya sudah fade out via GSAP.
       */}
      <ProjectsSection />
      <ContactSection />
      <FooterSection />

      {/*
       * FIXED LAYERS — selalu position:fixed.
       * Tidak ada toggle class, tidak ada conditional render.
       * GSAP autoAlpha mengontrol visibilitas saat selesai.
       */}

      {/* HERO z-10 */}
      <section
        ref={heroRef}
        id="hero"
        aria-label="Hero"
        className="
          fixed inset-0 z-10
          flex h-screen w-full
          flex-col items-center justify-center
          overflow-hidden
          bg-[var(--color-primary-500)]
        "
      >
        <HeroSection />
      </section>

      {/* ABOUT z-20 */}
      <div
        ref={aboutRef}
        className="fixed inset-0 z-20"
      >
        <AboutSection />
      </div>

      {/* HORIZ WRAP z-30 */}
      <div
        ref={horizRef}
        className="fixed inset-0 z-30 overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex h-full w-max"
        >
          <SkillsSection />
          <ToolsSection />
        </div>
      </div>

    </SmoothScrollProvider>
  );
}

"use client";

/**
 * components/navigation/Navigation.tsx
 *
 * Spec §46–49:
 *   - Fixed, top-right
 *   - Trigger: asymmetric three-line mark
 *   - Sidebar opens on click
 *   - Scroll behavior: trigger dapat subtle animation saat scroll
 *
 * Mount di layout.tsx sebagai client component.
 * Scroll tracking pakai vanilla scroll event (bukan ScrollTrigger)
 * karena nav adalah UI layer terpisah dari scroll experience.
 */

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import NavTrigger from "./NavTrigger";
import NavSidebar from "./NavSidebar";

export default function Navigation() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // ── Scroll state ────────────────────────────────────────
  // Subtle scale + shadow change after user scrolls past Hero.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Animate wrapper on scroll state change ──────────────
  useEffect(() => {
    if (!wrapRef.current) return;
    gsap.to(wrapRef.current, {
      scale: scrolled ? 0.94 : 1,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [scrolled]);

  // ── Keyboard: close on Escape ───────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      {/* Trigger — fixed top-right */}
      <div
        ref={wrapRef}
        className="fixed right-8 top-8 z-[var(--z-nav)]"
        style={{ zIndex: 30 }}
      >
        <NavTrigger
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      {/* Sidebar */}
      <NavSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

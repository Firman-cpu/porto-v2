"use client";

/**
 * components/navigation/NavSidebar.tsx
 *
 * Spec §48: sidebar yang slides in saat trigger diklik.
 * Links: Home, About, Skills, Tools, Projects, Contact.
 * Visual identity: candy blue accents, consistent typography.
 *
 * GSAP mengontrol slide + stagger link entrance.
 * Backdrop blur overlay mengklik menutup sidebar.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface NavSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { label: "Home",     href: "#hero",     number: "00" },
  { label: "About",    href: "#about",    number: "01" },
  { label: "Skills",   href: "#skills",   number: "02" },
  { label: "Tools",    href: "#tools",    number: "03" },
  { label: "Projects", href: "#projects", number: "04" },
  { label: "Contact",  href: "#contact",  number: "05" },
];

export default function NavSidebar({ isOpen, onClose }: NavSidebarProps) {
  const panelRef    = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const linksRef    = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRef    = useRef<HTMLParagraphElement>(null);
  const footRef     = useRef<HTMLDivElement>(null);

  // ── Open / close animation ──────────────────────────────
  useEffect(() => {
    const panel   = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    if (isOpen) {
      // Overlay fade in
      gsap.to(overlay, {
        autoAlpha: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      // Panel slide in from right
      gsap.fromTo(panel,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power4.out" },
      );

      // Links stagger
      const links = linksRef.current.filter(Boolean);
      gsap.fromTo(links,
        { autoAlpha: 0, x: 30 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.2,
        },
      );

      // Label + foot
      gsap.fromTo([labelRef.current, footRef.current],
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.35, stagger: 0.1 },
      );
    } else {
      // Close
      gsap.to(overlay, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(panel, { x: "100%", duration: 0.4, ease: "power3.in" });
    }
  }, [isOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay backdrop */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-[var(--color-navy)]/30 backdrop-blur-sm"
        style={{ visibility: "hidden", opacity: 0 }}
        aria-hidden={!isOpen}
      />

      {/* Sidebar panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className="
          fixed right-0 top-0 z-50
          flex h-screen w-[min(380px,90vw)] flex-col
          bg-[var(--color-off-white)]
          shadow-2xl
        "
        style={{ transform: "translateX(100%)" }}
      >
        {/* Candy blue accent strip */}
        <div
          className="absolute left-0 top-0 h-full w-1 bg-[var(--color-primary-400)]"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <p
            ref={labelRef}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--color-primary-500)]"
            style={{ opacity: 0 }}
          >
            Navigation
          </p>
        </div>

        {/* Links */}
        <nav
          className="flex flex-1 flex-col justify-center px-8 py-4"
          aria-label="Main navigation"
        >
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  ref={(el) => { linksRef.current[i] = el; }}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="
                    group flex items-center gap-4 rounded-xl
                    px-4 py-4
                    transition-all duration-200
                    hover:bg-[var(--color-primary-50)]
                  "
                  style={{ opacity: 0 }}
                >
                  {/* Number */}
                  <span className="
                    w-8 text-xs font-bold
                    text-[var(--color-gray-400)]
                    transition-colors duration-200
                    group-hover:text-[var(--color-primary-400)]
                  ">
                    {link.number}
                  </span>

                  {/* Label */}
                  <span className="
                    text-[clamp(1.5rem,3.5vw,2rem)]
                    font-extrabold leading-none
                    tracking-[-0.02em]
                    text-[var(--color-navy)]
                    transition-colors duration-200
                    group-hover:text-[var(--color-primary-600)]
                  ">
                    {link.label}
                  </span>

                  {/* Arrow */}
                  <span className="
                    ml-auto text-sm
                    text-[var(--color-gray-300)]
                    opacity-0 transition-all duration-200
                    group-hover:translate-x-1 group-hover:opacity-100
                    group-hover:text-[var(--color-primary-400)]
                  ">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div
          ref={footRef}
          className="px-8 pb-10"
          style={{ opacity: 0 }}
        >
          <div className="mb-4 h-px bg-[var(--color-gray-100)]" />
          <p className="text-xs text-[var(--color-gray-400)]">
            Firman Bintang Narendra
          </p>
          <p className="mt-1 text-[10px] text-[var(--color-gray-300)]">
            Design · Code · Motion · 3D
          </p>
        </div>
      </div>
    </>
  );
}

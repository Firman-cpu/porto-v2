/**
 * lib/utils/projectsData.ts
 * Project data untuk portfolio.
 */

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tags: string[];
  year: string;
  description: string;
  /** Placeholder color jika tidak ada gambar */
  color: string;
  accentColor: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "project-01",
    number: "01",
    title: "Interactive Motion UI",
    subtitle: "Web Experience",
    tags: ["Next.js", "GSAP", "Three.js", "Tailwind"],
    year: "2024",
    description:
      "A full-screen interactive experience combining scroll-driven animation, 3D elements, and real-time cursor interaction.",
    color: "#3ba1f2",
    accentColor: "#ffffff",
    featured: true,
  },
  {
    id: "project-02",
    number: "02",
    title: "Design System",
    subtitle: "UI Component Library",
    tags: ["React", "TypeScript", "Figma"],
    year: "2024",
    description:
      "A comprehensive design system with 80+ components, dark/light tokens, and live Storybook documentation.",
    color: "#c4b5fd",
    accentColor: "#1e0050",
  },
  {
    id: "project-03",
    number: "03",
    title: "3D Product Viewer",
    subtitle: "E-Commerce Experience",
    tags: ["R3F", "Three.js", "Drei", "Next.js"],
    year: "2023",
    description:
      "Real-time 3D product configurator with material switching, environment lighting, and AR preview.",
    color: "#fdba74",
    accentColor: "#2c1000",
  },
  {
    id: "project-04",
    number: "04",
    title: "Motion Dashboard",
    subtitle: "Data Visualization",
    tags: ["React", "GSAP", "D3.js", "Laravel"],
    year: "2023",
    description:
      "Analytics dashboard with animated charts, smooth transitions, and real-time data streaming.",
    color: "#88ce02",
    accentColor: "#1a2400",
  },
];

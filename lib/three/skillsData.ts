/**
 * lib/three/skillsData.ts
 * Data config untuk setiap skill object di 3D ecosystem.
 * Spec §31–33: setiap skill punya visual identity unik.
 */

export type GeometryType =
  | "box"
  | "sphere"
  | "torus"
  | "octahedron"
  | "icosahedron"
  | "cylinder"
  | "cone"
  | "torusKnot";

export interface SkillConfig {
  name: string;
  color: string;          // primary color
  accentColor: string;    // secondary/label color
  geometry: GeometryType;
  position: [number, number, number];
  scale: number;
  floatAmp: number;
  floatSpeed: number;
  floatOffset: number;    // phase offset
  rotationSpeed: [number, number, number];
  delay: number;          // entrance stagger (seconds)
}

export const SKILLS: SkillConfig[] = [
  {
    name: "JavaScript",
    color: "#f7df1e",
    accentColor: "#1a1a00",
    geometry: "box",
    position: [-4.2, 0.8, -0.5],
    scale: 0.72,
    floatAmp: 0.14,
    floatSpeed: 0.9,
    floatOffset: 0,
    rotationSpeed: [0.2, 0.4, 0.1],
    delay: 0,
  },
  {
    name: "TypeScript",
    color: "#3178c6",
    accentColor: "#ffffff",
    geometry: "box",
    position: [-2.6, -0.5, 0.3],
    scale: 0.68,
    floatAmp: 0.16,
    floatSpeed: 0.75,
    floatOffset: 1.2,
    rotationSpeed: [0.3, 0.25, 0.15],
    delay: 0.08,
  },
  {
    name: "React",
    color: "#61dafb",
    accentColor: "#0a0a0a",
    geometry: "torus",
    position: [-1.0, 0.9, -0.8],
    scale: 0.75,
    floatAmp: 0.20,
    floatSpeed: 1.1,
    floatOffset: 2.4,
    rotationSpeed: [0.5, 0.6, 0.0],
    delay: 0.05,
  },
  {
    name: "Next.js",
    color: "#0a0a0a",
    accentColor: "#ffffff",
    geometry: "icosahedron",
    position: [0.6, -0.4, 0.2],
    scale: 0.70,
    floatAmp: 0.13,
    floatSpeed: 0.8,
    floatOffset: 0.6,
    rotationSpeed: [0.15, 0.5, 0.2],
    delay: 0.12,
  },
  {
    name: "Tailwind",
    color: "#38bdf8",
    accentColor: "#ffffff",
    geometry: "octahedron",
    position: [2.0, 0.7, -0.4],
    scale: 0.66,
    floatAmp: 0.18,
    floatSpeed: 0.95,
    floatOffset: 3.6,
    rotationSpeed: [0.4, 0.3, 0.25],
    delay: 0.06,
  },
  {
    name: "Laravel",
    color: "#ff2d20",
    accentColor: "#ffffff",
    geometry: "cylinder",
    position: [3.4, -0.6, 0.1],
    scale: 0.65,
    floatAmp: 0.12,
    floatSpeed: 0.7,
    floatOffset: 1.8,
    rotationSpeed: [0.1, 0.45, 0.3],
    delay: 0.15,
  },
  {
    name: "MySQL",
    color: "#00758f",
    accentColor: "#ffffff",
    geometry: "cylinder",
    position: [4.6, 0.5, -0.6],
    scale: 0.60,
    floatAmp: 0.15,
    floatSpeed: 0.85,
    floatOffset: 4.2,
    rotationSpeed: [0.05, 0.35, 0.15],
    delay: 0.20,
  },
  {
    name: "GSAP",
    color: "#88ce02",
    accentColor: "#1a2400",
    geometry: "torusKnot",
    position: [-3.2, -1.2, -0.3],
    scale: 0.55,
    floatAmp: 0.22,
    floatSpeed: 1.2,
    floatOffset: 5.0,
    rotationSpeed: [0.6, 0.4, 0.2],
    delay: 0.10,
  },
  {
    name: "Anime.js",
    color: "#ff69b4",
    accentColor: "#ffffff",
    geometry: "sphere",
    position: [0.2, -1.5, -1.0],
    scale: 0.50,
    floatAmp: 0.25,
    floatSpeed: 1.3,
    floatOffset: 2.0,
    rotationSpeed: [0.3, 0.7, 0.1],
    delay: 0.18,
  },
  {
    name: "Framer",
    color: "#0055ff",
    accentColor: "#ffffff",
    geometry: "cone",
    position: [1.6, 1.6, -1.2],
    scale: 0.58,
    floatAmp: 0.17,
    floatSpeed: 1.0,
    floatOffset: 3.0,
    rotationSpeed: [0.25, 0.55, 0.35],
    delay: 0.22,
  },
];

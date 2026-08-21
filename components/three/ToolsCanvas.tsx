"use client";

/**
 * components/three/ToolsCanvas.tsx
 *
 * 3D Creative Workspace untuk Tools section.
 * Spec §35–36: floating design panels, editing timeline,
 * UI frames, layered depth, parallax, cursor interaction.
 *
 * Konsep visual: seperti meja kerja kreatif yang dilihat dari depan.
 * Layer depth:
 *   z = -2  → background panels (blurred/faded)
 *   z =  0  → mid panels (tools)
 *   z =  1  → foreground accents
 *
 * Setiap tool = floating panel dengan label + accent geometry.
 * Panels bergerak parallax dengan kecepatan berbeda per layer.
 */

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";
import { damp } from "@/lib/three";

// ==========================================================
// TOOL PANEL DATA
// ==========================================================

interface PanelConfig {
  name: string;
  category: "desktop" | "mobile";
  color: string;
  accentColor: string;
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
  floatAmp: number;
  floatSpeed: number;
  floatOffset: number;
  parallaxFactor: number; // deeper = slower
  delay: number;
}

const PANELS: PanelConfig[] = [
  // ── Desktop ──────────────────────────────────────────────
  {
    name: "Figma",
    category: "desktop",
    color: "#1abcfe",
    accentColor: "#0a70d6",
    position: [-3.5, 0.6, 0.0],
    rotation: [0.0, 0.12, -0.04],
    width: 1.4,
    height: 1.0,
    floatAmp: 0.12,
    floatSpeed: 0.7,
    floatOffset: 0,
    parallaxFactor: 1.0,
    delay: 0,
  },
  {
    name: "Adobe Premiere",
    category: "desktop",
    color: "#9999ff",
    accentColor: "#2c2c5e",
    position: [-1.4, -0.5, -0.5],
    rotation: [0.03, -0.10, 0.05],
    width: 1.6,
    height: 1.0,
    floatAmp: 0.15,
    floatSpeed: 0.85,
    floatOffset: 1.2,
    parallaxFactor: 0.7,
    delay: 0.08,
  },
  {
    name: "Illustrator",
    category: "desktop",
    color: "#ff9a00",
    accentColor: "#4a2400",
    position: [0.6, 0.8, 0.4],
    rotation: [-0.04, 0.08, 0.03],
    width: 1.3,
    height: 1.0,
    floatAmp: 0.10,
    floatSpeed: 0.65,
    floatOffset: 2.4,
    parallaxFactor: 1.2,
    delay: 0.05,
  },
  {
    name: "GitHub",
    category: "desktop",
    color: "#24292f",
    accentColor: "#ffffff",
    position: [2.4, -0.3, -0.2],
    rotation: [0.05, -0.06, -0.03],
    width: 1.2,
    height: 0.85,
    floatAmp: 0.13,
    floatSpeed: 0.9,
    floatOffset: 3.6,
    parallaxFactor: 0.9,
    delay: 0.12,
  },
  {
    name: "CorelDRAW",
    category: "desktop",
    color: "#00b050",
    accentColor: "#ffffff",
    position: [4.0, 0.5, -0.8],
    rotation: [-0.02, 0.15, 0.04],
    width: 1.3,
    height: 0.9,
    floatAmp: 0.16,
    floatSpeed: 0.75,
    floatOffset: 0.8,
    parallaxFactor: 0.6,
    delay: 0.18,
  },
  // ── Mobile (smaller, different depth) ────────────────────
  {
    name: "Canva",
    category: "mobile",
    color: "#00c4cc",
    accentColor: "#ffffff",
    position: [-2.6, 1.2, -1.2],
    rotation: [0.06, -0.08, 0.02],
    width: 0.85,
    height: 1.2,
    floatAmp: 0.20,
    floatSpeed: 1.1,
    floatOffset: 5.0,
    parallaxFactor: 0.4,
    delay: 0.10,
  },
  {
    name: "Alight Motion",
    category: "mobile",
    color: "#ff4fa3",
    accentColor: "#ffffff",
    position: [1.6, 1.5, -1.5],
    rotation: [-0.05, 0.10, -0.04],
    width: 0.8,
    height: 1.15,
    floatAmp: 0.18,
    floatSpeed: 1.2,
    floatOffset: 1.8,
    parallaxFactor: 0.35,
    delay: 0.14,
  },
  {
    name: "PixelLab",
    category: "mobile",
    color: "#6c63ff",
    accentColor: "#ffffff",
    position: [3.2, -1.4, -1.0],
    rotation: [0.04, -0.12, 0.06],
    width: 0.82,
    height: 1.18,
    floatAmp: 0.22,
    floatSpeed: 1.0,
    floatOffset: 3.2,
    parallaxFactor: 0.5,
    delay: 0.20,
  },
  {
    name: "Infinite Design",
    category: "mobile",
    color: "#f59e0b",
    accentColor: "#2c1a00",
    position: [-4.2, -1.2, -1.8],
    rotation: [0.07, 0.09, -0.05],
    width: 0.78,
    height: 1.1,
    floatAmp: 0.19,
    floatSpeed: 0.95,
    floatOffset: 4.5,
    parallaxFactor: 0.3,
    delay: 0.22,
  },
];

// ==========================================================
// SINGLE TOOL PANEL
// ==========================================================

interface ToolPanelProps {
  config: PanelConfig;
  entranceProgress: number;
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}

function ToolPanel({ config, entranceProgress, mouseX, mouseY }: ToolPanelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef  = useRef(config.floatOffset);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;

    const floatY = Math.sin(t * config.floatSpeed) * config.floatAmp;
    const floatX = Math.cos(t * config.floatSpeed * 0.7) * config.floatAmp * 0.4;

    // Parallax: cursor moves panels at different speeds by depth
    const px = mouseX.current * config.parallaxFactor * 0.3;
    const py = -mouseY.current * config.parallaxFactor * 0.2;

    groupRef.current.position.x = damp(
      groupRef.current.position.x,
      config.position[0] + floatX + px,
      4, delta,
    );
    groupRef.current.position.y = damp(
      groupRef.current.position.y,
      config.position[1] + floatY + py,
      4, delta,
    );

    // Scale entrance
    const targetScale = entranceProgress;
    groupRef.current.scale.setScalar(
      damp(groupRef.current.scale.x, targetScale, 5, delta),
    );
  });

  const isDesktop = config.category === "desktop";

  return (
    <group
      ref={groupRef}
      position={config.position}
      rotation={config.rotation as unknown as THREE.Euler}
      scale={0}
    >
      {/* Panel body */}
      <RoundedBox
        args={[config.width, config.height, 0.06]}
        radius={0.06}
        smoothness={3}
      >
        <meshPhysicalMaterial
          color="#f8f9fc"
          roughness={0.04}
          metalness={0}
          transmission={0.12}
          thickness={0.06}
          envMapIntensity={0.6}
        />
      </RoundedBox>

      {/* Colored header bar */}
      <mesh position={[0, config.height / 2 - 0.13, 0.032]}>
        <planeGeometry args={[config.width, 0.24]} />
        <meshStandardMaterial color={config.color} roughness={0.3} />
      </mesh>

      {/* Icon circle in header */}
      <mesh position={[-(config.width / 2) + 0.18, config.height / 2 - 0.13, 0.034]}>
        <circleGeometry args={[0.07, 16]} />
        <meshStandardMaterial color={config.accentColor} roughness={0.2} />
      </mesh>

      {/* Content lines — simulating UI */}
      {[0, 1, 2].map((row) => (
        <mesh
          key={row}
          position={[0, config.height / 2 - 0.45 - row * 0.16, 0.032]}
        >
          <planeGeometry args={[config.width - 0.2, 0.045]} />
          <meshStandardMaterial
            color="#d1d9e6"
            roughness={0.5}
            opacity={1 - row * 0.2}
            transparent
          />
        </mesh>
      ))}

      {/* Bottom accent strip */}
      <mesh position={[0, -(config.height / 2) + 0.08, 0.032]}>
        <planeGeometry args={[config.width * 0.4, 0.04]} />
        <meshStandardMaterial color={config.color} roughness={0.3} opacity={0.6} transparent />
      </mesh>

      {/* Mobile: phone notch indicator */}
      {!isDesktop && (
        <mesh position={[0, config.height / 2 - 0.04, 0.033]}>
          <capsuleGeometry args={[0.03, 0.1, 4, 8]} />
          <meshStandardMaterial color="#0d1b2e" roughness={0.5} />
        </mesh>
      )}

      {/* Depth accent — thin edge glow */}
      <RoundedBox
        args={[config.width + 0.01, config.height + 0.01, 0.02]}
        radius={0.065}
        smoothness={3}
        position={[0, 0, -0.04]}
      >
        <meshStandardMaterial
          color={config.color}
          roughness={0.8}
          opacity={0.15}
          transparent
        />
      </RoundedBox>
    </group>
  );
}

// ==========================================================
// SCENE
// ==========================================================

interface ToolsSceneProps {
  entranceProgress: number;
}

function ToolsScene({ entranceProgress }: ToolsSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseX   = useRef(0);
  const mouseY   = useRef(0);
  const tiltX    = useRef(0);
  const tiltY    = useRef(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Gentle group tilt following cursor
    tiltX.current = damp(tiltX.current, mouseX.current * 0.06, 3, delta);
    tiltY.current = damp(tiltY.current, -mouseY.current * 0.04, 3, delta);
    groupRef.current.rotation.y = tiltX.current;
    groupRef.current.rotation.x = tiltY.current;
  });

  // Stagger entrance per panel
  const staggered = (delay: number) =>
    Math.max(0, Math.min(1, (entranceProgress - delay) / (1 - delay + 0.01)));

  return (
    <group ref={groupRef}>
      {PANELS.map((cfg) => (
        <ToolPanel
          key={cfg.name}
          config={cfg}
          entranceProgress={staggered(cfg.delay)}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </group>
  );
}

// ==========================================================
// CANVAS EXPORT
// ==========================================================

interface ToolsCanvasProps {
  entranceProgress: number;
}

export default function ToolsCanvas({ entranceProgress }: ToolsCanvasProps) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 52, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 6]} intensity={1.3} castShadow />
      <directionalLight position={[-5, -3, -4]} intensity={0.3} color="#c4b5fd" />
      <pointLight position={[0, 0, 4]} intensity={0.4} color="#ffffff" />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <ToolsScene entranceProgress={entranceProgress} />
      </Suspense>
    </Canvas>
  );
}

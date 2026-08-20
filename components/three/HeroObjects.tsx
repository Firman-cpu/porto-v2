"use client";

/**
 * components/three/HeroObjects.tsx
 *
 * 3D objects di Hero scene.
 * Spec §24: objects representing programming/design/creative tools.
 * Masuk dari bawah dengan choreography berbeda per object.
 * Idle: float, breathe, slight rotation, parallax.
 *
 * Objects:
 *   - RoundedBox    → code/dev identity
 *   - Icosahedron   → 3D/geometry mastery
 *   - Torus         → motion/loop
 *   - Octahedron    → design precision
 *   - Sphere        → creative world
 *   - Cylinder      → tool/stack
 */

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp } from "@/lib/three";

// ── Types ──────────────────────────────────────────────────
interface ObjectConfig {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed: number;        // rotation speed
  floatAmp: number;     // float amplitude
  floatOffset: number;  // phase offset for stagger
  delay: number;        // entrance delay (seconds)
}

const OBJECTS: ObjectConfig[] = [
  // Far left — large box (code)
  { position: [-3.8, -0.4, -1.2], rotation: [0.4, 0.6, 0], scale: 0.9, color: "#60bcf7", speed: 0.3, floatAmp: 0.12, floatOffset: 0,    delay: 0    },
  // Left — icosahedron (3D)
  { position: [-2.4,  0.5, -0.5], rotation: [0.2, 0.1, 0], scale: 0.7, color: "#c4b5fd", speed: 0.5, floatAmp: 0.18, floatOffset: 0.8,  delay: 0.15 },
  // Center-left — torus (motion)
  { position: [-1.2, -0.8,  0.3], rotation: [1.2, 0.3, 0], scale: 0.65, color: "#93d3fb", speed: 0.7, floatAmp: 0.14, floatOffset: 1.6,  delay: 0.05 },
  // Center-right — octahedron (design)
  { position: [ 1.4,  0.6, -0.4], rotation: [0.3, 0.8, 0], scale: 0.6,  color: "#fdba74", speed: 0.4, floatAmp: 0.16, floatOffset: 2.4,  delay: 0.2  },
  // Right — sphere (world)
  { position: [ 2.8, -0.3,  0.2], rotation: [0,   0,   0], scale: 0.75, color: "#3ba1f2", speed: 0.2, floatAmp: 0.10, floatOffset: 3.2,  delay: 0.1  },
  // Far right — cylinder (stack)
  { position: [ 4.0,  0.3, -0.8], rotation: [0.5, 0.2, 0], scale: 0.8,  color: "#a78bfa", speed: 0.6, floatAmp: 0.13, floatOffset: 1.2,  delay: 0.25 },
  // Extra small — background
  { position: [-0.4,  1.8, -1.5], rotation: [0.8, 0.4, 0], scale: 0.35, color: "#bfe3fd", speed: 0.9, floatAmp: 0.20, floatOffset: 4.0,  delay: 0.3  },
  { position: [ 0.8, -1.6, -1.0], rotation: [0.2, 1.0, 0], scale: 0.3,  color: "#dbeffe", speed: 1.1, floatAmp: 0.22, floatOffset: 0.4,  delay: 0.08 },
];

// ── Single Object ──────────────────────────────────────────
interface HeroObjectProps {
  config: ObjectConfig;
  progress: number; // 0 = not started, 1 = fully entered
}

function HeroObject({ config, progress }: HeroObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;

    const t = timeRef.current + config.floatOffset;

    // Idle rotation
    meshRef.current.rotation.x += delta * config.speed * 0.4;
    meshRef.current.rotation.y += delta * config.speed * 0.6;

    // Float
    const floatY = Math.sin(t * 0.8) * config.floatAmp;
    // Breathe scale
    const breathe = 1 + Math.sin(t * 1.1) * 0.015;

    meshRef.current.position.y = damp(
      meshRef.current.position.y,
      config.position[1] + floatY,
      8,
      delta,
    );
    meshRef.current.scale.setScalar(
      config.scale * progress * breathe,
    );
  });

  // Entrance: start 4 units below, rise to position
  const entryY = config.position[1] - 4;
  const currentY = entryY + (config.position[1] - entryY) * progress;

  return (
    <mesh
      ref={meshRef}
      position={[config.position[0], currentY, config.position[2]]}
      rotation={config.rotation as unknown as THREE.Euler}
      scale={config.scale * progress}
      castShadow
    >
      {/* Alternate geometry per index for visual variety */}
      {config.floatOffset < 1     ? <boxGeometry args={[1, 1, 1]} /> :
       config.floatOffset < 2     ? <icosahedronGeometry args={[0.5, 0]} /> :
       config.floatOffset < 3     ? <torusGeometry args={[0.4, 0.12, 16, 60]} /> :
       config.floatOffset < 4     ? <octahedronGeometry args={[0.5]} /> :
       config.floatOffset < 5     ? <sphereGeometry args={[0.5, 32, 32]} /> :
                                    <cylinderGeometry args={[0.3, 0.4, 0.8, 6]} />
      }
      <meshStandardMaterial
        color={config.color}
        roughness={0.2}
        metalness={0.5}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

// ── Scene Group ────────────────────────────────────────────
interface HeroObjectsProps {
  /** 0–1 overall entrance progress (driven from loading complete) */
  entranceProgress: number;
}

export default function HeroObjects({ entranceProgress }: HeroObjectsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Subtle parallax from cursor
    groupRef.current.rotation.y = damp(
      groupRef.current.rotation.y,
      mouseRef.current.x * 0.06,
      3,
      delta,
    );
    groupRef.current.rotation.x = damp(
      groupRef.current.rotation.x,
      -mouseRef.current.y * 0.04,
      3,
      delta,
    );
  });

  return (
    <group ref={groupRef}>
      {OBJECTS.map((cfg, i) => {
        // Stagger entrance: each object starts slightly later
        const staggered = Math.max(0, Math.min(1,
          (entranceProgress - cfg.delay) / (1 - cfg.delay),
        ));
        return (
          <HeroObject
            key={i}
            config={cfg}
            progress={staggered}
          />
        );
      })}
    </group>
  );
}

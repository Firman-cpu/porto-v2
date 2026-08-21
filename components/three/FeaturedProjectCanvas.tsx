"use client";

/**
 * components/three/FeaturedProjectCanvas.tsx
 *
 * 3D frame/display untuk featured project.
 * Spec §38–39: floating display, hover = depth increases + scale + perspective.
 *
 * Konsep: glass screen floating di depan user,
 * dengan depth shadow dan parallax dari cursor.
 */

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";
import { damp } from "@/lib/three";
import type { Project } from "@/lib/utils/projectsData";

// ==========================================================
// FLOATING DISPLAY OBJECT
// ==========================================================

interface DisplayProps {
  project: Project;
  hovered: boolean;
  onHover: (h: boolean) => void;
}

function ProjectDisplay({ project, hovered, onHover }: DisplayProps) {
  const groupRef = useRef<THREE.Group>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  const glowRef  = useRef<THREE.Mesh>(null);
  const timeRef  = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;

    const targetZ  = hovered ? 0.6 : 0;
    const targetScale = hovered ? 1.06 : 1.0;

    // Float idle
    const floatY = Math.sin(t * 0.7) * 0.08;

    groupRef.current.position.z = damp(groupRef.current.position.z, targetZ, 5, delta);
    groupRef.current.position.y = damp(groupRef.current.position.y, floatY, 4, delta);
    groupRef.current.scale.setScalar(damp(groupRef.current.scale.x, targetScale, 6, delta));

    // Tilt from cursor
    groupRef.current.rotation.y = damp(
      groupRef.current.rotation.y,
      mouseRef.current.x * (hovered ? 0.12 : 0.05),
      4, delta,
    );
    groupRef.current.rotation.x = damp(
      groupRef.current.rotation.x,
      -mouseRef.current.y * (hovered ? 0.08 : 0.03),
      4, delta,
    );

    // Glow pulse when hovered
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = damp(mat.opacity, hovered ? 0.35 : 0.08, 5, delta);
    }
  });

  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHover(true);
    document.body.style.cursor = "none";
  };
  const onPointerOut = () => {
    onHover(false);
    document.body.style.cursor = "default";
  };

  const W = 3.2;
  const H = 2.1;

  return (
    <group ref={groupRef}>
      {/* Glow halo behind frame */}
      <mesh ref={glowRef} position={[0, 0, -0.15]}>
        <planeGeometry args={[W + 0.8, H + 0.8]} />
        <meshStandardMaterial
          color={project.color}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>

      {/* Drop shadow */}
      <mesh position={[0.08, -0.08, -0.18]}>
        <planeGeometry args={[W + 0.4, H + 0.3]} />
        <meshStandardMaterial
          color="#0d1b2e"
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>

      {/* Main frame */}
      <RoundedBox
        args={[W, H, 0.08]}
        radius={0.08}
        smoothness={4}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <meshPhysicalMaterial
          color={project.color}
          roughness={0.08}
          metalness={0.1}
          transmission={0.06}
          thickness={0.08}
          envMapIntensity={1.0}
        />
      </RoundedBox>

      {/* Screen / project color fill */}
      <mesh position={[0, 0.04, 0.042]}>
        <planeGeometry args={[W - 0.18, H - 0.35]} />
        <meshStandardMaterial
          color={project.color}
          roughness={0.5}
          opacity={0.85}
          transparent
        />
      </mesh>

      {/* Screen gradient lines — simulating UI content */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, 0.5 - i * 0.28 - 0.1, 0.044]}>
          <planeGeometry args={[(W - 0.4) * (i % 2 === 0 ? 1 : 0.65), 0.06]} />
          <meshStandardMaterial
            color={project.accentColor}
            opacity={0.25 - i * 0.04}
            transparent
          />
        </mesh>
      ))}

      {/* Bottom bar — project info */}
      <mesh position={[0, -(H / 2) + 0.155, 0.042]}>
        <planeGeometry args={[W - 0.18, 0.26]} />
        <meshStandardMaterial color="#0d1b2e" opacity={0.65} transparent />
      </mesh>

      {/* Frame border accent */}
      <RoundedBox
        args={[W + 0.02, H + 0.02, 0.04]}
        radius={0.09}
        smoothness={4}
        position={[0, 0, -0.06]}
      >
        <meshStandardMaterial
          color={project.color}
          roughness={0.9}
          opacity={0.2}
          transparent
        />
      </RoundedBox>
    </group>
  );
}

// ==========================================================
// CANVAS
// ==========================================================

interface FeaturedProjectCanvasProps {
  project: Project;
  onHoverChange?: (h: boolean) => void;
}

export default function FeaturedProjectCanvas({
  project,
  onHoverChange,
}: FeaturedProjectCanvasProps) {
  const [hovered, setHovered] = useState(false);

  const handleHover = (h: boolean) => {
    setHovered(h);
    onHoverChange?.(h);
  };

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <directionalLight position={[-3, -2, -3]} intensity={0.3} color={project.color} />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <ProjectDisplay
          project={project}
          hovered={hovered}
          onHover={handleHover}
        />
      </Suspense>
    </Canvas>
  );
}

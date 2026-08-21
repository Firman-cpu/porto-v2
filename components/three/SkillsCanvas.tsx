"use client";

/**
 * components/three/SkillsCanvas.tsx
 *
 * R3F Canvas untuk Skills section.
 * Spec §32–33: 3D ecosystem, setiap skill unik, floating, interaktif.
 *
 * Setiap skill = mesh + floating label (HTML via drei Html).
 * Mouse: cursor hover memperbesar + tilt object.
 * Parallax: group tilt dari cursor.
 */

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Html, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { SKILLS, type SkillConfig } from "@/lib/three/skillsData";
import { damp } from "@/lib/three";

// ==========================================================
// GEOMETRY RESOLVER
// ==========================================================

function SkillGeometry({ type, scale }: { type: SkillConfig["geometry"]; scale: number }) {
  const s = scale;
  switch (type) {
    case "box":         return <boxGeometry args={[s, s, s]} />;
    case "sphere":      return <sphereGeometry args={[s * 0.55, 32, 32]} />;
    case "torus":       return <torusGeometry args={[s * 0.42, s * 0.15, 16, 60]} />;
    case "octahedron":  return <octahedronGeometry args={[s * 0.55]} />;
    case "icosahedron": return <icosahedronGeometry args={[s * 0.55, 0]} />;
    case "cylinder":    return <cylinderGeometry args={[s * 0.35, s * 0.4, s * 0.85, 6]} />;
    case "cone":        return <coneGeometry args={[s * 0.38, s * 0.9, 5]} />;
    case "torusKnot":   return <torusKnotGeometry args={[s * 0.28, s * 0.1, 64, 8]} />;
    default:            return <boxGeometry args={[s, s, s]} />;
  }
}

// ==========================================================
// SINGLE SKILL OBJECT
// ==========================================================

interface SkillObjectProps {
  config: SkillConfig;
  entranceProgress: number; // 0→1
}

function SkillObject({ config, entranceProgress }: SkillObjectProps) {
  const meshRef   = useRef<THREE.Mesh>(null);
  const groupRef  = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const timeRef   = useRef(config.floatOffset);

  const targetScaleRef = useRef(1);
  const currentScaleRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current || !groupRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;

    // Idle rotation
    meshRef.current.rotation.x += delta * config.rotationSpeed[0];
    meshRef.current.rotation.y += delta * config.rotationSpeed[1];
    meshRef.current.rotation.z += delta * config.rotationSpeed[2];

    // Float
    groupRef.current.position.y = damp(
      groupRef.current.position.y,
      config.position[1] + Math.sin(t * config.floatSpeed) * config.floatAmp,
      6, delta,
    );

    // Scale: hover + entrance combined
    targetScaleRef.current = hovered ? 1.25 : 1.0;
    currentScaleRef.current = damp(currentScaleRef.current, targetScaleRef.current, 8, delta);
    const entryScale = entranceProgress;
    meshRef.current.scale.setScalar(config.scale * entryScale * currentScaleRef.current);
  });

  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };
  const onPointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "default";
  };

  // Entrance: start 5 units below
  const entryY = config.position[1] - 5;
  const posY = entryY + (config.position[1] - entryY) * entranceProgress;

  return (
    <group
      ref={groupRef}
      position={[config.position[0], posY, config.position[2]]}
    >
      <mesh
        ref={meshRef}
        scale={config.scale * entranceProgress}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        castShadow
      >
        <SkillGeometry type={config.geometry} scale={1} />
        <meshStandardMaterial
          color={config.color}
          roughness={0.15}
          metalness={hovered ? 0.8 : 0.45}
          envMapIntensity={1.2}
          emissive={config.color}
          emissiveIntensity={hovered ? 0.15 : 0}
        />
      </mesh>

      {/* Label — floats below object */}
      {entranceProgress > 0.6 && (
        <Html
          position={[0, -config.scale * 0.85, 0]}
          center
          style={{
            opacity: Math.max(0, (entranceProgress - 0.6) / 0.4),
            pointerEvents: "none",
            userSelect: "none",
            transition: "opacity 0.3s",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans, system-ui)",
              fontSize: hovered ? "11px" : "9px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: hovered ? config.color : "#8994a8",
              background: "rgba(248,249,252,0.85)",
              padding: "3px 8px",
              borderRadius: "100px",
              border: `1px solid ${hovered ? config.color + "60" : "#d1d9e640"}`,
              backdropFilter: "blur(6px)",
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
            }}
          >
            {config.name}
          </span>
        </Html>
      )}
    </group>
  );
}

// ==========================================================
// SCENE
// ==========================================================

interface SkillsSceneProps {
  entranceProgress: number;
}

function SkillsScene({ entranceProgress }: SkillsSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
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
    // Subtle parallax tilt
    groupRef.current.rotation.y = damp(groupRef.current.rotation.y, mouseRef.current.x * 0.08, 3, delta);
    groupRef.current.rotation.x = damp(groupRef.current.rotation.x, -mouseRef.current.y * 0.05, 3, delta);
  });

  return (
    <group ref={groupRef}>
      {SKILLS.map((cfg, i) => {
        const staggered = Math.max(0, Math.min(1,
          (entranceProgress - cfg.delay) / (1 - cfg.delay + 0.01),
        ));
        return (
          <SkillObject
            key={cfg.name}
            config={cfg}
            entranceProgress={staggered}
          />
        );
      })}
    </group>
  );
}

// ==========================================================
// CANVAS EXPORT
// ==========================================================

interface SkillsCanvasProps {
  entranceProgress: number;
}

export default function SkillsCanvas({ entranceProgress }: SkillsCanvasProps) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 7], fov: 55, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-4, -2, -4]} intensity={0.25} color="#93d3fb" />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <SkillsScene entranceProgress={entranceProgress} />
      </Suspense>
    </Canvas>
  );
}

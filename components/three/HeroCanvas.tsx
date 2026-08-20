"use client";

/**
 * components/three/HeroCanvas.tsx
 *
 * R3F Canvas untuk Hero scene.
 * Terpisah dari HeroSection supaya Canvas bisa di-lazy load.
 */

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import HeroObjects from "./HeroObjects";

interface HeroCanvasProps {
  entranceProgress: number;
}

export default function HeroCanvas({ entranceProgress }: HeroCanvasProps) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}  // controlled pixel ratio per spec §56
    >
      {/* Ambient + directional lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, -2, -4]} intensity={0.3} color="#93d3fb" />
      <pointLight position={[0, 0, 4]} intensity={0.4} color="#ffffff" />

      {/* Environment for reflections */}
      <Suspense fallback={null}>
        <Environment preset="city" />
        <HeroObjects entranceProgress={entranceProgress} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}

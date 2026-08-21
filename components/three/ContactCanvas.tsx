"use client";

/**
 * components/three/ContactCanvas.tsx
 *
 * 3D envelope/message object untuk Contact section.
 * Spec §43: floating interactive object, calmer than Hero.
 *
 * Objek: envelope yang bisa terbuka saat hover,
 * dengan letter/card di dalamnya.
 * Idle: gentle float, soft rotation.
 */

import { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";
import { damp } from "@/lib/three";

// ==========================================================
// ENVELOPE
// ==========================================================

function Envelope() {
  const groupRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Group>(null);
  const letterRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || !flapRef.current || !letterRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;

    // Idle float + breathe
    const floatY = Math.sin(t * 0.6) * 0.1;
    const floatX = Math.cos(t * 0.4) * 0.04;
    groupRef.current.position.y = damp(groupRef.current.position.y, floatY, 4, delta);
    groupRef.current.position.x = damp(groupRef.current.position.x, floatX, 4, delta);

    // Cursor tilt
    groupRef.current.rotation.y = damp(
      groupRef.current.rotation.y,
      mouseRef.current.x * 0.18,
      4, delta,
    );
    groupRef.current.rotation.x = damp(
      groupRef.current.rotation.x,
      -mouseRef.current.y * 0.10,
      4, delta,
    );

    // Flap open on hover
    flapRef.current.rotation.x = damp(
      flapRef.current.rotation.x,
      hovered ? -Math.PI * 0.55 : 0,
      6, delta,
    );

    // Letter rises on hover
    letterRef.current.position.y = damp(
      letterRef.current.position.y,
      hovered ? 0.55 : 0.0,
      5, delta,
    );
    letterRef.current.scale.setScalar(damp(
      letterRef.current.scale.x,
      hovered ? 1 : 0,
      5, delta,
    ));
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

  const W = 2.2;
  const H = 1.5;

  return (
    <group ref={groupRef}>
      {/* Body */}
      <group
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        {/* Envelope back */}
        <RoundedBox args={[W, H, 0.08]} radius={0.05} smoothness={4}>
          <meshPhysicalMaterial
            color="#f0f4ff"
            roughness={0.12}
            metalness={0}
            envMapIntensity={0.7}
          />
        </RoundedBox>

        {/* Bottom-left triangle */}
        <mesh position={[0, -H * 0.25, 0.042]} rotation={[0, 0, 0]}>
          <bufferGeometry>
            {(() => {
              const geo = new THREE.BufferGeometry();
              const v = new Float32Array([
                -W / 2, H / 2, 0,
                W / 2, H / 2, 0,
                0, 0, 0,
              ]);
              geo.setAttribute("position", new THREE.BufferAttribute(v, 3));
              return geo;
            })()}
          </bufferGeometry>
          <meshStandardMaterial color="#dbeffe" side={THREE.DoubleSide} />
        </mesh>

        {/* V-fold lines */}
        <mesh position={[-W * 0.25, 0, 0.044]}>
          <planeGeometry args={[0.012, H * 0.9]} />
          <meshStandardMaterial color="#bfe3fd" opacity={0.5} transparent />
        </mesh>
        <mesh position={[W * 0.25, 0, 0.044]}>
          <planeGeometry args={[0.012, H * 0.9]} />
          <meshStandardMaterial color="#bfe3fd" opacity={0.5} transparent />
        </mesh>

        {/* Flap (hinged at top center) */}
        <group
          ref={flapRef}
          position={[0, H / 2, 0.044]}
        >
          <mesh position={[0, -H * 0.255, 0]}>
            <bufferGeometry>
              {(() => {
                const geo = new THREE.BufferGeometry();
                const hw = W / 2;
                const fh = H * 0.5;
                const v = new Float32Array([
                  -hw, 0, 0,
                  hw, 0, 0,
                  0, -fh, 0,
                ]);
                geo.setAttribute("position", new THREE.BufferAttribute(v, 3));
                return geo;
              })()}
            </bufferGeometry>
            <meshStandardMaterial
              color="#93d3fb"
              side={THREE.DoubleSide}
              roughness={0.3}
            />
          </mesh>
        </group>
      </group>

      {/* Letter (rises out of envelope on hover) */}
      <group ref={letterRef} position={[0, 0, 0.1]} scale={0}>
        <RoundedBox args={[W * 0.78, H * 0.78, 0.025]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#ffffff" roughness={0.15} />
        </RoundedBox>
        {/* Lines on letter */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, 0.18 - i * 0.16, 0.015]}>
            <planeGeometry args={[W * 0.55, 0.04]} />
            <meshStandardMaterial
              color="#93d3fb"
              opacity={0.5 - i * 0.12}
              transparent
            />
          </mesh>
        ))}
        {/* Heart / star accent */}
        <mesh position={[0, -0.28, 0.015]}>
          <circleGeometry args={[0.07, 5]} />
          <meshStandardMaterial color="#3ba1f2" />
        </mesh>
      </group>

      {/* Ambient glow */}
      <mesh position={[0, 0, -0.3]}>
        <planeGeometry args={[W + 1.2, H + 1.2]} />
        <meshStandardMaterial
          color="#3ba1f2"
          opacity={hovered ? 0.12 : 0.04}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ==========================================================
// CANVAS
// ==========================================================

export default function ContactCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 42, near: 0.1, far: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, -3]} intensity={0.25} color="#93d3fb" />
      <Suspense fallback={null}>
        <Environment preset="apartment" />
        <Envelope />
      </Suspense>
    </Canvas>
  );
}

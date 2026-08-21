"use client";

/**
 * components/three/AboutCanvas.tsx
 *
 * R3F Canvas untuk About section.
 * Berisi 3D lanyard fisik dengan badge/foto.
 *
 * Spec §28:
 *   - Lanyard berasa fisik (swinging, rotation, depth)
 *   - Lighting + material premium
 *   - Cursor interaction
 */

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useLanyardPhysics } from "@/lib/three/useLanyardPhysics";
import { damp } from "@/lib/three";

// ==========================================================
// LANYARD ROPE — render TubeGeometry dari joint chain
// ==========================================================

function LanyardRope() {
  const { jointsRef, anchorRef, step, trackMouse } = useLanyardPhysics({
    segments: 10,
    restLength: 0.28,
    stiffness: 140,
    damping: 0.86,
    gravity: 8,
    mouseInfluence: 0.5,
  });

  const tubeRef = useRef<THREE.Mesh>(null);
  const badgeRef = useRef<THREE.Group>(null);
  const clipRef = useRef<THREE.Mesh>(null);

  useEffect(() => trackMouse(), []);

  useFrame((_, delta) => {
    step(delta);

    const joints = jointsRef.current;
    const anchor = anchorRef.current;

    // Rebuild tube geometry from joint positions
    if (tubeRef.current) {
      const points = [
        anchor.clone(),
        ...joints.map(j => j.pos.clone()),
      ];
      const curve = new THREE.CatmullRomCurve3(points);
      const newGeo = new THREE.TubeGeometry(curve, 20, 0.018, 6, false);
      tubeRef.current.geometry.dispose();
      tubeRef.current.geometry = newGeo;
    }

    // Position badge at last joint
    const lastJoint = joints[joints.length - 1];
    const prevJoint = joints[joints.length - 2];
    if (badgeRef.current && lastJoint && prevJoint) {
      badgeRef.current.position.copy(lastJoint.pos);

      // Orient badge to face camera with slight swing angle
      const dir = new THREE.Vector3()
        .subVectors(lastJoint.pos, prevJoint.pos)
        .normalize();
      const angle = Math.atan2(dir.x, -dir.y);
      badgeRef.current.rotation.z = damp(
        badgeRef.current.rotation.z,
        angle * 0.4,
        6,
        delta,
      );
    }

    // Clip position — top of rope
    if (clipRef.current) {
      clipRef.current.position.copy(anchor);
      clipRef.current.position.y -= 0.05;
    }
  });

  return (
    <group>
      {/* Hook/clip at top */}
      <mesh ref={clipRef} position={[0, 2.0, 0]}>
        <torusGeometry args={[0.06, 0.022, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#9ca3af" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Rope tube */}
      <mesh ref={tubeRef}>
        <tubeGeometry args={[new THREE.LineCurve3(
          new THREE.Vector3(0, 2, 0),
          new THREE.Vector3(0, -0.8, 0),
        ), 20, 0.018, 6, false]} />
        <meshStandardMaterial
          color="#3ba1f2"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Badge / ID card */}
      <group ref={badgeRef} position={[0, -0.8, 0]}>
        {/* Card body */}
        <RoundedBox args={[1.0, 1.35, 0.04]} radius={0.06} smoothness={4}>
          <meshPhysicalMaterial
            color="#f8f9fc"
            roughness={0.05}
            metalness={0}
            transmission={0.15}
            thickness={0.1}
            envMapIntensity={0.8}
          />
        </RoundedBox>

        {/* Candy blue stripe at top */}
        <mesh position={[0, 0.52, 0.022]}>
          <planeGeometry args={[1.0, 0.28]} />
          <meshStandardMaterial color="#3ba1f2" roughness={0.4} />
        </mesh>

        {/* Profile circle placeholder */}
        <mesh position={[0, 0.22, 0.023]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial color="#dbeffe" roughness={0.3} />
        </mesh>

        {/* Name bar */}
        <mesh position={[0, -0.12, 0.022]}>
          <planeGeometry args={[0.7, 0.07]} />
          <meshStandardMaterial color="#1d6cd4" roughness={0.4} />
        </mesh>

        {/* Sub bar */}
        <mesh position={[0, -0.26, 0.022]}>
          <planeGeometry args={[0.5, 0.04]} />
          <meshStandardMaterial color="#93d3fb" roughness={0.4} />
        </mesh>

        {/* Bottom dots — decorative */}
        {[-0.25, 0, 0.25].map((x, i) => (
          <mesh key={i} position={[x, -0.48, 0.022]}>
            <circleGeometry args={[0.025, 12]} />
            <meshStandardMaterial color="#60bcf7" roughness={0.3} />
          </mesh>
        ))}

        {/* Card back */}
        <RoundedBox
          args={[1.0, 1.35, 0.02]}
          radius={0.06}
          smoothness={4}
          position={[0, 0, -0.03]}
        >
          <meshStandardMaterial color="#1e4987" roughness={0.5} metalness={0.1} />
        </RoundedBox>
      </group>
    </group>
  );
}

// ==========================================================
// SCENE
// ==========================================================

function AboutScene() {
  const cameraTargetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      cameraTargetRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 0.3;
      cameraTargetRef.current.y = (e.clientY / window.innerHeight - 0.5) * 0.2;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((state, delta) => {
    state.camera.position.x = damp(
      state.camera.position.x,
      cameraTargetRef.current.x,
      3, delta,
    );
    state.camera.position.y = damp(
      state.camera.position.y,
      1.0 - cameraTargetRef.current.y,
      3, delta,
    );
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
      <directionalLight position={[-3, -2, -3]} intensity={0.3} color="#93d3fb" />
      <pointLight position={[0, -2, 2]} intensity={0.5} color="#dbeffe" />
      <Environment preset="apartment" />
      <LanyardRope />
    </>
  );
}

// ==========================================================
// CANVAS EXPORT
// ==========================================================

export default function AboutCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 1.0, 5], fov: 45, near: 0.1, far: 30 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <AboutScene />
      </Suspense>
    </Canvas>
  );
}

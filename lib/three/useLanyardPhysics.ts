/**
 * lib/three/useLanyardPhysics.ts
 *
 * Custom spring-chain physics untuk lanyard.
 * Tidak butuh library tambahan — pure verlet integration.
 *
 * Model:
 *   anchor (fixed at top)
 *     │  segment 0
 *   joint[0]
 *     │  segment 1
 *   joint[1]
 *     ...
 *   joint[N-1]  ← card/badge hanging here
 *
 * Setiap joint punya posisi dan velocity.
 * Setiap frame: gravity tarik ke bawah, spring tarik ke parent,
 * damping kurangi velocity, mouse influence tambah sway.
 */

import { useRef } from "react";
import * as THREE from "three";

export interface Joint {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  prev: THREE.Vector3;
}

interface LanyardPhysicsOptions {
  segments?: number;    // jumlah joint (default 8)
  restLength?: number;  // jarak istirahat antar joint (default 0.35)
  stiffness?: number;   // spring stiffness (default 120)
  damping?: number;     // velocity damping (default 0.88)
  gravity?: number;     // downward force (default 9)
  mouseInfluence?: number; // seberapa kuat cursor mempengaruhi (default 0.4)
}

export function useLanyardPhysics(opts: LanyardPhysicsOptions = {}) {
  const {
    segments     = 8,
    restLength   = 0.35,
    stiffness    = 120,
    damping      = 0.88,
    gravity      = 9,
    mouseInfluence = 0.4,
  } = opts;

  // Anchor point — top of lanyard (moves with cursor)
  const anchorRef = useRef(new THREE.Vector3(0, 2.0, 0));

  // Joint chain
  const jointsRef = useRef<Joint[]>(
    Array.from({ length: segments }, (_, i) => ({
      pos:  new THREE.Vector3(0, 2.0 - (i + 1) * restLength, 0),
      vel:  new THREE.Vector3(0, 0, 0),
      prev: new THREE.Vector3(0, 2.0 - (i + 1) * restLength, 0),
    })),
  );

  // Mouse target for anchor sway
  const mouseTargetRef = useRef(new THREE.Vector2(0, 0));
  const mouseCurrentRef = useRef(new THREE.Vector2(0, 0));

  /** Call this in useEffect to track mouse */
  const trackMouse = () => {
    const handler = (e: MouseEvent) => {
      mouseTargetRef.current.set(
        (e.clientX / window.innerWidth  - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2,
      );
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  };

  /** Advance simulation by delta seconds */
  const step = (delta: number) => {
    const dt = Math.min(delta, 0.05); // cap to avoid explosion on tab switch
    const joints = jointsRef.current;
    const anchor = anchorRef.current;

    // Smooth mouse follow for anchor
    mouseCurrentRef.current.lerp(mouseTargetRef.current, 1 - Math.exp(-5 * dt));
    anchor.set(
      mouseCurrentRef.current.x * mouseInfluence,
      2.0 - mouseCurrentRef.current.y * 0.2,
      0,
    );

    // Verlet integration for each joint
    for (let i = 0; i < joints.length; i++) {
      const joint = joints[i];
      const parent = i === 0 ? anchor : joints[i - 1].pos;

      // Spring force toward parent
      const diff = new THREE.Vector3().subVectors(parent, joint.pos);
      const dist = diff.length();
      const stretch = dist - restLength;
      const springForce = diff.normalize().multiplyScalar(stiffness * stretch);

      // Gravity
      const gravForce = new THREE.Vector3(0, -gravity, 0);

      // Integrate velocity
      joint.vel.add(springForce.multiplyScalar(dt));
      joint.vel.add(gravForce.multiplyScalar(dt));
      joint.vel.multiplyScalar(damping);

      // Integrate position
      joint.prev.copy(joint.pos);
      joint.pos.add(joint.vel.clone().multiplyScalar(dt));

      // Constraint: max distance from parent
      const toDiff = new THREE.Vector3().subVectors(joint.pos, parent);
      if (toDiff.length() > restLength * 2.5) {
        toDiff.setLength(restLength * 2.5);
        joint.pos.copy(parent).add(toDiff);
        joint.vel.multiplyScalar(0.3);
      }
    }
  };

  return { jointsRef, anchorRef, step, trackMouse };
}

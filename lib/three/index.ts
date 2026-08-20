/**
 * lib/three/index.ts
 * Shared Three.js / R3F utilities.
 */

import * as THREE from "three";

// ==========================================================
// SHARED MATERIALS
// Reuse materials across objects to reduce draw calls.
// ==========================================================

export const candyBlueMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#93d3fb"),
  roughness: 0.2,
  metalness: 0.6,
  envMapIntensity: 1,
});

export const glassWhiteMat = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("#ffffff"),
  roughness: 0.05,
  metalness: 0,
  transmission: 0.9,
  thickness: 0.5,
  transparent: true,
  opacity: 0.7,
});

export const softPurpleMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#c4b5fd"),
  roughness: 0.3,
  metalness: 0.4,
});

// ==========================================================
// SHARED GEOMETRIES
// ==========================================================

export const roundedBoxGeo = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
export const sphereGeo     = new THREE.SphereGeometry(0.5, 32, 32);
export const torusGeo      = new THREE.TorusGeometry(0.4, 0.12, 16, 60);
export const octaGeo       = new THREE.OctahedronGeometry(0.5);
export const icoGeo        = new THREE.IcosahedronGeometry(0.5, 0);
export const cylinderGeo   = new THREE.CylinderGeometry(0.3, 0.4, 0.8, 6);

// ==========================================================
// HELPERS
// ==========================================================

/** Lerp a value toward target each frame — smooth follow */
export const damp = (current: number, target: number, speed: number, delta: number) =>
  current + (target - current) * (1 - Math.exp(-speed * delta));

/** Map a value from one range to another */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);

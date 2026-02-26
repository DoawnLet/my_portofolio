/* eslint-disable react-hooks/purity */
"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { motion } from "framer-motion-3d";

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  // Manual elapsed time — avoids THREE.Clock deprecation warning
  const elapsed = useRef(0);

  // Track scroll position of the entire window
  const { scrollYProgress } = useScroll();

  // Smooth the scroll progress for fluid particle movement
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 80,
    mass: 0.8,
  });

  // Map scroll progress (0→1) to larger rotation values for visible parallax
  const rotationY = useTransform(smoothProgress, [0, 1], [0, Math.PI * 8]);
  const rotationX = useTransform(smoothProgress, [0, 1], [0, Math.PI * 4]);

  // Create random points in a sphere
  const [positions, speeds] = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread particles further from center — avoids center clustering
      const r = 5 + Math.pow(Math.random(), 2.2) * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      speeds[i] = Math.random() * 0.4 + 0.08;
    }

    return [positions, speeds];
  }, []);

  useFrame((_state, delta) => {
    if (!ref.current) return;

    elapsed.current += delta;
    const time = elapsed.current;

    const array = ref.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < 1800; i++) {
      const i3 = i * 3;
      array[i3 + 1] += Math.sin(time * speeds[i] + array[i3]) * 0.005;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <motion.group rotation-y={rotationY} rotation-x={rotationX}>
      <Points ref={ref} positions={positions}>
        <PointMaterial
          transparent
          color="#088395"
          size={0.055}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </motion.group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <color attach="background" args={["#020617"]} /> {/* slate-950 */}
        <ambientLight intensity={0.5} />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}

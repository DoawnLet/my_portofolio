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

  // Track scroll position of the entire window
  const { scrollYProgress } = useScroll();

  // Smooth the scroll progress so the particles don't abruptly stop when scrolling stops
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    mass: 0.5,
  });

  // Map scroll progress (0 to 1) to rotation values
  const rotationY = useTransform(smoothProgress, [0, 1], [0, Math.PI * 4]);
  const rotationX = useTransform(smoothProgress, [0, 1], [0, Math.PI * 2]);

  // Create random points in a sphere
  const [positions, speeds] = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Create a slightly more clustered galaxy-like distribution
      const r = 2 + Math.pow(Math.random(), 3) * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta); // x
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
      positions[i * 3 + 2] = r * Math.cos(phi); // z

      speeds[i] = Math.random() * 0.5 + 0.1;
    }

    return [positions, speeds];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    // Subtle continuous wavy animation independent of scroll
    const time = state.clock.elapsedTime;
    const array = ref.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < 5000; i++) {
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
          color="#088395" // teal primary
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
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

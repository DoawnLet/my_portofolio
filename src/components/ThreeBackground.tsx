"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Stars, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// The Sun - Central glowing star
function Sun() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      // Pulsing effect for the sun
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Main sun sphere */}
      <Sphere ref={meshRef} args={[1.2, 32, 32]}>
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ff6600"
          emissiveIntensity={0.8}
        />
      </Sphere>
      {/* Sun glow effect */}
      <Sphere args={[1.8, 16, 16]}>
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.3} />
      </Sphere>
    </group>
  );
}

// Planet component with orbital motion
function Planet({
  size,
  distance,
  speed,
  color,
  emissiveColor,
  emissiveIntensity = 0.3,
}: {
  size: number;
  distance: number;
  speed: number;
  color: string;
  emissiveColor: string;
  emissiveIntensity?: number;
}) {
  const planetRef = useRef<THREE.Mesh>(null!);
  const orbitRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (orbitRef.current && planetRef.current) {
      // Orbital motion
      orbitRef.current.rotation.y = state.clock.elapsedTime * speed;
      // Planet rotation
      planetRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[distance, 0, 0]}>
        <Sphere ref={planetRef} args={[size, 16, 16]}>
          <meshStandardMaterial
            color={color}
            emissive={emissiveColor}
            emissiveIntensity={emissiveIntensity}
            transparent
            opacity={0.9}
          />
        </Sphere>
        {/* Planet glow */}
        <Sphere args={[size * 1.2, 8, 8]}>
          <meshBasicMaterial color={emissiveColor} transparent opacity={0.2} />
        </Sphere>
      </group>
    </group>
  );
}

// Asteroid belt particles
function AsteroidBelt() {
  const ref = useRef<THREE.Points>(null!);

  const asteroidPositions = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const angle = (i / 200) * Math.PI * 2;
      // Create variation using sine/cosine functions instead of Math.random
      const radiusVariation =
        Math.sin(i * 0.1) * 0.5 + Math.cos(i * 0.15) * 0.3;
      const radius = 8.5 + radiusVariation; // Between ~8-9 units from center
      const height = Math.sin(i * 0.05) * 0.3; // Slight vertical variation

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points
      ref={ref}
      positions={asteroidPositions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial color="#666666" size={0.02} transparent opacity={0.6} />
    </Points>
  );
}

// Main 3D Solar System scene
export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 5, 15], fov: 60 }}
        style={{ background: "transparent" }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.2} />

        {/* Sun light */}
        <pointLight position={[0, 0, 0]} color="#ffff00" intensity={2} />

        {/* Additional colored lights for cyberpunk effect */}
        <pointLight position={[10, 10, 10]} color="#00ffff" intensity={0.3} />
        <pointLight
          position={[-10, -10, -10]}
          color="#ff00ff"
          intensity={0.3}
        />

        {/* Stars background */}
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Solar System */}
        <Sun />

        {/* Inner Planets */}
        <Planet
          size={0.3}
          distance={3}
          speed={0.02}
          color="#ff6b6b"
          emissiveColor="#ff4444"
        />

        <Planet
          size={0.4}
          distance={4.5}
          speed={0.015}
          color="#4ecdc4"
          emissiveColor="#00ffff"
        />

        {/* Outer Planets */}
        <Planet
          size={0.6}
          distance={7}
          speed={0.01}
          color="#ff00ff"
          emissiveColor="#ff00ff"
          emissiveIntensity={0.5}
        />

        <Planet
          size={0.5}
          distance={9}
          speed={0.008}
          color="#00ff88"
          emissiveColor="#00ff88"
        />

        <Planet
          size={0.8}
          distance={12}
          speed={0.005}
          color="#ffaa00"
          emissiveColor="#ff6600"
        />

        {/* Asteroid Belt */}
        <AsteroidBelt />
      </Canvas>
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

// Floating 3D geometric logo
function FloatingLogo() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      </Float>

      {/* Orbiting cubes */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={0.3}>
        <Box args={[0.3, 0.3, 0.3]} position={[2, 0, 0]}>
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.4}
            transparent
            opacity={0.9}
          />
        </Box>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={0.4}>
        <Box args={[0.25, 0.25, 0.25]} position={[-1.5, 1.5, 0]}>
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </Box>
      </Float>

      {/* Orbiting torus */}
      <Float speed={1} rotationIntensity={3} floatIntensity={0.2}>
        <Torus args={[1.2, 0.1, 16, 100]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#ffff00"
            emissive="#ffff00"
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
          />
        </Torus>
      </Float>
    </group>
  );
}

// Interactive 3D logo for hero section
export default function ThreeText() {
  return (
    <div className="w-full h-80 flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} color="#00ffff" intensity={1} />
        <pointLight
          position={[-10, -10, -10]}
          color="#ff00ff"
          intensity={0.8}
        />
        <pointLight position={[0, 0, 10]} color="#ffff00" intensity={0.5} />

        <FloatingLogo />
      </Canvas>
    </div>
  );
}

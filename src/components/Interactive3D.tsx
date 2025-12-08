"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

// Interactive sphere that responds to mouse
function InteractiveSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1, 32, 32]}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={hovered ? "#ff6b6b" : "#00ffff"}
        emissive={hovered ? "#ff6b6b" : "#00ffff"}
        emissiveIntensity={hovered ? 0.4 : 0.2}
        transparent
        opacity={0.8}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  );
}

// Mouse-following light
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null!);
  const { viewport, mouse } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = (mouse.x * viewport.width) / 2;
      lightRef.current.position.y = (mouse.y * viewport.height) / 2;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      color="#ffffff"
      intensity={2}
      position={[0, 0, 2]}
      distance={10}
    />
  );
}

// Main interactive 3D component
export default function Interactive3D() {
  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />

        {/* Static lights */}
        <pointLight position={[5, 5, 5]} color="#00ffff" intensity={0.8} />
        <pointLight position={[-5, -5, -5]} color="#ff00ff" intensity={0.8} />

        {/* Interactive elements */}
        <MouseLight />
        <InteractiveSphere />

        {/* Background elements */}
        <Box args={[0.5, 0.5, 0.5]} position={[2, -1, -2]}>
          <meshStandardMaterial color="#4ecdc4" transparent opacity={0.7} />
        </Box>

        <Torus args={[0.8, 0.2, 16, 100]} position={[-2, 1, -3]}>
          <meshStandardMaterial color="#ffe66d" transparent opacity={0.6} />
        </Torus>
      </Canvas>
    </div>
  );
}

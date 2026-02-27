"use client";

import React, { useRef, Suspense } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { motion as motion3d } from "framer-motion-3d";
import { Physics, useSphere, usePlane } from "@react-three/cannon";
import { ArrowDown } from "lucide-react";

// Workaround for generic type conflicts
const Box = motion.div as React.FC<any>;
const Btn = motion.button as React.FC<any>;
const H1 = motion.h1 as React.FC<any>;
const Para = motion.p as React.FC<any>;

// ─── Boundaries ──────────────────────────────────────────────────────────────
function InvisibleWalls() {
  // Floor
  usePlane(() => ({ position: [0, -5, 0], rotation: [-Math.PI / 2, 0, 0] }));
  // Ceiling
  usePlane(() => ({ position: [0, 5, 0], rotation: [Math.PI / 2, 0, 0] }));
  // Left wall
  usePlane(() => ({ position: [-8, 0, 0], rotation: [0, Math.PI / 2, 0] }));
  // Right wall
  usePlane(() => ({ position: [8, 0, 0], rotation: [0, -Math.PI / 2, 0] }));
  // Back wall
  usePlane(() => ({ position: [0, 0, -4], rotation: [0, 0, 0] }));
  // Front wall
  usePlane(() => ({ position: [0, 0, 4], rotation: [0, Math.PI, 0] }));
  return null;
}

// ─── 3D Shapes ───────────────────────────────────────────────────────────────
function FloatingShape({
  position,
  color,
  distort,
  speed,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  distort: number;
  speed: number;
  scale?: number;
}) {
  const [hovered, setHovered] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const [pinned, setPinned] = React.useState(false);

  // Physics sphere reference
  const [meshRef, api] = useSphere(() => ({
    mass: 1,
    position: position,
    args: [scale * 1.2], // rough radius for collision
    linearDamping: 0.1,
    angularDamping: 0.1,
    material: { restitution: 0.9, friction: 0.1 }, // bounciness
  }));

  // Apply initial random velocity to make them float around
  React.useEffect(() => {
    // Random direction and rotation
    const rx = (Math.random() - 0.5) * 5;
    const ry = (Math.random() - 0.5) * 5;
    const rz = (Math.random() - 0.5) * 5;
    api.velocity.set(rx, ry, rz);
    api.angularVelocity.set(rx, ry, rz);
  }, [api.velocity, api.angularVelocity]);

  // Hold timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Self-rotation wiggle effect using frame
  useFrame((state, delta) => {
    if (!pinned && !clicked && hovered) {
      // Just visually spin the shape slightly on hover
      api.angularVelocity.set(0, 2, 0);
    }
  });

  const handlePointerDown = () => {
    setClicked(true);
    // Stop physics forces immediately
    api.velocity.set(0, 0, 0);
    api.angularVelocity.set(0, 0, 0);

    // Start 5-second timer
    timerRef.current = setTimeout(() => {
      setPinned(true);
      // Make it kinematic/static so it stays pinned and bouncy
      api.mass.set(0);
    }, 5000);
  };

  const handlePointerUp = () => {
    setClicked(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // If not pinned, throw it back into space
    if (!pinned) {
      const pushX = (Math.random() - 0.5) * 8;
      const pushY = (Math.random() - 0.5) * 8;
      const pushZ = (Math.random() - 0.5) * 8;
      api.velocity.set(pushX, pushY, pushZ);
      api.mass.set(1); // Restore mass
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
    if (clicked && !pinned) {
      // Cancel hold if dragged out
      handlePointerUp();
    }
  };

  // Calculate target scale based on interaction state
  const currentScale = pinned
    ? scale * 1.5
    : clicked
      ? scale * 0.7
      : hovered
        ? scale * 1.3
        : scale;

  return (
    <Float
      speed={pinned ? 0 : speed}
      rotationIntensity={pinned ? 0 : 0.5}
      floatIntensity={pinned ? 0 : 0.5}
    >
      <motion3d.mesh
        ref={meshRef as React.Ref<any>}
        animate={{ scale: currentScale }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={handlePointerOut}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={pinned ? "#ffffff" : color} // Turns white when pinned
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={pinned ? 0.9 : 0.5}
          roughness={0.2}
          transmission={0.9}
          ior={1.5}
          thickness={0.5}
          distort={hovered || pinned ? distort * 2 : distort}
          speed={hovered && !pinned ? speed * 2 : speed}
        />
      </motion3d.mesh>
    </Float>
  );
}

function Scene({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  // Use springs for smooth mouse follow
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Convert 2D mouse position to slight 3D rotation
  const groupRotationY = useTransform(springX, [-0.5, 0.5], [-0.08, 0.08]);
  const groupRotationX = useTransform(springY, [-0.5, 0.5], [-0.08, 0.08]);

  return (
    <motion3d.group rotation-y={groupRotationY} rotation-x={groupRotationX}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.5}
        color="#088395"
      />

      {/* Physics World wrapped around floating shapes */}
      <Physics gravity={[0, 0, 0]}>
        <InvisibleWalls />
        {/* 3D Shapes around the text */}
        <FloatingShape
          position={[-3.5, 1.5, -2]}
          color="#7AB2B2"
          distort={0.2}
          speed={1.5}
          scale={1.2}
        />
        <FloatingShape
          position={[3.5, -1.5, 0]}
          color="#088395"
          distort={0.3}
          speed={2}
          scale={1.5}
        />
        <FloatingShape
          position={[-2.5, -2, 1]}
          color="#09637E"
          distort={0.4}
          speed={2.5}
          scale={0.8}
        />
        <FloatingShape
          position={[2.5, 2, -1]}
          color="#EBF4F6"
          distort={0.1}
          speed={1}
          scale={1}
        />
      </Physics>

      <Environment preset="city" />
    </motion3d.group>
  );
}

// ─── Magnetic button ─────────────────────────────────────────────────────────
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <Btn
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#088395] to-[#09637E] text-[#EBF4F6] font-semibold text-lg overflow-hidden shadow-[0_8px_32px_rgba(8,131,149,0.35)] hover:shadow-[0_12px_48px_rgba(8,131,149,0.55)] transition-shadow duration-500 pointer-events-auto"
    >
      <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
      {children}
    </Btn>
  );
}

// ─── Stagger container variants ──────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef as unknown as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  const { scrollY } = useScroll();
  const SCROLL_RANGE = 900;

  // Parallax for the whole content
  const contentY = useTransform(scrollY, [0, SCROLL_RANGE], [0, -180]);
  const contentOpacity = useTransform(
    scrollY,
    [0, SCROLL_RANGE * 0.45],
    [1, 0],
  );
  const contentScale = useTransform(
    scrollY,
    [0, SCROLL_RANGE * 0.5],
    [1, 0.92],
  );

  // Mouse position normalized for 3D group rotation (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (typeof window !== "undefined") {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    }
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── 3D Canvas Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Scene mouseX={mouseX} mouseY={mouseY} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Dot-grid texture ── */}
      <Box
        aria-hidden="true"
        style={{
          y: useTransform(scrollY, [0, SCROLL_RANGE], [0, -60]),
          backgroundImage: `radial-gradient(circle, rgba(122,178,178,0.15) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
      />

      {/* ── Main content ── */}
      <Box
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center will-change-transform pointer-events-none"
      >
        <Box
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="pointer-events-auto"
        >
          {/* Eyebrow label */}
          <Box variants={itemVariants} className="mb-6">
            <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-[#7AB2B2] border border-[#7AB2B2]/30 rounded-full px-5 py-2 bg-[#088395]/10 backdrop-blur-sm shadow-[0_0_20px_rgba(8,131,149,0.2)]">
              Full-Stack Developer &amp; Creative Technologist
            </span>
          </Box>

          {/* Headline */}
          <H1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tight mb-6 drop-shadow-2xl"
          >
            <span className="block bg-gradient-to-br from-[#EBF4F6] via-[#7AB2B2] to-[#EBF4F6] bg-clip-text text-transparent">
              Crafting Digital
            </span>
            <span className="block bg-gradient-to-r from-[#088395] via-[#7AB2B2] to-[#09637E] bg-clip-text text-transparent">
              Experiences
            </span>
          </H1>

          {/* Subtitle */}
          <Para
            variants={itemVariants}
            className="text-lg md:text-xl text-[#7AB2B2]/90 max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-md"
          >
            Building immersive, pixel-perfect interfaces where clean code meets
            creative vision. Specialising in React, Next.js, and AI-driven
            solutions.
          </Para>

          {/* CTA row */}
          <Box
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton>
              <span>Explore My Work</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
            </MagneticButton>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-[#7AB2B2]/30 text-[#7AB2B2] hover:text-[#EBF4F6] hover:border-[#088395]/60 hover:bg-[#088395]/10 transition-all duration-300 font-medium text-base backdrop-blur-sm drop-shadow-lg"
            >
              Get in Touch
            </a>
          </Box>
        </Box>
      </Box>

      {/* ── Scroll indicator ── */}
      <Box
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#7AB2B2]/60 font-medium">
          Scroll
        </span>
        <Box
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-[#7AB2B2]/70 to-transparent"
        />
      </Box>

      {/* ── Bottom fade ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(2,6,23,0.6))",
        }}
      />
    </section>
  );
}

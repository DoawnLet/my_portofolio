"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  type MotionValue,
} from "framer-motion";
import { ArrowDown } from "lucide-react";

// Workaround: framer-motion-3d causes generic type conflict with motion.div
const Box = motion.div as React.FC<any>;
const Btn = motion.button as React.FC<any>;
const H1 = motion.h1 as React.FC<any>;
const Para = motion.p as React.FC<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

// ─── Floating background blob with X+Y parallax ──────────────────────────────
interface BlobProps {
  yValue: MotionValue<number>;
  xValue?: MotionValue<number>;
  scaleValue?: MotionValue<number>;
  background: string;
  className?: string;
}
function Blob({
  yValue,
  xValue,
  scaleValue,
  background,
  className,
}: BlobProps) {
  return (
    <Box
      style={{
        y: yValue,
        x: xValue,
        scale: scaleValue,
        background,
      }}
      className={`absolute rounded-full pointer-events-none will-change-transform ${className ?? ""}`}
    />
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
      className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#088395] to-[#09637E] text-[#EBF4F6] font-semibold text-lg overflow-hidden shadow-[0_8px_32px_rgba(8,131,149,0.35)] hover:shadow-[0_12px_48px_rgba(8,131,149,0.55)] transition-shadow duration-500"
    >
      {/* shine sweep */}
      <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
      {children}
    </Btn>
  );
}

// ─── Stagger container variants ───────────────────────────────────────────────
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

  // Scroll-driven parallax — use scrollYProgress for all transforms
  const { scrollY } = useScroll();
  const SCROLL_RANGE = 900; // viewport height approx

  // ── BLOB LAYER 1: Huge teal blob top-left — drifts slowly left & up ────────
  const blob1Y = useTransform(scrollY, [0, SCROLL_RANGE], [0, -320]);
  const blob1X = useTransform(scrollY, [0, SCROLL_RANGE], [0, -80]);
  const blob1Scale = useTransform(scrollY, [0, SCROLL_RANGE], [1, 1.4]);

  // ── BLOB LAYER 2: Mid teal blob top-right — medium speed, drifts right ─────
  const blob2Y = useTransform(scrollY, [0, SCROLL_RANGE], [0, -200]);
  const blob2X = useTransform(scrollY, [0, SCROLL_RANGE], [0, 60]);
  const blob2Scale = useTransform(scrollY, [0, SCROLL_RANGE], [1, 0.7]);

  // ── BLOB LAYER 3: Light blob center-top — fastest, shoots upward ──────────
  const blob3Y = useTransform(scrollY, [0, SCROLL_RANGE], [0, -480]);
  const blob3X = useTransform(scrollY, [0, SCROLL_RANGE], [0, -40]);

  // ── BLOB LAYER 4: Deep accent blob bottom-right — slow, drifts down ────────
  const blob4Y = useTransform(scrollY, [0, SCROLL_RANGE], [0, -120]);
  const blob4X = useTransform(scrollY, [0, SCROLL_RANGE], [0, 100]);
  const blob4Scale = useTransform(scrollY, [0, SCROLL_RANGE], [1, 1.6]);

  // ── BLOB LAYER 5: Extra small accent — diagonal drift ─────────────────────
  const blob5Y = useTransform(scrollY, [0, SCROLL_RANGE], [0, -380]);
  const blob5X = useTransform(scrollY, [0, SCROLL_RANGE], [0, 120]);

  // ── Content: moves up faster = strong depth separation ────────────────────
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

  // ── Dot-grid texture moves independently (slowest layer) ──────────────────
  const gridY = useTransform(scrollY, [0, SCROLL_RANGE], [0, -60]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Parallax Layer 1: Huge teal blob — top-left, drifts up-left ── */}
      <Blob
        yValue={blob1Y}
        xValue={blob1X}
        scaleValue={blob1Scale}
        background="radial-gradient(circle, #7AB2B2, transparent 65%)"
        className="w-[800px] h-[800px] -left-80 -top-60 opacity-25 blur-[90px]"
      />

      {/* ── Parallax Layer 2: Teal mid-blob — top-right, medium speed ── */}
      <Blob
        yValue={blob2Y}
        xValue={blob2X}
        scaleValue={blob2Scale}
        background="radial-gradient(circle, #088395, transparent 65%)"
        className="w-[600px] h-[600px] -right-20 top-10 opacity-30 blur-[70px]"
      />

      {/* ── Parallax Layer 3: Light accent — center, fastest ── */}
      <Blob
        yValue={blob3Y}
        xValue={blob3X}
        background="radial-gradient(circle, #EBF4F6, transparent 65%)"
        className="w-[380px] h-[380px] left-1/3 top-16 opacity-15 blur-[50px]"
      />

      {/* ── Parallax Layer 4: Deep accent — bottom-right, slow + grow ── */}
      <Blob
        yValue={blob4Y}
        xValue={blob4X}
        scaleValue={blob4Scale}
        background="radial-gradient(circle, #09637E, transparent 65%)"
        className="w-[520px] h-[520px] right-24 bottom-0 opacity-20 blur-[80px]"
      />

      {/* ── Parallax Layer 5: Small accent — diagonal drift ── */}
      <Blob
        yValue={blob5Y}
        xValue={blob5X}
        background="radial-gradient(circle, #7AB2B2, transparent 60%)"
        className="w-[280px] h-[280px] left-10 bottom-40 opacity-20 blur-[40px]"
      />

      {/* ── Dot-grid texture — slowest layer (subtle depth) ── */}
      <Box
        aria-hidden="true"
        style={{
          y: gridY,
          backgroundImage: `radial-gradient(circle, rgba(122,178,178,0.22) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
      />

      {/* ── Main content — strongest upward parallax for deep Z separation ── */}
      <Box
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center will-change-transform"
      >
        <Box
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Eyebrow label */}
          <Box variants={itemVariants} className="mb-6">
            <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-[#7AB2B2] border border-[#7AB2B2]/30 rounded-full px-5 py-2 bg-[#088395]/10 backdrop-blur-sm">
              Full-Stack Developer &amp; Creative Technologist
            </span>
          </Box>

          {/* Headline */}
          <H1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tight mb-6"
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
            className="text-lg md:text-xl text-[#7AB2B2]/90 max-w-2xl mx-auto leading-relaxed mb-12"
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-[#7AB2B2]/30 text-[#7AB2B2] hover:text-[#EBF4F6] hover:border-[#088395]/60 hover:bg-[#088395]/10 transition-all duration-300 font-medium text-base backdrop-blur-sm"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
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

      {/* ── Bottom fade into next section ── */}
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

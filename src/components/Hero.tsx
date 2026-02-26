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
/* eslint-disable @typescript-eslint/no-explicit-any */
const Box = motion.div as React.FC<any>;
const Btn = motion.button as React.FC<any>;
const H1 = motion.h1 as React.FC<any>;
const Para = motion.p as React.FC<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

// ─── Floating background blob ────────────────────────────────────────────────
interface BlobProps {
  yValue: MotionValue<number>;
  background: string;
  className?: string;
}
function Blob({ yValue, background, className }: BlobProps) {
  return (
    <Box
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={{ y: yValue as any, background }}
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
  // Cast to satisfy framer-motion v11 strict ref type
  const inView = useInView(sectionRef as unknown as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  // Scroll-driven parallax
  const { scrollY } = useScroll();

  // Different parallax speeds for depth layering
  const blobY1 = useTransform(scrollY, [0, 600], [0, -180]);
  const blobY2 = useTransform(scrollY, [0, 600], [0, -90]);
  const blobY3 = useTransform(scrollY, [0, 600], [0, -240]);
  const blobY4 = useTransform(scrollY, [0, 600], [0, -60]);

  // Content moves up slightly faster than neutral = depth effect
  const contentY = useTransform(scrollY, [0, 600], [0, -90]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Parallax background blobs ── */}
      {/* Layer 1 — largest, slowest */}
      <Blob
        yValue={blobY4}
        background="radial-gradient(circle, #7AB2B2, transparent 70%)"
        className="w-[700px] h-[700px] -left-64 -top-40 opacity-20 blur-[80px]"
      />
      {/* Layer 2 — medium-fast */}
      <Blob
        yValue={blobY2}
        background="radial-gradient(circle, #088395, transparent 70%)"
        className="w-[500px] h-[500px] right-0 top-20 opacity-15 blur-[60px]"
      />
      {/* Layer 3 — fastest, top */}
      <Blob
        yValue={blobY3}
        background="radial-gradient(circle, #EBF4F6, transparent 70%)"
        className="w-[360px] h-[360px] left-1/4 top-10 opacity-10 blur-[48px]"
      />
      {/* Layer 4 — bottom accent */}
      <Blob
        yValue={blobY1}
        background="radial-gradient(circle, #09637E, transparent 70%)"
        className="w-[480px] h-[480px] right-10 bottom-0 opacity-12 blur-[72px]"
      />

      {/* Fine dot-grid texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(122,178,178,0.18) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Main content ── */}
      <Box
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <Box
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Eyebrow label */}
          <Box variants={itemVariants} className="mb-6">
            <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-[#7AB2B2] border border-[#7AB2B2]/30 rounded-full px-5 py-2 bg-[#088395]/10 backdrop-blur-sm">
              Full-Stack Developer & Creative Technologist
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
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#7AB2B2]/60 to-transparent"
        />
      </Box>

      {/* ── Bottom fade into next section ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(9,99,126,0.15))",
        }}
      />
    </section>
  );
}

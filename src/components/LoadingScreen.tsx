"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Box = motion.div as React.FC<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

// ─── Letter stagger for heading ───────────────────────────────────────────────
const WORD = "Min Min Dev";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -60 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const eyebrowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const dotVariants = {
  animate: (i: number) => ({
    opacity: [0.2, 1, 0.2],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      delay: i * 0.22,
      ease: "easeInOut",
    },
  }),
};

// ─── Blob ─────────────────────────────────────────────────────────────────────
function Blob({
  className,
  animateX,
  animateY,
  duration,
  style,
}: {
  className: string;
  animateX: number[];
  animateY: number[];
  duration: number;
  style?: React.CSSProperties;
}) {
  return (
    <Box
      className={`pointer-events-none absolute rounded-full blur-[80px] ${className}`}
      style={style}
      animate={{ x: animateX, y: animateY }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    />
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ duration }: { duration: number }) {
  return (
    <div
      className="w-48 h-[2px] rounded-full overflow-hidden mt-10"
      style={{ background: "rgba(122,178,178,0.15)" }}
    >
      <Box
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, #088395, #7AB2B2, #EBF4F6)",
        }}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration, ease: "easeInOut" }}
      />
    </div>
  );
}

// ─── Curtain exit: two panels slide up ───────────────────────────────────────
const curtainVariants = {
  initial: { y: 0 },
  exit: (delay: number) => ({
    y: "-100%",
    transition: {
      duration: 0.8,
      delay,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

// ─── Main component ───────────────────────────────────────────────────────────
interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [leaving, setLeaving] = useState(false);
  const DISPLAY_DURATION = 2400; // ms before exit begins

  useEffect(() => {
    // Prevent background scrolling while loading screen is visible
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => {
        document.body.style.overflow = "";
        onComplete();
      }, 900);
    }, DISPLAY_DURATION);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!leaving && (
        <>
          {/* ── Back curtain (slightly delayed) ── */}
          <Box
            key="curtain-back"
            custom={0.12}
            variants={curtainVariants}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[199]"
            style={{ background: "#051820" }}
          />

          {/* ── Front curtain ── */}
          <Box
            key="curtain-front"
            custom={0}
            variants={curtainVariants}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #030c12 0%, #051820 50%, #072030 100%)",
            }}
          >
            {/* Blobs */}
            <Blob
              className="w-[500px] h-[500px] top-[-120px] left-[-100px] opacity-20"
              animateX={[0, 30, -15, 0]}
              animateY={[0, -20, 40, 0]}
              duration={8}
              style={{
                background: "radial-gradient(circle, #088395, transparent 70%)",
              }}
            />
            <Blob
              className="w-[400px] h-[400px] bottom-[-80px] right-[-60px] opacity-15"
              animateX={[0, -25, 15, 0]}
              animateY={[0, 20, -30, 0]}
              duration={10}
              style={{
                background: "radial-gradient(circle, #7AB2B2, transparent 70%)",
              }}
            />
            <Blob
              className="w-[300px] h-[300px] top-1/2 right-1/4 opacity-10"
              animateX={[0, 20, -20, 0]}
              animateY={[0, -30, 10, 0]}
              duration={12}
              style={{
                background: "radial-gradient(circle, #09637E, transparent 70%)",
              }}
            />

            {/* Dot-grid texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #7AB2B2 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center select-none">
              {/* Eyebrow */}
              <Box
                variants={eyebrowVariants}
                initial="hidden"
                animate="visible"
                className="text-[10px] font-semibold tracking-[0.4em] uppercase text-[#7AB2B2] border border-[#7AB2B2]/30 rounded-full px-5 py-2 mb-8"
                style={{
                  background: "rgba(8,131,149,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Welcome
              </Box>

              {/* Staggered letters */}
              <Box
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-[0.04em] max-w-[90vw]"
                style={{ perspective: "600px" }}
              >
                {WORD.split("").map((char, i) => (
                  <Box
                    key={i}
                    variants={letterVariants}
                    className="text-[clamp(3rem,10vw,7rem)] font-black leading-none tracking-tight"
                    style={{
                      background:
                        i < 4
                          ? "linear-gradient(180deg, #EBF4F6, #7AB2B2)"
                          : "linear-gradient(180deg, #7AB2B2, #088395)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {char}
                  </Box>
                ))}
              </Box>

              {/* Underline draw */}
              <Box
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="w-full h-[2px] mt-3 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #088395, #7AB2B2, transparent)",
                }}
              />

              {/* Progress bar */}
              <ProgressBar duration={DISPLAY_DURATION / 1000 - 0.3} />

              {/* Loading dots */}
              <div className="flex gap-3 mt-6">
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    custom={i}
                    variants={dotVariants}
                    animate="animate"
                    className="w-[6px] h-[6px] rounded-full"
                    style={{ background: "#7AB2B2" }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom shimmer line */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(8,131,149,0.6) 50%, transparent 100%)",
              }}
            />
          </Box>
        </>
      )}
    </AnimatePresence>
  );
}

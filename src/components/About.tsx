"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { User, Code2, Rocket, Heart, Sparkles } from "lucide-react";

const Box = motion.div as React.FC<any>;
const Section = motion.section as React.FC<any>;

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0, rotate: -10 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: "backOut" },
  },
};

// ─── Premium Spotlight Card ───────────────────────────────────────────────────
function SpotlightCard({
  children,
  className = "",
  color = "#088395",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Box
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl overflow-hidden ${className}`}
      style={{
        background: "rgba(122,178,178,0.03)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(122,178,178,0.15)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* 1. Inner surface radial glow that tracks mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              ${color}1A,
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. Top-left soft glass highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />

      {/* Content wrapper */}
      <div className="relative z-10 h-full p-8 md:p-10 flex flex-col">
        {children}
      </div>
    </Box>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven parallax on the section blobs
  const { scrollYProgress } = useScroll({
    target: sectionRef as unknown as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });

  const blobTopY = useTransform(scrollYProgress, [0, 1], [-80, 140]);
  const blobTopX = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const blobBotY = useTransform(scrollYProgress, [0, 1], [60, -120]);
  const blobBotX = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <Section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background accent blob – top-right */}
      <Box
        aria-hidden="true"
        style={{
          y: blobTopY,
          x: blobTopX,
          background: "radial-gradient(circle, #7AB2B2, transparent 70%)",
        }}
        className="pointer-events-none absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full opacity-[0.12] blur-[80px] will-change-transform"
      />
      {/* Background accent blob – bottom-left */}
      <Box
        aria-hidden="true"
        style={{
          y: blobBotY,
          x: blobBotX,
          background: "radial-gradient(circle, #088395, transparent 70%)",
        }}
        className="pointer-events-none absolute -bottom-20 -left-20 w-[440px] h-[440px] rounded-full opacity-[0.11] blur-[64px] will-change-transform"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Section heading ── */}
        <Box
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-[#7AB2B2] border border-[#7AB2B2]/30 rounded-full px-5 py-2 mb-5"
            style={{
              background: "rgba(8,131,149,0.06)",
              backdropFilter: "blur(8px)",
            }}
          >
            About Me
          </span>
          <h2 className="text-5xl md:text-6xl font-black leading-tight">
            <span className="bg-gradient-to-r from-[#EBF4F6] via-[#7AB2B2] to-[#EBF4F6] bg-clip-text text-transparent">
              The Person
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#088395] to-[#09637E] bg-clip-text text-transparent">
              Behind the Code
            </span>
          </h2>
        </Box>

        {/* ── Bento Box Grid ── */}
        <Box
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* Card 1: Who I Am (Large, spans 2 cols & 2 rows on desktop) */}
          <SpotlightCard
            className="md:col-span-2 md:row-span-2"
            color="#088395"
          >
            <div className="flex-1 flex flex-col justify-center">
              <Box
                variants={iconVariants}
                className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl shrink-0"
                style={{
                  background: `linear-gradient(135deg, #0883951A, #08839533)`,
                  border: `1px solid #08839540`,
                }}
              >
                <User className="w-8 h-8 text-[#088395]" />
              </Box>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#EBF4F6] to-[#7AB2B2] bg-clip-text text-transparent">
                Who I Am
              </h3>
              <p className="text-[#7AB2B2]/90 leading-relaxed text-base md:text-lg max-w-xl">
                I'm a passionate full-stack developer with a love for creating
                immersive digital experiences. My journey in tech started with
                curiosity and has evolved into a career dedicated to pushing the
                boundaries of what's possible in web development.
              </p>

              {/* Badge Tags */}
              <div className="flex flex-wrap gap-3 mt-10">
                {["Frontend", "Backend", "UI/UX", "Problem Solver"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full text-sm font-medium border border-[#7AB2B2]/20 bg-[#7AB2B2]/5 text-[#EBF4F6] backdrop-blur-sm transition-colors hover:bg-[#7AB2B2]/20"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2: What I Do (Small) */}
          <SpotlightCard
            className="md:col-span-1 md:row-span-1"
            color="#09637E"
          >
            <Box
              variants={iconVariants}
              className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
              style={{
                background: `linear-gradient(135deg, #09637E1A, #09637E33)`,
                border: `1px solid #09637E40`,
              }}
            >
              <Code2 className="w-6 h-6 text-[#09637E]" />
            </Box>
            <h3 className="text-xl font-bold mb-3 text-[#EBF4F6]">What I Do</h3>
            <p className="text-[#7AB2B2]/80 leading-relaxed text-sm">
              I specialize in modern web technologies, from responsive front-end
              interfaces to scalable back-end systems.
            </p>
          </SpotlightCard>

          {/* Card 3: Beyond Code (Small) */}
          <SpotlightCard
            className="md:col-span-1 md:row-span-1"
            color="#7AB2B2"
          >
            <Box
              variants={iconVariants}
              className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
              style={{
                background: `linear-gradient(135deg, #7AB2B21A, #7AB2B233)`,
                border: `1px solid #7AB2B240`,
              }}
            >
              <Heart className="w-6 h-6 text-[#7AB2B2]" />
            </Box>
            <h3 className="text-xl font-bold mb-3 text-[#EBF4F6]">
              Beyond Code
            </h3>
            <p className="text-[#7AB2B2]/80 leading-relaxed text-sm">
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open-source, or sharing knowledge.
            </p>
          </SpotlightCard>

          {/* Card 4: My Mission (Wide, spans 3 cols) */}
          <SpotlightCard
            className="md:col-span-3 md:row-span-1 flex flex-col"
            color="#EBF4F6"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 w-full h-full">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-5">
                  <Box
                    variants={iconVariants}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                    style={{
                      background: `linear-gradient(135deg, #EBF4F61A, #EBF4F633)`,
                      border: `1px solid #EBF4F640`,
                    }}
                  >
                    <Rocket className="w-6 h-6 text-[#EBF4F6]" />
                  </Box>
                  <h3 className="text-2xl font-bold text-[#EBF4F6]">
                    My Mission
                  </h3>
                </div>
                <p className="text-[#7AB2B2]/80 leading-relaxed text-base md:text-lg max-w-3xl">
                  To create digital solutions that not only function flawlessly
                  but also inspire and delight users. I believe in the power of
                  technology to solve real-world problems and improve lives.
                </p>
              </div>

              {/* Decorative element for large screens */}
              <div className="hidden md:flex relative w-32 h-32 shrink-0 items-center justify-center ml-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#088395]/20 to-[#7AB2B2]/30 rounded-full blur-2xl animate-pulse" />
                <motion.div
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <Sparkles className="w-12 h-12 text-[#7AB2B2]" />
                </motion.div>
              </div>
            </div>
          </SpotlightCard>
        </Box>

        {/* ── CTA banner ── */}
        <Box
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-16 rounded-3xl p-10 text-center relative overflow-hidden"
          style={{
            background: "rgba(122,178,178,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(8,131,149,0.14)",
          }}
        >
          {/* Shine line top */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/4 right-1/4 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(122,178,178,0.5), transparent)",
            }}
          />
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-[#088395] to-[#7AB2B2] bg-clip-text text-transparent">
              Amazing
            </span>{" "}
            Together
          </h3>
          <p className="text-[#7AB2B2]/80 text-base leading-relaxed max-w-2xl mx-auto">
            I&apos;m always excited to take on new challenges and collaborate on
            innovative projects. Whether it&apos;s a cutting-edge web
            application, a mobile app, or exploring new technologies — I&apos;m
            ready to bring your vision to life.
          </p>
        </Box>
      </div>
    </Section>
  );
}

"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { User, Code2, Rocket, Heart } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Box = motion.div as React.FC<any>;
const Section = motion.section as React.FC<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
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
  hidden: { scale: 0.6, opacity: 0, rotate: -15 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: "backOut" },
  },
};

// ─── Card data ────────────────────────────────────────────────────────────────
const cards = [
  {
    icon: User,
    title: "Who I Am",
    color: "#088395",
    text: "I'm a passionate full-stack developer with a love for creating immersive digital experiences. My journey in tech started with curiosity and has evolved into a career dedicated to pushing the boundaries of what's possible in web development.",
    glow: "rgba(8,131,149,0.14)",
  },
  {
    icon: Code2,
    title: "What I Do",
    color: "#09637E",
    text: "I specialize in modern web technologies, from responsive front-end interfaces to scalable back-end systems. I enjoy working with React, Next.js, TypeScript, and exploring emerging technologies like AI integration and Web3.",
    glow: "rgba(9,99,126,0.14)",
  },
  {
    icon: Rocket,
    title: "My Mission",
    color: "#7AB2B2",
    text: "To create digital solutions that not only function flawlessly but also inspire and delight users. I believe in the power of technology to solve real-world problems and improve lives.",
    glow: "rgba(122,178,178,0.14)",
  },
  {
    icon: Heart,
    title: "Beyond Code",
    color: "#088395",
    text: "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and giving back.",
    glow: "rgba(8,131,149,0.14)",
  },
];

// ─── Individual Glass Card ────────────────────────────────────────────────────
function AboutCard({
  icon: Icon,
  title,
  color,
  text,
  glow,
}: (typeof cards)[0]) {
  return (
    <Box
      variants={cardVariants}
      whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "rgba(122,178,178,0.06)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(8,131,149,0.18)",
        boxShadow: "0 4px 32px rgba(9,99,126,0.07)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}60`;
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 12px 48px ${glow}`;
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(8,131,149,0.18)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 32px rgba(9,99,126,0.07)";
      }}
    >
      {/* Radial glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 30% 40%, ${glow}, transparent 65%)`,
        }}
      />

      <div className="relative z-10 p-7">
        {/* Animated icon badge */}
        <Box
          variants={iconVariants}
          className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${color}1A, ${color}33)`,
            border: `1px solid ${color}40`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </Box>

        {/* Title */}
        <h3
          className="text-lg font-bold mb-3"
          style={{
            background: `linear-gradient(90deg, ${color}, #09637E)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </h3>

        {/* Body text */}
        <p className="text-[#7AB2B2]/80 leading-relaxed text-sm">{text}</p>
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
      {/* Background accent blob – top-right, drifts diagonally on scroll */}
      <Box
        aria-hidden="true"
        style={{
          y: blobTopY,
          x: blobTopX,
          background: "radial-gradient(circle, #7AB2B2, transparent 70%)",
        }}
        className="pointer-events-none absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full opacity-[0.12] blur-[80px] will-change-transform"
      />
      {/* Background accent blob – bottom-left, drifts opposite direction */}
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

        {/* ── Staggered cards grid ── */}
        <Box
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 gap-5"
        >
          {cards.map((card) => (
            <AboutCard key={card.title} {...card} />
          ))}
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

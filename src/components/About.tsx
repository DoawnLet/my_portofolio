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
const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const timelineItemVariantsLeft = {
  hidden: { opacity: 0, x: -50, y: 30 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const timelineItemVariantsRight = {
  hidden: { opacity: 0, x: 50, y: 30 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const chapters = [
  {
    id: 1,
    title: "The Spark",
    description:
      "My tech journey began with curiosity. Writing my first lines of code ignited a fierce passion for shaping digital experiences.",
    icon: Sparkles,
    color: "#088395",
  },
  {
    id: 2,
    title: "The Forge",
    description:
      "Thousands of hours of typing, debugging, and learning turned curiosity into expertise. I dove deep into both crafting seamless frontends and building scalable backends.",
    icon: Code2,
    color: "#09637E",
  },
  {
    id: 3,
    title: "The Present",
    description:
      "Today, I am a Full-stack Developer eager to push the boundaries of Web Development. I build modern, responsive, and highly optimized solutions.",
    icon: Rocket,
    color: "#7AB2B2",
  },
  {
    id: 4,
    title: "Beyond Code",
    description:
      "When I'm not in front of a screen coding, I enjoy exploring new technologies, contributing to open-source, and preparing for the next big challenges.",
    icon: Heart,
    color: "#EBF4F6",
  },
];

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
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
      <div className="relative z-10 h-full p-8 md:p-10 flex flex-col">
        {children}
      </div>
    </Box>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Background parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef as unknown as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });

  const blobTopY = useTransform(scrollYProgress, [0, 1], [-80, 140]);
  const blobTopX = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const blobBotY = useTransform(scrollYProgress, [0, 1], [60, -120]);
  const blobBotX = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Timeline Progress
  const { scrollYProgress: timelineProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 80%"],
  });

  const lineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background blobs */}
      <Box
        aria-hidden="true"
        style={{
          y: blobTopY,
          x: blobTopX,
          background: "radial-gradient(circle, #7AB2B2, transparent 70%)",
        }}
        className="pointer-events-none absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full opacity-[0.12] blur-[80px] will-change-transform"
      />
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
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-[#7AB2B2] border border-[#7AB2B2]/30 rounded-full px-5 py-2 mb-5"
            style={{
              background: "rgba(8,131,149,0.06)",
              backdropFilter: "blur(8px)",
            }}
          >
            My Story
          </span>
          <h2 className="text-5xl md:text-6xl font-black leading-tight">
            <span className="bg-gradient-to-r from-[#EBF4F6] via-[#7AB2B2] to-[#EBF4F6] bg-clip-text text-transparent">
              The Journey
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#088395] to-[#09637E] bg-clip-text text-transparent">
              Behind the Code
            </span>
          </h2>
        </Box>

        {/* ── Vertical Timeline ── */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto mt-20">
          {/* Center Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-[#7AB2B2]/10 transform md:-translate-x-1/2 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#088395] via-[#7AB2B2] to-[#EBF4F6]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-16 md:gap-24 relative z-10 py-10">
            {chapters.map((chapter, index) => {
              const isEven = index % 2 === 0;
              const Icon = chapter.icon;

              return (
                <div
                  key={chapter.id}
                  className={`relative flex flex-col md:flex-row items-center w-full ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Content */}
                  <div
                    className={`w-full md:w-1/2 ${isEven ? "md:pl-16" : "md:pr-16"} pl-24 pr-4 md:px-0`}
                  >
                    <motion.div
                      variants={
                        isEven
                          ? timelineItemVariantsRight
                          : timelineItemVariantsLeft
                      }
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, margin: "-100px" }}
                    >
                      <SpotlightCard color={chapter.color}>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-[#7AB2B2]/50 font-bold text-5xl opacity-30 absolute -top-4 -right-2">
                            0{chapter.id}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#EBF4F6] to-[#7AB2B2] bg-clip-text text-transparent relative z-10">
                            {chapter.title}
                          </h3>
                        </div>
                        <p className="text-[#7AB2B2]/90 leading-relaxed text-base relative z-10">
                          {chapter.description}
                        </p>
                      </SpotlightCard>
                    </motion.div>
                  </div>

                  {/* Node */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2,
                      }}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(10, 17, 24, 0.8)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: `0 0 20px ${chapter.color}40`,
                      }}
                    >
                      <div
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${chapter.color}2A, ${chapter.color}4D)`,
                          border: `2px solid ${chapter.color}`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5 md:w-6 md:h-6"
                          style={{ color: "#EBF4F6" }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA banner ── */}
        <Box
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="mt-24 rounded-3xl p-10 text-center relative overflow-hidden"
          style={{
            background: "rgba(122,178,178,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(8,131,149,0.14)",
          }}
        >
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

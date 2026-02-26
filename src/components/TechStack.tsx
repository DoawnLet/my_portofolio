"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Server,
  Atom,
  Smartphone,
  Globe,
  Container,
  Coffee,
  Hash,
  FileCode2,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const Box = motion.div as React.FC<any>;

// ─── Tech data ────────────────────────────────────────────────────────────────
interface Tech {
  name: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  color: string;
  level: number; // 0-100
  category: string;
}

const techs: Tech[] = [
  {
    name: "ASP.NET Core",
    icon: Server,
    color: "#6366f1",
    level: 85,
    category: "Backend",
  },
  { name: "C#", icon: Hash, color: "#a855f7", level: 88, category: "Backend" },
  {
    name: "Java",
    icon: Coffee,
    color: "#f97316",
    level: 75,
    category: "Backend",
  },
  {
    name: "React",
    icon: Atom,
    color: "#38bdf8",
    level: 90,
    category: "Frontend",
  },
  {
    name: "Next.js",
    icon: Globe,
    color: "#f1f5f9",
    level: 87,
    category: "Frontend",
  },
  {
    name: "TypeScript",
    icon: FileCode2,
    color: "#60a5fa",
    level: 85,
    category: "Frontend",
  },
  {
    name: "Flutter",
    icon: Smartphone,
    color: "#06b6d4",
    level: 72,
    category: "Mobile",
  },
  {
    name: "Docker",
    icon: Container,
    color: "#0ea5e9",
    level: 78,
    category: "DevOps",
  },
];

const CATEGORIES = ["Frontend", "Backend", "Mobile", "DevOps"] as const;

// Duplicate for infinite marquee seamless loop
const MARQUEE_ITEMS = [...techs, ...techs];

// ─── Marquee row ──────────────────────────────────────────────────────────────
function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <Box
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex shrink-0 gap-4 py-1"
      >
        {MARQUEE_ITEMS.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border shrink-0 group transition-all duration-300 hover:scale-105"
              style={{
                background: `${tech.color}14`,
                borderColor: `${tech.color}35`,
              }}
            >
              <Icon
                className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                style={{ color: tech.color }}
              />
              <span className="text-sm font-semibold text-gray-300 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          );
        })}
      </Box>
    </div>
  );
}

// ─── Skill card ───────────────────────────────────────────────────────────────
function SkillCard({ tech, index }: { tech: Tech; index: number }) {
  const Icon = tech.icon;
  return (
    <Box
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative rounded-2xl p-5 border overflow-hidden group transition-shadow duration-300"
      style={{
        background: "rgba(9,99,126,0.08)",
        borderColor: "rgba(122,178,178,0.12)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 40% 40%, ${tech.color}18, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `${tech.color}22`,
              border: `1px solid ${tech.color}40`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: tech.color }} />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">
              {tech.name}
            </p>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider">
              {tech.category}
            </p>
          </div>

          {/* Level badge */}
          <span
            className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: `${tech.color}25`, color: tech.color }}
          >
            {tech.level}%
          </span>
        </div>

        {/* Progress bar with fill animation */}
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <Box
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.9,
              delay: index * 0.08 + 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="h-full rounded-full"
            style={{
              width: `${tech.level}%`,
              background: `linear-gradient(90deg, ${tech.color}99, ${tech.color})`,
              boxShadow: `0 0 8px ${tech.color}70`,
            }}
          />
        </div>
      </div>
    </Box>
  );
}

// ─── Category pill filter ──────────────────────────────────────────────────────
function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (c: string) => void;
}) {
  const cats = ["All", ...CATEGORIES];
  return (
    <Box
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-2 mb-10"
    >
      {cats.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
            active === cat
              ? "bg-gradient-to-r from-[#088395] to-[#09637E] border-transparent text-white shadow-lg shadow-[#09637E]/25"
              : "border-white/10 text-gray-400 hover:border-[#088395]/50 hover:text-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </Box>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function TechStack() {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef as unknown as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [-60, 100]);

  const filtered =
    activeCategory === "All"
      ? techs
      : techs.filter((t) => t.category === activeCategory);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Parallax background blob */}
      <Box
        aria-hidden="true"
        style={{
          y: blobY,
          background: "radial-gradient(circle, #088395, transparent 70%)",
        }}
        className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[80px] will-change-transform"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <SectionHeader
          eyebrow="Expertise"
          title="TECHNOLOGIES I"
          highlight="MASTER"
          subtitle="A curated set of tools and frameworks I use to build fast, scalable, and beautiful software."
        />

        {/* ── Infinite marquee band ── */}
        <Box
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 mb-16"
        >
          <MarqueeRow />
          <MarqueeRow reverse />
        </Box>

        {/* ── Category filter ── */}
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        {/* ── Skill cards grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((tech, i) => (
            <SkillCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

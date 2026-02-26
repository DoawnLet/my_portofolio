"use client";

import React from "react";
import { motion } from "framer-motion";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Box = motion.div as React.FC<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  const alignClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
        ? "text-right items-end"
        : "text-center items-center";

  return (
    <Box
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`flex flex-col gap-3 mb-14 ${alignClass}`}
    >
      {eyebrow && (
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#088395] opacity-80">
          {eyebrow}
        </span>
      )}

      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
        {title}{" "}
        {highlight && (
          <span className="bg-gradient-to-r from-[#088395] via-[#09637E] to-[#7AB2B2] bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>

      {/* Decorative underline with draw-in animation */}
      <Box
        variants={lineVariants}
        className={`flex gap-2 mt-1 ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"}`}
      >
        <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#088395] to-[#09637E]" />
        <div className="h-1 w-4 rounded-full bg-[#09637E]/40" />
        <div className="h-1 w-2 rounded-full bg-[#7AB2B2]/30" />
      </Box>

      {subtitle && (
        <p className="mt-2 text-gray-400 text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </Box>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Code2,
  FolderGit2,
  Mail,
  Github,
  Menu,
} from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Box = motion.div as React.FC<any>;
const Btn = motion.button as React.FC<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

interface MenuItemType {
  id: string;
  label: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  isExternal?: boolean;
  url?: string;
}

const menuItems: MenuItemType[] = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "techstack", label: "Tech Stack", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "contact", label: "Contact", icon: Mail },
  {
    id: "github",
    label: "GitHub",
    icon: Github,
    isExternal: true,
    url: "https://github.com/DoawnLet",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const itemVariants = {
  hidden: { opacity: 0, x: -24, scale: 0.7 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.055,
      duration: 0.32,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: -16,
    scale: 0.75,
    transition: {
      delay: (menuItems.length - 1 - i) * 0.04,
      duration: 0.22,
      ease: "easeIn",
    },
  }),
};

export default function HomePageSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 },
    );

    menuItems.forEach((item) => {
      if (item.isExternal) return;
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleItemClick = (item: MenuItemType) => {
    if (item.isExternal && item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
      return;
    }
    const el = document.getElementById(item.id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside
      className="hidden md:flex fixed top-1/2 -translate-y-1/2 left-4 z-50 flex-col items-center gap-3"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* ── Trigger button — always visible ── */}
      <Btn
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle navigation"
        className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer z-10 shadow-lg shadow-[#088395]/30"
        style={{
          background:
            "linear-gradient(135deg, rgba(8,131,149,0.90), rgba(9,99,126,0.80))",
          border: "1.5px solid rgba(122,178,178,0.35)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Pulse ring when closed */}
        {!isOpen && (
          <Box
            animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-[#088395]/30 pointer-events-none"
          />
        )}
        <Menu className="w-5 h-5 text-[#EBF4F6]" />
      </Btn>

      {/* ── Active-section dot-track ── */}
      <AnimatePresence>
        {!isOpen && (
          <Box
            key="dots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-[5px]"
          >
            {menuItems
              .filter((m) => !m.isExternal)
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  aria-label={item.label}
                  className="focus:outline-none"
                >
                  <Box
                    animate={{
                      width: activeSection === item.id ? 6 : 4,
                      height: activeSection === item.id ? 14 : 4,
                      borderRadius: activeSection === item.id ? 4 : 9999,
                      backgroundColor:
                        activeSection === item.id
                          ? "#088395"
                          : "rgba(122,178,178,0.35)",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ display: "block" }}
                  />
                </button>
              ))}
          </Box>
        )}
      </AnimatePresence>

      {/* ── Nav items — appear on hover/click ── */}
      <AnimatePresence>
        {isOpen && (
          <Box
            key="nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-start gap-2"
          >
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id && !item.isExternal;

              return (
                <Box
                  key={item.id}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <button
                    onClick={() => handleItemClick(item)}
                    className="group flex items-center gap-2.5 focus:outline-none"
                    aria-label={item.label}
                  >
                    {/* Circle icon button */}
                    <div
                      className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, #088395, #09637E)"
                          : "rgba(9,99,126,0.15)",
                        border: isActive
                          ? "1.5px solid rgba(8,131,149,0.7)"
                          : "1.5px solid rgba(122,178,178,0.2)",
                        backdropFilter: "blur(10px)",
                        boxShadow: isActive
                          ? "0 0 16px rgba(8,131,149,0.45)"
                          : "none",
                      }}
                    >
                      <Icon
                        className={`w-4.5 h-4.5 transition-colors duration-200 ${
                          isActive
                            ? "text-white"
                            : "text-[#7AB2B2] group-hover:text-white"
                        }`}
                        style={{ width: "1.1rem", height: "1.1rem" }}
                      />

                      {/* Active glow ring */}
                      {isActive && (
                        <Box
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.4, 0, 0.4],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 rounded-full bg-[#088395]/30 pointer-events-none"
                        />
                      )}
                    </div>

                    {/* Label pill */}
                    <span
                      className="text-xs font-semibold tracking-wide px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap"
                      style={{
                        background: "rgba(9,99,126,0.55)",
                        color: isActive ? "#EBF4F6" : "#7AB2B2",
                        border: "1px solid rgba(122,178,178,0.2)",
                        backdropFilter: "blur(8px)",
                        transform: "translateX(0)",
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                </Box>
              );
            })}
          </Box>
        )}
      </AnimatePresence>
    </aside>
  );
}

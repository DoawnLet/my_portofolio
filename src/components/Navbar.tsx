"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code, Menu, X } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Nav = motion.nav as React.FC<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#techstack", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        // Always show navbar near the top of the page
        if (currentY < 80) {
          setVisible(true);
        } else if (delta > 6) {
          // Scrolling DOWN — hide
          setVisible(false);
          setMobileMenuOpen(false);
        } else if (delta < -6) {
          // Scrolling UP — show
          setVisible(true);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Nav
      animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-6 z-50 mx-auto w-[calc(100%-40px)] rounded-2xl backdrop-blur-2xl"
      style={{
        left: 20,
        right: 20,
        background:
          "linear-gradient(135deg, rgba(9,99,126,0.18) 0%, rgba(8,131,149,0.12) 50%, rgba(2,6,23,0.45) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#088395] to-[#09637E] rounded-lg flex items-center justify-center transition-transform duration-500 hover:rotate-12">
              <Code className="w-5 h-5 text-[#EBF4F6]" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#088395] to-[#09637E] bg-clip-text text-transparent">
              MinMin
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#EBF4F6] hover:text-[#7AB2B2] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#088395] hover:text-[#7AB2B2] transition-colors p-2"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-[#EBF4F6] hover:text-[#7AB2B2] hover:bg-[#088395]/20 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </Nav>
  );
}

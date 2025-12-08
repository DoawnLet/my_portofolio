"use client";

import React, { useState } from "react";
import { Code, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-cyan-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-lg flex items-center justify-center transition-transform duration-500 hover:transform-[rotateY(360deg)] transform-3d">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              MinMin
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#hero"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              About
            </a>
            <a
              href="#tech-stack"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Tech Stack
            </a>
            <a
              href="#projects"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-cyan-400 hover:text-cyan-300 transition-colors p-2"
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
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all"
            >
              About
            </a>
            <a
              href="#tech-stack"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all"
            >
              Tech Stack
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

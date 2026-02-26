"use client";

import React from "react";
import { Github, Linkedin, Mail, Code, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "Cookie Settings", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-slate-950/80 backdrop-blur-sm">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09637E]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#088395] to-[#09637E] rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#088395] to-[#09637E] bg-clip-text text-transparent">
                MinMin
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Creative developer passionate about building immersive digital
              experiences with cutting-edge technologies.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 pt-1">
              <a
                href="https://github.com/DoawnLet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-lg bg-slate-800/60 border border-white/5 text-gray-400 hover:text-white hover:border-[#088395]/40 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2.5 rounded-lg bg-slate-800/60 border border-white/5 text-gray-400 hover:text-white hover:border-[#09637E]/40 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:your.email@example.com"
                aria-label="Email"
                className="p-2.5 rounded-lg bg-slate-800/60 border border-white/5 text-gray-400 hover:text-white hover:border-[#7AB2B2]/40 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {year} MinMin. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            Designed &amp; built with{" "}
            <span className="text-[#7AB2B2]/60">♥</span> using Next.js &amp;{" "}
            Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Ready to bring your ideas to life? Let's collaborate on something
          amazing.
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="#"
            aria-label="GitHub"
            className="p-3 bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg hover:bg-slate-800/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-110 hover:transform-[rotateY(180deg)] transform-3d"
          >
            <Github className="w-6 h-6 text-cyan-400 transition-transform duration-500 hover:scale-125" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="p-3 bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg hover:bg-slate-800/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-110 hover:transform-[rotateY(180deg)] transform-3d"
          >
            <Linkedin className="w-6 h-6 text-cyan-400 transition-transform duration-500 hover:scale-125" />
          </a>
          <a
            href="mailto:your.email@example.com"
            aria-label="Email"
            className="p-3 bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg hover:bg-slate-800/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-110 hover:transform-[rotateY(180deg)] transform-3d"
          >
            <Mail className="w-6 h-6 text-cyan-400 transition-transform duration-500 hover:scale-125" />
          </a>
        </div>
        <button className="px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-500 transform hover:scale-105 hover:transform-[perspective(500px)_rotateX(10deg)] transform-3d">
          Send Message
        </button>
      </div>
    </section>
  );
}

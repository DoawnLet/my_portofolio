"use client";

import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Zap,
  Cpu,
  Database,
} from "lucide-react";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-cyan-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                FutureDev
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#hero"
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Home
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Backend And Frontend Developer
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Crafting immersive digital experiences with cutting-edge
            technologies. Passionate about AI, web development, and pushing the
            boundaries of what's possible.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-105">
            Explore My Work
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-radial from-cyan-400/10 via-transparent to-transparent pointer-events-none"></div>
      </section>

      {/* Tech Stack */}
      <section id="tech-stack" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React", icon: Code },
              { name: "Next.js", icon: Zap },
              { name: "TypeScript", icon: Cpu },
              { name: "Tailwind CSS", icon: Database },
              { name: "Node.js", icon: Code },
              { name: "Python", icon: Zap },
              { name: "AI/ML", icon: Cpu },
              { name: "Docker", icon: Database },
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6 text-center hover:bg-slate-800/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-105"
              >
                <tech.icon className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">
                  {tech.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Chatbot",
                description:
                  "An intelligent conversational AI built with React and OpenAI API, featuring natural language processing and real-time responses.",
                tags: ["React", "OpenAI", "Node.js"],
                link: "#",
              },
              {
                title: "Cyberpunk Dashboard",
                description:
                  "A futuristic data visualization dashboard with animated charts and holographic UI elements using D3.js and Three.js.",
                tags: ["D3.js", "Three.js", "TypeScript"],
                link: "#",
              },
              {
                title: "Blockchain Wallet",
                description:
                  "A secure cryptocurrency wallet application with multi-chain support and advanced security features.",
                tags: ["Web3", "Solidity", "React"],
                link: "#",
              },
            ].map((project, index) => (
              <article
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm border border-violet-500/20 rounded-lg p-6 hover:bg-slate-800/50 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-3 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-fuchsia-500/20 text-fuchsia-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View Project <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
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
              className="p-3 bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg hover:bg-slate-800/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
            >
              <Github className="w-6 h-6 text-cyan-400" />
            </a>
            <a
              href="#"
              className="p-3 bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg hover:bg-slate-800/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6 text-cyan-400" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="p-3 bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg hover:bg-slate-800/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
            >
              <Mail className="w-6 h-6 text-cyan-400" />
            </a>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105">
            Send Message
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-cyan-400/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            &copy; 2025 Future Tech Developer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

"use client";

import React from "react";
import { Code, Zap, Cpu, Database } from "lucide-react";

export default function TechStack() {
  return (
    <section id="techstack" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="p-3 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Tech Stack
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "ASP.NET", icon: Code },
            { name: "React", icon: Zap },
            { name: "Flutter", icon: Cpu },
            { name: "Next.js", icon: Database },
            { name: "Docker", icon: Code },
            { name: "Java", icon: Zap },
            { name: "C#", icon: Cpu },
            { name: "TypeScript", icon: Database },
          ].map((tech, index) => (
            <div
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6 text-center hover:bg-slate-800/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 hover:transform-[rotateY(15deg)_rotateX(-10deg)] transform-3d"
            >
              <tech.icon className="w-12 h-12 mx-auto mb-4 text-cyan-400 transition-transform duration-500 hover:scale-110 transform-3d" />
              <h3 className="text-lg font-semibold text-white transition-transform duration-500 hover:scale-105 transform-3d">
                {tech.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

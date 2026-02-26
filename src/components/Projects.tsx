"use client";

import React, { useState } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";

// All unique tags for the filter bar
const allTags = [
  "All",
  ...Array.from(new Set(projects.flatMap((p) => p.tags))),
];

export default function Projects() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered: Project[] =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Portfolio"
          title="DISCOVER MY"
          highlight="CREATIONS"
          subtitle="A curated selection of projects built with passion — from full-stack web apps to cross-platform mobile solutions."
        />

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeTag === tag
                  ? "bg-gradient-to-r from-[#088395] to-[#09637E] border-transparent text-white shadow-lg shadow-[#09637E]/20"
                  : "border-white/10 text-gray-400 hover:border-[#088395]/50 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Responsive grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No projects match this filter.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#088395] to-[#09637E] text-white font-semibold text-base hover:shadow-xl hover:shadow-[#09637E]/25 hover:-translate-y-0.5 transition-all duration-300"
          >
            Start a Project Together
          </a>
        </div>
      </div>
    </section>
  );
}

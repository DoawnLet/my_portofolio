"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group relative overflow-hidden rounded-2xl bg-slate-900/40 border border-white/5 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-[#088395]/15 hover:border-[#088395]/30 hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ${hovered ? "scale-110" : "scale-100"}`}
          unoptimized
        />

        {/* Gradient overlay – always visible subtly, intense on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent transition-opacity duration-500 ${hovered ? "opacity-90" : "opacity-50"}`}
        />

        {/* Hover CTA icon */}
        <div
          className={`absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
        >
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-gradient-to-r from-[#088395] to-[#09637E] text-white shadow-lg">
            Featured
          </span>
        )}

        {/* Tags overlay at bottom of image (visible on hover) */}
        <div
          className={`absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 transition-all duration-500 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#088395] mb-1.5">
          {project.subtitle}
        </p>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#7AB2B2] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#09637E] hover:text-[#7AB2B2] transition-colors duration-200 group/link"
          aria-label={`View ${project.title}`}
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="underline underline-offset-4 decoration-[#09637E]/40 group-hover/link:decoration-[#7AB2B2]">
            View Project
          </span>
        </a>
      </div>
    </article>
  );
}

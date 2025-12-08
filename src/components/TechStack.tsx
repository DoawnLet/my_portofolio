"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Code,
  Zap,
  Cpu,
  Database,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function TechStack() {
  const techStack = [
    { name: "ASP.NET", icon: Code },
    { name: "React", icon: Zap },
    { name: "Flutter", icon: Cpu },
    { name: "Next.js", icon: Database },
    { name: "Docker", icon: Code },
    { name: "Java", icon: Zap },
    { name: "C#", icon: Cpu },
    { name: "TypeScript", icon: Database },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const itemsPerView = 4; // Number of items visible at once
  const maxIndex = techStack.length - itemsPerView;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="techstack"
      className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="p-3 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Tech Stack
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-1/4 px-4 select-none"
                >
                  <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6 text-center hover:bg-slate-800/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 hover:transform-[rotateY(15deg)_rotateX(-10deg)] transform-3d">
                    <tech.icon className="w-12 h-12 mx-auto mb-4 text-cyan-400 transition-transform duration-500 hover:scale-110 transform-3d" />
                    <h3 className="text-lg font-semibold text-white transition-transform duration-500 hover:scale-105 transform-3d">
                      {tech.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Centered Controls */}
          <div className="flex flex-col items-center gap-4 mt-8">
            {/* Navigation Buttons with Pagination */}
            <div className="flex items-center gap-6">
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                className="bg-cyan-500/80 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Pagination Dots */}
              <div className="flex gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "bg-cyan-500 w-8"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="bg-cyan-500/80 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

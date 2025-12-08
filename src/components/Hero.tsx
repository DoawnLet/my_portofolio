"use client";

import React from "react";
import ThreeText from "./ThreeText";

export default function Hero() {
  return (
    <section id="hero" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <ThreeText />
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent animate-[float_3s_ease-in-out_infinite]">
          Creative Technologist
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Crafting immersive digital experiences with cutting-edge technologies.
          Passionate about AI, web development, and pushing the boundaries of
          what's possible.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 hover:transform-[perspective(500px)_rotateX(10deg)] transform-3d">
          Explore My Work
        </button>
      </div>
    </section>
  );
}

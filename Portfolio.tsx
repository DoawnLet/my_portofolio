"use client";

import React from "react";

import Hero from "./src/components/Hero";
import TechStack from "./src/components/TechStack";
import Projects from "./src/components/Projects";
import Contact from "./src/components/Contact";
import Footer from "./src/components/Footer";
import Navbar from "./src/components/Navbar";

export default function Portfolio() {
  return (
    <div className="min-h-screen relative text-white font-sans selection:bg-cyan-500/30 pointer-events-none">
      <div className="relative z-10 w-full pointer-events-auto">
        <Navbar />
        <main className="w-full">
          <Hero />
          <TechStack />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

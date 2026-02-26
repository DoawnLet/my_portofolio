"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="min-h-screen relative text-white font-sans selection:bg-cyan-500/30">
      <div className="relative z-10 w-full">
        <Navbar />
        <main className="w-full">
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { User, Code2, Rocket, Heart } from "lucide-react";
import Interactive3D from "./Interactive3D";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="p-3 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            About
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6 transform hover:scale-105 transition-all duration-500 transform-3d hover:transform-[rotateY(5deg)]">
              <div className="flex items-center space-x-3 mb-4">
                <User className="w-8 h-8 text-cyan-400" />
                <h3 className="text-xl font-semibold text-white">Who I Am</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                I&apos;m a passionate full-stack developer with a love for
                creating immersive digital experiences. My journey in tech
                started with curiosity and has evolved into a career dedicated
                to pushing the boundaries of what&apos;s possible in web
                development.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-violet-500/20 rounded-lg p-6 transform hover:scale-105 transition-all duration-500 transform-3d hover:transform-[rotateY(-5deg)]">
              <div className="flex items-center space-x-3 mb-4">
                <Code2 className="w-8 h-8 text-violet-400" />
                <h3 className="text-xl font-semibold text-white">What I Do</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                I specialize in modern web technologies, from responsive
                front-end interfaces to scalable back-end systems. I enjoy
                working with React, Next.js, TypeScript, and exploring emerging
                technologies like AI integration and Web3.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-fuchsia-500/20 rounded-lg p-6 transform hover:scale-105 transition-all duration-500 transform-3d hover:transform-[rotateX(5deg)]">
              <div className="flex items-center space-x-3 mb-4">
                <Rocket className="w-8 h-8 text-fuchsia-400" />
                <h3 className="text-xl font-semibold text-white">My Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To create digital solutions that not only function flawlessly
                but also inspire and delight users. I believe in the power of
                technology to solve real-world problems and improve lives.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6 transform hover:scale-105 transition-all duration-500 transform-3d hover:transform-[rotateX(-5deg)]">
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="w-8 h-8 text-cyan-400" />
                <h3 className="text-xl font-semibold text-white">
                  Beyond Code
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open-source projects, or sharing
                knowledge with the developer community. I believe in continuous
                learning and giving back.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Interactive3D />
          <div className="bg-slate-900/30 backdrop-blur-sm border border-cyan-400/10 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Let&apos;s Build Something Amazing Together
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              I&apos;m always excited to take on new challenges and collaborate
              on innovative projects. Whether it&apos;s a cutting-edge web
              application, a mobile app, or exploring new technologies, I&apos;m
              ready to bring your vision to life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

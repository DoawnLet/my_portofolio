"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Code2,
  FolderGit2,
  Mail,
  ChevronLeft,
  ChevronRight,
  Github,
} from "lucide-react";

interface MenuItemType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isExternal?: boolean;
  url?: string;
}

const menuItems: MenuItemType[] = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "techstack", label: "Tech Stack", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "contact", label: "Contact", icon: Mail },
  {
    id: "github",
    label: "GitHub",
    icon: Github,
    isExternal: true,
    url: "https://github.com/DoawnLet",
  },
];

export default function HomePageSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    menuItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string, isExternal?: boolean, url?: string) => {
    if (isExternal && url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      className={`hidden md:block fixed top-1/2 -translate-y-1/2 left-0 bg-white/10 backdrop-blur-md shadow-2xl border-r border-[#088395]/30 z-50 transition-all duration-300 ease-in-out rounded-r-2xl ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-auto py-6">
        {/* Collapse Toggle Button */}
        <div className="px-4 mb-4 flex justify-end">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle sidebar"
          >
            {isExpanded ? (
              <ChevronLeft className="w-5 h-5 text-[#088395]" />
            ) : (
              <ChevronRight className="w-5 h-5 text-[#088395]" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() =>
                    scrollToSection(item.id, item.isExternal, item.url)
                  }
                  className={`group w-full flex items-center ${
                    isExpanded ? "px-4 space-x-3" : "px-0 justify-center"
                  } py-3 rounded-lg transition-all duration-200 relative ${
                    activeSection === item.id
                      ? "bg-[#088395]/20 border border-[#088395]/50 text-[#7AB2B2]"
                      : "text-gray-300 hover:bg-white/10 hover:text-[#088395]"
                  }`}
                  title={!isExpanded ? item.label : undefined}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      activeSection === item.id
                        ? "text-[#088395]"
                        : "text-gray-400 group-hover:text-[#088395]"
                    }`}
                  />
                  {isExpanded && (
                    <span className="text-sm font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                  {/* Tooltip for collapsed state */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100]">
                      {item.label}
                      <div className="absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}

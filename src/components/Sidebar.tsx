"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  FileText,
  Code,
  Database,
  Shield,
  Zap,
  Layers,
  Server,
  Globe,
  Cpu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [isExpanded, setIsExpanded] = useState(true);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Only handle clicks when sidebar is expanded on desktop
      if (
        isExpanded &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth >= 768
      ) {
        setIsExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const menuItems = [
    { id: "overview", label: "Overview", icon: Code },
    { id: "architecture", label: "Architecture", icon: Layers },
    { id: "webforms", label: "Web Forms", icon: Server },
    { id: "mvc", label: "MVC Pattern", icon: Zap },
    { id: "entity", label: "Entity Framework", icon: Database },
    { id: "security", label: "Security", icon: Shield },
    { id: "webapi", label: "Web API", icon: Globe },
    { id: "examples", label: "Code Examples", icon: FileText },
    { id: "getting-started", label: "Getting Started", icon: Cpu },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu after clicking
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Toggle Button - Top Left */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-[60] bg-white backdrop-blur-md border border-gray-300 rounded-lg p-3 hover:border-[#088395] transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Toggle documentation sidebar"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-900" />
        ) : (
          <Menu className="w-6 h-6 text-slate-900" />
        )}
      </button>

      {/* Sidebar Overlay - Mobile Only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Desktop Sidebar - Always Visible, Collapsible */}
      <aside
        ref={sidebarRef}
        className={`hidden md:block fixed top-0 left-0 h-full bg-white shadow-2xl border-r border-gray-200 z-50 transition-all duration-300 ease-in-out ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with Collapse Toggle */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {isExpanded && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-linear-to-r from-[#088395] to-[#09637E] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold bg-linear-to-r from-[#088395] to-[#09637E] bg-clip-text text-transparent">
                      ASP.NET Docs
                    </h2>
                    <p className="text-xs text-gray-600">Framework Guide</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle sidebar"
              >
                {isExpanded ? (
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-3">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group w-full flex items-center ${
                      isExpanded ? "px-4 space-x-3" : "px-0 justify-center"
                    } py-3 rounded-lg transition-all duration-200 relative ${
                      activeSection === item.id
                        ? "bg-[#EBF4F6] border border-[#088395]/40 text-[#09637E]"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#088395]"
                    }`}
                    title={!isExpanded ? item.label : undefined}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        activeSection === item.id
                          ? "text-[#088395]"
                          : "text-gray-500 group-hover:text-[#088395]"
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

          {/* Footer */}
          {isExpanded && (
            <div className="p-4 border-t border-gray-200">
              <div className="text-xs text-gray-600 text-center">
                ASP.NET Core Documentation
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Dropdown Sidebar */}
      <aside
        className={`md:hidden fixed top-0 left-0 w-full h-auto max-h-[80vh] bg-white shadow-2xl border-b border-gray-200 z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col">
          {/* Mobile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-r from-[#088395] to-[#09637E] rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-linear-to-r from-[#088395] to-[#09637E] bg-clip-text text-transparent">
                  ASP.NET Docs
                </h2>
                <p className="text-sm text-gray-600">Framework Guide</p>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-[#EBF4F6] border border-[#088395]/40 text-[#09637E]"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#088395]"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        activeSection === item.id
                          ? "text-[#088395]"
                          : "text-gray-500"
                      }`}
                    />
                    <span className="text-left font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Mobile Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-600 text-center">
              ASP.NET Core Documentation
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

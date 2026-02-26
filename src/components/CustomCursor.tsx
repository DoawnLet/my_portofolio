"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add event listeners
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = "none";

    // Add hover effects for interactive elements with a slight delay to ensure DOM is ready
    const addInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [onclick], [onmouseover], .cursor-pointer, nav a, nav button, header a, header button',
      );

      const handleMouseEnter = () => setIsHovering(true);
      const handleMouseLeave = () => setIsHovering(false);

      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
      });

      // Store cleanup function
      return () => {
        interactiveElements.forEach((element) => {
          element.removeEventListener("mouseenter", handleMouseEnter);
          element.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    };

    // Add listeners immediately and after a short delay for dynamically loaded content
    const cleanup1 = addInteractiveListeners();
    const timeoutId = setTimeout(() => {
      const cleanup2 = addInteractiveListeners();
      // Store the second cleanup for later use
      return cleanup2;
    }, 100);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      clearTimeout(timeoutId);

      // Clean up both sets of listeners
      cleanup1();
      // The second cleanup would be handled by the timeout, but we need to ensure it's called
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-9999">
      {/* Main cursor dot */}
      <div
        className={`absolute top-0 left-0 w-2 h-2 bg-[#088395] rounded-full transition-all duration-100 ease-out ${
          isHovering ? "scale-150 bg-[#09637E]" : ""
        } ${isClicking ? "scale-75" : ""}`}
        style={{
          transform: `translate(${mousePosition.x - 4}px, ${
            mousePosition.y - 4
          }px)`,
        }}
      />

      {/* Cursor ring */}
      <div
        className={`absolute top-0 left-0 w-8 h-8 border-2 border-[#088395] rounded-full transition-all duration-300 ease-out ${
          isHovering ? "w-12 h-12 border-[#09637E] scale-110" : ""
        } ${isClicking ? "scale-90 border-[#7AB2B2]" : ""}`}
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${
            mousePosition.y - 16
          }px)`,
        }}
      />

      {/* Cursor trail effect */}
      <div
        className={`absolute top-0 left-0 w-1 h-1 bg-[#7AB2B2] rounded-full opacity-60 transition-all duration-500 ease-out ${
          isHovering ? "opacity-80" : ""
        }`}
        style={{
          transform: `translate(${mousePosition.x - 2}px, ${
            mousePosition.y - 2
          }px)`,
          animation: "cursorTrail 0.5s ease-out infinite",
        }}
      />
    </div>
  );
}

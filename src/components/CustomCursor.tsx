"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Use refs for mouse position to avoid re-renders on every mousemove
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Animate the ring with lerp for smooth trailing
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.14;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Detect hover on any interactive element via event delegation
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, [role='button'], input, textarea, select, label",
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    >
      {/* ── Dot — snaps instantly to cursor ── */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{ willChange: "transform" }}
      >
        <div
          className={`w-2 h-2 rounded-full transition-transform duration-100 ${
            isClicking ? "scale-50" : isHovering ? "scale-[2]" : "scale-100"
          }`}
          style={{
            background: isHovering ? "#EBF4F6" : "#088395",
            boxShadow: isHovering
              ? "0 0 8px rgba(235,244,246,0.8)"
              : "0 0 6px rgba(8,131,149,0.7)",
          }}
        />
      </div>

      {/* ── Ring — lags behind (lerp) for trailing feel ── */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 will-change-transform"
      >
        <div
          className={`rounded-full border-2 transition-all duration-200 ${
            isClicking
              ? "w-8 h-8 border-[#7AB2B2] opacity-60"
              : isHovering
                ? "w-10 h-10 border-[#EBF4F6] opacity-80"
                : "w-10 h-10 border-[#088395] opacity-60"
          }`}
          style={{
            boxShadow: isHovering
              ? "0 0 14px rgba(122,178,178,0.45), inset 0 0 6px rgba(122,178,178,0.12)"
              : "0 0 8px rgba(8,131,149,0.3)",
          }}
        />
      </div>
    </div>
  );
}

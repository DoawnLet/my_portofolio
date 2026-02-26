"use client";

import React, { useState, useCallback } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HomePageSidebar from "@/components/HomePageSidebar";
import CustomCursor from "@/components/CustomCursor";
import Scene from "@/components/Scene";
import CookieConsent from "@/components/CookieConsent";
import LoadingScreen from "@/components/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadComplete = useCallback(() => setIsLoading(false), []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}
        <Scene />
        {/* ── Center-darkening overlay: pushes particles to edges ── */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(2,6,23,0.82) 0%, rgba(2,6,23,0.55) 45%, transparent 100%)",
          }}
        />
        <CustomCursor />
        <HomePageSidebar />
        <CookieConsent />
        {/* Sidebar is now floating — no layout offset needed */}
        <div>{children}</div>
      </body>
    </html>
  );
}

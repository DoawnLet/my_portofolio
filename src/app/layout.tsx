"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HomePageSidebar from "@/components/HomePageSidebar";
import CustomCursor from "@/components/CustomCursor";
import Scene from "@/components/Scene";
import CookieConsent from "@/components/CookieConsent";

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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Scene />
        <CustomCursor />
        <HomePageSidebar />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}

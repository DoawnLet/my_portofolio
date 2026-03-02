import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

// ─── Fonts ────────────────────────────────────────────────────────────────────
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

// ─── Site base URL ────────────────────────────────────────────────────────────
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://doawnlet.vercel.app";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "DoawnLet | Full-Stack Developer Portfolio",
    template: "%s | DoawnLet",
  },
  description:
    "Full-stack developer specializing in React, Next.js, ASP.NET Core, and TypeScript. Building immersive web experiences with 3D graphics, real-time systems, and modern UI design.",

  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "ASP.NET Core",
    "Three.js",
    "Framer Motion",
    "SignalR",
    "Web Developer Portfolio",
    "DoawnLet",
  ],

  authors: [{ name: "DoawnLet", url: "https://github.com/DoawnLet" }],
  creator: "DoawnLet",
  publisher: "DoawnLet",

  // ── Open Graph ──────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "DoawnLet Portfolio",
    title: "DoawnLet | Full-Stack Developer Portfolio",
    description:
      "Full-stack developer specializing in React, Next.js, ASP.NET Core, and TypeScript. Building immersive web experiences with 3D graphics and modern UI.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DoawnLet — Full-Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Card ────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "DoawnLet | Full-Stack Developer Portfolio",
    description:
      "Full-stack developer specializing in React, Next.js, ASP.NET Core, and TypeScript.",
    images: ["/og-image.png"],
    creator: "@DoawnLet",
  },

  // ── Robots ──────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Canonical & alternates ──────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Icons ───────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon", type: "image/png", sizes: "64x64" },
    ],
    shortcut: "/icon.svg",
    apple: { url: "/icon.svg", sizes: "64x64" },
  },

  // ── Manifest ────────────────────────────────────────────────────────────────
  manifest: "/manifest.webmanifest",

  // ── Verification ────────────────────────────────────────────────────────────
  // Uncomment and add your verification tokens when deploying:
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
  // },
};

// ─── Viewport ────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#051820" },
    { media: "(prefers-color-scheme: light)", color: "#088395" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

// ─── JSON-LD structured data ──────────────────────────────────────────────────
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "DoawnLet",
  url: SITE_URL,
  sameAs: ["https://github.com/DoawnLet"],
  jobTitle: "Full-Stack Developer",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "ASP.NET Core",
    "Three.js",
    "Framer Motion",
    "SignalR",
    "Web Development",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DoawnLet Portfolio",
  url: SITE_URL,
  description:
    "Full-stack developer portfolio showcasing projects in React, Next.js, and ASP.NET Core.",
  author: { "@type": "Person", name: "DoawnLet" },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema]),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

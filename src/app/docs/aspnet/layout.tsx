import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://doawnlet.vercel.app";

export const metadata: Metadata = {
  title: "ASP.NET Core Documentation",
  description:
    "Comprehensive guide to ASP.NET Core — covering Web Forms, MVC, Web API, Entity Framework, SignalR, Authentication, and performance optimization.",
  keywords: [
    "ASP.NET Core",
    "C#",
    "Web API",
    "MVC",
    "Entity Framework",
    "SignalR",
    "Authentication",
    ".NET",
    "Backend Development",
  ],
  openGraph: {
    type: "article",
    url: `${SITE_URL}/docs/aspnet`,
    title: "ASP.NET Core Documentation | DoawnLet",
    description:
      "Comprehensive guide to ASP.NET Core — covering Web Forms, MVC, Web API, Entity Framework, SignalR, Authentication, and performance optimization.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ASP.NET Core Documentation — DoawnLet",
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/docs/aspnet`,
  },
};

export default function AspNetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

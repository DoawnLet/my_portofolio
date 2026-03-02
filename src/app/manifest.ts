import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DoawnLet Portfolio",
    short_name: "DoawnLet",
    description:
      "Full-stack developer portfolio — React, Next.js, ASP.NET Core, TypeScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#051820",
    theme_color: "#088395",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["portfolio", "developer", "technology"],
  };
}

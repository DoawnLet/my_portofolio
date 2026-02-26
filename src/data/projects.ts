export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "My Portfolio",
    subtitle: "Personal Portfolio Website",
    description:
      "A modern developer portfolio built with Next.js 15, Three.js, and Framer Motion — featuring a 3D particle background, parallax scrolling, and smooth scroll-driven animations.",
    image: "https://picsum.photos/seed/portfolio_minmin/800/600",
    tags: ["Next.js", "TypeScript", "Three.js", "Framer Motion"],
    link: "https://github.com/DoawnLet/my_portofolio",
    featured: true,
  },
  {
    id: 2,
    title: "Blogging Platform",
    subtitle: "Full-Stack Blog System",
    description:
      "A blog management platform where bloggers can write and share posts about traveling, research, and personal experiences. Built with ASP.NET Core and microservices architecture.",
    image: "https://picsum.photos/seed/blogging_platform/800/600",
    tags: ["ASP.NET", "C#", "Microservices", "SQL Server"],
    link: "https://github.com/DoawnLet/BloggingPlatform",
    featured: true,
  },
  {
    id: 3,
    title: "Chat App",
    subtitle: "Real-Time Messaging",
    description:
      "A real-time chat application supporting personal (1-1) and group conversations, friend management, and instant messaging powered by SignalR for WebSocket communication.",
    image: "https://picsum.photos/seed/chat_signalr/800/600",
    tags: ["ASP.NET", "C#", "SignalR", "WebSockets"],
    link: "https://github.com/DoawnLet/Chat_App",
    featured: true,
  },
  {
    id: 4,
    title: "Infertility Treatment Interface",
    subtitle: "Healthcare Web App",
    description:
      "A frontend system for managing infertility treatment processes — enabling patients to book appointments, track treatment progress, and make payments. Serves 4 user roles: Customers, Doctors, and Managers.",
    image: "https://picsum.photos/seed/healthcare_ivf/800/600",
    tags: ["React", "TypeScript", "Healthcare", "REST API"],
    link: "https://github.com/DoawnLet/Interface_infertility_treatment",
  },
  {
    id: 5,
    title: "FoodChill",
    subtitle: "E-Commerce Food App",
    description:
      "A Java-based e-commerce application for food ordering and delivery, featuring product catalog, cart management, and order tracking functionalities.",
    image: "https://picsum.photos/seed/foodchill_app/800/600",
    tags: ["Java", "Spring Boot", "E-Commerce", "MySQL"],
    link: "https://github.com/DoawnLet/java_prj_FoodChill",
  },
];

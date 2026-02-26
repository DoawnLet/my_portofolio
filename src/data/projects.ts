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
    title: "E-Commerce Platform",
    subtitle: "Full-Stack Web App",
    description:
      "A modern e-commerce platform built with Next.js, featuring real-time inventory, Stripe payments, and an admin dashboard.",
    image: "https://picsum.photos/seed/ecommerce/800/600",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    link: "#",
    featured: true,
  },
  {
    id: 2,
    title: "AI Chat Assistant",
    subtitle: "Machine Learning & NLP",
    description:
      "Conversational AI powered by OpenAI GPT-4, with context memory, multi-turn dialogue, and a sleek real-time interface.",
    image: "https://picsum.photos/seed/aichat/800/600",
    tags: ["React", "OpenAI", "Node.js", "WebSockets"],
    link: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Task Management System",
    subtitle: "Productivity App",
    description:
      "Kanban-style project management tool with drag-and-drop boards, real-time collaboration, and analytics.",
    image: "https://picsum.photos/seed/taskboard/800/600",
    tags: ["React", "TypeScript", "Redux", "Firebase"],
    link: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Healthcare Dashboard",
    subtitle: "ASP.NET & React",
    description:
      "Patient management system with appointment scheduling, medical records, and role-based access control.",
    image: "https://picsum.photos/seed/health/800/600",
    tags: ["ASP.NET", "React", "SQL Server", "Azure"],
    link: "#",
  },
  {
    id: 5,
    title: "Mobile Banking App",
    subtitle: "Flutter Cross-Platform",
    description:
      "Cross-platform mobile banking application with biometric login, transactions, and real-time notifications.",
    image: "https://picsum.photos/seed/banking/800/600",
    tags: ["Flutter", "Dart", "REST API", "Firebase"],
    link: "#",
  },
  {
    id: 6,
    title: "Social Media Analytics",
    subtitle: "Data Visualization",
    description:
      "Dashboard for tracking social media KPIs with interactive charts, automated reports, and competitor benchmarking.",
    image: "https://picsum.photos/seed/analytics/800/600",
    tags: ["Next.js", "D3.js", "Python", "PostgreSQL"],
    link: "#",
  },
];

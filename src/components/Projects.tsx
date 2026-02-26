import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface FormattedRepo {
  id: number;
  name: string;
  fullName: string;
  description: string;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
  createdAt: string;
  updatedAt: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const Box = motion.div as React.FC<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

export default function Projects() {
  const [repos, setRepos] = useState<FormattedRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/api/github/repos");
        const data = await res.json();
        if (data.success) {
          setRepos(data.repos);
        }
      } catch (error) {
        console.error("Failed to fetch repos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  // Filter tags derived from live data
  const allTags = useMemo(() => {
    const tags = new Set<string>(["All"]);
    repos.forEach((repo) => {
      if (repo.language) tags.add(repo.language);
      repo.topics?.forEach((topic) => {
        // Capitalize first letter of topics for better UI
        tags.add(topic.charAt(0).toUpperCase() + topic.slice(1));
      });
    });
    return Array.from(tags).slice(0, 10); // Limit tags to avoid clutter
  }, [repos]);

  const filteredRepos = useMemo(() => {
    let filtered = repos;
    if (activeTag !== "All") {
      filtered = repos.filter(
        (r) =>
          r.language === activeTag ||
          r.topics?.some((t) => t.toLowerCase() === activeTag.toLowerCase()),
      );
    }
    return filtered;
  }, [repos, activeTag]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag]);

  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);
  const paginatedRepos = filteredRepos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Soft scroll to top of projects section
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden"
    >
      {/* Background accent blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[100px]"
        style={{
          background: "radial-gradient(circle, #088395, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Portfolio"
          title="DISCOVER MY"
          highlight="CREATIONS"
          subtitle="Automatically synced with my GitHub profile. Highlighting my latest open-source contributions and personal projects."
        />

        {/* Filter bar */}
        {!loading && (
          <Box
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeTag === tag
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                    : "border-white/10 text-gray-500 hover:border-white/20 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </Box>
        )}

        {/* Animated responsive grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
            <p className="text-gray-500 font-medium animate-pulse">
              Loading projects from GitHub...
            </p>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <Box
                key={activeTag + currentPage}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {paginatedRepos.map((repo, i) => (
                  <Box key={repo.id} variants={cardVariants}>
                    <ProjectCard
                      project={{
                        id: repo.id,
                        title: repo.name.replace(/_/g, " ").replace(/-/g, " "),
                        subtitle: repo.language || "Project",
                        description: repo.description,
                        image: `https://opengraph.githubassets.com/1/DoawnLet/${repo.name}`,
                        tags: repo.topics?.length
                          ? repo.topics.slice(0, 3)
                          : [repo.language || "GitHub"],
                        link: repo.url,
                        featured: repo.stars > 0,
                      }}
                      index={i}
                    />
                  </Box>
                ))}
              </Box>
            </AnimatePresence>

            {filteredRepos.length === 0 && (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
                <p className="text-gray-400">
                  No projects found for this category.
                </p>
              </div>
            )}

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-all"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-10 h-10 rounded-xl font-bold transition-all ${
                        currentPage === i + 1
                          ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-xl border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-all"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <Box
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md text-center max-w-2xl mx-auto"
        >
          <h4 className="text-xl font-bold text-white mb-2">
            Interested in my work?
          </h4>
          <p className="text-gray-400 mb-8">
            I'm always open to new projects, collaborations or mentoring
            opportunities.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:-translate-y-1 transition-all duration-300"
          >
            Start a Conversation
          </a>
        </Box>
      </div>
    </section>
  );
}

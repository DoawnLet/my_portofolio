"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink, FolderGit2, Star, GitFork, Loader2 } from "lucide-react";

interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
  updatedAt: string;
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch("/api/github/repos");
        const data = await response.json();

        if (data.success) {
          setRepos(data.repos);
        } else {
          setError(data.error || "Failed to fetch repositories");
        }
      } catch (err) {
        setError("Failed to load projects");
        console.error("Error fetching repos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="p-3 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl">
            <FolderGit2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Projects
          </h2>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects found</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo) => (
            <article
              key={repo.id}
              className="bg-slate-900/50 backdrop-blur-sm border border-violet-500/20 rounded-lg p-6 hover:bg-slate-800/50 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-500 transform hover:scale-105 hover:transform-[perspective(1000px)_rotateY(10deg)_rotateX(5deg)] transform-3d"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white">
                  {repo.name.replace(/_/g, " ")}
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {repo.stars}
                    </span>
                  )}
                  {repo.forks > 0 && (
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {repo.forks}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-300 mb-4 min-h-[3rem]">
                {repo.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {repo.language && (
                  <span className="px-3 py-1 bg-fuchsia-500/20 text-fuchsia-400 rounded-full text-sm">
                    {repo.language}
                  </span>
                )}
                {repo.topics.slice(0, 2).map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                View Project <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

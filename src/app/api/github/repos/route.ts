import { NextResponse } from "next/server";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  private: boolean;
}

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

export async function GET() {
  try {
    const username = "DoawnLet";
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Add GitHub token if you have one to increase rate limits
          // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        },
        // Revalidate every 1 hour
        next: { revalidate: 3600 },
      } as RequestInit & { next: { revalidate: number } },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repos");
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter out private repos and format the data
    const publicRepos: FormattedRepo[] = repos
      .filter((repo) => !repo.private)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || "No description available",
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        topics: repo.topics || [],
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
      }))
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );

    return NextResponse.json({
      success: true,
      repos: publicRepos,
      count: publicRepos.length,
    });
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch repositories",
        repos: [],
        count: 0,
      },
      { status: 500 },
    );
  }
}

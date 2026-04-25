"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, Star, GitFork, ExternalLink, Code, Loader2 } from "lucide-react"
import Link from "next/link"

const LANGUAGE_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3776ab",
  Java: "#b07219",
  Go: "#00add8",
  Rust: "#dea584",
  HTML: "#e34f26",
  CSS: "#563d7c",
  Shell: "#89e051",
  C: "#555555",
  "C++": "#f34b7d",
  default: "#6e7681",
}

const FALLBACK_PROJECTS = [
  {
    id: "fb1",
    name: "portfolio-website",
    description:
      "Personal portfolio website with 3D avatar, built with Next.js, Three.js, React Three Fiber, and Framer Motion.",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/Sanchitjha",
    homepage: null,
    topics: ["nextjs", "threejs", "portfolio", "react"],
  },
  {
    id: "fb2",
    name: "rest-api-backend",
    description:
      "Scalable RESTful API with Node.js, Express.js, and MongoDB. JWT authentication, rate limiting, and validation.",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/Sanchitjha",
    homepage: null,
    topics: ["nodejs", "expressjs", "mongodb", "jwt"],
  },
  {
    id: "fb3",
    name: "dev-qa-platform",
    description:
      "Stack Overflow-inspired Q&A platform with real-time chat via Socket.io and developer reputation system.",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/Sanchitjha",
    homepage: null,
    topics: ["socketio", "nodejs", "fullstack", "mongodb"],
  },
]

export default function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("All")
  const [languages, setLanguages] = useState(["All"])
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          "https://api.github.com/users/Sanchitjha/repos?sort=updated&per_page=30&type=public"
        )
        if (!res.ok) throw new Error("GitHub API request failed")
        const data = await res.json()
        const ownRepos = data
          .filter((r) => !r.fork)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              b.updated_at.localeCompare(a.updated_at)
          )
        setRepos(ownRepos.length ? ownRepos : FALLBACK_PROJECTS)
        const langs = [...new Set(ownRepos.map((r) => r.language).filter(Boolean))]
        setLanguages(["All", ...langs])
      } catch (e) {
        setError("Showing curated projects. Visit my GitHub for the complete list.")
        setRepos(FALLBACK_PROJECTS)
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  const filtered = filter === "All" ? repos : repos.filter((r) => r.language === filter)

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="absolute inset-0 bg-pattern pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Portfolio
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            GitHub <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Live from my GitHub — real projects built with passion, purpose, and clean code.
          </p>
          <Link
            href="https://github.com/Sanchitjha"
            target="_blank"
            className="inline-flex items-center gap-2 mt-4 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <Github className="w-4 h-4" />
            github.com/Sanchitjha
          </Link>
        </motion.div>

        {!loading && languages.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === lang
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white border border-gray-700/50"
                }`}
              >
                {lang}
                {lang !== "All" && (
                  <span
                    className="ml-1.5 inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.default }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
              <p className="text-gray-400">Fetching from GitHub...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="text-center pb-8">
            <p className="text-yellow-400/80 text-xs">{error}</p>
          </div>
        )}

        {!loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((repo, i) => (
              <motion.div
                key={repo.id || repo.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.5) }}
              >
                <ProjectCard repo={repo} />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="https://github.com/Sanchitjha?tab=repositories"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              View All Repositories on GitHub
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ repo }) {
  const langColor = LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.default
  return (
    <div className="project-card rounded-2xl p-6 h-full flex flex-col group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
          <Code className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-3">
          {repo.html_url && (
            <Link
              href={repo.html_url}
              target="_blank"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </Link>
          )}
          {repo.homepage && (
            <Link
              href={repo.homepage}
              target="_blank"
              className="text-gray-500 hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors capitalize">
        {repo.name?.replace(/-/g, " ").replace(/_/g, " ")}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
        {repo.description || "A project built with code and creativity."}
      </p>

      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-700/50 text-gray-400"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
        {repo.language ? (
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColor }} />
            <span className="text-xs text-gray-400">{repo.language}</span>
          </div>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-3 text-gray-500 text-xs">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5" />
              {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5" />
              {repo.forks_count}
            </span>
          )}
          {repo.html_url && (
            <Link
              href={repo.html_url}
              target="_blank"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              View →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

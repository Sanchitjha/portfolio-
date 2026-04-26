"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, Star, GitFork, ArrowUpRight, Loader2 } from "lucide-react"
import Link from "next/link"

const LANG_COLORS = {
  JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3776ab",
  Java: "#b07219", Go: "#00add8", Rust: "#dea584",
  HTML: "#e34f26", CSS: "#563d7c", Shell: "#89e051",
  C: "#555", "C++": "#f34b7d", default: "#6e7681",
}

const FALLBACK = [
  { id: 1, name: "portfolio-website", description: "Minimalist developer portfolio with 3D avatar built using Next.js, Three.js, and Framer Motion.", language: "JavaScript", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Sanchitjha", homepage: null, topics: ["nextjs","threejs","portfolio"] },
  { id: 2, name: "rest-api-backend", description: "Scalable REST API with Node.js, Express and MongoDB. JWT auth, rate limiting, validation.", language: "JavaScript", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Sanchitjha", homepage: null, topics: ["nodejs","mongodb","jwt"] },
  { id: 3, name: "dev-qa-platform", description: "Stack Overflow inspired Q&A platform with real-time chat via Socket.io and reputation system.", language: "JavaScript", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Sanchitjha", homepage: null, topics: ["socketio","fullstack","mongodb"] },
]

export default function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("https://api.github.com/users/Sanchitjha/repos?sort=updated&per_page=30&type=public")
        if (!res.ok) throw new Error("GitHub fetch failed")
        const data = await res.json()
        const own = data
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || b.updated_at.localeCompare(a.updated_at))
        setRepos(own.length ? own : FALLBACK)
      } catch (e) {
        setError("Curated projects below — visit GitHub for the full list.")
        setRepos(FALLBACK)
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <span className="section-label mb-3">Work</span>
            <h2 className="heading-display text-4xl lg:text-5xl mt-3">
              Selected projects.
            </h2>
            <p className="text-secondary mt-3 max-w-md">
              Live from my GitHub — production code, side projects, and experiments.
            </p>
          </div>
          <Link
            href="https://github.com/Sanchitjha?tab=repositories"
            target="_blank"
            className="btn-base btn-ghost text-secondary"
          >
            <Github className="w-4 h-4" />
            All repositories
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 text-tertiary animate-spin" />
          </div>
        )}

        {error && !loading && (
          <p className="text-tertiary text-xs mb-6 mono">{error}</p>
        )}

        {!loading && (
          <div className="grid sm:grid-cols-2 gap-4">
            {repos.slice(0, 8).map((repo, i) => (
              <motion.div
                key={repo.id || repo.name}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: Math.min(i * 0.05, 0.4) }}
              >
                <ProjectCard repo={repo} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ repo }) {
  const langColor = LANG_COLORS[repo.language] || LANG_COLORS.default
  const url = repo.homepage || repo.html_url
  return (
    <Link
      href={url}
      target="_blank"
      className="project-card block p-6 group h-full"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-primary font-semibold capitalize truncate group-hover:text-white transition-colors">
            {repo.name?.replace(/-/g, " ").replace(/_/g, " ")}
          </h3>
          {repo.html_url !== url && (
            <Link
              href={repo.html_url}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="text-tertiary hover:text-secondary text-xs mono inline-flex items-center gap-1 mt-0.5"
            >
              <Github className="w-3 h-3" /> source
            </Link>
          )}
        </div>
        <ArrowUpRight className="w-4 h-4 text-tertiary group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>

      <p className="text-secondary text-sm leading-relaxed line-clamp-2 mb-4 min-h-[2.6rem]">
        {repo.description || "—"}
      </p>

      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] mono rounded border border-subtle text-tertiary"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 pt-3 border-t border-subtle text-xs text-tertiary">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: langColor }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1"><Star className="w-3 h-3" />{repo.stargazers_count}</span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{repo.forks_count}</span>
        )}
      </div>
    </Link>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowUpRight, Loader2 } from "lucide-react"
import Link from "next/link"

const LANG_COLORS = {
  JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3776ab",
  Java: "#b07219", Go: "#00add8", Rust: "#dea584",
  HTML: "#e34f26", CSS: "#563d7c", Shell: "#89e051",
  default: "#555",
}

const FALLBACK = [
  { id: 1, name: "portfolio-website",  description: "Minimalist developer portfolio with 3D avatar built using Next.js, Three.js, and Framer Motion.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/Sanchitjha", homepage: null },
  { id: 2, name: "rest-api-backend",   description: "Scalable REST API with Node.js, Express and MongoDB. JWT auth, rate limiting, validation.",           language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/Sanchitjha", homepage: null },
  { id: 3, name: "dev-qa-platform",    description: "Stack Overflow inspired Q&A platform with real-time chat via Socket.io and reputation system.",       language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/Sanchitjha", homepage: null },
]

export default function Projects() {
  const [repos,   setRepos]   = useState([])
  const [loading, setLoading] = useState(true)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    fetch("https://api.github.com/users/Sanchitjha/repos?sort=updated&per_page=30&type=public")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        const own = data
          .filter(r => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || b.updated_at.localeCompare(a.updated_at))
        setRepos(own.length ? own : FALLBACK)
      })
      .catch(() => setRepos(FALLBACK))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="projects" ref={ref} className="section-gap">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-end justify-between">
            <span className="section-tag">Work</span>
            <Link
              href="https://github.com/Sanchitjha?tab=repositories"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-[#444] hover:text-[#888] transition-colors mono mb-1"
            >
              All repos <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-5 h-5 text-[#444] animate-spin" />
            </div>
          ) : (
            <div className="mt-4">
              {repos.slice(0, 10).map((repo, i) => {
                const langColor = LANG_COLORS[repo.language] || LANG_COLORS.default
                const url = repo.homepage || repo.html_url
                return (
                  <motion.div
                    key={repo.id || repo.name}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: Math.min(i * 0.04, 0.35) }}
                  >
                    <Link href={url} target="_blank" className="row-item group">
                      {/* Name + description */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[#e8e8e8] text-sm group-hover:text-white transition-colors capitalize">
                          {repo.name?.replace(/-/g, " ").replace(/_/g, " ")}
                        </span>
                        {repo.description && (
                          <span className="text-[#444] text-sm ml-3 truncate hidden sm:inline">
                            {repo.description}
                          </span>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-4 shrink-0 text-xs mono text-[#444]">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: langColor }} />
                            {repo.language}
                          </span>
                        )}
                        {repo.stargazers_count > 0 && (
                          <span>★ {repo.stargazers_count}</span>
                        )}
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

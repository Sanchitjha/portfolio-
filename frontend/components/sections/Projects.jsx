"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A modern, animated portfolio built with Next.js, Framer Motion, and Three.js particle effects. Features smooth scroll navigation and responsive design.",
    tech: ["Next.js", "Framer Motion", "Three.js", "Tailwind CSS"],
    github: "https://github.com/Sanchitjha/portfolio-",
    live: "#",
  },
  {
    title: "REST API Backend",
    description:
      "Scalable RESTful API with JWT authentication, rate limiting, and MongoDB. Includes full CRUD operations, file upload support, and real-time socket events.",
    tech: ["Node.js", "Express.js", "MongoDB", "Socket.io", "JWT"],
    github: "https://github.com/Sanchitjha",
    live: "#",
  },
  {
    title: "Dev Q&A Platform",
    description:
      "Stack Overflow-inspired platform for developers to ask and answer coding questions. Features voting, categories, difficulty levels, and search.",
    tech: ["React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    github: "https://github.com/Sanchitjha",
    live: "#",
  },
]

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="projects" className="section-padding bg-pattern">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Projects</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Things I've built
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="project-card rounded-2xl p-6 flex flex-col"
              >
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <Link
                    href={project.github}
                    target="_blank"
                    className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <Github className="h-4 w-4" />
                    <span>Code</span>
                  </Link>
                  {project.live !== "#" && (
                    <Link
                      href={project.live}
                      target="_blank"
                      className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

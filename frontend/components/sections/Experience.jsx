"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const EXPERIENCES = [
  {
    role: "Backend Developer",
    company: "Freelance / Personal Projects",
    period: "2023 – Present",
    highlights: [
      "Shipped REST APIs serving 5+ clients with <200 ms p95 latency",
      "Built real-time features (live chat, collaborative editing) using Socket.io",
      "Implemented JWT auth, bcrypt, rate-limiting, and input validation middleware",
      "Containerised services with Docker; deployed on MongoDB Atlas & Render",
    ],
    tech: ["Node.js", "Express", "MongoDB", "Socket.io", "JWT", "Docker"],
  },
  {
    role: "Full Stack Developer",
    company: "Self-Directed Learning",
    period: "2022 – 2023",
    highlights: [
      "Shipped 15+ projects — CRUD apps, CLI tools, and a Q&A platform",
      "Mastered React & Next.js while deepening Node.js and database fundamentals",
      "Published npm packages and contributed to open-source projects",
      "Earned MongoDB and Node.js certifications",
    ],
    tech: ["React", "Next.js", "PostgreSQL", "Tailwind CSS", "Git"],
  },
]

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="experience" ref={ref} className="section-gap">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="section-tag">Experience</span>

          <div className="mt-4">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.1 }}
                className="border-b border-[#1c1c1c] py-6 first:border-t first:border-[#1c1c1c]"
              >
                <div className="flex w-full items-start justify-between gap-4">
                  <div>
                    <span className="text-[#e8e8e8] font-medium">{exp.role}</span>
                    <span className="text-[#444] text-sm mono ml-3">{exp.company}</span>
                  </div>
                  <span className="text-[#444] text-sm mono shrink-0">{exp.period}</span>
                </div>

                <ul className="mt-4 space-y-1.5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-[#666]">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#333] shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tech.map((t) => (
                    <span key={t} className="text-[#444] text-xs mono border border-[#1c1c1c] px-2 py-0.5 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="https://www.linkedin.com/in/sanchit-jha-844b17255"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm text-[#444] hover:text-[#888] transition-colors"
            >
              Full history on LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Download, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const EXPERIENCE = [
  {
    role: "Backend Developer",
    company: "Freelance / Personal Projects",
    period: "2023 – Present",
    points: [
      "Designed and shipped REST APIs consumed by 5+ clients, <200 ms avg response time",
      "Built real-time features with Socket.io for live chat and collaborative tools",
      "Implemented JWT auth, bcrypt hashing, and Express rate-limiting middleware",
      "Containerised services with Docker; managed MongoDB Atlas and PostgreSQL",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Self-Directed Learning & Open Source",
    period: "2022 – 2023",
    points: [
      "Shipped 15+ projects spanning CRUD apps, chat platforms, and developer tools",
      "Built a Stack Overflow-inspired Q&A platform with reputation and voting",
      "Contributed to open-source repositories and published npm utilities",
      "Completed certifications in MongoDB, Node.js, and advanced React patterns",
    ],
  },
]

const SKILLS = [
  { label: "Backend",        items: ["Node.js", "Express.js", "REST APIs", "Socket.io", "JWT"] },
  { label: "Database",       items: ["MongoDB", "PostgreSQL", "Redis", "Mongoose", "Firebase"] },
  { label: "Frontend",       items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { label: "DevOps & Tools", items: ["Git", "GitHub", "Docker", "Postman", "Linux CLI"] },
]

const CERTS = [
  { name: "MongoDB Developer Certification", issuer: "MongoDB University", year: "2023" },
  { name: "Node.js Application Development", issuer: "OpenJS Foundation",  year: "2023" },
  { name: "React — The Complete Guide",      issuer: "Udemy",              year: "2022" },
]

export default function Resume() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="resume" ref={ref} className="section-gap">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-end justify-between">
            <span className="section-tag">Resume</span>
            <a
              href="/sanchit-jha-resume.pdf"
              download
              className="inline-flex items-center gap-1.5 text-xs text-[#444] hover:text-[#888] transition-colors mono mb-1"
            >
              <Download className="w-3 h-3" /> Download PDF
            </a>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 mt-8">

            {/* LEFT — Experience + Education + Certs */}
            <div className="lg:col-span-7 space-y-12">

              {/* Experience */}
              <div>
                <p className="text-[#333] text-xs mono uppercase tracking-widest mb-6">Experience</p>
                <div className="space-y-8">
                  {EXPERIENCE.map((exp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.1 + i * 0.1 }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="text-[#e8e8e8] font-medium">{exp.role}</p>
                          <p className="text-[#555] text-sm">{exp.company}</p>
                        </div>
                        <span className="text-[#444] text-xs mono shrink-0">{exp.period}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {exp.points.map((pt, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-[#666]">
                            <span className="mt-2 w-1 h-1 rounded-full bg-[#333] shrink-0" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.25 }}
              >
                <p className="text-[#333] text-xs mono uppercase tracking-widest mb-6">Education</p>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[#e8e8e8] font-medium">B.Tech — Computer Science</p>
                    <p className="text-[#555] text-sm">University, India</p>
                    <p className="text-[#444] text-xs mono mt-2">Data Structures · Algorithms · DBMS · OS · Networks</p>
                  </div>
                  <span className="text-[#444] text-xs mono shrink-0">2021 – 2025</span>
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                <p className="text-[#333] text-xs mono uppercase tracking-widest mb-6">Certifications</p>
                <div className="divide-y divide-[#1c1c1c]">
                  {CERTS.map((c, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 py-3">
                      <div>
                        <p className="text-[#888] text-sm">{c.name}</p>
                        <p className="text-[#444] text-xs mono">{c.issuer}</p>
                      </div>
                      <span className="text-[#333] text-xs mono">{c.year}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Skills + Stats + LinkedIn */}
            <div className="lg:col-span-5 space-y-10">

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.15 }}
              >
                <p className="text-[#333] text-xs mono uppercase tracking-widest mb-6">Skills</p>
                <div className="space-y-5">
                  {SKILLS.map((group, i) => (
                    <div key={i}>
                      <p className="text-[#444] text-xs mono mb-2">{group.label}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((skill) => (
                          <span key={skill} className="text-[#666] text-xs border border-[#1c1c1c] px-2 py-0.5 rounded-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                <p className="text-[#333] text-xs mono uppercase tracking-widest mb-6">By the numbers</p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "15+", label: "Projects" },
                    { value: "2+",  label: "Years coding" },
                    { value: "10+", label: "APIs shipped" },
                    { value: "∞",   label: "Coffee" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-[#e8e8e8] text-2xl font-bold display">{s.value}</p>
                      <p className="text-[#444] text-xs mono mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.25 }}
              >
                <Link
                  href="https://www.linkedin.com/in/sanchit-jha-844b17255"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-sm text-[#444] hover:text-[#888] transition-colors"
                >
                  Full history on LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

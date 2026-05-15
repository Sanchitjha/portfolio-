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
    location: "Remote",
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
    location: "India",
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

const EDUCATION = {
  degree: "B.Tech — Computer Science",
  institution: "University, India",
  period: "2021 – 2025",
  note: "Data Structures · Algorithms · DBMS · Operating Systems · Networks",
}

const CERTS = [
  { name: "MongoDB Developer Certification", issuer: "MongoDB University", year: "2023" },
  { name: "Node.js Application Development", issuer: "OpenJS Foundation",  year: "2023" },
  { name: "React — The Complete Guide",      issuer: "Udemy",              year: "2022" },
]

function FadeIn({ children, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Resume() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="resume" ref={ref} className="section-padding">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <span className="section-label mb-3">Background</span>
            <h2 className="heading-display text-4xl lg:text-5xl mt-3">Resume.</h2>
            <p className="text-secondary mt-3 max-w-md">
              Experience, skills, and education — the full picture.
            </p>
          </div>
          <a
            href="/sanchit-jha-resume.pdf"
            download
            className="btn-base btn-secondary"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* LEFT — Experience + Education */}
          <div className="lg:col-span-3 space-y-10">

            {/* Experience */}
            <FadeIn delay={0.05}>
              <h3 className="text-xs font-medium tracking-widest uppercase text-tertiary mono mb-6">
                Experience
              </h3>
              <div className="space-y-px">
                {EXPERIENCE.map((exp, i) => (
                  <div
                    key={i}
                    className="card p-6 rounded-xl first:rounded-t-xl last:rounded-b-xl"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                      <div>
                        <p className="text-primary font-semibold">{exp.role}</p>
                        <p className="text-secondary text-sm mt-0.5">{exp.company}</p>
                      </div>
                      <div className="text-right text-xs text-tertiary mono">
                        <p>{exp.period}</p>
                        <p className="mt-0.5">{exp.location}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-secondary">
                          <span className="mt-2 w-1 h-1 rounded-full bg-[#3a3a3a] flex-shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Education */}
            <FadeIn delay={0.1}>
              <h3 className="text-xs font-medium tracking-widest uppercase text-tertiary mono mb-6">
                Education
              </h3>
              <div className="card p-6 rounded-xl">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-primary font-semibold">{EDUCATION.degree}</p>
                    <p className="text-secondary text-sm mt-0.5">{EDUCATION.institution}</p>
                  </div>
                  <p className="text-xs text-tertiary mono">{EDUCATION.period}</p>
                </div>
                <p className="text-xs text-tertiary mt-3 mono">{EDUCATION.note}</p>
              </div>
            </FadeIn>

            {/* Certifications */}
            <FadeIn delay={0.15}>
              <h3 className="text-xs font-medium tracking-widest uppercase text-tertiary mono mb-6">
                Certifications
              </h3>
              <div className="space-y-px">
                {CERTS.map((c, i) => (
                  <div
                    key={i}
                    className="card px-5 py-4 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-primary text-sm font-medium">{c.name}</p>
                      <p className="text-tertiary text-xs mono mt-0.5">{c.issuer}</p>
                    </div>
                    <span className="text-tertiary text-xs mono flex-shrink-0">{c.year}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — Skills + Stats */}
          <div className="lg:col-span-2 space-y-10">

            <FadeIn delay={0.1}>
              <h3 className="text-xs font-medium tracking-widest uppercase text-tertiary mono mb-6">
                Skills
              </h3>
              <div className="space-y-px">
                {SKILLS.map((group, i) => (
                  <div key={i} className="card p-5 rounded-xl">
                    <p className="text-xs text-tertiary mono mb-3 uppercase tracking-wider">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-xs rounded-md border border-subtle text-secondary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.2}>
              <h3 className="text-xs font-medium tracking-widest uppercase text-tertiary mono mb-6">
                By the numbers
              </h3>
              <div className="grid grid-cols-2 gap-px">
                {[
                  { value: "15+", label: "Projects" },
                  { value: "2+",  label: "Years coding" },
                  { value: "10+", label: "APIs shipped" },
                  { value: "∞",   label: "Coffee" },
                ].map((s) => (
                  <div key={s.label} className="card p-5 rounded-xl text-center">
                    <p className="text-2xl font-bold text-primary heading-display">{s.value}</p>
                    <p className="text-xs text-tertiary mono mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* LinkedIn CTA */}
            <FadeIn delay={0.25}>
              <Link
                href="https://www.linkedin.com/in/sanchit-jha-844b17255"
                target="_blank"
                className="card p-5 rounded-xl flex items-center justify-between group block"
              >
                <div>
                  <p className="text-primary text-sm font-medium">LinkedIn</p>
                  <p className="text-tertiary text-xs mono mt-0.5">Full work history</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-tertiary group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

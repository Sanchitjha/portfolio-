"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Download, Briefcase, GraduationCap, Award, Code2,
  Calendar, MapPin, ExternalLink
} from "lucide-react"

const EXPERIENCE = [
  {
    role: "Backend Developer",
    company: "Freelance / Personal Projects",
    period: "2023 – Present",
    location: "Remote",
    type: "Full-time",
    color: "blue",
    points: [
      "Designed and shipped RESTful APIs consumed by 5+ front-end clients with <200ms avg response time",
      "Built real-time features using Socket.io for live chat and collaborative tools",
      "Implemented JWT-based auth flows, bcrypt password hashing, and Express rate-limiting middleware",
      "Containerised services with Docker; managed MongoDB Atlas and PostgreSQL on cloud infra",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Self-Directed Learning & Open Source",
    period: "2022 – 2023",
    location: "India",
    type: "Learning",
    color: "purple",
    points: [
      "Mastered Node.js / Express ecosystem through 15+ projects ranging from CRUD apps to chat platforms",
      "Contributed to open-source repositories and published npm utilities",
      "Built Dev Q&A Platform inspired by Stack Overflow with upvote/downvote and reputation system",
      "Completed certifications in MongoDB, Node.js, and advanced React patterns",
    ],
  },
]

const EDUCATION = [
  {
    degree: "B.Tech / B.E. in Computer Science",
    institution: "University (India)",
    period: "2021 – 2025",
    color: "cyan",
    details: "Core CS fundamentals: Data Structures, Algorithms, DBMS, OS, CN. Focused electives in web technologies and distributed systems.",
  },
]

const SKILLS_MATRIX = [
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "Socket.io", "JWT", "Middleware"], level: 92 },
  { category: "Database", items: ["MongoDB", "Mongoose", "PostgreSQL", "Redis", "Firebase"], level: 88 },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML5/CSS3"], level: 82 },
  { category: "DevOps & Tools", items: ["Git", "GitHub", "Docker", "Postman", "VS Code", "Linux CLI"], level: 78 },
]

const CERTS = [
  { name: "MongoDB Developer Certification", issuer: "MongoDB University", year: "2023" },
  { name: "Node.js Application Development", issuer: "OpenJS Foundation", year: "2023" },
  { name: "React – The Complete Guide", issuer: "Udemy / Maximilian", year: "2022" },
]

export default function Resume() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="resume" ref={ref} className="section-padding relative overflow-hidden">
      {/* bg decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            My Journey
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Resume & <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            A snapshot of my professional journey, skills, education, and achievements.
          </p>
          <a
            href="/sanchit-jha-resume.pdf"
            download
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Download Full Resume (PDF)
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN */}
          <div className="space-y-10">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Experience</h3>
              </div>
              <div className="space-y-6 relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent ml-4" />
                {EXPERIENCE.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="pl-10 relative"
                  >
                    <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center bg-${exp.color}-500/20 border border-${exp.color}-500/40`}>
                      <div className={`w-2.5 h-2.5 rounded-full bg-${exp.color}-400`} />
                    </div>
                    <div className="glass rounded-2xl p-5 border border-gray-700/50">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="text-white font-bold">{exp.role}</h4>
                          <p className={`text-${exp.color}-400 text-sm font-medium`}>{exp.company}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-1.5 mt-3">
                        {exp.points.map((point, j) => (
                          <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-${exp.color}-400 flex-shrink-0`} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Education</h3>
              </div>
              {EDUCATION.map((edu, i) => (
                <div key={i} className="glass rounded-2xl p-5 border border-gray-700/50">
                  <div className="flex flex-wrap justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-white font-bold">{edu.degree}</h4>
                      <p className="text-cyan-400 text-sm font-medium">{edu.institution}</p>
                    </div>
                    <span className="flex items-center gap-1 text-gray-400 text-xs">
                      <Calendar className="w-3 h-3" />
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{edu.details}</p>
                </div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Certifications</h3>
              </div>
              <div className="space-y-3">
                {CERTS.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="glass rounded-xl p-4 border border-gray-700/50 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400 flex-shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{cert.name}</p>
                      <p className="text-gray-500 text-xs">{cert.issuer} · {cert.year}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Technical Skills</h3>
            </div>
            <div className="space-y-6">
              {SKILLS_MATRIX.map((group, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass rounded-2xl p-5 border border-gray-700/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{group.category}</h4>
                    <span className="text-blue-400 text-sm font-bold">{group.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-1.5 mb-4">
                    <motion.div
                      className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${group.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs rounded-lg bg-gray-700/60 text-gray-300 border border-gray-600/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-4 mt-6"
            >
              {[
                { label: "Projects Built", value: "15+" },
                { label: "Years Coding", value: "2+" },
                { label: "APIs Shipped", value: "10+" },
                { label: "Open Source", value: "Active" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-5 border border-gray-700/50 text-center"
                >
                  <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

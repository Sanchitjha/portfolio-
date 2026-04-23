"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Briefcase } from "lucide-react"

const experiences = [
  {
    title: "Backend Developer",
    company: "Freelance / Personal Projects",
    period: "2023 – Present",
    description:
      "Built and deployed full-stack web applications using Node.js, Express, and MongoDB. Designed RESTful APIs, implemented JWT authentication, and integrated third-party services.",
    tech: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT"],
  },
  {
    title: "Full Stack Developer (Learning)",
    company: "Self-Directed",
    period: "2022 – 2023",
    description:
      "Developed proficiency in React and Next.js while deepening backend expertise. Built multiple projects combining frontend and backend technologies.",
    tech: ["React", "Next.js", "Tailwind CSS", "PostgreSQL", "Docker"],
  },
]

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Experience</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">My professional journey</p>
          </div>

          <div className="relative border-l-2 border-blue-500/30 pl-8 space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div className="absolute -left-11 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Briefcase className="h-3 w-3 text-white" />
                </div>
                <div className="glass rounded-2xl p-6 card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                    <span className="text-blue-400 text-sm">{exp.period}</span>
                  </div>
                  <p className="text-purple-400 font-medium mb-3">{exp.company}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

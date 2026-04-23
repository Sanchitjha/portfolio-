"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const skills = [
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "Socket.io", "JWT Auth"] },
  { category: "Database", items: ["MongoDB", "Mongoose", "PostgreSQL", "Redis", "Firebase"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML/CSS"] },
  { category: "DevOps & Tools", items: ["Git", "GitHub", "Docker", "Postman", "VS Code"] },
]

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="section-padding bg-pattern">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Skills</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I work with
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 card-hover"
              >
                <h3 className="text-lg font-bold text-blue-400 mb-4">{group.category}</h3>
                <ul className="space-y-2">
                  {group.items.map((skill) => (
                    <li key={skill} className="flex items-center space-x-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

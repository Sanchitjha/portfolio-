"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const STACK = [
  { label: "Backend",        items: ["Node.js", "Express.js", "REST APIs", "Socket.io", "JWT / Auth"] },
  { label: "Database",       items: ["MongoDB", "Mongoose", "PostgreSQL", "Redis", "Firebase"] },
  { label: "Frontend",       items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML / CSS"] },
  { label: "DevOps & Tools", items: ["Git / GitHub", "Docker", "Linux CLI", "Postman", "VS Code"] },
]

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="skills" ref={ref} className="section-gap">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="section-tag">Stack</span>

          <div className="divide-y divide-[#1c1c1c] mt-4">
            {STACK.map(({ label, items }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col sm:flex-row sm:items-start gap-4 py-5"
              >
                <span className="text-[#444] text-sm mono shrink-0 w-32">{label}</span>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-[#666] text-sm border border-[#1c1c1c] px-2.5 py-0.5 rounded-sm hover:border-[#2a2a2a] hover:text-[#888] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

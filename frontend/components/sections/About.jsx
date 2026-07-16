"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const FACTS = [
  ["Location",   "India — Remote OK"],
  ["Experience", "2+ years"],
  ["Focus",      "Backend & Full Stack"],
  ["Open to",    "Full-time · Freelance · Contract"],
  ["Stack",      "Node.js · MongoDB · React · Next.js"],
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="about" ref={ref} className="section-gap">
      <div className="container-main">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="section-tag">About</span>

          <div className="grid lg:grid-cols-12 gap-16 mt-4">

            {/* BIO */}
            <div className="lg:col-span-7 space-y-5">
              <p className="text-[clamp(1.1rem,2vw,1.25rem)] text-[#e8e8e8] leading-relaxed font-light">
                I'm <strong className="font-semibold">Sanchit Jha</strong> — a backend-first developer
                based in India. I started coding out of curiosity about what happens behind every website,
                and ended up deep in Node.js, databases, and distributed systems.
              </p>
              <p className="text-[#888] leading-relaxed">
                Today I build scalable REST APIs, real-time applications, and full-stack products.
                I care about code that is clean, fast, and easy for the next developer to understand.
              </p>
              <p className="text-[#888] leading-relaxed">
                Outside of shipping code, I read about systems design, contribute to open-source,
                and slowly make my way through the frontend side of the stack.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="https://github.com/Sanchitjha"
                  target="_blank"
                  className="group inline-flex items-center gap-1.5 text-sm text-[#888] hover:text-[#e8e8e8] transition-colors border-b border-[#333] pb-0.5 hover:border-[#888]"
                >
                  GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/sanchit-jha-844b17255"
                  target="_blank"
                  className="group inline-flex items-center gap-1.5 text-sm text-[#888] hover:text-[#e8e8e8] transition-colors border-b border-[#333] pb-0.5 hover:border-[#888]"
                >
                  LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/sanchit-jha-resume.pdf"
                  target="_blank"
                  className="group inline-flex items-center gap-1.5 text-sm text-[#888] hover:text-[#e8e8e8] transition-colors border-b border-[#333] pb-0.5 hover:border-[#888]"
                >
                  Resume PDF <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* FACTS TABLE */}
            <div className="lg:col-span-5">
              <div className="divide-y divide-[#1c1c1c]">
                {FACTS.map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4 py-3.5">
                    <span className="text-[#444] text-sm mono shrink-0">{k}</span>
                    <span className="text-[#888] text-sm text-right">{v}</span>
                  </div>
                ))}
              </div>

              {/* Principles */}
              <div className="mt-8 space-y-3">
                {[
                  "Simple > clever.",
                  "Write for the next developer.",
                  "Ship early, measure, iterate.",
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[#333] mono text-xs w-5 shrink-0">0{i + 1}</span>
                    <span className="text-[#666] text-sm">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, Mail, MapPin } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"

const AvatarScene = dynamic(() => import("@/components/3d/AvatarScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="spinner" />
    </div>
  ),
})

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 lg:pt-0">
      {/* Subtle grid backdrop */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* LEFT — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-8 text-sm text-tertiary mono"
            >
              <span className="dot-pulse" />
              <span>Available for new opportunities</span>
            </motion.div>

            {/* Heading */}
            <h1 className="heading-display text-5xl sm:text-6xl lg:text-7xl mb-6">
              Hi, I'm <span className="gradient-text">Sanchit</span> —
              <br />
              <span className="text-secondary font-medium">a backend &</span>
              <br />
              <span className="text-secondary font-medium">full-stack engineer.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-secondary max-w-xl mb-10 leading-relaxed">
              I build scalable backend systems, robust REST APIs, and modern full-stack
              applications. Currently exploring distributed systems and developer tooling
              with <span className="text-primary">Node.js</span>,{" "}
              <span className="text-primary">Next.js</span>, and{" "}
              <span className="text-primary">MongoDB</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12">
              <button
                onClick={() => document.querySelector("#schedule")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-base btn-primary"
              >
                <Calendar className="w-4 h-4" />
                Book a meeting
              </button>
              <a href="mailto:sanchitjha8888@gmail.com" className="btn-base btn-secondary">
                <Mail className="w-4 h-4" />
                sanchitjha8888@gmail.com
              </a>
            </div>

            {/* Location row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-tertiary">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                India · Remote
              </span>
              <span className="flex items-center gap-1.5 mono">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                IST · UTC+5:30
              </span>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-10 text-sm">
              {[
                { label: "GitHub", href: "https://github.com/Sanchitjha" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/sanchit-jha-844b17255" },
                { label: "Resume", href: "/sanchit-jha-resume.pdf" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="group inline-flex items-center gap-1 text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — 3D avatar (subtle, smaller) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <div className="relative w-full aspect-square max-w-[440px] mx-auto">
              <AvatarScene mousePosition={mousePosition} />

              {/* Tiny info chips */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden md:block absolute top-6 left-0 surface px-3 py-1.5 mono text-xs text-secondary"
              >
                ./sanchit_jha
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="hidden md:flex items-center gap-2 absolute bottom-6 right-0 surface px-3 py-1.5 text-xs"
              >
                <span className="dot-pulse" />
                <span className="text-secondary mono">online</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

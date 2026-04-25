"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { ArrowDown, Github, Linkedin, Mail, Download, Calendar } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const AvatarScene = dynamic(() => import("@/components/3d/AvatarScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl"
          animate={{ x: mousePosition.x * 20, y: mousePosition.y * 20 }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl"
          animate={{ x: mousePosition.x * -15, y: mousePosition.y * -15 }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
        />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* LEFT: TEXT */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="order-2 lg:order-1">
            <motion.div variants={itemVariants} className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for Opportunities
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-black mb-4 leading-tight">
              <span className="text-white">Hi, I'm</span>
              <br />
              <span className="gradient-text">Sanchit Jha</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="mb-6">
              <div className="text-2xl lg:text-3xl text-gray-300 font-light h-12 flex items-center">
                <TypeAnimation
                  sequence={[
                    "Backend Developer",
                    2000,
                    "Full Stack Engineer",
                    2000,
                    "API Architect",
                    2000,
                    "Node.js Expert",
                    2000,
                    "MongoDB Specialist",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-blue-400 font-semibold"
                />
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
              Passionate about building <span className="text-white font-medium">scalable backend systems</span>, robust
              APIs, and modern full-stack applications with Node.js, MongoDB, and the JavaScript ecosystem.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-10">
              {["Node.js", "Express.js", "MongoDB", "PostgreSQL", "React", "Next.js", "Docker"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium bg-gray-800/60 text-gray-300 rounded-full border border-gray-700/50"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => document.querySelector("#schedule")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl glow-hover"
              >
                <Calendar className="w-5 h-5" />
                Schedule a Call
              </button>
              <a
                href="/sanchit-jha-resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-6">
              <Link
                href="https://github.com/Sanchitjha"
                target="_blank"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-gray-800/60 group-hover:bg-gray-700/60 border border-gray-700/50">
                  <Github className="w-5 h-5" />
                </div>
                <span className="text-sm hidden sm:inline">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/sanchit-jha-844b17255"
                target="_blank"
                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-gray-800/60 group-hover:bg-blue-500/20 border border-gray-700/50">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="text-sm hidden sm:inline">LinkedIn</span>
              </Link>
              <Link
                href="mailto:sanchitjha8888@gmail.com"
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-gray-800/60 group-hover:bg-cyan-500/20 border border-gray-700/50">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm hidden sm:inline">Email</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D AVATAR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="order-1 lg:order-2 flex items-center justify-center"
          >
            <div className="relative w-full h-[400px] lg:h-[600px]">
              <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent rounded-full" />
              <AvatarScene mousePosition={mousePosition} />

              {/* Floating info cards */}
              <motion.div
                className="hidden lg:block absolute top-8 -left-4 glass rounded-xl px-4 py-3 border border-blue-500/20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-xs text-gray-400">GitHub Projects</div>
                <div className="text-xl font-bold text-white">15+</div>
              </motion.div>

              <motion.div
                className="hidden lg:block absolute bottom-16 -right-4 glass rounded-xl px-4 py-3 border border-purple-500/20"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="text-xs text-gray-400">Experience</div>
                <div className="text-xl font-bold text-white">2+ yrs</div>
              </motion.div>

              <motion.div
                className="hidden lg:block absolute top-1/2 -right-8 glass rounded-xl px-4 py-3 border border-cyan-500/20"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="text-xs text-gray-400">Stack</div>
                <div className="text-sm font-bold text-cyan-400">Full Stack</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

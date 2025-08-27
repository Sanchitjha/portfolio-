"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { ArrowDown, Github, Linkedin, Mail, Download, Code, Database, Server } from "lucide-react"
import Link from "next/link"

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
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
          animate={{
            x: mousePosition.x * 50,
            y: mousePosition.y * 50,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
          animate={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl"
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
        />

        {/* Floating tech icons */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-green-400 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        >
          <Database size={40} />
        </motion.div>
        <motion.div
          className="absolute top-3/4 right-1/4 text-blue-400 opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        >
          <Server size={35} />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-1/6 text-yellow-400 opacity-20"
          animate={{
            x: [0, 15, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        >
          <Code size={45} />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 text-blue-300 text-sm font-medium">
              👋 Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={itemVariants} className="text-responsive-xl font-bold mb-6 gradient-text">
            Sanchit Jha
          </motion.h1>

          {/* Animated title */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-responsive-lg text-gray-300 font-light">
              <TypeAnimation
                sequence={[
                  "Backend Developer",
                  2000,
                  "Full Stack Engineer",
                  2000,
                  "API Architect",
                  2000,
                  "Database Designer",
                  2000,
                  "Node.js Expert",
                  2000,
                  "MongoDB Specialist",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
                className="text-white"
              />
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Passionate backend developer with expertise in building scalable web applications, RESTful APIs, and robust
            database architectures. Specialized in Node.js, Express.js, MongoDB, and modern JavaScript technologies.
          </motion.p>

          {/* Tech Stack Preview */}
          <motion.div variants={itemVariants} className="flex justify-center space-x-6 mb-12">
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Node.js</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-300">JavaScript</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="text-sm text-gray-300">MongoDB</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="#contact"
              className="btn-primary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg glow-hover"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Link>
            <Link
              href="/sanchit-jha-resume.pdf"
              target="_blank"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex justify-center space-x-6 mb-16">
            <Link
              href="https://github.com/Sanchitjha"
              target="_blank"
              className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 glow-hover group"
            >
              <Github className="h-6 w-6 group-hover:text-blue-400" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/sanchit-jha-844b17255"
              target="_blank"
              className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 glow-hover group"
            >
              <Linkedin className="h-6 w-6 group-hover:text-blue-400" />
            </Link>
            <Link
              href="mailto:sanchitjha@example.com"
              className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 glow-hover group"
            >
              <Mail className="h-6 w-6 group-hover:text-blue-400" />
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div variants={itemVariants} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="flex flex-col items-center text-gray-400"
            >
              <span className="text-sm mb-2">Scroll Down</span>
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

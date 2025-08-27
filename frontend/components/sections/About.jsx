"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Database, Server, Globe, Coffee, Lightbulb } from "lucide-react"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const stats = [
    { number: "2+", label: "Years Experience", icon: Coffee },
    { number: "15+", label: "Projects Completed", icon: Code },
    { number: "5+", label: "Technologies Mastered", icon: Database },
    { number: "100%", label: "Client Satisfaction", icon: Lightbulb },
  ]

  return (
    <section id="about" className="section-padding bg-pattern">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">About Me</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Passionate about creating robust backend solutions and scalable architectures
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Backend Developer & Problem Solver</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  I'm Sanchit Jha, a passionate backend developer with a strong foundation in modern web technologies.
                  My journey in software development began with a curiosity about how applications work behind the
                  scenes, which led me to specialize in server-side development and database architecture.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  With expertise in Node.js, Express.js, and MongoDB, I focus on building scalable, efficient, and
                  secure backend systems. I enjoy tackling complex problems and turning ideas into robust digital
                  solutions that can handle real-world challenges.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
                  or sharing knowledge with the developer community. I believe in continuous learning and staying
                  updated with the latest industry trends.
                </p>
              </div>

              {/* What I Do */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass rounded-xl p-6 card-hover">
                  <Server className="h-8 w-8 text-blue-400 mb-3" />
                  <h4 className="text-lg font-semibold mb-2">Backend Development</h4>
                  <p className="text-gray-400 text-sm">
                    Building robust APIs and server-side applications using Node.js and Express.js
                  </p>
                </div>
                <div className="glass rounded-xl p-6 card-hover">
                  <Database className="h-8 w-8 text-green-400 mb-3" />
                  <h4 className="text-lg font-semibold mb-2">Database Design</h4>
                  <p className="text-gray-400 text-sm">
                    Designing efficient database schemas and optimizing queries for MongoDB and SQL databases
                  </p>
                </div>
                <div className="glass rounded-xl p-6 card-hover">
                  <Globe className="h-8 w-8 text-purple-400 mb-3" />
                  <h4 className="text-lg font-semibold mb-2">API Development</h4>
                  <p className="text-gray-400 text-sm">
                    Creating RESTful APIs with proper authentication, validation, and documentation
                  </p>
                </div>
                <div className="glass rounded-xl p-6 card-hover">
                  <Code className="h-8 w-8 text-cyan-400 mb-3" />
                  <h4 className="text-lg font-semibold mb-2">Full Stack</h4>
                  <p className="text-gray-400 text-sm">
                    Expanding into frontend technologies like React and Next.js for complete solutions
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Stats & Visual */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      className="glass rounded-xl p-6 text-center card-hover"
                    >
                      <Icon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Tech Philosophy */}
              <div className="glass rounded-2xl p-8">
                <h4 className="text-xl font-bold mb-4 text-white">My Development Philosophy</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">
                      <strong>Clean Code:</strong> Writing maintainable, readable, and well-documented code
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">
                      <strong>Scalability:</strong> Building systems that can grow with business needs
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">
                      <strong>Security:</strong> Implementing best practices for data protection and user privacy
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">
                      <strong>Performance:</strong> Optimizing applications for speed and efficiency
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

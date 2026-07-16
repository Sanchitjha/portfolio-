"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDown } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"

const AvatarScene = dynamic(() => import("@/components/3d/AvatarScene"), {
  ssr: false,
  loading: () => null,
})

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [time,  setTime]  = useState("")

  useEffect(() => {
    const mv = (e) => setMouse({
      x: (e.clientX / window.innerWidth)  * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    })
    window.addEventListener("mousemove", mv)
    return () => window.removeEventListener("mousemove", mv)
  }, [])

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata",
    }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" },
  })

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" style={{ zIndex: 1 }} />

      {/* 3D Avatar — subtle background right side */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none"
        style={{ zIndex: 1, opacity: 0.35 }}
      >
        <AvatarScene mousePosition={mouse} />
      </div>

      {/* Fade avatar into bg on left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: "linear-gradient(to right, #0a0a0a 35%, #0a0a0a 50%, transparent 100%)",
        }}
      />

      <div className="container-main relative" style={{ zIndex: 3 }}>
        <div className="max-w-3xl">

          {/* Status */}
          <motion.div {...fadeUp(0.05)} className="flex items-center gap-2.5 mb-10">
            <span className="dot-pulse" />
            <span className="text-[#888] text-sm mono">Available for work · India</span>
            {time && (
              <span className="text-[#444] text-sm mono ml-2">{time} IST</span>
            )}
          </motion.div>

          {/* Main heading */}
          <motion.h1 {...fadeUp(0.1)} className="display text-[clamp(3rem,8vw,6.5rem)] mb-6 text-[#e8e8e8]">
            Hi, I'm
            <br />
            <span className="gradient-text">Sanchit Jha.</span>
          </motion.h1>

          {/* Role line */}
          <motion.p {...fadeUp(0.2)} className="text-[clamp(1.1rem,2.5vw,1.5rem)] text-[#888] mb-10 max-w-xl leading-relaxed font-light">
            Backend & full-stack engineer. I build{" "}
            <span className="text-[#e8e8e8]">scalable APIs</span>,{" "}
            <span className="text-[#e8e8e8]">real-time systems</span>, and
            polished web applications.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap items-center gap-4 mb-16">
            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn btn-white"
            >
              View my work
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn btn-outline"
            >
              Get in touch
            </button>
            <Link
              href="/sanchit-jha-resume.pdf"
              target="_blank"
              className="btn btn-ghost text-[#888] hover:text-[#e8e8e8]"
            >
              Resume ↗
            </Link>
          </motion.div>

          {/* Footer row */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center gap-6 text-sm">
            {[
              { label: "GitHub",   href: "https://github.com/Sanchitjha" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/sanchit-jha-844b17255" },
              { label: "Email",    href: "mailto:sanchitjha8888@gmail.com" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target="_blank"
                className="group inline-flex items-center gap-1 text-[#888] hover:text-[#e8e8e8] transition-colors"
              >
                {l.label}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}

            <span className="text-[#333]">·</span>

            {[
              { v: "15+", l: "projects" },
              { v: "2+",  l: "years" },
              { v: "10+", l: "APIs" },
            ].map((s) => (
              <span key={s.l} className="text-[#444] text-sm">
                <span className="text-[#888] font-semibold">{s.v}</span>{" "}
                <span className="mono">{s.l}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ zIndex: 3 }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4 text-[#444]" />
        </motion.div>
      </motion.div>
    </section>
  )
}

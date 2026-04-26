"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import LoadingSpinner from "@/components/LoadingSpinner"

const ParticleBackground = dynamic(() => import("@/components/3d/ParticleBackground"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-blue-900" />,
})

const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900" />,
})

const About      = dynamic(() => import("@/components/sections/About"),      { ssr: false })
const Skills     = dynamic(() => import("@/components/sections/Skills"),     { ssr: false })
const Experience = dynamic(() => import("@/components/sections/Experience"), { ssr: false })
const Projects   = dynamic(() => import("@/components/sections/Projects"),   { ssr: false })
const Resume     = dynamic(() => import("@/components/sections/Resume"),     { ssr: false })
const Schedule   = dynamic(() => import("@/components/sections/Schedule"),   { ssr: false })
const Contact    = dynamic(() => import("@/components/sections/Contact"),    { ssr: false })

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CommandPalette from "@/components/CommandPalette"

const Fallback = ({ height = "min-h-96" }) => <div className={height} />

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <CommandPalette />

      <div className="relative z-10">
        <Suspense fallback={<Fallback height="min-h-screen" />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <Resume />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <Schedule />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <Contact />
        </Suspense>
      </div>

      <Footer />
    </main>
  )
}

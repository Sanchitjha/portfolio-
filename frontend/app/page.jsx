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

const About = dynamic(() => import("@/components/sections/About"), { ssr: false })
const Skills = dynamic(() => import("@/components/sections/Skills"), { ssr: false })
const Experience = dynamic(() => import("@/components/sections/Experience"), { ssr: false })
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: false })
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false })

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <ParticleBackground />
      </Suspense>

      <Navbar />

      <div className="relative z-10">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<div className="min-h-96" />}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="min-h-96" />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<div className="min-h-96" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<div className="min-h-96" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<div className="min-h-96" />}>
          <Contact />
        </Suspense>
      </div>

      <Footer />
    </main>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, Calendar } from "lucide-react"
import Link from "next/link"

const navItems = [
  { name: "Home",       href: "#home" },
  { name: "About",      href: "#about" },
  { name: "Work",       href: "#projects" },
  { name: "Resume",     href: "#resume" },
  { name: "Contact",    href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(typeof navigator !== "undefined" && /Mac/.test(navigator.platform))

    const handleScroll = () => {
      setScrolled(window.scrollY > 16)
      const sections = ["home","about","skills","experience","projects","resume","schedule","contact"]
      const current = sections.find((id) => {
        const el = document.getElementById(id)
        if (!el) return false
        const r = el.getBoundingClientRect()
        return r.top <= 100 && r.bottom >= 100
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setIsOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  const openCommandPalette = () => {
    const event = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    window.dispatchEvent(event)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1a1a1a]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link href="#home" className="flex items-center gap-2 group">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-black font-bold text-sm transition-transform group-hover:scale-105">
                SJ
              </div>
              <span className="hidden sm:inline text-primary text-sm font-medium tracking-tight">
                Sanchit Jha
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.href.substring(1) === activeSection ||
                  (item.name === "Work" && activeSection === "projects")
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      isActive
                        ? "text-primary bg-white/5"
                        : "text-secondary hover:text-primary hover:bg-white/[0.03]"
                    }`}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-2">
              <button
                onClick={openCommandPalette}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-secondary border border-default rounded-md hover:bg-white/5 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Search...</span>
                <kbd className="kbd">{isMac ? "⌘" : "Ctrl"}K</kbd>
              </button>

              <button
                onClick={() => handleNavClick("#schedule")}
                className="hidden sm:inline-flex btn-base btn-primary !py-1.5 !px-3 !text-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book a call
              </button>

              {/* Mobile burger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-md text-secondary hover:bg-white/5"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 right-0 w-72 bg-[#0a0a0a] border-l border-[#1a1a1a] z-50 md:hidden pt-20 px-6"
            >
              {[...navItems, { name: "Schedule", href: "#schedule" }].map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left py-3 text-secondary hover:text-primary border-b border-[#1a1a1a]"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => { setIsOpen(false); openCommandPalette() }}
                className="mt-6 w-full btn-base btn-secondary justify-center"
              >
                <Search className="w-4 h-4" /> Open Search
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

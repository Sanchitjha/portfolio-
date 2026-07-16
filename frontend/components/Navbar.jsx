"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const NAV = [
  { label: "Work",     href: "#projects" },
  { label: "About",    href: "#about" },
  { label: "Resume",   href: "#resume" },
  { label: "Contact",  href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const go = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-[#1c1c1c] bg-[#0a0a0a]/90 backdrop-blur-md" : ""
        }`}
      >
        <div className="container-main flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => go("#home")}
            className="font-semibold text-sm tracking-tight text-[#e8e8e8] hover:text-white transition-colors"
          >
            Sanchit Jha
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <button
                key={n.label}
                onClick={() => go(n.href)}
                className="text-sm text-[#888] hover:text-[#e8e8e8] transition-colors"
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => go("#schedule")}
              className="btn btn-white text-xs px-3.5 py-1.5 rounded-md"
            >
              Book a call
            </button>
          </nav>

          {/* Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#888] hover:text-[#e8e8e8] transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
            <motion.nav
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed inset-y-0 right-0 w-64 bg-[#0a0a0a] border-l border-[#1c1c1c] z-50 md:hidden flex flex-col pt-20 px-8 gap-2"
            >
              {[...NAV, { label: "Schedule", href: "#schedule" }].map((n) => (
                <button
                  key={n.label}
                  onClick={() => go(n.href)}
                  className="text-left py-3 text-[#888] hover:text-[#e8e8e8] border-b border-[#1c1c1c] text-sm transition-colors"
                >
                  {n.label}
                </button>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

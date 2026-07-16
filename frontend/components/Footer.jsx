"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const NAV_LINKS = [
  { label: "Work",     href: "#projects" },
  { label: "About",    href: "#about" },
  { label: "Resume",   href: "#resume" },
  { label: "Contact",  href: "#contact" },
]

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/Sanchitjha" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sanchit-jha-844b17255" },
  { label: "Email",    href: "mailto:sanchitjha8888@gmail.com" },
]

export default function Footer() {
  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })

  return (
    <footer className="border-t border-[#1c1c1c]">
      <div className="container-main">

        {/* Main row */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-8">
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => go("#home")}
              className="text-sm font-semibold text-[#e8e8e8] hover:text-white transition-colors"
            >
              Sanchit Jha
            </button>
            <span className="text-[#1c1c1c]">|</span>
            {NAV_LINKS.map((n) => (
              <button
                key={n.label}
                onClick={() => go(n.href)}
                className="text-xs text-[#444] hover:text-[#888] transition-colors mono"
              >
                {n.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target="_blank"
                className="text-xs text-[#444] hover:text-[#888] transition-colors mono"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1c1c1c] py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[#333] text-xs mono">© {new Date().getFullYear()} Sanchit Jha</p>
          <p className="text-[#252525] text-xs mono">Next.js · Three.js · shadcn/ui</p>
        </div>
      </div>
    </footer>
  )
}

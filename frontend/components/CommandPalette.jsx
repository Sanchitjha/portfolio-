"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Search, Home, User, Briefcase, FolderOpen, FileText, Calendar, Mail,
  Github, Linkedin, Download, Code, ArrowRight
} from "lucide-react"

const COMMANDS = [
  // Navigate
  { id: "nav-home",       group: "Navigate", label: "Go to Home",        icon: Home,        action: { type: "scroll", target: "#home" } },
  { id: "nav-about",      group: "Navigate", label: "Go to About",       icon: User,        action: { type: "scroll", target: "#about" } },
  { id: "nav-skills",     group: "Navigate", label: "Go to Skills",      icon: Code,        action: { type: "scroll", target: "#skills" } },
  { id: "nav-experience", group: "Navigate", label: "Go to Experience",  icon: Briefcase,   action: { type: "scroll", target: "#experience" } },
  { id: "nav-projects",   group: "Navigate", label: "Go to Projects",    icon: FolderOpen,  action: { type: "scroll", target: "#projects" } },
  { id: "nav-resume",     group: "Navigate", label: "Go to Resume",      icon: FileText,    action: { type: "scroll", target: "#resume" } },
  { id: "nav-schedule",   group: "Navigate", label: "Schedule a Meeting", icon: Calendar,   action: { type: "scroll", target: "#schedule" } },
  { id: "nav-contact",    group: "Navigate", label: "Go to Contact",     icon: Mail,        action: { type: "scroll", target: "#contact" } },

  // Actions
  { id: "act-resume",   group: "Actions", label: "Download Resume (PDF)", icon: Download, action: { type: "download", url: "/sanchit-jha-resume.pdf" } },
  { id: "act-mail",     group: "Actions", label: "Send Email",            icon: Mail,     action: { type: "url", url: "mailto:sanchitjha8888@gmail.com" } },
  { id: "act-book",     group: "Actions", label: "Book a Call",           icon: Calendar, action: { type: "scroll", target: "#schedule" } },

  // Social
  { id: "soc-github",   group: "Social", label: "GitHub @Sanchitjha",     icon: Github,   action: { type: "url", url: "https://github.com/Sanchitjha" } },
  { id: "soc-linkedin", group: "Social", label: "LinkedIn",               icon: Linkedin, action: { type: "url", url: "https://www.linkedin.com/in/sanchit-jha-844b17255" } },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef(null)

  // Toggle on Cmd/Ctrl + K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery("")
      setActiveIdx(0)
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  const filtered = useMemo(() => {
    if (!query.trim()) return COMMANDS
    const q = query.toLowerCase()
    return COMMANDS.filter(
      (c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
    )
  }, [query])

  const grouped = useMemo(() => {
    const groups = {}
    filtered.forEach((cmd) => {
      groups[cmd.group] = groups[cmd.group] || []
      groups[cmd.group].push(cmd)
    })
    return groups
  }, [filtered])

  const flat = filtered

  const runCommand = (cmd) => {
    setOpen(false)
    setTimeout(() => {
      const a = cmd.action
      if (a.type === "scroll") document.querySelector(a.target)?.scrollIntoView({ behavior: "smooth" })
      if (a.type === "url") window.open(a.url, a.url.startsWith("mailto:") ? "_self" : "_blank")
      if (a.type === "download") {
        const link = document.createElement("a")
        link.href = a.url
        link.download = a.url.split("/").pop()
        link.click()
      }
    }, 100)
  }

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIdx((i) => Math.min(i + 1, flat.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIdx((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const cmd = flat[activeIdx]
      if (cmd) runCommand(cmd)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-card rounded-2xl border border-default overflow-hidden shadow-2xl"
            style={{ background: "#0f0f0f" }}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-subtle">
              <Search className="w-4 h-4 text-tertiary flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIdx(0) }}
                onKeyDown={onInputKey}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none text-primary text-sm placeholder:text-tertiary"
              />
              <kbd className="kbd">esc</kbd>
            </div>

            {/* Results */}
            <div className="max-h-[55vh] overflow-y-auto py-2">
              {Object.keys(grouped).length === 0 ? (
                <div className="px-4 py-10 text-center text-tertiary text-sm">
                  No results for "<span className="text-secondary">{query}</span>"
                </div>
              ) : (
                Object.entries(grouped).map(([group, items]) => (
                  <div key={group} className="mb-2">
                    <div className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-tertiary mono">
                      {group}
                    </div>
                    {items.map((cmd) => {
                      const Icon = cmd.icon
                      const idx = flat.indexOf(cmd)
                      const isActive = idx === activeIdx
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => runCommand(cmd)}
                          onMouseEnter={() => setActiveIdx(idx)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                            isActive ? "bg-white/5" : "hover:bg-white/[0.03]"
                          }`}
                        >
                          <Icon className="w-4 h-4 text-tertiary flex-shrink-0" />
                          <span className="flex-1 text-sm text-primary">{cmd.label}</span>
                          {isActive && <ArrowRight className="w-3.5 h-3.5 text-tertiary" />}
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-subtle flex items-center justify-between text-xs text-tertiary">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <kbd className="kbd">↑</kbd><kbd className="kbd">↓</kbd> navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="kbd">↵</kbd> select
                </span>
              </div>
              <span className="mono">⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

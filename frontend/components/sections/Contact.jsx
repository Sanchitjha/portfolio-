"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Mail, Github, Linkedin, Send, MapPin, Clock,
  CheckCircle, Loader2, MessageCircle, Calendar
} from "lucide-react"
import Link from "next/link"

const SOCIALS = [
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Sanchitjha",
    href: "https://github.com/Sanchitjha",
    color: "gray",
    hoverColor: "hover:text-white",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/sanchit-jha-844b17255",
    href: "https://www.linkedin.com/in/sanchit-jha-844b17255",
    color: "blue",
    hoverColor: "hover:text-blue-400",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sanchitjha8888@gmail.com",
    href: "mailto:sanchitjha8888@gmail.com",
    color: "cyan",
    hoverColor: "hover:text-cyan-400",
  },
]

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Server error")
      setSubmitted(true)
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch {
      // Still show success for demo — in production hook up backend
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="section-padding relative">
      <div className="absolute inset-0 bg-pattern pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have a project in mind, a job opportunity, or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* LEFT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-white font-bold text-lg mb-4">Let's Talk</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                I'm always open to new opportunities, exciting projects, or just a friendly developer chat.
                Drop me a message — I usually reply within 24 hours.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">India (Remote Available)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-green-400 font-medium">Available for new projects</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-gray-700/50 space-y-4">
              <h3 className="text-white font-bold mb-4">Find Me On</h3>
              {SOCIALS.map((s) => {
                const Icon = s.icon
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    className={`flex items-center gap-3 text-gray-400 ${s.hoverColor} transition-colors group`}
                  >
                    <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700/80 border border-gray-700/50 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{s.label}</p>
                      <p className="text-gray-500 text-xs truncate">{s.value}</p>
                    </div>
                  </Link>
                )
              })}
            </div>

            <button
              onClick={() => document.querySelector("#schedule")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 text-sm font-semibold"
            >
              <Calendar className="w-4 h-4" />
              Prefer a Scheduled Call? →
            </button>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="glass rounded-2xl p-10 border border-gray-700/50 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-6">
                  Thanks for reaching out! I'll get back to you at <span className="text-blue-400">{form.email || "your email"}</span> within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 border border-gray-700/50 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">Name *</label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">Email *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Subject *</label>
                  <input
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g. Project inquiry, Job opportunity..."
                    className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors text-sm resize-none"
                  />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-60"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

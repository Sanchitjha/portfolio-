"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowUpRight, Send, Loader2, Check, Mail, Github, Linkedin, Calendar } from "lucide-react"
import Link from "next/link"

const LINKS = [
  { icon: Github,   label: "GitHub",   sub: "github.com/Sanchitjha",                href: "https://github.com/Sanchitjha" },
  { icon: Linkedin, label: "LinkedIn", sub: "sanchit-jha-844b17255",                href: "https://www.linkedin.com/in/sanchit-jha-844b17255" },
  { icon: Mail,     label: "Email",    sub: "sanchitjha8888@gmail.com",              href: "mailto:sanchitjha8888@gmail.com" },
]

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [form,       setForm]       = useState({ name:"", email:"", subject:"", message:"" })
  const [submitting, setSubmitting] = useState(false)
  const [done,       setDone]       = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
    } catch {}
    setSubmitting(false)
    setDone(true)
  }

  return (
    <section id="contact" ref={ref} className="section-padding">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="section-label mb-3">Contact</span>
          <h2 className="heading-display text-4xl lg:text-5xl mt-3">Get in touch.</h2>
          <p className="text-secondary mt-3 max-w-md">
            Open to new projects, collaborations, and opportunities. I reply within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* LEFT — Links */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-3"
          >
            {LINKS.map((l) => {
              const Icon = l.icon
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  className="card rounded-xl p-4 flex items-center justify-between group block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-primary text-sm font-medium">{l.label}</p>
                      <p className="text-tertiary text-xs mono truncate max-w-[160px]">{l.sub}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-tertiary group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </Link>
              )
            })}

            {/* Schedule CTA */}
            <button
              onClick={() => document.querySelector("#schedule")?.scrollIntoView({ behavior: "smooth" })}
              className="card rounded-xl p-4 flex items-center justify-between w-full text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-primary text-sm font-medium">Book a call</p>
                  <p className="text-tertiary text-xs mono">30 min · Google Meet</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-tertiary group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Availability note */}
            <div className="card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="dot-pulse" />
                <span className="text-primary text-sm font-medium">Available</span>
              </div>
              <p className="text-tertiary text-xs mono">
                Open to full-time, freelance &amp; contract work.<br />
                Response time: &lt; 24 hours.
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            {done ? (
              <div className="card rounded-2xl p-10 h-full flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Message sent.</h3>
                <p className="text-secondary text-sm mb-6">
                  I'll get back to you at{" "}
                  <span className="text-primary mono">{form.email}</span> within 24 h.
                </p>
                <button
                  onClick={() => { setDone(false); setForm({name:"",email:"",subject:"",message:""}) }}
                  className="btn-base btn-secondary"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card rounded-2xl p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-tertiary mono block mb-1.5">Name *</label>
                    <input
                      name="name" required value={form.name} onChange={handleChange}
                      placeholder="Your name"
                      className="input-base"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-tertiary mono block mb-1.5">Email *</label>
                    <input
                      name="email" type="email" required value={form.email} onChange={handleChange}
                      placeholder="you@example.com"
                      className="input-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-tertiary mono block mb-1.5">Subject *</label>
                  <input
                    name="subject" required value={form.subject} onChange={handleChange}
                    placeholder="e.g. Project inquiry, job opportunity…"
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="text-xs text-tertiary mono block mb-1.5">Message *</label>
                  <textarea
                    name="message" required rows={5} value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project, idea, or opportunity…"
                    className="input-base resize-none"
                  />
                </div>
                <button
                  type="submit" disabled={submitting}
                  className="w-full btn-base btn-primary justify-center disabled:opacity-60"
                >
                  {submitting
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                    : <><Send className="w-4 h-4" /> Send message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

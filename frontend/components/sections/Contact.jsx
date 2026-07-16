"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowUpRight, Send, Loader2, Check } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [form,       setForm]       = useState({ name: "", email: "", message: "" })
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
    <section id="contact" ref={ref} className="section-gap">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="section-tag">Contact</span>

          {/* Giant email focal point */}
          <div className="mt-6 mb-14">
            <Link
              href="mailto:sanchitjha8888@gmail.com"
              className="group inline-flex items-start gap-3 text-[clamp(1.6rem,4vw,2.8rem)] font-bold display text-[#e8e8e8] hover:text-white transition-colors leading-tight"
            >
              <span>
                sanchitjha8888<br />@gmail.com
              </span>
              <ArrowUpRight className="w-6 h-6 mt-2 text-[#444] group-hover:text-[#888] transition-colors shrink-0" />
            </Link>
            <p className="text-[#444] text-sm mt-4 mono">
              Available · full-time · freelance · contract · Reply within 24 h.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16">

            {/* Form */}
            <div className="lg:col-span-7">
              {done ? (
                <div className="py-12">
                  <Check className="w-5 h-5 text-[#888] mb-4" />
                  <p className="text-[#888] text-sm mb-1">Message sent.</p>
                  <p className="text-[#444] text-xs mono">
                    I'll reply to <span className="text-[#666]">{form.email}</span> within 24 h.
                  </p>
                  <button
                    onClick={() => { setDone(false); setForm({ name: "", email: "", message: "" }) }}
                    className="mt-6 text-xs text-[#444] hover:text-[#888] transition-colors underline"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div>
                    <label className="label block mb-2">Name *</label>
                    <input
                      name="name" required value={form.name} onChange={handleChange}
                      placeholder="Your name" className="input"
                    />
                  </div>
                  <div>
                    <label className="label block mb-2">Email *</label>
                    <input
                      name="email" type="email" required value={form.email} onChange={handleChange}
                      placeholder="you@example.com" className="input"
                    />
                  </div>
                  <div>
                    <label className="label block mb-2">Message *</label>
                    <textarea
                      name="message" required rows={4} value={form.message} onChange={handleChange}
                      placeholder="Tell me about your project…" className="input"
                    />
                  </div>
                  <button type="submit" disabled={submitting} className="btn btn-white disabled:opacity-50">
                    {submitting
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                      : <><Send className="w-4 h-4" /> Send message</>}
                  </button>
                </form>
              )}
            </div>

            {/* Links sidebar */}
            <div className="lg:col-span-5">
              <div className="divide-y divide-[#1c1c1c]">
                {[
                  { label: "GitHub",   sub: "github.com/Sanchitjha",  href: "https://github.com/Sanchitjha",                         external: true },
                  { label: "LinkedIn", sub: "sanchit-jha-844b17255",  href: "https://www.linkedin.com/in/sanchit-jha-844b17255",      external: true },
                  { label: "Resume",   sub: "Download PDF",            href: "/sanchit-jha-resume.pdf",                               external: true },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    className="group flex items-center justify-between py-4 text-sm text-[#888] hover:text-[#e8e8e8] transition-colors"
                  >
                    <div>
                      <span className="font-medium">{l.label}</span>
                      <span className="text-[#444] text-xs mono block">{l.sub}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#333] group-hover:text-[#666] transition-colors" />
                  </Link>
                ))}

                <button
                  onClick={() => document.querySelector("#schedule")?.scrollIntoView({ behavior: "smooth" })}
                  className="group flex items-center justify-between w-full py-4 text-sm text-[#888] hover:text-[#e8e8e8] transition-colors text-left"
                >
                  <div>
                    <span className="font-medium">Book a call</span>
                    <span className="text-[#444] text-xs mono block">30 min · Google Meet</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#333] group-hover:text-[#666] transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

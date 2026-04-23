"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Mail, Github, Linkedin, Send } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mailto fallback — replace with your API endpoint if needed
    window.location.href = `mailto:sanchitjha8888@gmail.com?subject=Portfolio contact from ${form.name}&body=${form.message}`
    setSent(true)
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Get In Touch</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or just want to say hi? I'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6 text-white">Contact Info</h3>
                <div className="space-y-4">
                  <Link href="mailto:sanchitjha8888@gmail.com" className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
                    <div className="p-2 bg-blue-500/10 rounded-lg"><Mail className="h-5 w-5 text-blue-400" /></div>
                    <span>sanchitjha8888@gmail.com</span>
                  </Link>
                  <Link href="https://github.com/Sanchitjha" target="_blank" className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
                    <div className="p-2 bg-blue-500/10 rounded-lg"><Github className="h-5 w-5 text-blue-400" /></div>
                    <span>github.com/Sanchitjha</span>
                  </Link>
                  <Link href="https://www.linkedin.com/in/sanchit-jha-844b17255" target="_blank" className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
                    <div className="p-2 bg-blue-500/10 rounded-lg"><Linkedin className="h-5 w-5 text-blue-400" /></div>
                    <span>linkedin.com/in/sanchit-jha</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="glass rounded-2xl p-6">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
                  <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="form-input w-full rounded-lg px-4 py-3 outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="form-input w-full rounded-lg px-4 py-3 outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="form-input w-full rounded-lg px-4 py-3 outline-none resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full inline-flex items-center justify-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

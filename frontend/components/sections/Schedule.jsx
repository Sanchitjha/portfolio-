"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Video, Phone, MessageSquare, ChevronLeft, ChevronRight, Send, Loader2, Check } from "lucide-react"

const TYPES = [
  { id: "video", icon: Video,         title: "Video call",    sub: "Google Meet / Zoom", duration: "30 min" },
  { id: "phone", icon: Phone,         title: "Phone call",    sub: "Direct call",        duration: "20 min" },
  { id: "async", icon: MessageSquare, title: "Async message", sub: "Email / Chat",       duration: "Flexible" },
]

const SLOTS  = ["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00"]
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const DAYS   = ["S","M","T","W","T","F","S"]

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate() }
function getFirstDay(y, m)    { return new Date(y, m, 1).getDay() }

export default function Schedule() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const now = new Date()

  const [step,       setStep]       = useState(1)
  const [type,       setType]       = useState(null)
  const [month,      setMonth]      = useState(now.getMonth())
  const [year,       setYear]       = useState(now.getFullYear())
  const [day,        setDay]        = useState(null)
  const [time,       setTime]       = useState(null)
  const [form,       setForm]       = useState({ name: "", email: "", topic: "", note: "" })
  const [submitting, setSubmitting] = useState(false)
  const [done,       setDone]       = useState(false)

  const prevMonth = () => month === 0  ? (setMonth(11), setYear(y => y - 1)) : setMonth(m => m - 1)
  const nextMonth = () => month === 11 ? (setMonth(0),  setYear(y => y + 1)) : setMonth(m => m + 1)
  const isPast    = (d) => { const dt = new Date(year, month, d); dt.setHours(0,0,0,0); const t = new Date(); t.setHours(0,0,0,0); return dt < t }
  const isWeekend = (d) => { const w = new Date(year, month, d).getDay(); return w === 0 || w === 6 }
  const fmtDate   = (d) => d ? new Date(year, month, d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : ""

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitting(false)
    setDone(true)
  }

  const reset = () => { setDone(false); setStep(1); setType(null); setDay(null); setTime(null); setForm({ name: "", email: "", topic: "", note: "" }) }

  return (
    <section id="schedule" ref={ref} className="section-gap">
      <div className="container-main" style={{ maxWidth: 700 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="section-tag">Schedule</span>

          {/* Step indicator */}
          {!done && (
            <div className="flex items-center gap-4 mt-6 mb-10">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <span className={`text-xs mono ${step === s ? "text-[#e8e8e8]" : step > s ? "text-[#444]" : "text-[#2a2a2a]"}`}>
                    {step > s ? "✓" : `0${s}`}
                  </span>
                  <span className={`text-xs mono hidden sm:block ${step >= s ? "text-[#666]" : "text-[#2a2a2a]"}`}>
                    {s === 1 ? "Type" : s === 2 ? "Date & time" : "Details"}
                  </span>
                  {s < 3 && <span className="text-[#2a2a2a] text-xs">—</span>}
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* SUCCESS */}
            {done && (
              <motion.div
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center"
              >
                <Check className="w-5 h-5 text-[#888] mx-auto mb-6" />
                <p className="text-[#e8e8e8] font-medium mb-2">Request sent.</p>
                <p className="text-[#666] text-sm">
                  {TYPES.find(t => t.id === type)?.title} · {fmtDate(day)} · {time}
                </p>
                <p className="text-[#444] text-xs mono mt-2 mb-8">Confirmation → {form.email}</p>
                <button onClick={reset} className="btn btn-outline">Schedule another</button>
              </motion.div>
            )}

            {/* STEP 1 — Type */}
            {!done && step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="divide-y divide-[#1c1c1c]">
                  {TYPES.map((t) => {
                    const Icon = t.icon
                    return (
                      <button
                        key={t.id}
                        onClick={() => setType(t.id)}
                        className={`w-full flex items-center justify-between py-4 text-left transition-colors ${
                          type === t.id ? "text-[#e8e8e8]" : "text-[#666] hover:text-[#888]"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <Icon className="w-4 h-4 shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{t.title}</p>
                            <p className="text-xs mono text-[#444]">{t.sub}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs mono text-[#444]">
                          {t.duration}
                          {type === t.id && <Check className="w-3.5 h-3.5 text-[#888]" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
                <div className="flex justify-end mt-8">
                  <button disabled={!type} onClick={() => setStep(2)} className="btn btn-white disabled:opacity-30">
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Calendar + Time */}
            {!done && step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="grid md:grid-cols-2 gap-10 mb-8">

                  {/* Calendar */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <button onClick={prevMonth} className="text-[#444] hover:text-[#888] transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-[#888] text-sm mono">{MONTHS[month]} {year}</span>
                      <button onClick={nextMonth} className="text-[#444] hover:text-[#888] transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {DAYS.map((d, i) => (
                        <div key={i} className="text-center text-[10px] text-[#333] mono py-1">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array(getFirstDay(year, month)).fill(null).map((_, i) => <div key={`e${i}`} />)}
                      {Array(getDaysInMonth(year, month)).fill(null).map((_, i) => {
                        const d = i + 1
                        const past = isPast(d), wknd = isWeekend(d), sel = day === d
                        return (
                          <button
                            key={d}
                            disabled={past || wknd}
                            onClick={() => { setDay(d); setTime(null) }}
                            className={`aspect-square rounded text-xs font-medium transition-all ${
                              sel
                                ? "bg-white text-black"
                                : past || wknd
                                ? "text-[#222] cursor-not-allowed"
                                : "text-[#666] hover:text-[#e8e8e8]"
                            }`}
                          >
                            {d}
                          </button>
                        )
                      })}
                    </div>
                    <p className="text-[10px] text-[#333] mono mt-3 text-center">Mon–Fri · IST UTC+5:30</p>
                  </div>

                  {/* Time slots */}
                  <div>
                    <p className="text-xs text-[#444] mono uppercase tracking-wider mb-4">
                      {day ? fmtDate(day) : "Select a date first"}
                    </p>
                    {day ? (
                      <div className="grid grid-cols-3 gap-2">
                        {SLOTS.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setTime(slot)}
                            className={`py-2 text-xs mono font-medium border transition-all rounded-sm ${
                              time === slot
                                ? "bg-white text-black border-white"
                                : "border-[#1c1c1c] text-[#666] hover:border-[#333] hover:text-[#888]"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-32 text-[#333] text-sm">← pick a date</div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="btn btn-ghost text-[#444]">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button disabled={!day || !time} onClick={() => setStep(3)} className="btn btn-white disabled:opacity-30">
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Details */}
            {!done && step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-[#444] text-xs mono mb-8">
                  {TYPES.find(t => t.id === type)?.title} · {fmtDate(day)} · {time} IST
                </p>
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid sm:grid-cols-2 gap-7">
                    <div>
                      <label className="label block mb-2">Name *</label>
                      <input required value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name" className="input" />
                    </div>
                    <div>
                      <label className="label block mb-2">Email *</label>
                      <input required type="email" value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com" className="input" />
                    </div>
                  </div>
                  <div>
                    <label className="label block mb-2">Topic *</label>
                    <input required value={form.topic}
                      onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
                      placeholder="e.g. Project collaboration, job opportunity…" className="input" />
                  </div>
                  <div>
                    <label className="label block mb-2">Notes</label>
                    <textarea rows={3} value={form.note}
                      onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                      placeholder="Any context or links that'd help…" className="input" />
                  </div>
                  <div className="flex justify-between pt-2">
                    <button type="button" onClick={() => setStep(2)} className="btn btn-ghost text-[#444]">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="submit" disabled={submitting} className="btn btn-white disabled:opacity-50">
                      {submitting
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                        : <><Send className="w-4 h-4" /> Confirm</>}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

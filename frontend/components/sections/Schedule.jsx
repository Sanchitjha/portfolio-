"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Video, Phone, MessageSquare, ChevronLeft, ChevronRight, Send, Loader2, Check } from "lucide-react"

const TYPES = [
  { id: "video", icon: Video,          title: "Video call",   sub: "Google Meet / Zoom", duration: "30 min" },
  { id: "phone", icon: Phone,          title: "Phone call",   sub: "Direct call",        duration: "20 min" },
  { id: "async", icon: MessageSquare,  title: "Async message",sub: "Email / Chat",       duration: "Flexible" },
]

const SLOTS = ["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00"]
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const DAYS   = ["S","M","T","W","T","F","S"]

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate() }
function getFirstDay(y, m)    { return new Date(y, m, 1).getDay() }

export default function Schedule() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const now = new Date()

  const [step,         setStep]         = useState(1)
  const [type,         setType]         = useState(null)
  const [month,        setMonth]        = useState(now.getMonth())
  const [year,         setYear]         = useState(now.getFullYear())
  const [day,          setDay]          = useState(null)
  const [time,         setTime]         = useState(null)
  const [form,         setForm]         = useState({ name:"", email:"", topic:"", note:"" })
  const [submitting,   setSubmitting]   = useState(false)
  const [done,         setDone]         = useState(false)

  const prevMonth = () => month === 0 ? (setMonth(11), setYear(y => y-1)) : setMonth(m => m-1)
  const nextMonth = () => month === 11? (setMonth(0),  setYear(y => y+1)) : setMonth(m => m+1)

  const isPast    = (d) => { const dt = new Date(year,month,d); dt.setHours(0,0,0,0); const t=new Date(); t.setHours(0,0,0,0); return dt<t }
  const isWeekend = (d) => { const w = new Date(year,month,d).getDay(); return w===0||w===6 }

  const fmtDate = (d) => d ? new Date(year,month,d).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}) : ""

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitting(false)
    setDone(true)
  }

  const reset = () => { setDone(false); setStep(1); setType(null); setDay(null); setTime(null); setForm({name:"",email:"",topic:"",note:""}) }

  return (
    <section id="schedule" ref={ref} className="section-padding">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="section-label mb-3">Availability</span>
          <h2 className="heading-display text-4xl lg:text-5xl mt-3">Book a meeting.</h2>
          <p className="text-secondary mt-3 max-w-md">
            Pick a time that works — I respond within a few hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Step indicator */}
          {!done && (
            <div className="flex items-center gap-3 mb-10">
              {[1,2,3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border transition-all ${
                    step > s
                      ? "bg-white text-black border-white"
                      : step === s
                      ? "border-white text-primary"
                      : "border-[#2a2a2a] text-tertiary"
                  }`}>
                    {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                  </div>
                  <span className={`text-xs mono hidden sm:block ${step >= s ? "text-secondary" : "text-tertiary"}`}>
                    {s===1?"Type":s===2?"Date & time":"Details"}
                  </span>
                  {s < 3 && <div className={`w-8 h-px ${step > s ? "bg-white/30" : "bg-[#1f1f1f]"}`} />}
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* SUCCESS */}
            {done && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card rounded-2xl p-10 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Request sent.</h3>
                <p className="text-secondary text-sm mb-1">
                  <span className="text-primary">{TYPES.find(t=>t.id===type)?.title}</span> · {fmtDate(day)} · {time}
                </p>
                <p className="text-tertiary text-xs mono mb-8">Confirmation → {form.email}</p>
                <button onClick={reset} className="btn-base btn-secondary">Schedule another</button>
              </motion.div>
            )}

            {/* STEP 1 — Type */}
            {!done && step === 1 && (
              <motion.div key="s1" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}>
                <div className="grid sm:grid-cols-3 gap-3 mb-8">
                  {TYPES.map((t) => {
                    const Icon = t.icon
                    return (
                      <button
                        key={t.id}
                        onClick={() => setType(t.id)}
                        className={`card rounded-xl p-5 text-left transition-all ${
                          type === t.id ? "border-white/30 bg-white/5" : "hover:border-[#2a2a2a]"
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-3 ${type === t.id ? "text-primary" : "text-tertiary"}`} />
                        <p className="text-primary text-sm font-semibold">{t.title}</p>
                        <p className="text-tertiary text-xs mono mt-1">{t.sub} · {t.duration}</p>
                        {type === t.id && (
                          <div className="mt-3 flex items-center gap-1 text-xs mono text-secondary">
                            <Check className="w-3 h-3" /> selected
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                <div className="flex justify-end">
                  <button disabled={!type} onClick={() => setStep(2)} className="btn-base btn-primary disabled:opacity-30">
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Calendar + Time */}
            {!done && step === 2 && (
              <motion.div key="s2" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}>
                <div className="grid md:grid-cols-2 gap-4 mb-8">

                  {/* Calendar */}
                  <div className="card rounded-xl p-5">
                    <div className="flex items-center justify-between mb-5">
                      <button onClick={prevMonth} className="p-1.5 rounded-md hover:bg-white/5 text-secondary transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-primary text-sm font-medium mono">
                        {MONTHS[month]} {year}
                      </span>
                      <button onClick={nextMonth} className="p-1.5 rounded-md hover:bg-white/5 text-secondary transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {DAYS.map((d,i) => (
                        <div key={i} className="text-center text-[10px] text-tertiary mono py-1">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array(getFirstDay(year,month)).fill(null).map((_,i) => <div key={`e${i}`} />)}
                      {Array(getDaysInMonth(year,month)).fill(null).map((_,i) => {
                        const d = i+1
                        const past = isPast(d), wknd = isWeekend(d), sel = day===d
                        return (
                          <button
                            key={d}
                            disabled={past||wknd}
                            onClick={() => { setDay(d); setTime(null) }}
                            className={`aspect-square rounded-md text-xs font-medium transition-all ${
                              sel
                                ? "bg-white text-black"
                                : past||wknd
                                ? "text-[#2a2a2a] cursor-not-allowed"
                                : "text-secondary hover:bg-white/5 hover:text-primary"
                            }`}
                          >
                            {d}
                          </button>
                        )
                      })}
                    </div>
                    <p className="text-[10px] text-tertiary mono mt-3 text-center">
                      Mon–Fri · IST UTC+5:30
                    </p>
                  </div>

                  {/* Time slots */}
                  <div className="card rounded-xl p-5">
                    <p className="text-xs text-tertiary mono uppercase tracking-wider mb-4">
                      {day ? fmtDate(day) : "Select a date"}
                    </p>
                    {day ? (
                      <div className="grid grid-cols-3 gap-2">
                        {SLOTS.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setTime(slot)}
                            className={`py-2 px-2 rounded-md text-xs mono font-medium border transition-all ${
                              time===slot
                                ? "bg-white text-black border-white"
                                : "border-[#1f1f1f] text-secondary hover:border-[#2a2a2a] hover:text-primary"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="h-40 flex items-center justify-center text-tertiary text-sm">
                        ← pick a date
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="btn-base btn-ghost">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    disabled={!day || !time}
                    onClick={() => setStep(3)}
                    className="btn-base btn-primary disabled:opacity-30"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Details */}
            {!done && step === 3 && (
              <motion.div key="s3" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}>
                {/* Summary strip */}
                <div className="card rounded-xl px-5 py-3 mb-5 flex flex-wrap gap-4 text-xs mono text-secondary">
                  <span>{TYPES.find(t=>t.id===type)?.title}</span>
                  <span className="text-tertiary">·</span>
                  <span>{fmtDate(day)}</span>
                  <span className="text-tertiary">·</span>
                  <span>{time} IST</span>
                </div>

                <form onSubmit={handleSubmit} className="card rounded-xl p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-tertiary mono block mb-1.5">Name *</label>
                      <input required value={form.name}
                        onChange={e => setForm(f=>({...f,name:e.target.value}))}
                        placeholder="Your name"
                        className="input-base" />
                    </div>
                    <div>
                      <label className="text-xs text-tertiary mono block mb-1.5">Email *</label>
                      <input required type="email" value={form.email}
                        onChange={e => setForm(f=>({...f,email:e.target.value}))}
                        placeholder="you@example.com"
                        className="input-base" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-tertiary mono block mb-1.5">Topic *</label>
                    <input required value={form.topic}
                      onChange={e => setForm(f=>({...f,topic:e.target.value}))}
                      placeholder="e.g. Project collaboration, job opportunity..."
                      className="input-base" />
                  </div>
                  <div>
                    <label className="text-xs text-tertiary mono block mb-1.5">Notes</label>
                    <textarea rows={3} value={form.note}
                      onChange={e => setForm(f=>({...f,note:e.target.value}))}
                      placeholder="Any context or links that'd help..."
                      className="input-base resize-none" />
                  </div>

                  <div className="flex justify-between pt-2">
                    <button type="button" onClick={() => setStep(2)} className="btn-base btn-ghost">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="submit" disabled={submitting} className="btn-base btn-primary disabled:opacity-60">
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

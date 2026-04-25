"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Calendar, Clock, Video, Phone, MessageSquare,
  CheckCircle, ChevronLeft, ChevronRight, Send, Loader2
} from "lucide-react"

const MEETING_TYPES = [
  {
    id: "video",
    icon: Video,
    title: "Video Call",
    subtitle: "Google Meet / Zoom",
    duration: "30 min",
    color: "blue",
    desc: "Face-to-face discussion about your project or collaboration opportunity.",
  },
  {
    id: "phone",
    icon: Phone,
    title: "Phone Call",
    subtitle: "Direct call",
    duration: "20 min",
    color: "green",
    desc: "Quick voice call for a brief intro or follow-up discussion.",
  },
  {
    id: "chat",
    icon: MessageSquare,
    title: "Chat / Email",
    subtitle: "Async conversation",
    duration: "Flexible",
    color: "purple",
    desc: "Prefer async? Send a detailed message and I'll reply within 24 hours.",
  },
]

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM",
]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

export default function Schedule() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const today = new Date()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
    setSelectedDate(null)
  }
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
    setSelectedDate(null)
  }

  const isPast = (day) => {
    const d = new Date(currentYear, currentMonth, day)
    d.setHours(0,0,0,0)
    const t = new Date(); t.setHours(0,0,0,0)
    return d < t
  }
  const isWeekend = (day) => {
    const d = new Date(currentYear, currentMonth, day).getDay()
    return d === 0 || d === 6
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  const formatDate = (d) => d
    ? new Date(currentYear, currentMonth, d).toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric"
      })
    : ""

  return (
    <section id="schedule" ref={ref} className="section-padding relative">
      <div className="absolute inset-0 bg-pattern pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Let's Connect
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Schedule a <span className="gradient-text">Meeting</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Book a call, video meeting, or send a detailed message. I'm available for new projects,
            collaborations, and opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Stepper */}
          {!submitted && (
            <div className="flex items-center justify-center mb-10 gap-3">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step >= s
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                      : "bg-gray-800 text-gray-500 border border-gray-700"
                  }`}>
                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  <span className={`text-sm hidden sm:block ${step >= s ? "text-white" : "text-gray-500"}`}>
                    {s === 1 ? "Type" : s === 2 ? "Date & Time" : "Details"}
                  </span>
                  {s < 3 && <div className={`w-12 h-px ${step > s ? "bg-blue-500" : "bg-gray-700"}`} />}
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* SUCCESS */}
            {submitted && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl p-12 border border-gray-700/50 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Meeting Requested!</h3>
                <p className="text-gray-400 mb-2">
                  Thanks <span className="text-white font-semibold">{form.name}</span>! I'll confirm your{" "}
                  <span className="text-blue-400 font-semibold">
                    {MEETING_TYPES.find(t => t.id === selectedType)?.title}
                  </span>{" "}
                  on <span className="text-white">{formatDate(selectedDate)}</span> at{" "}
                  <span className="text-white">{selectedTime}</span>.
                </p>
                <p className="text-gray-500 text-sm mb-8">
                  Confirmation will be sent to <span className="text-blue-400">{form.email}</span> within a few hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setStep(1); setSelectedType(null); setSelectedDate(null); setSelectedTime(null); setForm({ name:"",email:"",topic:"",message:"" }) }}
                  className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all"
                >
                  Schedule Another
                </button>
              </motion.div>
            )}

            {/* STEP 1 — Meeting Type */}
            {!submitted && step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                <h3 className="text-white font-bold text-xl mb-6 text-center">Choose a Meeting Type</h3>
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {MEETING_TYPES.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`glass rounded-2xl p-6 border text-left transition-all duration-300 ${
                          selectedType === type.id
                            ? `border-${type.color}-500/60 bg-${type.color}-500/10 shadow-lg shadow-${type.color}-500/20`
                            : "border-gray-700/50 hover:border-gray-600"
                        }`}
                      >
                        <div className={`p-3 rounded-xl bg-${type.color}-500/10 text-${type.color}-400 w-fit mb-4`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h4 className="text-white font-bold mb-1">{type.title}</h4>
                        <p className="text-gray-500 text-xs mb-2">{type.subtitle} · {type.duration}</p>
                        <p className="text-gray-400 text-sm">{type.desc}</p>
                        {selectedType === type.id && (
                          <div className={`mt-3 flex items-center gap-1 text-${type.color}-400 text-xs font-semibold`}>
                            <CheckCircle className="w-3.5 h-3.5" /> Selected
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                <div className="flex justify-end">
                  <button
                    disabled={!selectedType}
                    onClick={() => setStep(2)}
                    className="px-7 py-3 rounded-xl bg-blue-500 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25"
                  >
                    Next: Pick a Date →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Calendar + Time */}
            {!submitted && step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Calendar */}
                  <div className="glass rounded-2xl p-5 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <h4 className="text-white font-bold">{MONTHS[currentMonth]} {currentYear}</h4>
                      <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {DAYS.map(d => (
                        <div key={d} className="text-center text-xs text-gray-500 font-medium py-1">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
                      {Array(daysInMonth).fill(null).map((_, i) => {
                        const day = i + 1
                        const past = isPast(day)
                        const weekend = isWeekend(day)
                        const sel = selectedDate === day
                        return (
                          <button
                            key={day}
                            disabled={past || weekend}
                            onClick={() => setSelectedDate(day)}
                            className={`aspect-square rounded-lg text-sm font-medium transition-all duration-200 ${
                              sel
                                ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                                : past || weekend
                                ? "text-gray-700 cursor-not-allowed"
                                : "text-gray-300 hover:bg-gray-700/60"
                            }`}
                          >
                            {day}
                          </button>
                        )
                      })}
                    </div>
                    <p className="text-gray-600 text-xs mt-3 text-center">Weekends unavailable · IST (UTC+5:30)</p>
                  </div>

                  {/* Time Slots */}
                  <div className="glass rounded-2xl p-5 border border-gray-700/50">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <h4 className="text-white font-bold">Available Times</h4>
                    </div>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
                              selectedTime === slot
                                ? "bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-500/25"
                                : "border-gray-700/50 text-gray-400 hover:border-blue-500/40 hover:text-white"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-40 text-gray-600 text-sm">
                        ← Pick a date first
                      </div>
                    )}
                    {selectedDate && selectedTime && (
                      <div className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <p className="text-blue-300 text-sm font-medium">
                          {formatDate(selectedDate)} · {selectedTime}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-700 text-gray-400 hover:bg-gray-800 transition-all">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep(3)}
                    className="px-7 py-3 rounded-xl bg-blue-500 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25"
                  >
                    Next: Your Details →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Details Form */}
            {!submitted && step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                <div className="glass rounded-2xl p-6 border border-gray-700/50 mb-4">
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                      {(() => { const t = MEETING_TYPES.find(t => t.id === selectedType); if (!t) return null; const Icon = t.icon; return <><Icon className="w-4 h-4" />{t.title}</> })()}
                    </span>
                    <span className="text-gray-600">·</span>
                    <span className="flex items-center gap-1.5 text-gray-300">
                      <Calendar className="w-4 h-4" />{formatDate(selectedDate)}
                    </span>
                    <span className="text-gray-600">·</span>
                    <span className="flex items-center gap-1.5 text-gray-300">
                      <Clock className="w-4 h-4" />{selectedTime}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 border border-gray-700/50 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-1.5 block">Your Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-1.5 block">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="john@example.com"
                        className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">Meeting Topic *</label>
                    <input
                      required
                      value={form.topic}
                      onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
                      placeholder="e.g. Project collaboration, Job opportunity, Freelance work..."
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">Additional Notes</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Any context, links, or details that would help make our meeting productive..."
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors text-sm resize-none"
                    />
                  </div>

                  <div className="flex justify-between pt-2">
                    <button type="button" onClick={() => setStep(2)} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-700 text-gray-400 hover:bg-gray-800 transition-all">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-60 transition-all shadow-lg shadow-blue-500/25"
                    >
                      {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Scheduling...</> : <><Send className="w-4 h-4" /> Confirm Meeting</>}
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

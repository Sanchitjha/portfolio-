"use client"

import { useEffect, useRef } from "react"

const COLORS = [
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // purple
  "#10b981", // emerald
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#f97316", // orange
]

function createParticle(canvas) {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    w: 2 + Math.random() * 3,
    h: 7 + Math.random() * 10,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.025,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -0.15 - Math.random() * 0.35,
    opacity: 0.15 + Math.random() * 0.55,
    opacityDelta: (Math.random() - 0.5) * 0.003,
    color,
  }
}

export default function FloatingParticles({ count = 120 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles = Array.from({ length: count }, () => createParticle(canvas))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        // update
        p.x        += p.vx
        p.y        += p.vy
        p.rotation += p.rotationSpeed
        p.opacity  += p.opacityDelta
        if (p.opacity <= 0.08 || p.opacity >= 0.7) p.opacityDelta *= -1

        // wrap vertically
        if (p.y + p.h < 0)          p.y = canvas.height + p.h
        if (p.y > canvas.height + p.h) p.y = -p.h
        if (p.x < -10)              p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        // draw dash
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle   = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur  = 4
        ctx.beginPath()
        ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, p.w / 2)
        ctx.fill()
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.85 }}
    />
  )
}

import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { clampLen, isEmail, nonEmpty } from "../utils/validate.js"
import rateLimit from "express-rate-limit"

const router = Router()

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
})

// POST /api/auth/register
router.post("/register", authLimiter, async (req, res) => {
  try {
    const { name, email, password } = req.body || {}
    if (!clampLen(name, 2, 80)) return res.status(400).json({ error: "Name must be 2-80 chars" })
    if (!isEmail(email)) return res.status(400).json({ error: "Invalid email" })
    if (!clampLen(password, 6, 200)) return res.status(400).json({ error: "Password must be 6+ chars" })

    const exists = await User.findOne({ email: email.toLowerCase().trim() })
    if (exists) return res.status(409).json({ error: "Email already in use" })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name: name.trim(), email: email.toLowerCase().trim(), passwordHash })

    const token = signToken(user.id)
    return res.status(201).json({ token, user: user.toPublic() })
  } catch (e) {
    return res.status(500).json({ error: "Failed to register" })
  }
})

// POST /api/auth/login
router.post("/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!isEmail(email) || !nonEmpty(password)) {
      return res.status(400).json({ error: "Invalid credentials" })
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user) return res.status(401).json({ error: "Invalid credentials" })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: "Invalid credentials" })
    const token = signToken(user.id)
    return res.json({ token, user: user.toPublic() })
  } catch (e) {
    return res.status(500).json({ error: "Failed to login" })
  }
})

function signToken(userId) {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error("JWT_SECRET not set")
  return jwt.sign({ sub: userId }, secret, { expiresIn: "7d" })
}

export default router

import { Router } from "express"
import { requireAuth } from "../middleware/auth.js"
import { clampLen, isEmail } from "../utils/validate.js"

const router = Router()

// GET /api/users/me
router.get("/me", requireAuth, async (req, res) => {
  return res.json({ user: req.user.toPublic() })
})

// PATCH /api/users/me
// Allows updating name, email, phone, and image (URL)
router.patch("/me", requireAuth, async (req, res) => {
  try {
    const { name, email, phone, image } = req.body || {}

    if (name !== undefined && !clampLen(name, 2, 80)) {
      return res.status(400).json({ error: "Name must be 2-80 chars" })
    }
    if (email !== undefined && !isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" })
    }
    if (phone !== undefined && String(phone).length > 40) {
      return res.status(400).json({ error: "Phone too long" })
    }
    if (image !== undefined && String(image).length > 1000) {
      return res.status(400).json({ error: "Image URL too long" })
    }

    if (name !== undefined) req.user.name = name.trim()
    if (email !== undefined) req.user.email = String(email).toLowerCase().trim()
    if (phone !== undefined) req.user.phone = String(phone).trim()
    if (image !== undefined) req.user.image = String(image).trim()

    await req.user.save()
    return res.json({ user: req.user.toPublic() })
  } catch (e) {
    return res.status(500).json({ error: "Failed to update profile" })
  }
})

export default router

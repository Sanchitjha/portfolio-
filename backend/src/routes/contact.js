import express from "express"
import { body, validationResult } from "express-validator"
import { rateLimiter } from "../middleware/rateLimiter.js"
import Contact from "../models/Contact.js"

const router = express.Router()

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
router.post("/", 
  rateLimiter,
  [
    body("name")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("subject")
      .trim()
      .isLength({ min: 5, max: 100 })
      .withMessage("Subject must be between 5 and 100 characters"),
    body("message")
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage("Message must be between 10 and 1000 characters"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array()
        })
      }

      const { name, email, subject, message, phone } = req.body

      // Create contact entry
      const contact = await Contact.create({
        name,
        email,
        subject,
        message,
        phone: phone || "",
        ipAddress: req.ip,
        userAgent: req.get("User-Agent")
      })

      // TODO: Send email notification (implement with nodemailer)
      // await sendContactNotification(contact)

      res.status(201).json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
        data: {
          id: contact._id,
          submittedAt: contact.createdAt
        }
      })
    } catch (error) {
      console.error("Contact submission error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to submit contact form. Please try again later."
      })
    }
  }
)

// @desc    Get all contact submissions (admin only)
// @route   GET /api/contact
// @access  Private/Admin
router.get("/", async (req, res) => {
  try {
    // TODO: Add admin authentication middleware
    const { page = 1, limit = 20, status } = req.query

    const query = {}
    if (status) query.status = status

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-__v")

    const total = await Contact.countDocuments(query)

    res.json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    })
  }
})

// @desc    Update contact status (admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
router.put("/:id", async (req, res) => {
  try {
    // TODO: Add admin authentication middleware
    const { status, notes } = req.body

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { 
        status: status || "read",
        notes: notes || "",
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    )

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact submission not found"
      })
    }

    res.json({
      success: true,
      message: "Contact status updated",
      data: contact
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid data",
      error: error.message
    })
  }
})

export default router

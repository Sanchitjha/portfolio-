import Contact from "../models/Contact.js"
import nodemailer from "nodemailer"

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message, phone, company, projectType, budget, timeline } = req.body

    // Create contact record
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      phone,
      company,
      projectType,
      budget,
      timeline,
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    })

    // Send email notification
    try {
      const transporter = createTransporter()

      // Email to me
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
          <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
          <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      })

      // Auto-reply to sender
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Thank you for your message!",
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for your message. I've received your inquiry and will get back to you within 24 hours.</p>
          <p>Best regards,<br>Your Name</p>
        `,
      })
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
      },
    })
  } catch (error) {
    console.error("Submit contact error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again.",
    })
  }
}

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Public
export const getContactStats = async (req, res) => {
  try {
    const totalMessages = await Contact.countDocuments()
    const newMessages = await Contact.countDocuments({ status: "new" })
    const repliedMessages = await Contact.countDocuments({ isReplied: true })

    res.json({
      success: true,
      data: {
        total: totalMessages,
        new: newMessages,
        replied: repliedMessages,
        responseRate: totalMessages > 0 ? Math.round((repliedMessages / totalMessages) * 100) : 0,
      },
    })
  } catch (error) {
    console.error("Get contact stats error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

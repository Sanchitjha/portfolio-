import mongoose from "mongoose"

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    phone: String,
    company: String,
    projectType: {
      type: String,
      enum: ["web-development", "mobile-app", "api-development", "consultation", "other"],
    },
    budget: {
      type: String,
      enum: ["under-5k", "5k-10k", "10k-25k", "25k-50k", "50k+", "not-specified"],
    },
    timeline: {
      type: String,
      enum: ["asap", "1-month", "2-3-months", "3-6-months", "6-months+", "flexible"],
    },
    status: {
      type: String,
      enum: ["new", "read", "replied", "closed"],
      default: "new",
    },
    isReplied: {
      type: Boolean,
      default: false,
    },
    repliedAt: Date,
    notes: String,
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
  },
)

contactSchema.index({ status: 1, createdAt: -1 })
contactSchema.index({ email: 1 })

export default mongoose.model("Contact", contactSchema)

import mongoose from "mongoose"

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"]
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [100, "Subject cannot exceed 100 characters"]
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"]
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied", "archived"],
      default: "unread"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium"
    },
    category: {
      type: String,
      enum: ["general", "support", "business", "feedback", "other"],
      default: "general"
    },
    ipAddress: {
      type: String,
      default: ""
    },
    userAgent: {
      type: String,
      default: ""
    },
    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
      default: ""
    },
    repliedAt: {
      type: Date
    },
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    isSpam: {
      type: Boolean,
      default: false
    },
    spamScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Virtual for response time
contactSchema.virtual("responseTime").get(function() {
  if (this.repliedAt) {
    return Math.floor((this.repliedAt - this.createdAt) / (1000 * 60 * 60 * 24))
  }
  return null
})

// Virtual for age
contactSchema.virtual("age").get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24))
})

// Index for search and filtering
contactSchema.index({ 
  status: 1, 
  priority: 1, 
  category: 1, 
  createdAt: -1,
  email: 1 
})

// Index for spam detection
contactSchema.index({ 
  ipAddress: 1, 
  email: 1, 
  isSpam: 1 
})

// Pre-save middleware to calculate spam score
contactSchema.pre("save", function(next) {
  // Simple spam detection logic
  let score = 0
  
  // Check for suspicious patterns
  if (this.message && this.message.length > 500) score += 10
  if (this.message && this.message.includes("http://")) score += 20
  if (this.message && this.message.includes("www.")) score += 15
  if (this.message && this.message.includes("click here")) score += 25
  if (this.message && this.message.includes("buy now")) score += 30
  
  // Check for suspicious email patterns
  if (this.email && this.email.includes("noreply")) score += 10
  if (this.email && this.email.includes("test")) score += 5
  
  this.spamScore = Math.min(score, 100)
  this.isSpam = score > 50
  
  next()
})

export default mongoose.model("Contact", contactSchema)

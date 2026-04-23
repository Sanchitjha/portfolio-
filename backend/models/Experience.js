import mongoose from "mongoose"

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    location: String,
    type: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "freelance"],
      default: "full-time",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    responsibilities: [String],
    achievements: [String],
    technologies: [String],
    companyLogo: String,
    companyWebsite: String,
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for duration
experienceSchema.virtual("duration").get(function () {
  const start = this.startDate
  const end = this.endDate || new Date()
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`
  } else {
    return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
  }
})

experienceSchema.index({ order: -1, startDate: -1 })

export default mongoose.model("Experience", experienceSchema)

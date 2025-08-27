import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      maxlength: [200, "Short description cannot exceed 200 characters"],
    },
    technologies: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
      enum: ["web", "mobile", "desktop", "api", "fullstack", "other"],
    },
    images: [
      {
        url: String,
        alt: String,
        isPrimary: { type: Boolean, default: false },
      },
    ],
    liveUrl: {
      type: String,
      validate: {
        validator: (v) => !v || /^https?:\/\/.+/.test(v),
        message: "Please provide a valid URL",
      },
    },
    githubUrl: {
      type: String,
      validate: {
        validator: (v) => !v || /^https?:\/\/(www\.)?github\.com\/.+/.test(v),
        message: "Please provide a valid GitHub URL",
      },
    },
    features: [String],
    challenges: String,
    solutions: String,
    status: {
      type: String,
      enum: ["completed", "in-progress", "planned"],
      default: "completed",
    },
    priority: {
      type: Number,
      default: 0,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    startDate: Date,
    endDate: Date,
    teamSize: {
      type: Number,
      default: 1,
    },
    role: String,
    metrics: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      stars: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for primary image
projectSchema.virtual("primaryImage").get(function () {
  const primary = this.images.find((img) => img.isPrimary)
  return primary || this.images[0] || null
})

// Index for search
projectSchema.index({ title: "text", description: "text", technologies: "text" })
projectSchema.index({ category: 1, status: 1 })
projectSchema.index({ priority: -1, createdAt: -1 })

export default mongoose.model("Project", projectSchema)

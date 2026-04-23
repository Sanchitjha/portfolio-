import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"]
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"]
    },
    shortDescription: {
      type: String,
      maxlength: [200, "Short description cannot exceed 200 characters"]
    },
    image: {
      type: String,
      default: ""
    },
    images: [{
      type: String
    }],
    technologies: [{
      type: String,
      trim: true
    }],
    category: {
      type: String,
      enum: ["web", "mobile", "desktop", "ai", "game", "other"],
      default: "web"
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
      default: "intermediate"
    },
    githubUrl: {
      type: String,
      default: ""
    },
    liveUrl: {
      type: String,
      default: ""
    },
    demoUrl: {
      type: String,
      default: ""
    },
    features: [{
      type: String,
      trim: true
    }],
    challenges: [{
      type: String,
      trim: true
    }],
    solutions: [{
      type: String,
      trim: true
    }],
    duration: {
      type: String,
      default: ""
    },
    teamSize: {
      type: Number,
      default: 1,
      min: [1, "Team size must be at least 1"]
    },
    isPublic: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    tags: [{
      type: String,
      trim: true
    }],
    status: {
      type: String,
      enum: ["planning", "in-progress", "completed", "on-hold"],
      default: "completed"
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Virtual for project age
projectSchema.virtual("age").get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24))
})

// Index for search
projectSchema.index({ 
  title: "text", 
  description: "text", 
  technologies: "text",
  tags: "text" 
})

// Index for filtering
projectSchema.index({ category: 1, status: 1, isPublic: 1, user: 1 })

export default mongoose.model("Project", projectSchema)

import mongoose from "mongoose"

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["frontend", "backend", "database", "devops", "tools", "languages", "frameworks", "other"],
    },
    proficiency: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    icon: String,
    color: {
      type: String,
      default: "#3B82F6",
    },
    description: String,
    yearsOfExperience: {
      type: Number,
      default: 0,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    certifications: [String],
    isCore: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

skillSchema.index({ category: 1, proficiency: -1 })
skillSchema.index({ isCore: -1, proficiency: -1 })

export default mongoose.model("Skill", skillSchema)

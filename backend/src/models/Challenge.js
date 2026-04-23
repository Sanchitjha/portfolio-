import mongoose from "mongoose"

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Challenge title is required"],
      trim: true,
      minlength: [10, "Title must be at least 10 characters"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    description: {
      type: String,
      required: [true, "Challenge description is required"],
      minlength: [50, "Description must be at least 50 characters"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "algorithms",
        "data-structures",
        "dynamic-programming",
        "graphs",
        "trees",
        "arrays",
        "strings",
        "math",
        "greedy",
        "backtracking",
        "sorting",
        "searching",
        "recursion",
        "bit-manipulation",
        "other",
      ],
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    constraints: {
      type: String,
      default: "",
    },
    examples: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    testCases: [
      {
        input: String,
        expectedOutput: String,
        isHidden: {
          type: Boolean,
          default: false,
        },
      },
    ],
    starterCode: {
      javascript: { type: String, default: "" },
      python: { type: String, default: "" },
      java: { type: String, default: "" },
      cpp: { type: String, default: "" },
    },
    solutions: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        code: String,
        language: String,
        explanation: String,
        timeComplexity: String,
        spaceComplexity: String,
        votes: {
          upvotes: [
            {
              user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
              },
              createdAt: {
                type: Date,
                default: Date.now,
              },
            },
          ],
          downvotes: [
            {
              user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
              },
              createdAt: {
                type: Date,
                default: Date.now,
              },
            },
          ],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    submissions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        code: String,
        language: String,
        status: {
          type: String,
          enum: ["accepted", "wrong-answer", "time-limit-exceeded", "runtime-error", "compilation-error"],
          required: true,
        },
        executionTime: Number,
        memoryUsed: Number,
        submittedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for like count
challengeSchema.virtual("likeCount").get(function () {
  return this.likes.length
})

// Virtual for submission count
challengeSchema.virtual("submissionCount").get(function () {
  return this.submissions.length
})

// Virtual for acceptance rate
challengeSchema.virtual("acceptanceRate").get(function () {
  const totalSubmissions = this.submissions.length
  if (totalSubmissions === 0) return 0
  const acceptedSubmissions = this.submissions.filter((s) => s.status === "accepted").length
  return Math.round((acceptedSubmissions / totalSubmissions) * 100)
})

// Index for search and performance
challengeSchema.index({ title: "text", description: "text", tags: "text" })
challengeSchema.index({ category: 1, difficulty: 1 })
challengeSchema.index({ author: 1, createdAt: -1 })
challengeSchema.index({ isPublished: 1, createdAt: -1 })

export default mongoose.model("Challenge", challengeSchema)

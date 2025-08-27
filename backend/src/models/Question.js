import mongoose from "mongoose"

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Question title is required"],
      trim: true,
      minlength: [10, "Title must be at least 10 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Question content is required"],
      minlength: [20, "Content must be at least 20 characters"],
      maxlength: [10000, "Content cannot exceed 10000 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: [30, "Tag cannot exceed 30 characters"],
      },
    ],
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "javascript",
        "python",
        "java",
        "cpp",
        "csharp",
        "php",
        "ruby",
        "go",
        "rust",
        "swift",
        "kotlin",
        "typescript",
        "react",
        "vue",
        "angular",
        "nodejs",
        "express",
        "mongodb",
        "sql",
        "aws",
        "docker",
        "kubernetes",
        "devops",
        "algorithms",
        "data-structures",
        "system-design",
        "other",
      ],
    },
    codeSnippet: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "text",
    },
    attachments: [
      {
        filename: String,
        originalName: String,
        mimetype: String,
        size: Number,
        path: String,
      },
    ],
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
    views: {
      type: Number,
      default: 0,
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    acceptedAnswer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
    closedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    closedReason: {
      type: String,
      enum: ["duplicate", "off-topic", "too-broad", "unclear", "resolved"],
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for vote score
questionSchema.virtual("voteScore").get(function () {
  return this.votes.upvotes.length - this.votes.downvotes.length
})

// Virtual for answer count
questionSchema.virtual("answerCount").get(function () {
  return this.answers.length
})

// Virtual for has accepted answer
questionSchema.virtual("hasAcceptedAnswer").get(function () {
  return !!this.acceptedAnswer
})

// Index for search and performance
questionSchema.index({ title: "text", content: "text", tags: "text" })
questionSchema.index({ category: 1, difficulty: 1 })
questionSchema.index({ author: 1, createdAt: -1 })
questionSchema.index({ createdAt: -1 })
questionSchema.index({ "votes.upvotes.user": 1 })
questionSchema.index({ "votes.downvotes.user": 1 })

// Middleware to update reputation when question is voted
questionSchema.post("save", async function (doc) {
  if (this.isModified("votes")) {
    const User = mongoose.model("User")
    const author = await User.findById(doc.author)
    if (author) {
      // +5 for upvote, -2 for downvote on questions
      const upvotePoints = doc.votes.upvotes.length * 5
      const downvotePoints = doc.votes.downvotes.length * 2
      author.reputation = Math.max(0, author.reputation + upvotePoints - downvotePoints)
      await author.save()
    }
  }
})

export default mongoose.model("Question", questionSchema)

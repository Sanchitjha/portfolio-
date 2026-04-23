import mongoose from "mongoose"

const answerSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Answer content is required"],
      minlength: [10, "Answer must be at least 10 characters"],
      maxlength: [10000, "Answer cannot exceed 10000 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
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
    isAccepted: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        content: {
          type: String,
          required: true,
          maxlength: [500, "Comment cannot exceed 500 characters"],
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for vote score
answerSchema.virtual("voteScore").get(function () {
  return this.votes.upvotes.length - this.votes.downvotes.length
})

// Index for performance
answerSchema.index({ question: 1, createdAt: -1 })
answerSchema.index({ author: 1, createdAt: -1 })
answerSchema.index({ "votes.upvotes.user": 1 })
answerSchema.index({ "votes.downvotes.user": 1 })

// Middleware to update question's answers array
answerSchema.post("save", async (doc) => {
  const Question = mongoose.model("Question")
  await Question.findByIdAndUpdate(doc.question, { $addToSet: { answers: doc._id } })
})

// Middleware to update reputation when answer is voted or accepted
answerSchema.post("save", async function (doc) {
  if (this.isModified("votes") || this.isModified("isAccepted")) {
    const User = mongoose.model("User")
    const author = await User.findById(doc.author)
    if (author) {
      // +10 for upvote, -2 for downvote, +15 for accepted answer
      let points = 0
      points += doc.votes.upvotes.length * 10
      points -= doc.votes.downvotes.length * 2
      if (doc.isAccepted) points += 15

      author.reputation = Math.max(0, author.reputation + points)
      await author.save()
    }
  }
})

export default mongoose.model("Answer", answerSchema)

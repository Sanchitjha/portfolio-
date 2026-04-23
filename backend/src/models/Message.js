import mongoose from "mongoose"

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    messageType: {
      type: String,
      enum: ["text", "code", "file"],
      default: "text",
    },
    codeSnippet: {
      code: String,
      language: String,
    },
    attachment: {
      filename: String,
      originalName: String,
      mimetype: String,
      size: Number,
      path: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        deletedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Index for performance
messageSchema.index({ sender: 1, recipient: 1, createdAt: -1 })
messageSchema.index({ recipient: 1, isRead: 1 })

export default mongoose.model("Message", messageSchema)

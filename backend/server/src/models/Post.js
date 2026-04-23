import mongoose from "mongoose"

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true, maxlength: 160 },
    content: { type: String, trim: true, required: true, maxlength: 20000 },
    tags: { type: [String], default: [] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true },
)

PostSchema.index({ title: "text", content: "text", tags: 1 })

export default mongoose.model("Post", PostSchema)

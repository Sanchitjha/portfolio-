import { Router } from "express"
import Post from "../models/Post.js"
import { requireAuth } from "../middleware/auth.js"
import { clampLen, sanitizeTags } from "../utils/validate.js"

const router = Router()

// GET /api/posts?query=&tag=&limit=&page=
router.get("/", async (req, res) => {
  try {
    const { query, tag, limit = 20, page = 1 } = req.query
    const lim = Math.min(50, Math.max(1, Number(limit)))
    const skip = Math.max(0, (Number(page) - 1) * lim)

    const filter = {}
    if (query) {
      filter.$text = { $search: String(query) }
    }
    if (tag) {
      filter.tags = { $in: [String(tag)] }
    }

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(lim)
      .populate("author", "name email image")

    const total = await Post.countDocuments(filter)
    const items = posts.map((p) => toDTO(p))
    return res.json({ items, total, page: Number(page), limit: lim })
  } catch (e) {
    return res.status(500).json({ error: "Failed to fetch posts" })
  }
})

// GET /api/posts/:id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email image")
    if (!post) return res.status(404).json({ error: "Not found" })
    return res.json({ post: toDTO(post) })
  } catch (e) {
    return res.status(404).json({ error: "Not found" })
  }
})

// POST /api/posts
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, content, tags } = req.body || {}
    if (!clampLen(title, 3, 160)) return res.status(400).json({ error: "Title must be 3-160 chars" })
    if (!clampLen(content, 10, 20000)) return res.status(400).json({ error: "Content must be 10+ chars" })
    const tagList = sanitizeTags(tags)

    const created = await Post.create({
      title: String(title).trim(),
      content: String(content).trim(),
      tags: tagList,
      author: req.user._id,
    })
    const populated = await created.populate("author", "name email image")
    return res.status(201).json({ post: toDTO(populated) })
  } catch (e) {
    return res.status(500).json({ error: "Failed to create post" })
  }
})

// PATCH /api/posts/:id
router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const { title, content, tags } = req.body || {}
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: "Not found" })
    if (!post.author.equals(req.user._id)) return res.status(403).json({ error: "Forbidden" })

    if (title !== undefined) {
      if (!clampLen(title, 3, 160)) return res.status(400).json({ error: "Title must be 3-160 chars" })
      post.title = String(title).trim()
    }
    if (content !== undefined) {
      if (!clampLen(content, 10, 20000)) return res.status(400).json({ error: "Content must be 10+ chars" })
      post.content = String(content).trim()
    }
    if (tags !== undefined) {
      post.tags = sanitizeTags(tags)
    }

    await post.save()
    const populated = await post.populate("author", "name email image")
    return res.json({ post: toDTO(populated) })
  } catch (e) {
    return res.status(500).json({ error: "Failed to update post" })
  }
})

// DELETE /api/posts/:id
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: "Not found" })
    if (!post.author.equals(req.user._id)) return res.status(403).json({ error: "Forbidden" })

    await post.deleteOne()
    return res.json({ ok: true })
  } catch (e) {
    return res.status(500).json({ error: "Failed to delete post" })
  }
})

// POST /api/posts/:id/like
router.post("/:id/like", requireAuth, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true }).populate(
      "author",
      "name email image",
    )
    if (!post) return res.status(404).json({ error: "Not found" })
    return res.json({ post: toDTO(post) })
  } catch (e) {
    return res.status(500).json({ error: "Failed to like post" })
  }
})

function toDTO(post) {
  return {
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    tags: post.tags || [],
    likes: post.likes || 0,
    author: post.author
      ? {
          id: post.author._id?.toString?.() || post.author.id || String(post.author),
          name: post.author.name,
          email: post.author.email,
          image: post.author.image || "",
        }
      : null,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }
}

export default router

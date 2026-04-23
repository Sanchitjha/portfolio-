import express from "express"
import { protect, authorize } from "../middleware/auth.js"
import Project from "../models/Project.js"

const router = express.Router()

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query

    const query = {}
    if (category) query.category = category
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { technologies: { $in: [new RegExp(search, "i")] } }
      ]
    }

    const projects = await Project.find(query)
      .populate("user", "username firstName lastName avatar")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Project.countDocuments(query)

    res.json({
      success: true,
      data: projects,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    })
  }
})

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("user", "username firstName lastName avatar")

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      })
    }

    res.json({
      success: true,
      data: project
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    })
  }
})

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user.id
    })

    res.status(201).json({
      success: true,
      data: project
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid project data",
      error: error.message
    })
  }
})

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      })
    }

    // Make sure user owns project or is admin
    if (project.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this project"
      })
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.json({
      success: true,
      data: project
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid project data",
      error: error.message
    })
  }
})

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      })
    }

    // Make sure user owns project or is admin
    if (project.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this project"
      })
    }

    await project.deleteOne()

    res.json({
      success: true,
      message: "Project removed"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    })
  }
})

export default router

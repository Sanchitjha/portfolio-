import Project from "../models/Project.js"

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { category, status, limit = 10, page = 1 } = req.query

    const filter = { isPublic: true }
    if (category) filter.category = category
    if (status) filter.status = status

    const projects = await Project.find(filter)
      .sort({ priority: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean()

    const total = await Project.countDocuments(filter)

    res.json({
      success: true,
      data: projects,
      pagination: {
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get projects error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project || !project.isPublic) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    // Increment view count
    project.metrics.views += 1
    await project.save()

    res.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error("Get project error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
export const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      isPublic: true,
      priority: { $gte: 5 },
    })
      .sort({ priority: -1, "metrics.views": -1 })
      .limit(6)
      .lean()

    res.json({
      success: true,
      data: projects,
    })
  } catch (error) {
    console.error("Get featured projects error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Search projects
// @route   GET /api/projects/search
// @access  Public
export const searchProjects = async (req, res) => {
  try {
    const { q } = req.query

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      })
    }

    const projects = await Project.find(
      {
        $text: { $search: q },
        isPublic: true,
      },
      {
        score: { $meta: "textScore" },
      },
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(10)

    res.json({
      success: true,
      data: projects,
    })
  } catch (error) {
    console.error("Search projects error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

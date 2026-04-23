import { validationResult } from "express-validator"
import Question from "../models/Question.js"

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public
export const getQuestions = async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const { category, difficulty, tags, sort = "newest", author, hasAcceptedAnswer } = req.query

    // Build filter object
    const filter = { isDeleted: false }

    if (category) filter.category = category
    if (difficulty) filter.difficulty = difficulty
    if (tags) filter.tags = { $in: tags.split(",") }
    if (author) filter.author = author
    if (hasAcceptedAnswer === "true") filter.acceptedAnswer = { $exists: true }
    if (hasAcceptedAnswer === "false") filter.acceptedAnswer = { $exists: false }

    // Build sort object
    let sortObj = {}
    switch (sort) {
      case "newest":
        sortObj = { createdAt: -1 }
        break
      case "oldest":
        sortObj = { createdAt: 1 }
        break
      case "votes":
        sortObj = { "votes.upvotes": -1 }
        break
      case "views":
        sortObj = { views: -1 }
        break
      case "answers":
        sortObj = { answers: -1 }
        break
      default:
        sortObj = { createdAt: -1 }
    }

    const questions = await Question.find(filter)
      .populate("author", "username firstName lastName avatar reputation")
      .populate("acceptedAnswer")
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Question.countDocuments(filter)

    // Add user vote status if authenticated
    if (req.user) {
      questions.forEach((question) => {
        question.userVote = null
        if (question.votes.upvotes.some((vote) => vote.user.toString() === req.user.id)) {
          question.userVote = "upvote"
        } else if (question.votes.downvotes.some((vote) => vote.user.toString() === req.user.id)) {
          question.userVote = "downvote"
        }
      })
    }

    res.json({
      success: true,
      data: questions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get questions error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Get single question
// @route   GET /api/questions/:id
// @access  Public
export const getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("author", "username firstName lastName avatar reputation")
      .populate({
        path: "answers",
        populate: {
          path: "author",
          select: "username firstName lastName avatar reputation",
        },
      })
      .populate("acceptedAnswer")

    if (!question || question.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      })
    }

    // Increment view count
    question.views += 1
    await question.save()

    // Add user vote status if authenticated
    if (req.user) {
      question.userVote = null
      if (question.votes.upvotes.some((vote) => vote.user.toString() === req.user.id)) {
        question.userVote = "upvote"
      } else if (question.votes.downvotes.some((vote) => vote.user.toString() === req.user.id)) {
        question.userVote = "downvote"
      }

      // Add vote status for answers
      question.answers.forEach((answer) => {
        answer.userVote = null
        if (answer.votes.upvotes.some((vote) => vote.user.toString() === req.user.id)) {
          answer.userVote = "upvote"
        } else if (answer.votes.downvotes.some((vote) => vote.user.toString() === req.user.id)) {
          answer.userVote = "downvote"
        }
      })
    }

    res.json({
      success: true,
      data: question,
    })
  } catch (error) {
    console.error("Get question error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Create new question
// @route   POST /api/questions
// @access  Private
export const createQuestion = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const { title, content, tags, difficulty, category, codeSnippet, language } = req.body

    const question = await Question.create({
      title,
      content,
      author: req.user.id,
      tags: tags ? tags.split(",").map((tag) => tag.trim().toLowerCase()) : [],
      difficulty: difficulty || "beginner",
      category,
      codeSnippet: codeSnippet || "",
      language: language || "text",
    })

    const populatedQuestion = await Question.findById(question._id).populate(
      "author",
      "username firstName lastName avatar reputation",
    )

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: populatedQuestion,
    })
  } catch (error) {
    console.error("Create question error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)

    if (!question || question.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      })
    }

    // Check if user owns the question or is admin/moderator
    if (question.author.toString() !== req.user.id && !["admin", "moderator"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this question",
      })
    }

    const { title, content, tags, difficulty, category, codeSnippet, language } = req.body

    // Update fields
    if (title) question.title = title
    if (content) question.content = content
    if (tags) question.tags = tags.split(",").map((tag) => tag.trim().toLowerCase())
    if (difficulty) question.difficulty = difficulty
    if (category) question.category = category
    if (codeSnippet !== undefined) question.codeSnippet = codeSnippet
    if (language) question.language = language

    await question.save()

    const updatedQuestion = await Question.findById(question._id).populate(
      "author",
      "username firstName lastName avatar reputation",
    )

    res.json({
      success: true,
      message: "Question updated successfully",
      data: updatedQuestion,
    })
  } catch (error) {
    console.error("Update question error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)

    if (!question || question.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      })
    }

    // Check if user owns the question or is admin/moderator
    if (question.author.toString() !== req.user.id && !["admin", "moderator"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this question",
      })
    }

    // Soft delete
    question.isDeleted = true
    await question.save()

    res.json({
      success: true,
      message: "Question deleted successfully",
    })
  } catch (error) {
    console.error("Delete question error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Vote on question
// @route   POST /api/questions/:id/vote
// @access  Private
export const voteQuestion = async (req, res) => {
  try {
    const { voteType } = req.body // 'upvote' or 'downvote'

    if (!["upvote", "downvote"].includes(voteType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vote type",
      })
    }

    const question = await Question.findById(req.params.id)

    if (!question || question.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      })
    }

    // Can't vote on own question
    if (question.author.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "Cannot vote on your own question",
      })
    }

    const userId = req.user.id

    // Remove existing votes
    question.votes.upvotes = question.votes.upvotes.filter((vote) => vote.user.toString() !== userId)
    question.votes.downvotes = question.votes.downvotes.filter((vote) => vote.user.toString() !== userId)

    // Add new vote
    if (voteType === "upvote") {
      question.votes.upvotes.push({ user: userId })
    } else {
      question.votes.downvotes.push({ user: userId })
    }

    await question.save()

    const updatedQuestion = await Question.findById(question._id).populate(
      "author",
      "username firstName lastName avatar reputation",
    )

    res.json({
      success: true,
      message: `Question ${voteType}d successfully`,
      data: updatedQuestion,
    })
  } catch (error) {
    console.error("Vote question error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Search questions
// @route   GET /api/questions/search
// @access  Public
export const searchQuestions = async (req, res) => {
  try {
    const { q, category, difficulty, tags } = req.query
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      })
    }

    // Build search filter
    const filter = {
      $text: { $search: q },
      isDeleted: false,
    }

    if (category) filter.category = category
    if (difficulty) filter.difficulty = difficulty
    if (tags) filter.tags = { $in: tags.split(",") }

    const questions = await Question.find(filter, { score: { $meta: "textScore" } })
      .populate("author", "username firstName lastName avatar reputation")
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limit)

    const total = await Question.countDocuments(filter)

    res.json({
      success: true,
      data: questions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Search questions error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

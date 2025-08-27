import { validationResult } from "express-validator"
import Answer from "../models/Answer.js"
import Question from "../models/Question.js"

// @desc    Create new answer
// @route   POST /api/answers
// @access  Private
export const createAnswer = async (req, res) => {
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

    const { content, questionId, codeSnippet, language } = req.body

    // Check if question exists
    const question = await Question.findById(questionId)
    if (!question || question.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      })
    }

    // Check if question is closed
    if (question.isClosed) {
      return res.status(400).json({
        success: false,
        message: "Cannot answer a closed question",
      })
    }

    const answer = await Answer.create({
      content,
      author: req.user.id,
      question: questionId,
      codeSnippet: codeSnippet || "",
      language: language || "text",
    })

    const populatedAnswer = await Answer.findById(answer._id).populate(
      "author",
      "username firstName lastName avatar reputation",
    )

    res.status(201).json({
      success: true,
      message: "Answer created successfully",
      data: populatedAnswer,
    })
  } catch (error) {
    console.error("Create answer error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Update answer
// @route   PUT /api/answers/:id
// @access  Private
export const updateAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id)

    if (!answer || answer.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Answer not found",
      })
    }

    // Check if user owns the answer or is admin/moderator
    if (answer.author.toString() !== req.user.id && !["admin", "moderator"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this answer",
      })
    }

    const { content, codeSnippet, language } = req.body

    // Update fields
    if (content) answer.content = content
    if (codeSnippet !== undefined) answer.codeSnippet = codeSnippet
    if (language) answer.language = language

    await answer.save()

    const updatedAnswer = await Answer.findById(answer._id).populate(
      "author",
      "username firstName lastName avatar reputation",
    )

    res.json({
      success: true,
      message: "Answer updated successfully",
      data: updatedAnswer,
    })
  } catch (error) {
    console.error("Update answer error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Delete answer
// @route   DELETE /api/answers/:id
// @access  Private
export const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id)

    if (!answer || answer.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Answer not found",
      })
    }

    // Check if user owns the answer or is admin/moderator
    if (answer.author.toString() !== req.user.id && !["admin", "moderator"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this answer",
      })
    }

    // Soft delete
    answer.isDeleted = true
    await answer.save()

    res.json({
      success: true,
      message: "Answer deleted successfully",
    })
  } catch (error) {
    console.error("Delete answer error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Vote on answer
// @route   POST /api/answers/:id/vote
// @access  Private
export const voteAnswer = async (req, res) => {
  try {
    const { voteType } = req.body // 'upvote' or 'downvote'

    if (!["upvote", "downvote"].includes(voteType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vote type",
      })
    }

    const answer = await Answer.findById(req.params.id)

    if (!answer || answer.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Answer not found",
      })
    }

    // Can't vote on own answer
    if (answer.author.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "Cannot vote on your own answer",
      })
    }

    const userId = req.user.id

    // Remove existing votes
    answer.votes.upvotes = answer.votes.upvotes.filter((vote) => vote.user.toString() !== userId)
    answer.votes.downvotes = answer.votes.downvotes.filter((vote) => vote.user.toString() !== userId)

    // Add new vote
    if (voteType === "upvote") {
      answer.votes.upvotes.push({ user: userId })
    } else {
      answer.votes.downvotes.push({ user: userId })
    }

    await answer.save()

    const updatedAnswer = await Answer.findById(answer._id).populate(
      "author",
      "username firstName lastName avatar reputation",
    )

    res.json({
      success: true,
      message: `Answer ${voteType}d successfully`,
      data: updatedAnswer,
    })
  } catch (error) {
    console.error("Vote answer error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Accept answer
// @route   POST /api/answers/:id/accept
// @access  Private
export const acceptAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id)

    if (!answer || answer.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Answer not found",
      })
    }

    const question = await Question.findById(answer.question)

    if (!question || question.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      })
    }

    // Only question author can accept answers
    if (question.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only the question author can accept answers",
      })
    }

    // Remove previous accepted answer
    if (question.acceptedAnswer) {
      await Answer.findByIdAndUpdate(question.acceptedAnswer, { isAccepted: false })
    }

    // Set new accepted answer
    answer.isAccepted = true
    await answer.save()

    question.acceptedAnswer = answer._id
    await question.save()

    const updatedAnswer = await Answer.findById(answer._id).populate(
      "author",
      "username firstName lastName avatar reputation",
    )

    res.json({
      success: true,
      message: "Answer accepted successfully",
      data: updatedAnswer,
    })
  } catch (error) {
    console.error("Accept answer error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Add comment to answer
// @route   POST /api/answers/:id/comments
// @access  Private
export const addComment = async (req, res) => {
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

    const { content } = req.body

    const answer = await Answer.findById(req.params.id)

    if (!answer || answer.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Answer not found",
      })
    }

    const comment = {
      content,
      author: req.user.id,
      createdAt: new Date(),
    }

    answer.comments.push(comment)
    await answer.save()

    const updatedAnswer = await Answer.findById(answer._id)
      .populate("author", "username firstName lastName avatar reputation")
      .populate("comments.author", "username firstName lastName avatar")

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: updatedAnswer,
    })
  } catch (error) {
    console.error("Add comment error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

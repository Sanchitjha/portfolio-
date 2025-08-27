import express from "express"
import { body } from "express-validator"
import {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  voteAnswer,
  acceptAnswer,
  addComment,
} from "../controllers/answerController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

// Validation rules
const answerValidation = [
  body("content")
    .trim()
    .isLength({ min: 10, max: 10000 })
    .withMessage("Answer content must be between 10 and 10000 characters"),
]

const commentValidation = [
  body("content").trim().isLength({ min: 1, max: 500 }).withMessage("Comment must be between 1 and 500 characters"),
]

// Routes
router.post("/", protect, answerValidation, createAnswer)
router.put("/:id", protect, updateAnswer)
router.delete("/:id", protect, deleteAnswer)
router.post("/:id/vote", protect, voteAnswer)
router.post("/:id/accept", protect, acceptAnswer)
router.post("/:id/comments", protect, commentValidation, addComment)

export default router

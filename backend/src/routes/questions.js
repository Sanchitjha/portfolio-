import express from "express"
import { body } from "express-validator"
import {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  voteQuestion,
  searchQuestions,
} from "../controllers/questionController.js"
import { protect, optionalAuth } from "../middleware/auth.js"

const router = express.Router()

// Validation rules
const questionValidation = [
  body("title").trim().isLength({ min: 10, max: 200 }).withMessage("Title must be between 10 and 200 characters"),
  body("content")
    .trim()
    .isLength({ min: 20, max: 10000 })
    .withMessage("Content must be between 20 and 10000 characters"),
  body("category")
    .isIn([
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
    ])
    .withMessage("Invalid category"),
  body("difficulty").optional().isIn(["beginner", "intermediate", "advanced"]).withMessage("Invalid difficulty level"),
]

// Routes
router.route("/").get(optionalAuth, getQuestions).post(protect, questionValidation, createQuestion)

router.get("/search", optionalAuth, searchQuestions)

router.route("/:id").get(optionalAuth, getQuestion).put(protect, updateQuestion).delete(protect, deleteQuestion)

router.post("/:id/vote", protect, voteQuestion)

export default router

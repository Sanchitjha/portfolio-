import express from "express"
import { body } from "express-validator"
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js"
import { protect } from "../middleware/auth.js"
import { authLimiter } from "../middleware/rateLimiter.js"

const router = express.Router()

// Validation rules
const registerValidation = [
  body("username")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Username can only contain letters, numbers, hyphens, and underscores"),
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("firstName")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("First name is required and cannot exceed 50 characters"),
  body("lastName")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name is required and cannot exceed 50 characters"),
]

const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
]

// Public routes
router.post("/register", authLimiter, registerValidation, register)
router.post("/login", authLimiter, loginValidation, login)
router.post("/forgot-password", authLimiter, forgotPassword)
router.put("/reset-password/:token", authLimiter, resetPassword)

// Protected routes
router.get("/me", protect, getMe)
router.put("/profile", protect, updateProfile)
router.put("/change-password", protect, changePassword)

export default router

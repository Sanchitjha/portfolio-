import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator"
import { protect } from "../middleware/auth.js"
import { authLimiter } from "../middleware/rateLimiter.js"
import User from "../models/User.js"

const router = express.Router()

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  })
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post("/register",
  authLimiter,
  [
    body("username")
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Username must be between 3 and 30 characters")
      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage("Username can only contain letters, numbers, hyphens, and underscores"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
    body("firstName")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("First name must be between 2 and 50 characters"),
    body("lastName")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Last name must be between 2 and 50 characters"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array()
        })
      }

      const { username, email, password, firstName, lastName, bio, skills, githubProfile, linkedinProfile, website, location } = req.body

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email }, { username }]
      })

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: existingUser.email === email ? "Email already registered" : "Username already taken"
        })
      }

      // Create user
      const user = await User.create({
        username,
        email,
        password,
        firstName,
        lastName,
        bio: bio || "",
        skills: skills || [],
        githubProfile: githubProfile || "",
        linkedinProfile: linkedinProfile || "",
        website: website || "",
        location: location || ""
      })

      // Generate token
      const token = generateToken(user._id)

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            avatar: user.avatar,
            bio: user.bio,
            skills: user.skills,
            githubProfile: user.githubProfile,
            linkedinProfile: user.linkedinProfile,
            website: user.website,
            location: user.location,
            reputation: user.reputation,
            isEmailVerified: user.isEmailVerified,
            createdAt: user.createdAt
          },
          token
        }
      })
    } catch (error) {
      console.error("Registration error:", error)
      res.status(500).json({
        success: false,
        message: "Registration failed. Please try again later."
      })
    }
  }
)

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post("/login",
  authLimiter,
  [
    body("identifier")
      .notEmpty()
      .withMessage("Username or email is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array()
        })
      }

      const { identifier, password } = req.body

      // Find user by username or email
      const user = await User.findOne({
        $or: [
          { username: identifier },
          { email: identifier }
        ]
      }).select("+password")

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        })
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: "Account is deactivated. Please contact support."
        })
      }

      // Check password
      const isMatch = await user.comparePassword(password)
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        })
      }

      // Update last seen
      user.lastSeen = Date.now()
      await user.save()

      // Generate token
      const token = generateToken(user._id)

      // Remove password from response
      user.password = undefined

      res.json({
        success: true,
        message: "Login successful",
        data: {
          user,
          token
        }
      })
    } catch (error) {
      console.error("Login error:", error)
      res.status(500).json({
        success: false,
        message: "Login failed. Please try again later."
      })
    }
  }
)

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("followers", "username firstName lastName avatar")
      .populate("following", "username firstName lastName avatar")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error("Profile fetch error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile"
    })
  }
})

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put("/profile", 
  protect,
  [
    body("firstName")
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("First name must be between 2 and 50 characters"),
    body("lastName")
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Last name must be between 2 and 50 characters"),
    body("bio")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage("Bio cannot exceed 500 characters"),
    body("location")
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage("Location cannot exceed 100 characters"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array()
        })
      }

      const { firstName, lastName, bio, skills, githubProfile, linkedinProfile, website, location } = req.body

      const updateFields = {}
      if (firstName !== undefined) updateFields.firstName = firstName
      if (lastName !== undefined) updateFields.lastName = lastName
      if (bio !== undefined) updateFields.bio = bio
      if (skills !== undefined) updateFields.skills = skills
      if (githubProfile !== undefined) updateFields.githubProfile = githubProfile
      if (linkedinProfile !== undefined) updateFields.linkedinProfile = linkedinProfile
      if (website !== undefined) updateFields.website = website
      if (location !== undefined) updateFields.location = location

      const user = await User.findByIdAndUpdate(
        req.user.id,
        updateFields,
        { new: true, runValidators: true }
      ).select("-password")

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: user
      })
    } catch (error) {
      console.error("Profile update error:", error)
      res.status(500).json({
        success: false,
        message: "Profile update failed"
      })
    }
  }
)

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
router.put("/change-password",
  protect,
  [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage("New password must contain at least one uppercase letter, one lowercase letter, and one number")
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array()
        })
      }

      const { currentPassword, newPassword } = req.body

      // Get user with password
      const user = await User.findById(req.user.id).select("+password")

      // Check current password
      const isMatch = await user.comparePassword(currentPassword)
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect"
        })
      }

      // Update password
      user.password = newPassword
      await user.save()

      res.json({
        success: true,
        message: "Password changed successfully"
      })
    } catch (error) {
      console.error("Password change error:", error)
      res.status(500).json({
        success: false,
        message: "Password change failed"
      })
    }
  }
)

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
router.post("/logout", protect, (req, res) => {
  try {
    // In a real application, you might want to blacklist the token
    // For now, we'll just return a success message
    res.json({
      success: true,
      message: "Logged out successfully"
    })
  } catch (error) {
    console.error("Logout error:", error)
    res.status(500).json({
      success: false,
      message: "Logout failed"
    })
  }
})

// @desc    Get public user profile
// @route   GET /api/auth/user/:username
// @access  Public
router.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select("-password -email -isActive -isEmailVerified")
      .populate("followers", "username firstName lastName avatar")
      .populate("following", "username firstName lastName avatar")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error("Public profile fetch error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch user profile"
    })
  }
})

export default router

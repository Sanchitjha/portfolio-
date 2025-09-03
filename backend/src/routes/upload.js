import express from "express"
import { protect, authorize } from "../middleware/auth.js"
import { uploadSingle, uploadMultiple, handleUploadError, cleanupUploads } from "../middleware/upload.js"
import path from "path"
import { fileURLToPath } from "url"

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// @desc    Upload single file
// @route   POST /api/upload/single
// @access  Private
router.post("/single", 
  protect, 
  uploadSingle("file"),
  cleanupUploads,
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        })
      }

      res.json({
        success: true,
        message: "File uploaded successfully",
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
          mimetype: req.file.mimetype,
          url: `/uploads/${req.file.filename}`
        }
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "File upload failed",
        error: error.message
      })
    }
  }
)

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
// @access  Private
router.post("/multiple", 
  protect, 
  uploadMultiple("files", 5),
  cleanupUploads,
  (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded"
        })
      }

      const uploadedFiles = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        url: `/uploads/${file.filename}`
      }))

      res.json({
        success: true,
        message: `${uploadedFiles.length} files uploaded successfully`,
        data: uploadedFiles
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "File upload failed",
        error: error.message
      })
    }
  }
)

// @desc    Upload project images
// @route   POST /api/upload/project-images
// @access  Private
router.post("/project-images", 
  protect, 
  uploadMultiple("images", 10),
  cleanupUploads,
  (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No images uploaded"
        })
      }

      // Filter only image files
      const imageFiles = req.files.filter(file => 
        file.mimetype.startsWith("image/")
      )

      if (imageFiles.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No valid image files uploaded"
        })
      }

      const uploadedImages = imageFiles.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        url: `/uploads/${file.filename}`
      }))

      res.json({
        success: true,
        message: `${uploadedImages.length} images uploaded successfully`,
        data: uploadedImages
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Image upload failed",
        error: error.message
      })
    }
  }
)

// @desc    Upload profile avatar
// @route   POST /api/upload/avatar
// @access  Private
router.post("/avatar", 
  protect, 
  uploadSingle("avatar"),
  cleanupUploads,
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No avatar uploaded"
        })
      }

      // Check if file is an image
      if (!req.file.mimetype.startsWith("image/")) {
        return res.status(400).json({
          success: false,
          message: "Only image files are allowed for avatar"
        })
      }

      res.json({
        success: true,
        message: "Avatar uploaded successfully",
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
          mimetype: req.file.mimetype,
          url: `/uploads/${req.file.filename}`
        }
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Avatar upload failed",
        error: error.message
      })
    }
  }
)

// @desc    Delete uploaded file
// @route   DELETE /api/upload/:filename
// @access  Private
router.delete("/:filename", protect, (req, res) => {
  try {
    const { filename } = req.params
    const filePath = path.join(__dirname, "../../uploads", filename)

    // Check if file exists
    const fs = require("fs")
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found"
      })
    }

    // Delete file
    fs.unlinkSync(filePath)

    res.json({
      success: true,
      message: "File deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "File deletion failed",
      error: error.message
    })
  }
})

// @desc    Get file info
// @route   GET /api/upload/:filename
// @access  Public
router.get("/:filename", (req, res) => {
  try {
    const { filename } = req.params
    const filePath = path.join(__dirname, "../../uploads", filename)

    // Check if file exists
    const fs = require("fs")
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found"
      })
    }

    // Get file stats
    const stats = fs.statSync(filePath)
    const ext = path.extname(filename).toLowerCase()

    res.json({
      success: true,
      data: {
        filename,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        extension: ext,
        url: `/uploads/${filename}`
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting file info",
      error: error.message
    })
  }
})

// Error handling middleware
router.use(handleUploadError)

export default router

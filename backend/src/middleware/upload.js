import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"))
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  }
})

// File filter function
const fileFilter = (req, file, cb) => {
  // Allow only specific file types
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx|txt/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error("Only image, PDF, and document files are allowed!"), false)
  }
}

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
    files: 5 // Maximum 5 files
  },
  fileFilter: fileFilter
})

// Single file upload middleware
export const uploadSingle = (fieldName) => upload.single(fieldName)

// Multiple files upload middleware
export const uploadMultiple = (fieldName, maxCount = 5) => upload.array(fieldName, maxCount)

// Multiple fields upload middleware
export const uploadFields = (fields) => upload.fields(fields)

// Error handling middleware for multer
export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 5MB."
      })
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "Too many files. Maximum is 5 files."
      })
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: "Unexpected field in file upload."
      })
    }
  }

  if (error.message.includes("Only image, PDF, and document files are allowed")) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }

  next(error)
}

// Clean up uploaded files on error
export const cleanupUploads = (req, res, next) => {
  // Store original send function
  const originalSend = res.send

  // Override send function to clean up files on error
  res.send = function (data) {
    if (res.statusCode >= 400 && req.files) {
      // Clean up uploaded files on error
      if (Array.isArray(req.files)) {
        req.files.forEach(file => {
          try {
            require("fs").unlinkSync(file.path)
          } catch (err) {
            console.error("Error deleting file:", err)
          }
        })
      } else if (req.files && typeof req.files === "object") {
        Object.values(req.files).flat().forEach(file => {
          try {
            require("fs").unlinkSync(file.path)
          } catch (err) {
            console.error("Error deleting file:", err)
          }
        })
      }
    }
    
    // Call original send function
    return originalSend.call(this, data)
  }

  next()
}

export default upload

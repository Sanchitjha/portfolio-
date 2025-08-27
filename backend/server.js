import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import compression from "compression"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

import connectDB from "./config/database.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
import { rateLimiter } from "./middleware/rateLimiter.js"

// Routes
import projectRoutes from "./routes/projects.js"
import skillRoutes from "./routes/skills.js"
import contactRoutes from "./routes/contact.js"
import experienceRoutes from "./routes/experience.js"
import githubRoutes from "./routes/github.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(helmet())
app.use(compression())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Rate limiting
app.use("/api/", rateLimiter)

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Sanchit's Portfolio API is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  })
})

// API Routes
app.use("/api/projects", projectRoutes)
app.use("/api/skills", skillRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/experience", experienceRoutes)
app.use("/api/github", githubRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Sanchit's Portfolio API running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/health`)
})

export default app

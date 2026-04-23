import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import compression from "compression"
import { createServer } from "http"
import { Server } from "socket.io"
import dotenv from "dotenv"

import connectDB from "./config/database.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
import { rateLimiter } from "./middleware/rateLimiter.js"

// Route imports
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import questionRoutes from "./routes/questions.js"
import answerRoutes from "./routes/answers.js"
import challengeRoutes from "./routes/challenges.js"
import messageRoutes from "./routes/messages.js"
import uploadRoutes from "./routes/upload.js"

// Socket handlers
import { initializeSocket } from "./socket/socketHandlers.js"

dotenv.config()

const app = express()
const server = createServer(app)

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_CORS_ORIGIN?.split(",") || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

// Initialize socket handlers
initializeSocket(io)

// Connect to MongoDB
connectDB()

// Middleware
app.use(helmet())
app.use(compression())
app.use(
  cors({
    origin: process.env.CORS_ORIGINS?.split(",") || "http://localhost:3000",
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

// Static files (uploads)
app.use("/uploads", express.static("uploads"))

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  })
})

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/questions", questionRoutes)
app.use("/api/answers", answerRoutes)
app.use("/api/challenges", challengeRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/upload", uploadRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`🚀 DevConnect API running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/health`)
})

export default app

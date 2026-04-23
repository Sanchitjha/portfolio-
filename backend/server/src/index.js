import "dotenv/config"
import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"

const app = express()

// Basic security headers
app.use(helmet())

// CORS
const allowed = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true) // allow curl/postman
      if (allowed.length === 0 || allowed.includes(origin)) return cb(null, true)
      return cb(new Error("Not allowed by CORS"))
    },
    credentials: true,
  }),
)

// Parsers
app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: false }))

// Logs
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"))
}

// Routes
app.get("/health", (_req, res) => res.json({ ok: true }))
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({
    error: err.message || "Internal Server Error",
  })
})

const port = process.env.PORT || 8080
await connectDB()
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})

import express from "express"
import { getProjects, getProject, getFeaturedProjects, searchProjects } from "../controllers/projectController.js"

const router = express.Router()

router.get("/", getProjects)
router.get("/featured", getFeaturedProjects)
router.get("/search", searchProjects)
router.get("/:id", getProject)

export default router

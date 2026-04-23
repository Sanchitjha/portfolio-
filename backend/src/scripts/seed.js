"use client"

import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import Project from "../models/Project.js"
import Contact from "../models/Contact.js"

dotenv.config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`📦 MongoDB Connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error("❌ Database connection failed:", error.message)
    process.exit(1)
  }
}

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany()
    console.log("🧹 Cleared existing users")

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 12)
    const adminUser = await User.create({
      username: "admin",
      email: "admin@portfolio.com",
      password: adminPassword,
      firstName: "Sanchit",
      lastName: "Admin",
      role: "admin",
      bio: "Portfolio administrator and developer",
      skills: ["JavaScript", "React", "Node.js", "MongoDB"],
      githubProfile: "https://github.com/sanchit-admin",
      linkedinProfile: "https://linkedin.com/in/sanchit-admin",
      website: "https://sanchit-portfolio.com",
      location: "India",
      isEmailVerified: true
    })

    // Create regular user
    const userPassword = await bcrypt.hash("user123", 12)
    const regularUser = await User.create({
      username: "demo",
      email: "demo@portfolio.com",
      password: userPassword,
      firstName: "Demo",
      lastName: "User",
      role: "user",
      bio: "Demo user for testing",
      skills: ["HTML", "CSS", "JavaScript"],
      isEmailVerified: true
    })

    console.log("✅ Users seeded successfully")
    return { adminUser, regularUser }
  } catch (error) {
    console.error("❌ Error seeding users:", error)
    throw error
  }
}

const seedProjects = async (users) => {
  try {
    // Clear existing projects
    await Project.deleteMany()
    console.log("🧹 Cleared existing projects")

    const sampleProjects = [
      {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features include dark mode, animations, and a blog system.",
        shortDescription: "Modern portfolio website with Next.js",
        category: "web",
        difficulty: "intermediate",
        technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
        features: ["Responsive Design", "Dark Mode", "Blog System", "Contact Form"],
        challenges: ["SEO Optimization", "Performance", "Mobile Responsiveness"],
        solutions: ["Next.js Image Optimization", "Code Splitting", "CSS Grid/Flexbox"],
        githubUrl: "https://github.com/sanchit/portfolio",
        liveUrl: "https://sanchit-portfolio.com",
        demoUrl: "https://demo.sanchit-portfolio.com",
        duration: "3 weeks",
        teamSize: 1,
        isFeatured: true,
        tags: ["portfolio", "nextjs", "react", "tailwind"],
        user: users.adminUser._id
      },
      {
        title: "E-commerce Platform",
        description: "Full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration.",
        shortDescription: "Full-stack e-commerce solution",
        category: "web",
        difficulty: "advanced",
        technologies: ["Node.js", "Express", "MongoDB", "React", "Redux"],
        features: ["User Authentication", "Product Management", "Shopping Cart", "Payment Gateway"],
        challenges: ["State Management", "Payment Security", "Database Design"],
        solutions: ["Redux Toolkit", "Stripe Integration", "MongoDB Aggregation"],
        githubUrl: "https://github.com/sanchit/ecommerce",
        liveUrl: "https://ecommerce.sanchit.com",
        duration: "6 weeks",
        teamSize: 2,
        tags: ["ecommerce", "fullstack", "nodejs", "react"],
        user: users.adminUser._id
      },
      {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        shortDescription: "Collaborative task management app",
        category: "web",
        difficulty: "intermediate",
        technologies: ["React", "Socket.io", "Node.js", "PostgreSQL"],
        features: ["Real-time Updates", "Drag & Drop", "Team Collaboration", "Task Categories"],
        challenges: ["Real-time Synchronization", "State Consistency", "User Permissions"],
        solutions: ["Socket.io Events", "Optimistic Updates", "Role-based Access Control"],
        githubUrl: "https://github.com/sanchit/taskmanager",
        liveUrl: "https://tasks.sanchit.com",
        duration: "4 weeks",
        teamSize: 3,
        tags: ["task-management", "real-time", "collaboration"],
        user: users.regularUser._id
      }
    ]

    const projects = await Project.insertMany(sampleProjects)
    console.log("✅ Projects seeded successfully")
    return projects
  } catch (error) {
    console.error("❌ Error seeding projects:", error)
    throw error
  }
}

const seedContacts = async () => {
  try {
    // Clear existing contacts
    await Contact.deleteMany()
    console.log("🧹 Cleared existing contacts")

    const sampleContacts = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1-555-0123",
        subject: "Project Collaboration",
        message: "Hi Sanchit, I saw your portfolio and would like to discuss a potential collaboration on a web development project. Your work looks impressive!",
        category: "business",
        priority: "medium"
      },
      {
        name: "Jane Smith",
        email: "jane.smith@techcorp.com",
        phone: "+1-555-0456",
        subject: "Job Opportunity",
        message: "Hello! We're looking for a talented developer to join our team. Your portfolio caught our attention. Would you be interested in discussing this opportunity?",
        category: "business",
        priority: "high"
      },
      {
        name: "Feedback User",
        email: "feedback@example.com",
        subject: "Portfolio Feedback",
        message: "Great portfolio! I especially liked the clean design and smooth animations. The project showcase is well-organized and easy to navigate.",
        category: "feedback",
        priority: "low"
      }
    ]

    const contacts = await Contact.insertMany(sampleContacts)
    console.log("✅ Contacts seeded successfully")
    return contacts
  } catch (error) {
    console.error("❌ Error seeding contacts:", error)
    throw error
  }
}

const main = async () => {
  try {
    console.log("🌱 Starting database seeding...")
    
    // Connect to database
    await connectDB()
    
    // Seed data
    const users = await seedUsers()
    await seedProjects(users)
    await seedContacts()
    
    console.log("🎉 Database seeding completed successfully!")
    console.log("📊 Summary:")
    console.log("   - Users: 2")
    console.log("   - Projects: 3")
    console.log("   - Contacts: 3")
    
    process.exit(0)
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }
}

// Run seeding
main()

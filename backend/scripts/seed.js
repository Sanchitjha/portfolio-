import dotenv from "dotenv"
import connectDB from "../config/database.js"
import Project from "../models/Project.js"
import Skill from "../models/Skill.js"
import Experience from "../models/Experience.js"

dotenv.config()

const seedData = async () => {
  try {
    await connectDB()

    // Clear existing data
    await Project.deleteMany({})
    await Skill.deleteMany({})
    await Experience.deleteMany({})

    console.log("🗑️  Cleared existing data")

    // Seed Skills based on Sanchit's GitHub profile
    const skills = await Skill.create([
      // Backend Technologies
      {
        name: "Node.js",
        category: "backend",
        proficiency: 90,
        icon: "nodejs",
        color: "#339933",
        description: "Server-side JavaScript runtime for building scalable applications",
        yearsOfExperience: 2,
        isCore: true,
        order: 1,
      },
      {
        name: "Express.js",
        category: "backend",
        proficiency: 85,
        icon: "express",
        color: "#000000",
        description: "Fast, unopinionated web framework for Node.js",
        yearsOfExperience: 2,
        isCore: true,
        order: 2,
      },
      {
        name: "MongoDB",
        category: "database",
        proficiency: 80,
        icon: "mongodb",
        color: "#47A248",
        description: "NoSQL document database for modern applications",
        yearsOfExperience: 2,
        isCore: true,
        order: 3,
      },
      {
        name: "JavaScript",
        category: "languages",
        proficiency: 95,
        icon: "javascript",
        color: "#F7DF1E",
        description: "Dynamic programming language for web development",
        yearsOfExperience: 3,
        isCore: true,
        order: 4,
      },
      {
        name: "Python",
        category: "languages",
        proficiency: 75,
        icon: "python",
        color: "#3776AB",
        description: "Versatile programming language for backend and data science",
        yearsOfExperience: 2,
        isCore: false,
        order: 5,
      },
      {
        name: "React",
        category: "frontend",
        proficiency: 70,
        icon: "react",
        color: "#61DAFB",
        description: "JavaScript library for building user interfaces",
        yearsOfExperience: 1.5,
        isCore: false,
        order: 6,
      },
      {
        name: "Next.js",
        category: "frameworks",
        proficiency: 65,
        icon: "nextjs",
        color: "#000000",
        description: "React framework for production-grade applications",
        yearsOfExperience: 1,
        isCore: false,
        order: 7,
      },
      {
        name: "MySQL",
        category: "database",
        proficiency: 70,
        icon: "mysql",
        color: "#4479A1",
        description: "Relational database management system",
        yearsOfExperience: 2,
        isCore: false,
        order: 8,
      },
      {
        name: "Git",
        category: "tools",
        proficiency: 85,
        icon: "git",
        color: "#F05032",
        description: "Version control system for tracking changes",
        yearsOfExperience: 3,
        isCore: true,
        order: 9,
      },
      {
        name: "Docker",
        category: "devops",
        proficiency: 60,
        icon: "docker",
        color: "#2496ED",
        description: "Containerization platform for application deployment",
        yearsOfExperience: 1,
        isCore: false,
        order: 10,
      },
      {
        name: "REST APIs",
        category: "backend",
        proficiency: 90,
        icon: "api",
        color: "#FF6B35",
        description: "RESTful web services for client-server communication",
        yearsOfExperience: 2,
        isCore: true,
        order: 11,
      },
      {
        name: "JWT",
        category: "backend",
        proficiency: 80,
        icon: "jwt",
        color: "#000000",
        description: "JSON Web Tokens for secure authentication",
        yearsOfExperience: 2,
        isCore: false,
        order: 12,
      },
    ])

    console.log("🛠️  Created skills")

    // Seed Experience
    const experiences = await Experience.create([
      {
        company: "Tech Startup",
        position: "Backend Developer Intern",
        location: "Remote",
        type: "internship",
        startDate: new Date("2023-06-01"),
        endDate: new Date("2023-12-01"),
        isCurrent: false,
        description:
          "Developed and maintained RESTful APIs using Node.js and Express.js. Worked with MongoDB for data storage and implemented JWT-based authentication systems.",
        responsibilities: [
          "Built scalable REST APIs using Node.js and Express.js",
          "Designed and optimized MongoDB database schemas",
          "Implemented JWT-based authentication and authorization",
          "Collaborated with frontend team for API integration",
          "Wrote comprehensive API documentation",
        ],
        achievements: [
          "Improved API response time by 40% through optimization",
          "Successfully deployed applications using Docker containers",
          "Mentored 2 junior developers in backend best practices",
        ],
        technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "Docker", "Git"],
        order: 1,
      },
      {
        company: "Freelance Projects",
        position: "Full Stack Developer",
        location: "Remote",
        type: "freelance",
        startDate: new Date("2024-01-01"),
        endDate: null,
        isCurrent: true,
        description:
          "Working on various freelance projects involving full-stack web development. Specializing in backend development with modern JavaScript technologies.",
        responsibilities: [
          "Develop custom web applications for clients",
          "Create robust backend systems and APIs",
          "Implement database design and optimization",
          "Provide technical consultation and project planning",
        ],
        achievements: [
          "Completed 5+ successful projects with 100% client satisfaction",
          "Built e-commerce platforms handling 1000+ daily transactions",
          "Implemented real-time chat systems using Socket.io",
        ],
        technologies: ["Node.js", "Express.js", "MongoDB", "React", "Next.js", "Socket.io"],
        order: 2,
      },
    ])

    console.log("💼 Created experience")

    // Seed Projects based on typical backend projects
    const projects = await Project.create([
      {
        title: "E-Commerce REST API",
        description:
          "A comprehensive e-commerce backend API built with Node.js, Express.js, and MongoDB. Features include user authentication, product management, shopping cart, order processing, and payment integration.",
        shortDescription: "Full-featured e-commerce backend with payment integration",
        technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "Stripe", "Cloudinary"],
        category: "api",
        images: [
          {
            url: "/placeholder.svg?height=400&width=600&text=E-Commerce+API",
            alt: "E-Commerce API Architecture",
            isPrimary: true,
          },
        ],
        githubUrl: "https://github.com/Sanchitjha/ecommerce-api",
        features: [
          "User authentication and authorization",
          "Product CRUD operations",
          "Shopping cart management",
          "Order processing system",
          "Payment gateway integration",
          "Image upload and management",
          "Email notifications",
          "Admin dashboard APIs",
        ],
        challenges:
          "Implementing secure payment processing and handling concurrent user sessions while maintaining data consistency.",
        solutions:
          "Used MongoDB transactions for data consistency and implemented proper error handling with comprehensive logging.",
        status: "completed",
        priority: 10,
        startDate: new Date("2023-08-01"),
        endDate: new Date("2023-11-01"),
        teamSize: 1,
        role: "Full Stack Developer",
        metrics: {
          views: 150,
          likes: 25,
          stars: 12,
        },
      },
      {
        title: "Real-Time Chat Application",
        description:
          "A real-time chat application backend using Node.js, Express.js, Socket.io, and MongoDB. Features include private messaging, group chats, file sharing, and user presence indicators.",
        shortDescription: "Real-time messaging system with Socket.io",
        technologies: ["Node.js", "Express.js", "Socket.io", "MongoDB", "JWT", "Multer"],
        category: "web",
        images: [
          {
            url: "/placeholder.svg?height=400&width=600&text=Chat+Application",
            alt: "Chat Application Interface",
            isPrimary: true,
          },
        ],
        githubUrl: "https://github.com/Sanchitjha/chat-app",
        liveUrl: "https://sanchit-chat-app.vercel.app",
        features: [
          "Real-time messaging with Socket.io",
          "Private and group conversations",
          "File and image sharing",
          "User online/offline status",
          "Message history and search",
          "Typing indicators",
          "Message encryption",
        ],
        challenges: "Managing real-time connections and ensuring message delivery across multiple server instances.",
        solutions:
          "Implemented Redis for session management and used Socket.io rooms for efficient message broadcasting.",
        status: "completed",
        priority: 9,
        startDate: new Date("2023-12-01"),
        endDate: new Date("2024-02-01"),
        teamSize: 1,
        role: "Backend Developer",
        metrics: {
          views: 200,
          likes: 35,
          stars: 18,
        },
      },
      {
        title: "Task Management API",
        description:
          "A comprehensive task management system backend with features like project organization, team collaboration, deadline tracking, and progress monitoring. Built with Node.js and MongoDB.",
        shortDescription: "Project and task management system with team collaboration",
        technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "Nodemailer", "Cron"],
        category: "api",
        images: [
          {
            url: "/placeholder.svg?height=400&width=600&text=Task+Management",
            alt: "Task Management Dashboard",
            isPrimary: true,
          },
        ],
        githubUrl: "https://github.com/Sanchitjha/task-manager-api",
        features: [
          "Project and task CRUD operations",
          "Team member management",
          "Role-based access control",
          "Deadline notifications",
          "Progress tracking and reporting",
          "File attachments",
          "Activity logging",
          "Email notifications",
        ],
        challenges: "Implementing complex role-based permissions and efficient task querying with multiple filters.",
        solutions:
          "Created a flexible permission system using middleware and optimized database queries with proper indexing.",
        status: "completed",
        priority: 8,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-03-01"),
        teamSize: 2,
        role: "Lead Backend Developer",
        metrics: {
          views: 120,
          likes: 20,
          stars: 8,
        },
      },
      {
        title: "Blog Platform API",
        description:
          "A modern blog platform backend with features like content management, user authentication, commenting system, and SEO optimization. Built with Node.js, Express.js, and MongoDB.",
        shortDescription: "Full-featured blog platform with CMS capabilities",
        technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "Helmet"],
        category: "web",
        images: [
          {
            url: "/placeholder.svg?height=400&width=600&text=Blog+Platform",
            alt: "Blog Platform Interface",
            isPrimary: true,
          },
        ],
        githubUrl: "https://github.com/Sanchitjha/blog-platform",
        liveUrl: "https://sanchit-blog.vercel.app",
        features: [
          "Article CRUD with rich text editor",
          "User authentication and profiles",
          "Comment and reply system",
          "Category and tag management",
          "Image upload and optimization",
          "SEO-friendly URLs",
          "Search functionality",
          "Admin dashboard",
        ],
        challenges: "Implementing efficient search functionality and handling large amounts of content data.",
        solutions: "Used MongoDB text indexes for search and implemented pagination with proper caching strategies.",
        status: "completed",
        priority: 7,
        startDate: new Date("2023-09-01"),
        endDate: new Date("2023-12-01"),
        teamSize: 1,
        role: "Full Stack Developer",
        metrics: {
          views: 180,
          likes: 30,
          stars: 15,
        },
      },
      {
        title: "Authentication Microservice",
        description:
          "A standalone authentication microservice that can be integrated into any application. Features JWT tokens, OAuth integration, password reset, email verification, and rate limiting.",
        shortDescription: "Reusable authentication service with OAuth support",
        technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "Passport.js", "Redis"],
        category: "api",
        images: [
          {
            url: "/placeholder.svg?height=400&width=600&text=Auth+Microservice",
            alt: "Authentication Service Architecture",
            isPrimary: true,
          },
        ],
        githubUrl: "https://github.com/Sanchitjha/auth-microservice",
        features: [
          "JWT-based authentication",
          "OAuth integration (Google, GitHub)",
          "Password reset functionality",
          "Email verification",
          "Rate limiting and security",
          "Session management",
          "Multi-factor authentication",
          "API documentation",
        ],
        challenges: "Ensuring security best practices and handling various OAuth providers seamlessly.",
        solutions:
          "Implemented comprehensive security measures including rate limiting, input validation, and secure token storage.",
        status: "in-progress",
        priority: 9,
        startDate: new Date("2024-02-01"),
        endDate: null,
        teamSize: 1,
        role: "Backend Developer",
        metrics: {
          views: 90,
          likes: 15,
          stars: 6,
        },
      },
    ])

    console.log("🚀 Created projects")

    console.log("✅ Database seeded successfully with Sanchit's portfolio data!")
    process.exit(0)
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }
}

seedData()

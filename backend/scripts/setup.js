import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const setup = async () => {
  try {
    console.log("🔧 Setting up backend environment...")

    // Create uploads directory
    const uploadsDir = path.join(__dirname, "../uploads")
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
      console.log("✅ Created uploads directory")
    } else {
      console.log("📁 Uploads directory already exists")
    }

    // Create logs directory
    const logsDir = path.join(__dirname, "../logs")
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true })
      console.log("✅ Created logs directory")
    } else {
      console.log("📁 Logs directory already exists")
    }

    // Check if .env file exists
    const envPath = path.join(__dirname, "../.env")
    if (!fs.existsSync(envPath)) {
      console.log("⚠️  .env file not found!")
      console.log("📝 Please copy env.example to .env and configure your environment variables")
      console.log("   cp env.example .env")
    } else {
      console.log("✅ .env file found")
    }

    // Create .gitkeep files
    const gitkeepFiles = [
      path.join(uploadsDir, ".gitkeep"),
      path.join(logsDir, ".gitkeep")
    ]

    gitkeepFiles.forEach(filePath => {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "# This file ensures the directory is tracked in git\n")
        console.log(`✅ Created ${path.basename(filePath)}`)
      }
    })

    console.log("🎉 Setup completed successfully!")
    console.log("\n📋 Next steps:")
    console.log("   1. Configure your .env file")
    console.log("   2. Start MongoDB")
    console.log("   3. Run: pnpm run seed")
    console.log("   4. Run: pnpm run dev")

  } catch (error) {
    console.error("❌ Setup failed:", error.message)
    process.exit(1)
  }
}

// Run setup
setup()

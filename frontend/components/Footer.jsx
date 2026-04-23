"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Code } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-800 bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Sanchit Jha</span>
          </div>

          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Sanchit Jha. Built with Next.js & Framer Motion.
          </p>

          <div className="flex space-x-4">
            <Link
              href="https://github.com/Sanchitjha"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/sanchit-jha-844b17255"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:sanchitjha8888@gmail.com"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useEffect, useState, Suspense } from "react"
import { useAuth } from "@/contexts/AuthContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import QuestionCard from "@/components/QuestionCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, TrendingUp, Users, MessageSquare, Award } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import dynamic from "next/dynamic"
import LoadingSpinner from "@/components/LoadingSpinner"

// Dynamically import 3D components to avoid SSR issues
const ParticleBackground = dynamic(() => import("@/components/3d/ParticleBackground"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-blue-900" />,
})

const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900" />,
})

const About = dynamic(() => import("@/components/sections/About"), { ssr: false })
const Skills = dynamic(() => import("@/components/sections/Skills"), { ssr: false })
const Experience = dynamic(() => import("@/components/sections/Experience"), { ssr: false })
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: false })
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false })

export default function HomePage() {
  const { user } = useAuth()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [difficulty, setDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    fetchQuestions()
  }, [category, difficulty, sortBy])

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (category !== "all") params.append("category", category)
      if (difficulty !== "all") params.append("difficulty", difficulty)
      params.append("sort", sortBy)

      const response = await axios.get(`/questions?${params}`)
      if (response.data.success) {
        setQuestions(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    try {
      setLoading(true)
      const response = await axios.get(`/questions/search?q=${encodeURIComponent(searchQuery)}`)
      if (response.data.success) {
        setQuestions(response.data.data)
      }
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <ParticleBackground />
      </Suspense>

      <Navbar />

      <div className="relative z-10">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Hero />
        </Suspense>

        <Suspense fallback={<div className="min-h-96" />}>
          <About />
        </Suspense>

        <Suspense fallback={<div className="min-h-96" />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<div className="min-h-96" />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<div className="min-h-96" />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<div className="min-h-96" />}>
          <Contact />
        </Suspense>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <MessageSquare className="h-12 w-12 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-gray-600">Questions Asked</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">5K+</div>
                <div className="text-gray-600">Active Developers</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">25K+</div>
                <div className="text-gray-600">Solutions Shared</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <TrendingUp className="h-12 w-12 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Questions Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h3 className="text-lg font-semibold mb-4">Filter Questions</h3>

                  {/* Search */}
                  <form onSubmit={handleSearch} className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </form>

                  {/* Category Filter */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="nodejs">Node.js</SelectItem>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                        <SelectItem value="algorithms">Algorithms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Difficulty Filter */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Difficulty</label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort Filter */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="votes">Most Voted</SelectItem>
                        <SelectItem value="views">Most Viewed</SelectItem>
                        <SelectItem value="answers">Most Answers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Latest Questions</h2>
                  {user && (
                    <Button asChild>
                      <Link href="/questions/ask">
                        <Plus className="mr-2 h-4 w-4" />
                        Ask Question
                      </Link>
                    </Button>
                  )}
                </div>

                {loading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                ) : questions.length > 0 ? (
                  <div className="space-y-4">
                    {questions.map((question) => (
                      <QuestionCard key={question._id} question={question} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                    <p className="text-gray-600 mb-4">Be the first to ask a question!</p>
                    {user && (
                      <Button asChild>
                        <Link href="/questions/ask">Ask a Question</Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}

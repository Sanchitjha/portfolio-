"use client"

import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const AuthContext = createContext({})

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Configure axios defaults
axios.defaults.baseURL = API_URL

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem("devconnect_token")
    if (storedToken) {
      setToken(storedToken)
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await axios.get("/auth/me")
      if (response.data.success) {
        setUser(response.data.user)
      }
    } catch (error) {
      console.error("Failed to fetch user:", error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password })

      if (response.data.success) {
        const { token: newToken, user: userData } = response.data

        setToken(newToken)
        setUser(userData)

        localStorage.setItem("devconnect_token", newToken)
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`

        return { success: true }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post("/auth/register", userData)

      if (response.data.success) {
        const { token: newToken, user: newUser } = response.data

        setToken(newToken)
        setUser(newUser)

        localStorage.setItem("devconnect_token", newToken)
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`

        return { success: true }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("devconnect_token")
    delete axios.defaults.headers.common["Authorization"]
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put("/auth/profile", profileData)

      if (response.data.success) {
        setUser(response.data.user)
        return { success: true }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Profile update failed",
      }
    }
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

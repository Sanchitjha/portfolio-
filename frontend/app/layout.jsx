import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sanchit Jha - Backend Developer & Full Stack Engineer",
  description:
    "Experienced Backend Developer specializing in Node.js, Express, MongoDB, and modern web technologies. Building scalable applications and robust APIs.",
  keywords:
    "Sanchit Jha, backend developer, full stack developer, node.js, express, mongodb, javascript, api development, web developer",
  authors: [{ name: "Sanchit Jha" }],
  creator: "Sanchit Jha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sanchitjha.dev",
    title: "Sanchit Jha - Backend Developer",
    description:
      "Experienced Backend Developer specializing in Node.js, Express, MongoDB, and modern web technologies.",
    siteName: "Sanchit Jha Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sanchit Jha - Backend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanchit Jha - Backend Developer",
    description:
      "Experienced Backend Developer specializing in Node.js, Express, MongoDB, and modern web technologies.",
    creator: "@sanchitjha",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-900 text-white overflow-x-hidden`}>
        <Suspense fallback={<div className="min-h-screen bg-gray-900" />}>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1f2937",
                color: "#f9fafb",
                border: "1px solid #374151",
              },
            }}
          />
        </Suspense>
      </body>
    </html>
  )
}

import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Navbar } from "../components/landing/Navbar"
import { Hero } from "../components/landing/Hero"
import { DatabaseSection } from "../components/landing/DatabaseSection"
import { GitSection } from "../components/landing/GitSection"
import { PMSection } from "../components/landing/PMSection"
import { OrchestrationSection } from "../components/landing/OrchestrationSection"
import { CTA } from "../components/landing/CTA"
import { Footer } from "../components/landing/Footer"

export default function Landing() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "")
      const element = document.getElementById(id)
      if (element) {
        const timer = setTimeout(() => {
          const yOffset = -80 // Offset for sticky navbar
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: "smooth" })
        }, 150)
        return () => clearTimeout(timer)
      }
    }
  }, [hash])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors flex flex-col items-center">
      {/* Navigation bar */}
      <Navbar />

      <main className="w-full flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <Hero />

        {/* Database Section */}
        <DatabaseSection />

        {/* Git Section */}
        <GitSection />

        {/* Project Management Section */}
        <PMSection />

        {/* Orchestration Section */}
        <OrchestrationSection />

        {/* Installer CTA */}
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

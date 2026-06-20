import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Sun, Moon, Terminal, Menu, X } from "lucide-react"
import { LanguageSwitcher } from "../ui/LanguageSwitcher"
import { useTranslation } from "react-i18next"

export function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "light" || saved === "dark") return saved
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  // Track scroll position to highlight active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 150) {
        setActiveSection("home")
        return
      }
      const sections = ["database", "git", "pm", "orchestration"]
      let current = ""
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Check if element is in the middle-top portion of viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section
          }
        }
      }
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    // Trigger once on load
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [location.pathname])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  // Smooth scroll handler
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    if (location.pathname !== "/home") {
      navigate(`/home#${id}`)
      return
    }
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    if (location.pathname !== "/home") {
      navigate("/home")
      return
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
    setActiveSection("home")
  }

  const isDocsActive = location.pathname.startsWith("/docs")
  const isHomeActive = !isDocsActive && (activeSection === "home" || activeSection === "")

  return (
    <nav className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center relative">
        
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
            setIsMobileMenuOpen(false)
          }}
          className="text-xl font-extrabold tracking-tighter flex items-center gap-2 group text-foreground"
        >
          <span className="h-8 w-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-black group-hover:scale-105 transition-transform">
            L
          </span>
          <span>
            Lumina<span className="text-accent">MCP</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <a 
            href="#" 
            onClick={handleScrollToTop}
            className={`text-sm transition-colors ${isHomeActive ? "text-accent font-bold" : "font-medium text-muted-foreground hover:text-foreground"}`}
          >
            {t('navbar.home')}
          </a>
          <a 
            href="#database" 
            onClick={(e) => handleScrollToSection(e, "database")}
            className={`text-sm transition-colors ${activeSection === "database" && !isDocsActive ? "text-accent font-bold" : "font-medium text-muted-foreground hover:text-foreground"}`}
          >
            {t('navbar.database')}
          </a>
          <a 
            href="#git" 
            onClick={(e) => handleScrollToSection(e, "git")}
            className={`text-sm transition-colors ${activeSection === "git" && !isDocsActive ? "text-accent font-bold" : "font-medium text-muted-foreground hover:text-foreground"}`}
          >
            {t('navbar.git')}
          </a>
          <a 
            href="#pm" 
            onClick={(e) => handleScrollToSection(e, "pm")}
            className={`text-sm transition-colors ${activeSection === "pm" && !isDocsActive ? "text-accent font-bold" : "font-medium text-muted-foreground hover:text-foreground"}`}
          >
            {t('navbar.pm')}
          </a>
          <a 
            href="#orchestration" 
            onClick={(e) => handleScrollToSection(e, "orchestration")}
            className={`text-sm transition-colors ${activeSection === "orchestration" && !isDocsActive ? "text-accent font-bold" : "font-medium text-muted-foreground hover:text-foreground"}`}
          >
            {t('navbar.orchestration')}
          </a>
          
          <div className="h-4 w-px bg-border/60" />

          <Link 
            to="/docs/getting-started" 
            className={`text-sm transition-colors ${isDocsActive ? "text-accent font-bold" : "font-medium text-muted-foreground hover:text-foreground"}`}
          >
            {t('navbar.docs')}
          </Link>
          
          <a 
            href="https://github.com/Wahyu-Labs/lumina-mcp" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('navbar.github')}
          </a>

          <LanguageSwitcher />

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border/60 hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile menu trigger + theme toggle */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border/60 hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg border border-border/60 hover:bg-muted/50 transition-colors text-foreground"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border/40 shadow-xl px-6 py-6 flex flex-col gap-6 z-40">
          <a 
            href="#" 
            onClick={handleScrollToTop}
            className={`text-base transition-colors ${isHomeActive ? "text-accent font-bold" : "font-medium text-muted-foreground"}`}
          >
            {t('navbar.home')}
          </a>
          <a 
            href="#database" 
            onClick={(e) => handleScrollToSection(e, "database")}
            className={`text-base transition-colors ${activeSection === "database" && !isDocsActive ? "text-accent font-bold" : "font-medium text-muted-foreground"}`}
          >
            {t('navbar.database')}
          </a>
          <a 
            href="#git" 
            onClick={(e) => handleScrollToSection(e, "git")}
            className={`text-base transition-colors ${activeSection === "git" && !isDocsActive ? "text-accent font-bold" : "font-medium text-muted-foreground"}`}
          >
            {t('navbar.git')}
          </a>
          <a 
            href="#pm" 
            onClick={(e) => handleScrollToSection(e, "pm")}
            className={`text-base transition-colors ${activeSection === "pm" && !isDocsActive ? "text-accent font-bold" : "font-medium text-muted-foreground"}`}
          >
            {t('navbar.pm')}
          </a>
          <a 
            href="#orchestration" 
            onClick={(e) => handleScrollToSection(e, "orchestration")}
            className={`text-base transition-colors ${activeSection === "orchestration" && !isDocsActive ? "text-accent font-bold" : "font-medium text-muted-foreground"}`}
          >
            {t('navbar.orchestration')}
          </a>
          
          <div className="h-px w-full bg-border/60" />

          <Link 
            to="/docs/getting-started" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-2 text-base transition-colors ${isDocsActive ? "text-accent font-bold" : "font-medium text-muted-foreground"}`}
          >
            <Terminal className="h-4 w-4" /> {t('navbar.docs')}
          </Link>
          
          <a 
            href="https://github.com/Wahyu-Labs/lumina-mcp" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-base font-medium text-muted-foreground"
          >
            {t('navbar.github')}
          </a>
        </div>
      )}
    </nav>
  )
}

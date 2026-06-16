import { motion } from 'framer-motion'
import { Terminal, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FeatureBento } from '../components/FeatureBento'
import { HeroVisual } from '../components/HeroVisual'
import { UnifiedOrchestration } from '../components/UnifiedOrchestration'

export default function Landing() {
  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 flex flex-col items-center">
      
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-50">
        <a href="#" className="text-2xl font-extrabold tracking-tighter">
          Lumina<span className="text-accent">MCP</span>
        </a>
        <div className="hidden md:flex gap-8 items-center">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#orchestration" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Orchestration</a>
          <Link to="/docs/getting-started" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
          <a href="https://github.com/Wahyu-Labs/lumina-mcp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path><path d="M12 18v4"></path></svg> GitHub
          </a>
        </div>
      </nav>

      <main className="w-full flex-grow flex flex-col items-center">
        
        {/* Hero Section - Side by Side Layout */}
        <section className="w-full max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-0 w-[600px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none -z-10" />

          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 text-sm font-medium text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-accent pulse-dot"></span>
              v1.0.3 Available Now
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-6 text-foreground">
              Unified MCP Toolkit for <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-muted-foreground">Engineering Workflows</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-[480px]">
              Connect your AI agents seamlessly to your local file systems, databases, and version control. Empower your agents to build, audit, and push code autonomously.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/docs/getting-started" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors">
                See How It Works <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://github.com/Wahyu-Labs/lumina-mcp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 font-medium hover:bg-white/10 transition-colors">
                <Terminal className="w-4 h-4" /> View Source
              </a>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative"
          >
            <HeroVisual />
          </motion.div>

        </section>

        {/* Feature Bento Grid */}
        <FeatureBento />

        {/* Unified Orchestration & Compound Engineering Workflow */}
        <UnifiedOrchestration />

        {/* Quick Install CTA */}
        <section className="w-full py-32 px-6 flex flex-col items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5 -z-10" />
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Ready to automate your workflow?</h2>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-black border border-white/10 p-6 rounded-xl font-mono text-sm flex items-center gap-4">
              <span className="text-muted-foreground">$</span>
              <span className="text-white">npm install -g lumina-mcp</span>
              <button 
                onClick={() => navigator.clipboard.writeText('npm install -g lumina-mcp')}
                className="ml-4 p-2 rounded-md hover:bg-white/10 transition-colors"
                title="Copy to clipboard"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground">
                  <path d="M1 9.5C1 8.67157 1.67157 8 2.5 8H4V6.5C4 5.67157 4.67157 5 5.5 5H7V3.5C7 2.67157 7.67157 2 8.5 2H12.5C13.3284 2 14 2.67157 14 3.5V7.5C14 8.32843 13.3284 9 12.5 9H11V10.5C11 11.3284 10.3284 12 9.5 12H8V13.5C8 14.3284 7.32843 15 6.5 15H2.5C1.67157 15 1 14.3284 1 13.5V9.5ZM2.5 9C2.22386 9 2 9.22386 2 9.5V13.5C2 13.7761 2.22386 14 2.5 14H6.5C6.77614 14 7 13.7761 7 13.5V12H5.5C4.67157 12 4 11.3284 4 10.5V9H2.5ZM5 10.5C5 10.7761 5.22386 11 5.5 11H9.5C9.77614 11 10 10.7761 10 10.5V6.5C10 6.22386 9.77614 6 9.5 6H8V7.5C8 8.32843 7.32843 9 6.5 9H5V10.5ZM8.5 3C8.22386 3 8 3.22386 8 3.5V5H9.5C10.3284 5 11 5.67157 11 6.5V8H12.5C12.7761 8 13 7.77614 13 7.5V3.5C13 3.22386 12.7761 3 12.5 3H8.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </section>

      </main>

      <footer className="w-full border-t border-white/10 py-12 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} Lumina MCP. Open source under MIT License.</p>
      </footer>
    </div>
  )
}

